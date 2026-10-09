---
author: Hugo Nogueira
pubDatetime: 2026-10-09T08:00:00.000Z
title: "A Capability, Not a Credential: How Our AI Agents Call Customer APIs Without Ever Holding a Key"
locale: en
postSlug: capability-not-credential
featured: true
draft: false
tags:
  - ai-agents
  - security
  - agent-infrastructure
  - code-mode
  - engineering
description: "Our AI agents write and run code against customers' GitHub, AWS and other systems from a sandbox with internet access, and nothing inside that sandbox can authenticate to any of them. The architecture behind it, the designs we set aside, and where its boundaries are."
keywords: Hugo Nogueira, AI agents, agent security, code mode, credential isolation, capability security, prompt injection, sandbox, egress, OAuth, enterprise AI, agent infrastructure
image: "/images/blog/capability-not-credential.jpg"
---

Over the past few months, the AI agents we run at Complyance have been writing and executing code against our customers' own systems: their GitHub organisations, AWS accounts, identity providers and document stores. They do this from a sandbox that can reach the internet. Nothing inside that sandbox can authenticate to any of those systems.

That combination took us a while to get right, and I think the pattern behind it will matter to anyone who lets agents act on real infrastructure. The core idea fits in one sentence: **the agent receives a capability, not a credential.** This post explains what that means in practice, the designs we set aside along the way, and where its boundaries are, which is the part I would read first if I were evaluating someone else's design.

## Why our agents write code

Our agents collect compliance evidence. A request like "show that branch protection is enforced on every production repository" sounds simple. In practice it means walking hundreds of repositories through an API with thousands of endpoints. An AWS account can return 1,247 hosts for a single inventory question.

Typed tools, one function per operation, struggle at this scale. No model can keep a thousand tool descriptions in mind, and every intermediate result has to pass through its context window. So we moved to what is now called code mode. The agent gets a sandbox, a short reference for each connected system and a small client library, then writes a script that does the looping and filtering itself. Only the summary comes back into context. Models turn out to be far better at writing twenty lines of Python against an API than at orchestrating two hundred tool calls.

## The problem with putting a key in the room

Simon Willison describes a ["lethal trifecta"](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) for agents: access to private data, exposure to untrusted content, and a way to send data out. A code-mode agent has all three by design. It reads text written by other people all day, it runs code, and its sandbox reaches the internet because useful work often needs it to.

Put a credential into that environment and a single prompt injection, hidden in a pull request description the agent happens to read, can produce a script that prints the token and posts it somewhere. Better training and better prompts make that less likely. They cannot make it impossible, because the model is the component the attacker is talking to. The robust answer is structural: make sure there is nothing in the sandbox worth stealing.

## Three designs we set aside

![Four ways to let an agent call a customer API: a token in the environment, a short-lived scoped token, typed tools or an MCP server, and a capability broker](/images/blog/capability-not-credential/fig1-where-the-secret-lives.png)

The first version of our prototype kept a token in the tool process and attached it to every call. It worked, and it is exactly the setup the trifecta exploits. Anything the sandbox can read, an injected script can read too.

The more careful version gives the sandbox a short-lived token scoped to what the run needs. It shrinks the blast radius, but our own design notes state the limitation plainly: the token is "still readable and usable for its lifetime". Fifteen minutes is plenty of time for code that is already running, and least privilege for an evidence agent still means read access to a customer's entire GitHub organisation.

Typed tools, or an MCP server that holds the secrets, do keep credentials out of the sandbox. They also take away code mode, and every response flows back through the model. We wanted both properties at once: the expressiveness of code, with credentials handled entirely outside the sandbox.

## Capability, not credential

![Three trust zones: an untrusted sandbox holding only a capability, a trusted broker holding short-lived access, and a credential gateway holding long-lived secrets](/images/blog/capability-not-credential/fig2-three-trust-zones.png)

The design splits the work into three zones, each with a strict rule about what it may hold.

The **sandbox** is untrusted by definition. It is a gVisor container with a read-only root filesystem and internet access. When a run starts, it receives a client stub of about a hundred lines, a capability token for this run, and a short reference for each system the customer has connected. Calling a customer's GitHub looks like this:

```python
from broker import connect

gh = connect(connection_id)
rules = gh.get("/repos/acme/app/branches/main/protection")
```

There is no key in that code, in the environment or on disk. The stub knows one address and one token.

The **broker** runs in our trusted worker. It receives the call, decides whether this run may make it, and if so loads the customer's stored connection, decrypts it, signs the request and returns only the response.

The **credential gateway** sits one step further back and holds the long-lived secrets, such as OAuth refresh tokens. The broker asks it for a short-lived access token and never sees the refresh token itself. Refresh happens under a lease in Postgres, one writer at a time. That detail sounds minor until you meet a provider with single-use refresh tokens, where two workers refreshing at the same moment quietly break the connection.

Each zone gives a different answer to the question "what could this leak?" The sandbox could leak a capability that expires with the run. The broker could leak access tokens for connections it is actively serving. Only the gateway holds secrets that last, and nothing that runs model-written code comes near it.

## What happens on every call

![The four checks on every call: is the run alive, is the connection in the grant, is the request well formed, then decrypt, sign and send](/images/blog/capability-not-credential/fig3-every-call.png)

A diagram like the one above is easy to draw and easy to get subtly wrong. Four decisions carry most of the weight.

**Authority is bound to a connection, not a destination.** Many egress proxies attach credentials based on where traffic is going, which quietly lets the agent pick a credential by picking a host. In our design the agent names a connection, and the broker decides whether this run may use it. For AWS and GCP the agent supplies only a service name, checked against a strict pattern, and the broker builds the host and signs the request on its side.

**The grant is frozen when the run begins.** At that moment the broker takes a snapshot of the connections this agent may use, and every call is checked against it. Changing settings mid-run can narrow future runs but never widens the current one. The list the agent is told about is a convenience; the snapshot is what gets enforced.

**Capabilities die with the run.** The token is revoked when the sandbox is released. Authenticated clients are cached per run rather than globally, so revocation throws them away as well.

**The boundary is physical as well as logical.** Network rules give the sandbox exactly one path to the trusted zone, ending at a terminator on the host. The mutual-TLS identity the broker requires lives there, outside every container, so a sandbox that finds the broker's port directly still cannot complete the handshake. And when something fails, the sandbox receives a fixed error instead of the raw upstream message, because error strings from auth libraries have a habit of containing exactly what you were trying to protect.

## Where the boundary ends

![Different problems, different controls: a capability broker for credentials, egress policy for customer data, read-only connections for writes, and endpoint deny-lists for credential-shaped responses](/images/blog/capability-not-credential/fig4-what-it-protects.png)

A boundary is easier to trust when it is clear about its scope. This one is built for credentials, and it is deliberately narrow. Customer data and side effects are different problems, and in our experience each is better served by its own control than by stretching the broker to cover everything.

Data is a question of egress. Everything the broker returns lands in the sandbox, so what the sandbox may send out is decided separately, per agent, and our runtime can run an agent with no outbound network at all. Writes are a question of intent. Evidence collection is a read workload, so we recommend read-only connections and scope agents to reading, and explicit write policies are the next layer as agents move from observing systems to fixing them.

The subtlest point is that a credential broker inherits every endpoint its credentials can reach, including the ones whose response is itself a credential. Most large APIs have them: token exchange, role assumption, secret stores, routes that authenticate as the integration rather than as the customer. The HTTP client inside the broker is part of the attack surface too. SDK conveniences such as option objects that can override the target URL, or auth hooks that switch identity depending on the route, are harmless when your own code calls them and risky when the arguments come from an agent. If you build something like this, ask two questions early. Can the agent see the token? And is there any request whose answer is a token? Deny the routes that mint credentials, and never pass agent input straight into client configuration.

## Principles

Stripped of our specifics, this is what I would carry into any system where agents call real APIs on someone else's behalf:

1. **Assume the agent is the attacker.** Models are not malicious, but they read content written by people who might be.
2. **Give capabilities, not credentials.** Whatever enters the sandbox should be useless outside the run that created it.
3. **Bind authority to connections, not destinations.**
4. **Freeze grants when a run starts.** Changes may narrow access during a run, never widen it.
5. **Keep long-lived secrets two steps away from model-written code.**
6. **Treat endpoints and client libraries as part of the boundary.**
7. **Be explicit about scope.** Credentials, data and side effects are different problems, and each deserves its own control.

## Open questions

A few problems still feel open to me.

Data egress is the obvious one. Removing network access for runs that only need brokered APIs closes the trifecta completely, but some legitimate work needs the open internet. Per-agent egress policies are the likely middle ground, and the hard part is keeping them precise without turning them into a maintenance burden.

Writes are next. Evidence collection is mostly reading, while the next generation of compliance agents will remediate: open the pull request, rotate the key, close the ticket. A capability model for writes needs declared intent, human approval for the risky subset, and an audit trail a customer's security team would accept.

Finally, provenance. Today the record of what an agent did lives in its run log. What security teams increasingly want is an independent record at the boundary itself, showing which run, which connection, which endpoint and what came back. I expect that to become a standard requirement for agents that touch production systems.

---

I keep returning to the same conclusion on this blog: the model is not the security boundary, the system around it is. The most useful thing an agent platform can do is make the dangerous version of a mistake impossible rather than merely unlikely. A capability instead of a credential is one small, concrete way to do that, and I would be glad to compare notes with anyone drawing the same line.

*Find me on [LinkedIn](https://linkedin.com/in/hugomn) or at [hello@hugo.im](mailto:hello@hugo.im).*

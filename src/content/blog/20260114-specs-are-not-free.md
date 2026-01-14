---
author: Hugo Nogueira
pubDatetime: 2026-01-14T10:00:00.000Z
title: "Specs Are Not Free: Why AI Won't Replace Programming (It Will Transform It)"
locale: en
postSlug: specs-are-not-free
featured: true
draft: false
tags:
  - ai-agents
  - programming
  - software-engineering
  - ai
  - future-of-work
description: A response to the viral "spec as code" thesis. We don't stop programming—we change what programming means. And that change requires more engineering fundamentals, not fewer.
keywords: Hugo Nogueira, AI agents, spec as code, programming, software engineering, Matthias Georgi, vibe coding, AI coding, future of programming
image: "/images/blog/specs-are-not-free.jpg"
---

Matthias Georgi's post about ["2026 being the year where we will stop writing code"](https://www.linkedin.com/feed/update/urn:li:activity:7417153311512100864/) caught my attention today. It crystallized something I have been seeing firsthand while building autonomous agents and agent infrastructure over the last year.

His thesis is clear: we are moving from "code as spec" to "spec as code". Instead of writing implementation details, we will write specifications and let AI generate the code. The specification becomes the source of truth. It is a compelling vision, and I think it is directionally correct.

The possible misreading is believing that this shift makes programming easier. That specs are somehow free. That we can finally skip the hard parts. **We cannot, and that is actually good news.**

## The Spec Illusion

The future where we write specs instead of code is real, but a good spec is the distillation of engineering judgment. It encodes understanding of edge cases, performance characteristics, failure modes, security boundaries, and integration constraints.

In other words, **it requires knowing how to program**, not just how to type syntax, but how to **think like an engineer**.

Consider the seemingly simple spec: "Build a user authentication system."

A junior reads that and imagines a login form. A senior reads that and immediately considers hashing algorithms, session token rotation, rate limiting, account recovery flows, OAuth providers, logging and alerting, and regulatory requirements like GDPR. AI does not make the gap between those two disappear. It makes the gap matter more.

The spec is not the easy part. The spec is the part we used to hide inside implementation details. It becomes visible now, and that is healthy for the craft.

## Vibe Coding vs Engineering

There is a term floating around: "vibe coding." Ship fast, let the AI figure it out, iterate until it works. For prototypes, this is genuinely powerful. I have built things in hours that would have taken days. The creative velocity is real.

But here is what I learned while putting AI agents into production: vibe coding creates systems that work until they do not, and when they fail, they fail in ways that are almost impossible to debug because there is no shared understanding of the system. The AI produced code that passed tests, but hid O(n²) behavior in helpers, swallowed errors, leaked memory in edge cases, or introduced race conditions that only appear under real traffic.

> Vibe coding is prototyping. Engineering is what you do when it needs to work at 3 AM when you are not there.\*\*

## Context Is an Ecosystem

The second insight that Matthias's post sparked is that context is far larger than we admit. Most discussion focuses on "context windows": how much text we can feed an AI. But real software context does not live in one file. **Context is an ecosystem.**

Systems live in Git history, in Slack threads that debate tradeoffs, in monitoring dashboards that tell you what users do versus what you expected, in incident reports that document failure modes, and in tribal knowledge no one ever wrote down. No spec captures all of this. No context window is big enough.

Engineers who thrive in this new environment are not the ones who write clever prompts, but the ones who understand what context matters, how to structure it, and how to feed it into the system. This is why I like the term "context engineering." It is documentation made actionable, architecture made legible, and knowledge made computable.

## What Programming Becomes

If AI handles implementation, what is left for programmers to do?

**We become system designers.** We define boundaries, contracts, and interfaces. We decide which components exist and how they communicate.

**We become failure engineers.** We anticipate what can go wrong, not by looking at syntax, but by imagining adversarial scenarios, recovery paths, and constraints. This requires judgment, which does not come from training data.

**We become context architects.** We structure system knowledge so that both humans and AI can navigate it. We build the scaffolding that makes "spec as code" work.

**We become AI operators.** We evaluate the results, adjust constraints, and handle the situations where the AI generates something confidently wrong. This is not less programming. It is programming at a higher level of abstraction.

## The Real Shift

Here is where Matthias is exactly right: the source of truth is shifting. We used to write code and derive behavior from it. Now we write specifications and derive code from them. But a spec is not a natural language wishlist. A good spec is precise, complete, testable, and grounded in engineering fundamentals.

> We do not stop programming. We change what programming means.

The change favors engineers who understand data structures, system design, performance characteristics, failure modes, and security. The things that once felt academic when you could just Google the syntax.

The AI knows the syntax. It has read every Stack Overflow answer. What it does not know is what matters in your specific system, and what "working" means in your specific context. That is still your job, and it is the job that was always hard.

## The Opportunity

I am not pessimistic about this shift. I am energized by it. For years, software creation has been bottlenecked by implementation. Brilliant ideas died because typing the code took too long. AI compresses that gap, and that frees engineers to spend more time on conception, design, and correctness.

The engineers who will thrive are the ones who can think clearly about systems, specify precisely what they want, evaluate critically what they get, and iterate rapidly toward correctness.

These were always the real engineering skills. We just practiced them while typing semicolons.

Now we practice them directly.

---

_What's your experience with AI-assisted development? I'm curious whether you're finding that it requires more engineering judgment or less. Find me on [X](https://x.com/hugomn) or [LinkedIn](https://linkedin.com/in/hugomn)._

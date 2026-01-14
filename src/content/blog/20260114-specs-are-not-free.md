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

Matthias Georgi's post ["Spec as Code"](https://www.georgi.io/blog/spec-as-code) went viral this week, and it crystallized something I've been thinking about for months.

His thesis: we're moving from "code as spec" to "spec as code." Instead of writing implementation details, we'll write specifications and let AI generate the code. The spec becomes the source of truth.

It's a compelling vision. And I think it's directionally correct.

But there's a dangerous misreading lurking underneath: that this means programming gets easier. That specs are somehow "free." That we can finally skip the hard parts.

**We can't. And here's why that's actually good news.**

## The Spec Illusion

Here's what the "spec as code" future actually requires:

To write a spec that an AI can reliably implement, you need to understand:
- What edge cases exist
- What failure modes are possible
- What performance characteristics matter
- What security boundaries are necessary
- How components interact at scale

In other words: **you need to know how to program.**

Not how to type syntax. How to *think* like an engineer.

The spec isn't free. The spec is the distillation of engineering judgment. It's the part that was always hard—we just used to hide it inside implementation details.

Consider this "simple" spec: "Build a user authentication system."

An experienced engineer reads that and immediately thinks:
- Password hashing algorithms and salt management
- Session token generation and rotation
- Rate limiting and brute force protection
- Account recovery flows
- OAuth integration patterns
- GDPR compliance for user data

A junior engineer reads it and thinks: "Cool, I'll add a login form."

**The AI doesn't make the gap between these two disappear. It makes the gap matter more.**

## Vibe Coding vs. Engineering

There's a term floating around: "vibe coding." Ship fast, let the AI figure it out, iterate until it works.

For prototypes and MVPs, this is genuinely powerful. I've built things in hours that would have taken days. The creative velocity is real.

But here's what I've learned building production AI agents: vibe coding creates systems that work until they don't. And when they fail, they fail in ways that are nearly impossible to debug—because no one actually understands what the system is doing.

The AI generated code that "works" but:
- Has O(n²) complexity hidden in a helper function
- Silently swallows errors that will surface in production
- Creates race conditions that appear once every 1000 requests
- Leaks memory in edge cases the tests don't cover

**Vibe coding is prototyping. Engineering is what happens when you need it to work at 3 AM when you're not there.**

## Context Is an Ecosystem

Here's the second insight that Matthias's post sparked: the context problem is bigger than we think.

The current conversation focuses on "context windows"—how much text can you feed the AI? But context isn't a file. **Context is an ecosystem.**

Real software exists in:
- Git history and the decisions embedded in it
- Slack conversations about why we chose approach A over B
- Production metrics that reveal actual usage patterns
- Incident reports that document failure modes
- Tribal knowledge that never got written down

No spec captures this. No context window is big enough.

The engineers who thrive in the AI era won't be the ones who write the best prompts. They'll be the ones who understand their systems deeply enough to know what context matters—and how to structure it so AI can actually use it.

This is why I'm bullish on what I call "context engineering": the discipline of organizing system knowledge so that both humans and AI can navigate it effectively. It's documentation, but weaponized. Architecture, but legible.

## What Programming Becomes

So if AI handles implementation, what do programmers actually do?

**We become system designers.** We define boundaries, interfaces, and contracts. We decide what components exist and how they communicate.

**We become failure engineers.** We anticipate what can go wrong and specify how the system should respond. This is the part AI can't do—because it requires imagining scenarios that aren't in the training data.

**We become context architects.** We structure knowledge so AI can be effective. We build the scaffolding that makes "spec as code" actually work.

**We become AI operators.** We monitor, adjust, and course-correct. We handle the cases where the AI confidently generates something wrong.

This isn't less programming. It's programming at a higher level of abstraction—which historically has always required *more* skill, not less.

## The Real Shift

Here's what I think Matthias got exactly right: the source of truth is shifting.

We used to write code and derive behavior from it. Now we'll increasingly write specifications and derive code from them.

But specifications are not natural language wishlists. Good specs are precise, complete, and testable. They encode engineering judgment in a different syntax.

**We don't stop programming. We change what programming means.**

And that change favors engineers who understand fundamentals: data structures, system design, failure modes, performance characteristics, security boundaries. The stuff that seemed "academic" when you could just look up the syntax.

The AI knows the syntax. The AI has read every Stack Overflow answer.

The AI doesn't know *your* system. The AI doesn't know what matters. The AI doesn't know what "working" means in your specific context.

That's still your job. And it's the job that was always hard.

## The Opportunity

I'm not pessimistic about this shift. I'm energized by it.

For years, programming has been bottlenecked by implementation details. Brilliant system designs never got built because typing the code took too long. Creative ideas died in the gap between conception and execution.

AI closes that gap. But it doesn't eliminate the need for conception. It amplifies it.

The engineers who will thrive are the ones who can:
1. Think clearly about systems
2. Specify precisely what they want
3. Evaluate critically what they get
4. Iterate rapidly toward correctness

These are engineering skills. They always were. We just used to practice them while typing semicolons.

Now we practice them directly.

---

*The spec isn't free. But for engineers who understand what they're building, the spec is finally enough.*

---

*What's your experience with AI-assisted development? I'm curious whether you're finding that it requires more engineering judgment or less. Find me on [X](https://x.com/hugomn) or [LinkedIn](https://linkedin.com/in/hugomn).*

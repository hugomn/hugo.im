---
author: Hugo Nogueira
pubDatetime: 2026-05-30T18:00:00.000Z
title: "What 639,000 Execution Steps Taught Me About How AI Agents Really Fail"
locale: en
postSlug: mast-production-agent-failures
featured: true
draft: false
tags:
  - ai-agents
  - autonomous-systems
  - llm-evaluation
  - observability
  - methodology
  - engineering
description: "I applied the MAST failure taxonomy to 639,000 execution steps from AI agents running in production for five months. My first headline finding turned out to be an infrastructure bug masquerading as agent behavior. This post is about what agents actually fail at in production, and the discipline it takes to not fool yourself with production data."
keywords: Hugo Nogueira, AI agents, MAST taxonomy, agent failures, production telemetry, LLM evaluation, observability, LLM judge, Cohen's kappa, autonomous agents, failure analysis
image: "/images/blog/mast-production-agent-failures.jpg"
---

There's a lot of research on why multi-agent LLM systems fail. Almost all of it studies *benchmark tasks*, agents solving puzzles in a test harness. I got to ask a different question: what happens when agents run in **production**, doing real work, for months?

I had access to **639,381 execution steps** across **23,624 runs** on a closed-alpha autonomous-agent platform, over five months of continuous operation, spanning all of its workspaces. I applied the **MAST taxonomy** (the Multi-Agent System Failure Taxonomy from [Cemri et al. 2025](https://arxiv.org/abs/2503.13657), 14 failure modes across 3 categories) to that telemetry, and the picture that came back was different from the benchmark literature in ways I didn't expect.

(A note on scope: this is platform-wide telemetry from a closed alpha, not one team's agents. Everything below is aggregate, meaning counts, rates and distributions, with no trajectory text, no identifiers, and no per-workspace breakdowns.)

The code and aggregate results are public: **[github.com/hugomn/mast-taxonomy-production-telemetry](https://github.com/hugomn/mast-taxonomy-production-telemetry)**. The raw telemetry isn't (it's real production data), but every number below is reproducible from what's there.

This post is as much about the *method* as the findings, because the most important thing I learned was how easy it is to fool yourself with production data, and what it takes not to.

## The finding I almost published was wrong

Here's the part I'm least proud of and most glad I caught.

My first pass had a clear headline: **termination failures dominate**. About 21% of the runs I sampled ended with the agent finishing its work and then the *terminal step hanging*, the run never cleanly closing. It was the single most common failure mode. It was a great story: "agents are good at thinking, bad at stopping."

It was also an infrastructure bug.

When I plotted those hangs over time instead of treating them as a flat rate, the truth was obvious. **88% of all the hangs fell into a single two-week window.** Before it: almost none. After it: almost none. And in that window, the hang hit *15 different agents simultaneously*. That is not what agent behavior looks like. Agent behavior is spread across time and concentrated in a few badly-behaved agents. What I was looking at is what a **bug introduced and then fixed** looks like: everyone breaks at once, then everyone recovers.

The contaminated failure rate was 8.6%. Cleaned, it was **3.4%**. My headline finding was 2.5× inflated by a platform bug I'd have happily published as an insight about agent cognition.

## The discipline that catches this

The reason I caught it is a rule I'd make load-bearing for anyone doing this kind of analysis: **a production failure rate is meaningless until you've separated platform bugs from agent behavior.**

The signature of an infrastructure bug has three parts, and you need all three, because any one alone will fool you:

1. **Time-clustering.** Failures concentrated in a window, not spread evenly.
2. **Multi-agent simultaneity.** Many distinct agents failing at once.
3. **Volume.** Enough to matter.

The trap is #1 alone. A tool used heavily by *one* agent for *one* week also looks "clustered", but that's real behavior, not a bug. I found exactly this: one tool had 70% of its failures in a single week, which screams "outage" until you notice all of them came from a *single agent* working on a single project. Concentration without multi-agent spread is behavior, not infrastructure.

I built a small detector for this signature and ran it across every failing tool. It flagged the real bug unambiguously and correctly *cleared* the single-agent storms. That detector is in the repo.

And here's the part that matters for honesty: it also flagged some *weaker* candidates, a few clusters that were ambiguous, partly multi-agent and partly single-agent retry storms. The tempting move is to keep excluding windows until the data looks pristine. I didn't. I excluded exactly **one** window (the unambiguous one) and *documented but kept* the rest, then ran a sensitivity check showing the headline doesn't change whether I exclude them or not. **Over-cleaning is its own form of dishonesty.** You can make any dataset tell a flattering story by deleting the inconvenient parts. The defense is to exclude only what you can prove, and to show your result survives the judgment calls you didn't make.

## What agents actually fail at (the real finding)

With the bug removed, the honest picture:

**~83% of production runs are failure-free.** Of the rest, the leading failure modes are:

- **Task incompleteness.** The agent doesn't fully finish what it set out to do.
- **Verification gaps.** The agent marks work "done" or "verified" without actually checking it, often falling back on stale data after a tool error. These are the dangerous ones, because the run *looks successful*. No error fires. A dashboard sees green.

What's striking is what's *absent*. The MAST paper, studying benchmark multi-agent systems, found inter-agent miscommunication prominent: agents talking past each other, withholding information, derailing each other. In this production data, those modes are **nearly nonexistent**. Partly that's structural, since this platform's runs are mostly *single-agent-per-cycle*, so there's little agent-to-agent surface for those failures to occur on. But that itself is a finding: **a deployed system's topology reshapes its failure distribution.** The failures you read about in benchmark papers may not be the failures you'll actually have.

When I isolated the runs that *did* involve genuine agent-to-agent calls, the inter-agent failure modes did roughly double, confirming the modes are real, just rare, and only present where the coordination actually happens.

## Two more things the data said

**The platform got more reliable as it scaled.** Failure rate fell from ~14% in February and March to **0.4% in May**, while monthly run volume grew roughly **4×**. More work, fewer failures. That's the kind of trend you can only see with longitudinal production data, and it's quietly the most encouraging thing in the whole analysis.

**Failures waste effort, not money.** I'd assumed failing runs would be expensive, with agents spinning and burning tokens. The data said otherwise: failing runs cost about the *same per run* as clean ones, despite using **2.4× the steps**. They fail on cheap tool calls, not expensive model calls. The cost of unreliability isn't the bill; it's the wasted work and the unfinished outcome.

## On using an LLM to grade an LLM

I classified runs with an LLM-judge, a model reading each trajectory and assigning a MAST mode. This is increasingly common and increasingly dangerous, because an LLM judge is an *opinion*, and a confident one. The only honest way to use it is to **measure how much you can trust it.**

So I hand-labeled a gold set myself and checked the judge against it: **Cohen's kappa of 0.797** on whether a run failed at all, which is "substantial agreement," not perfect. And the disagreements were informative: the judge systematically over-used one termination mode, and occasionally flagged a clean run as failed. I report that, because a judge's *bias* is exactly the thing a reader needs to discount. A validated kappa is a fact; an unvalidated "the LLM said so" is a vibe.

## Why this matters if you ship agents

The practical takeaway: **the failures that hurt you are the ones your tooling can't see.** Cost dashboards, latency graphs, error rates: they all show green on the run where the agent confidently marked a task complete using stale data. Failure-mode *semantics*, not spans and not tokens, is the missing layer. None of the major agent-observability tools ship it. After doing this analysis, I think that's the gap worth building into.

But the deeper lesson is the boring one: **production data lies to you unless you make it prove itself.** In-sample numbers, unvalidated judges, uncleaned bug windows, over-cleaned datasets. Every one of these will hand you an impressive, wrong answer. The whole value of this exercise wasn't the failure distribution. It was building something I'd actually trust.

---

*Taxonomy and benchmark dataset: Cemri et al. 2025 ([arXiv:2503.13657](https://arxiv.org/abs/2503.13657)). Code and aggregate results: [github.com/hugomn/mast-taxonomy-production-telemetry](https://github.com/hugomn/mast-taxonomy-production-telemetry).*

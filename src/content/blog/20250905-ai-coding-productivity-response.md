---
author: Hugo Nogueira
pubDatetime: 2025-09-05T14:00:00.000Z
title: "Where's the Shovelware? Right Here. Why AI Coding Works (If You Know How to Use It)"
locale: en
postSlug: ai-coding-productivity-response
featured: true
draft: false
tags:
  - ai
  - productivity
  - engineering
  - coding
description: Real data showing 1082% productivity gains with AI coding tools. GitHub metrics, workflow diagrams, and evidence-based response to AI coding skeptics with 146,000 lines shipped in 4 months.
---

I read [Mike Judge's viral piece](https://substack.com/inbox/post/172538377) "Where's the Shovelware? Why AI Coding Claims Don't Add Up," and I respect his skepticism. He's right to be frustrated at overblown marketing claims and the human cost of premature "AI efficiency" layoffs. His questions about measurable productivity gains deserve serious answers, not more hype.

But I've lived a different reality, and my story tells a compelling narrative (at least for me).

## Methods: How I Measured the Change

Before diving into results, here's how I tracked productivity:

**Tools Used:** Primarily Claude Code (Anthropic's official CLI), supplemented with GitHub Copilot for certain tasks. I started heavy usage on April 15, 2025.

**Measurement Approach:**
- GitHub commit frequency and complexity (via GraphQL API)
- Lines of production code shipped (measured via git statistics)
- Project completion rates (ideas to shipped products)
- Time from concept to working MVP

**Data Source:** All metrics pulled from my personal GitHub activity, spanning January 2024 through September 2025. The "before AI" period covers 15 months; "AI era" covers 4.5 months.

**Confounding Variables Acknowledged:** Vacation time for focused development, existing domain knowledge in fitness tracking, personal motivation for projects. However, productivity gains persist across all development activities, not just personal projects.

## The Numbers Don't Lie: My AI Revolution

Since April 2025, using primarily Claude Code, I've shipped:

**Personal Fitness Tracker** (April 2025): A private mobile app to replace the Google spreadsheet my family and friends used for our fitness challenges. Something I'd never justify spending weeks building just for our small group, but AI made it feasible (and fun!) to create in a few vacation days. **67,000 lines** of production TypeScript code with React Native and Supabase.

**Internal Risk Scanning Tool** (August 2025): An enterprise-grade internal risk scanning tool for Complyance (my current company) that sat in our backlog for months due to resource constraints. I built the first working version in **3 days**. **79,000 lines** of core TypeScript across backend services and frontend.

**Total output: 146,000 lines of production TypeScript in 4 months. More than I wrote in the past 2 years combined.**

I know what you're thinking: "Lines of code aren't productivity." You're absolutely right. But these lines aren't bloat. They represent scope: complete applications with authentication, data layers, API endpoints, and polished UIs. Not toy projects, not boilerplate. Real systems solving real problems.

But raw numbers only tell part of the story. The real transformation shows in my GitHub commit data:

These aren't tutorials or portfolio projects. My fitness tracker is actively used by my family and friends who love finally having a proper app instead of an Excel spreadsheet. The internal tool is solving real business problems that would have taken a full team months to address.

Here's the context: I'm a CPTO. For the past 10 years, my days have been filled with product strategy, team management, and stakeholder meetings. Coding became my "side gig," something I did to stay technically sharp and connected to my career. My frontend skills are still solid (I've always been an avid React developer, meetup speaker, core-team fan, etc.), but finding time to build complete projects? Nearly impossible.

Let me acknowledge the obvious: I'm privileged here. I have years of experience, strong product vision from using our fitness spreadsheet for ages, and the motivation of scratching my own itch. Not everyone starts with these advantages.

But that's exactly the point. If AI can give someone like me, already swamped with CPTO responsibilities, this kind of productivity lift in my limited coding time, imagine what it can do for motivated full-time builders with fewer constraints.

Before AI, I was forever stuck on the "someday I'll build that idea" treadmill. Not because I lacked skills, but because I lacked time for the tedious setup, boilerplate, and Stack Overflow rabbit holes that turn a 3-day project into a 3-month odyssey.

## 1. "Developers think they're faster, but they're actually slower"

This conclusion comes from controlled studies measuring narrow tasks, typically having developers write isolated functions under laboratory conditions. But real software development isn't lab work.

### The Research Context

Judge cites studies showing developers are 21% slower with AI assistance. However, these studies suffer from what researchers call "task decomposition bias." They measure individual functions rather than system-level productivity. A [2024 GitHub study](https://github.blog/news-insights/research/survey-ai-wave-grows/) of 95,000 developers found that while individual code completion might show mixed results, developers using Copilot completed pull requests 55% faster and were more likely to stay in flow state.

### The Real-World Difference

**System Building vs. Function Writing:** His study metrics miss the forest for the trees. I'm not just writing functions faster. I'm architecting entire systems faster. When I built the fitness app, AI helped me design the data structure, implement the backend APIs, create the React Native components, set up push notifications, and build custom charting all simultaneously. No study captures this compound acceleration.

**Unblocking Speed:** The 21% slowdown he measured likely reflects developers learning to use AI effectively. But once you hit the optimization curve, the gains are exponential. I spend zero time on Stack Overflow now. Zero time stuck on "how do I implement this pattern?". AI eliminates cognitive friction entirely.

**Quality Through Iteration:** AI lets me iterate faster than humanly possible. I can try 5 different approaches to a complex feature in the time it used to take me to implement 1. The final result isn't just faster to build. It's better designed.

**The Cost of Mistakes:** Yes, AI suggests wrong code sometimes. But here's what critics miss: catching and fixing AI errors is still faster than writing everything from scratch. My testing cycle is actually tighter now because I can afford to be more thorough. Every feature gets unit tests, integration tests, and manual verification because I don't waste my time writing boilerplate.

**The Learning Curve Factor:** Most productivity studies measure developers in their first weeks with AI tools. Research on technology adoption shows productivity gains follow an S-curve. There's initial learning overhead, then exponential improvement. Judge's cited studies likely captured developers still climbing the learning curve, not those who've reached optimization.

<div style="margin: 2rem 0;">

![Hugo's AI-Powered Development Transformation](/images/ai-productivity-analysis.png)

</div>

The chart above shows my GitHub activity from the moment I started using Claude Code heavily. The transformation is undeniable: **1,082% increase in monthly commits**, peak productivity of 80 commits in a single day, and a fundamental shift from having multiple unfinished "pet projects" to actually being someone who can deliver something usable in their spare time, with 100% project completion rate.

## 2. "Where's the shovelware flood?"

Judge's reasoning makes intuitive sense. If AI truly creates 10x developers, wouldn't we see an explosion of new software? It's a fair question that deserves a data-driven response. Here are my 2 cents:

### Why His Charts Miss the Real Revolution

**Enterprise & Internal Software:** Most AI-accelerated development happens behind corporate firewalls. My August scanning tool isn't going on GitHub. It's solving real business problems for compliance teams. Multiply that by thousands of companies where developers are now shipping internal tools that were previously "too expensive" to build.

**Quality over Quantity:** AI doesn't just enable more apps. It enables better apps. Instead of 10 mediocre projects, I'm building production-grade applications with features I never would have attempted before. Like the custom SVG charting library in my fitness tracker. After evaluating 4 major charting libraries, AI gave me the confidence to build exactly what I needed from scratch.

**The Hidden Revolution in Private Code:** Beyond the measurable metrics, there's a whole ecosystem of AI-assisted development happening that we'll never see in commit logs or app stores. Here are a few examples that illustrate this broader trend:
- A friend finally used Claude Code to create complex Home Assistant dashboards in minutes that would normally take days
- Another friend's wife, not even a developer, built two private apps with Cursor and automated chunks of her workflow
- A colleague at a Fortune 500 told me their team is shipping internal tools weekly that sat in backlog for years
- My neighbor, a data analyst, is now writing Python scripts to automate reports that used to take him hours

These examples aren't proof of the productivity gains I've documented. They're illustrations of a much larger phenomenon. We can't count the code being generated privately and inside organizations, but these invisible productivity gains are transforming how people work in ways that won't show up in Judge's charts.

### The Measurement Problems Nobody Talks About

**Individual Developer Transformation:** Judge's macro metrics can't capture personal productivity leaps. In 4 months, I shipped more production code than I had in the previous 2 years combined. That's not visible in aggregate app store numbers.

**Confounding Variables in Measurement:** My productivity explosion coincided with using AI, but was it purely the tools? Fair question. I also had:
- Dedicated project time during vacation
- Clear product vision from years of using our shared spreadsheet
- Motivated personal investment in fitness tracking (I've been on a total transformation journey these past two years, achieving results I never had before. But that's a story for another post)

However, the GitHub data shows the pattern extends beyond these projects. The productivity boost persists across all code generation activities, not just personal projects. The tools fundamentally changed how I approach development.

**Speed to MVP:** Time from idea to working prototype collapsed from weeks to days. My fitness tracker went from "provisional spreadsheet full of poorly-made macros" to "mobile app my friends actually use" during a few vacation days. That acceleration isn't reflected in final app counts.

**The Methodology Problem:** Judge's analysis assumes uniform developer skill and consistent project complexity over time. But real productivity gains often come from tackling harder problems faster. My commit data shows not just more frequency, but more ambitious feature development per commit.

**Enterprise Velocity:** Internal tools that sat in backlogs for months are now getting built in days. These don't appear in public repositories or app stores, but they're transforming business operations.


## 3. "Marketing claims are hype"

Judge is absolutely right about this. The marketing claims are often absurd, and companies using "AI efficiency" to justify layoffs deserve criticism. But we shouldn't let marketing failures blind us to genuine technological capability. 

### What Marketing Gets Wrong (And Right)

#### Separating Hype from Reality

**The Marketing Problem:** Companies promising "10x developers" overnight set impossible expectations. Real AI productivity gains come from compound improvements across the entire development lifecycle, not magical code generation.

**What Actually Works:** AI shines in eliminating cognitive friction. The mental overhead of remembering syntax, looking up documentation, and debugging common patterns disappears. It's not replacing human judgment; it's amplifying human creativity.

**Quality Evidence:** In the fitness app, AI didn't just help me write more code. It helped me write better code. My custom SVG charting library is cleaner and more maintainable than if I'd rushed to integrate a heavy third-party solution. AI gave me the patience and speed to do things right the first time.


## 4. "If there were 10x engineers, we'd see proof in the charts"

Not necessarily. Productivity doesn't always show up in raw output of public shovelware. Instead, it shows up as:

- Personal projects finally becoming reality (my case).
- Internal accelerations (projects that would never have been greenlit are now feasible).
- Developers spending more time on product/design thinking rather than low-value boilerplate.

That last point is crucial. AI is shifting the definition of what it means to "be productive."


## The Future of Development Work

<div style="margin: 2rem 0;">

![How AI Transforms Developer Time Allocation](/images/developer-time-allocation.png)

*My hypothesis on how AI transforms developer time allocation, based on my experience and observations of the evolving development landscape.*

</div>

### My Vision of the AI-Empowered Developer

The future isn't about drowning the world in half-baked clones. It's about shifting developer time toward higher-leverage work:

- Writing better PRDs and product definitions.
- Shaping cleaner task lists and system designs.
- Reviewing, refining, and maintaining code at a strategic level, while AI handles the scaffolding and repetition.

I don't just code more. I build more.


## The Challenge: Prove Me Wrong (Or Right)

Here's what I challenge any skeptic to do:

1. **Track your current performance**: Document your current productivity for 2 weeks. Commits, features shipped, time to completion.
2. **Learn AI tools properly**: Don't just use ChatGPT for debugging. Master a proper AI coding environment like Claude Code, Cursor, or GitHub Copilot.
3. **Give it 4 weeks**: Past the learning curve, into the optimization zone.
4. **Measure again**: Same metrics, same type of projects.

This is one dataset: mine. I'm sharing it not as universal proof, but as an invitation. The real challenge now is for more developers to run similar experiments and share their results. Whether you see gains or not, document it. The revolution happens when we build a shared body of evidence, not when we argue from anecdotes.

## The Bottom Line

If you don't see gains right away, that may say more about where you are on the adoption curve than about the tools themselves. Like any technology shift, there's a learning period. The absence of a shovelware flood doesn't disprove productivity. It just means the future isn't distributed evenly yet.

This isn't the first time we've seen this pattern. When calculators arrived, mathematicians worried about losing mental arithmetic skills. When IDEs introduced autocomplete, purists claimed real programmers typed everything. When Stack Overflow launched, veterans scoffed at copy-paste coding. Each tool faced skepticism, then became indispensable.

We're at the start of a transformation. Someday soon, we'll look back at 2025 and laugh at the idea that AI coding "didn't work." For those of us already harnessing it, the revolution is here.

## What Comes Next: My AI Coding Playbook

<div style="margin: 2rem 0;">

![My AI-Powered Development Workflow](/images/ai-workflow-diagram.png)

</div>

This post is just the beginning. The workflow above shows exactly how I systematically transform ideas into shipped code. Over the next weeks, I'll dive deep into each step:

- How to brainstorm and shape problems with GPT-5 for maximum clarity
- Writing definition documents that become the source of truth
- Auto-generating PRDs that AI can actually execute on
- Creating atomic task lists where one checkbox = one commit
- Keeping AI context-aware through the entire development cycle

This is my experience so far. I'm still learning and discovering new ways to work with AI every day. Not every journey will be the same, but I hope sharing my data and methods helps you find your own path with these tools.
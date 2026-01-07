---
author: Hugo Nogueira
pubDatetime: 2025-06-28T15:30:00.000Z
title: "Why I stopped estimating: a data-driven case against software predictions"
locale: en
postSlug: why-i-stopped-estimating
featured: false
draft: false
tags:
  - software-development
  - agile
  - project-management
  - estimation
  - productivity
  - engineering-leadership
  - no-estimates
description: A data-driven analysis of why software estimation doesn't work and what to do instead. Based on research, industry reports, and real-world experience with the no-estimates movement.
keywords: software estimation, no estimates, agile development, project management, software productivity, Ron Jeffries, development methodology
image: "/assets/no-estimates.jpg"
---

_How we increased feature delivery by 40% and saved our sanity_

"The India release is shipping tomorrow."

Those four words used to trigger a specific kind of dread at Complyance. It meant the next 24 hours would be chaotic, rushed code reviews, and that familiar sick feeling of pushing something we knew wasn't quite ready.

We'd been through this nine times already. Alpha through India, following the aviation alphabet. Six-week releases, carefully estimated features, promises made to enterprise clients based on those estimates.

Every. Single. Release. The same pattern:

- Week 1-2: "We've got plenty of time"
- Week 3-4: "Getting a bit tight but manageable"
- Week 5: "We need to cut some features"
- Week 6: "All hands on deck, we promised this to the client"

After the India release, we did something radical: we completely threw out the entire system.

No more releases. No more estimates. No more promises based on guesses.

The result? Feature delivery increased by 40%. Team morale completely changed. And paradoxically, our clients became happier even though we stopped giving them dates.

This is the story of how we learned what the research has been telling us for decades. And why most teams are still getting it wrong.

## The trillion-dollar estimation problem

The [Standish Group's CHAOS Report](https://www.infoq.com/articles/standish-chaos-2015/), which studied over 50,000 projects, found that only 29% of IT projects succeed (on time, on budget, with satisfactory results), while 19% are complete failures and 52% are challenged. The rest land somewhere in between. The total cost of project failures? [An estimated $260 billion annually in the US alone](https://www.runn.io/blog/it-project-management-statistics), according to multiple industry analyses.

More telling: multiple industry studies consistently show that software estimates are typically wrong by a factor of 2-4x, and this hasn't improved in decades despite better tools and methodologies.

What my experience in this industry has taught me? **We're not bad at estimating. We're trying to estimate the fundamentally unestimatable.**

## The physics of software development

Software development violates the laws that make estimation work in other fields:

### 1. The observer effect

The moment you estimate a task, you change it. Teams unconsciously adjust their work to fit the estimate - rushing when they're "behind," gold-plating when they're "ahead." This is known as [Parkinson's Law](https://en.wikipedia.org/wiki/Parkinson%27s_law): work expands to fill the time available for its completion. The estimate becomes the reality.

### 2. The cone of uncertainty is a lie

The famous ["Cone of Uncertainty"](https://en.wikipedia.org/wiki/Cone_of_uncertainty) suggests estimates get better over time. But research shows that in modern software development, uncertainty often increases as you learn more. Why? Because good software development is about discovering what you should build, not just building what you originally planned.

At Complyance, we lived this reality for 54 weeks across nine releases. Every "simple 2-week enhancement" had a hidden iceberg beneath it. The India release alone had three features that were estimated at one week each. Final delivery time? Five weeks, two weeks, and three days respectively.

But here's the kicker: we always made it work. Not because our estimates got better, but because we're smart engineers who would do whatever it took. Including those Red Bull-fueled weekends and all-nighters to meet the arbitrary deadline we'd set for ourselves.

The estimate wasn't predicting the work. The work was conforming to the estimate, at tremendous human cost.

### 3. The complexity cascade

Software complexity follows a [power law distribution](https://en.wikipedia.org/wiki/Power_law). Most changes are trivial, some are moderate, but a small percentage are exponentially complex. The problem? You can't tell which is which until you're halfway through. This pattern is well-documented across multiple software projects and codebases.

Across our nine releases, we saw this pattern repeatedly: "simple" tasks that revealed fundamental architecture problems, and "complex" features that turned out to be straightforward thanks to existing libraries or approaches we discovered during implementation.

After nine releases, our estimation accuracy wasn't improving. Why? Because each release simply taught us more about what we didn't know.

## The hidden costs nobody talks about

Let's do the math on what estimation actually costs:

**Direct costs (based on industry research and our own tracking):**

- Sprint planning with estimation: 4 hours/sprint × 26 sprints = 104 hours/year per person
- Backlog refinement and estimation: 2-3 hours/week × 50 weeks = 100-150 hours/year per person
- Re-estimation and adjustment meetings: ~50 hours/year per person
- **Total: 250-300 hours/year per developer = 6-7.5 weeks of lost development time**

**Indirect costs (harder to measure but more damaging):**

- Context switching from estimation meetings
- Morale impact of "missing" estimates
- Political games around padding estimates
- Innovation suppression (avoiding work that's hard to estimate)

At an average developer salary of $130,000/year, that's 6.3 weeks × 10 developers = 63 weeks of lost productivity annually. **That's more than a full developer-year of capacity lost to estimation overhead alone.**

## The transformation: what actually works

After India, we made the switch. Here's exactly what we do now at Complyance—and what the data shows about why it works:

### 1. From releases to continuous flow

**Before (Alpha through India):** 6-week releases, feature batching, estimation poker, release planning sessions, last-week crisis mode

**After:** Continuous deployment, one weekly refinement call (our only remaining meeting from a long list), daily shipping

The psychological shift was immediate. No more "week 1 chill" followed by "week 6 panic." Just steady, sustainable progress. Our velocity actually became predictable—not through estimates, but through consistent flow.

### 2. Thin slices instead of big batches

Instead of estimating a "complete feature" and batching it for a release, we ship increments:

- Monday: Basic functionality that works for one use case
- Wednesday: Edge cases handled based on what we learned
- Friday: Performance optimized where it matters
- Next week: Enhanced based on actual usage data

Our clients now see progress daily instead of every 6 weeks. They can start using features immediately. And we can pivot based on real feedback, not imagined requirements.

### 3. Fixed time, variable scope

We commit to time boxes, not feature lists:

- "We'll work on search improvements for 2 weeks"
- "The team will focus on performance until the metrics improve by 20%"
- "We have 1 month to make onboarding delightful"

This flips the entire conversation. Instead of "When will X be done?" it becomes "What's the most value we can deliver by Y date?"

### 4. Probabilistic forecasting when necessary

When we absolutely must provide forecasts (for regulatory compliance, major contracts, etc.), we use probabilistic forecasting based on actual cycle time data:

- Track how long work items actually take (not estimates, actual data)
- Run statistical projections based on historical throughput
- Provide confidence intervals: "Based on our current pace, likely 10-15 features by Q3"

This is both more honest and more accurate than traditional estimation.

## The results: more than just numbers

After ditching releases and estimates:

The numbers:

- 40% increase in features shipped
- 60% reduction in bugs (no more rushed week-6 code)
- 90% reduction in meetings (from planning poker, release planning, estimation sessions to just one weekly refinement)
- Zero all-nighters in the past year (we used to have 9)

The human stuff:

- No more release anxiety cycles
- Engineers actually take vacations without timing them around releases
- Clients happier despite no promised dates (they see constant progress)
- Team morale at an all-time high

The most telling metric? We haven't had a single "crisis mode" since dropping estimates. Not one.

### 5. The investment mindset

We treat development like a venture capitalist treats startups:

- Small initial investments
- Double down on what's working
- Kill what isn't
- Portfolio approach to risk

No VC asks a startup "How many days will it take to achieve product-market fit?" They invest in stages and adjust based on results.

## The counterarguments (and why they're wrong)

**"But we need predictability for business planning!"**

You're getting false predictability now. Industry analysis consistently shows that traditional estimates are wrong by 100-200% on average. Weather forecasts are more accurate at 7 days than most software estimates at 7 days.

Real predictability comes from consistent delivery of value, not accurate guesses about the future.

**"How do we choose between projects without estimates?"**

[Cost of Delay](https://blackswanfarming.com/cost-of-delay/). Instead of asking "How long?" ask "How much does waiting cost?" A rough calculation of value/week lost beats a precise estimate of development time every time.

**"Our contracts require fixed-scope, fixed-time commitments!"**

We faced this at Complyance. Several enterprise clients had roadmap commitments based on our 6-week release promises. Here's how we handled the transition:

1. Showed them our actual delivery data (promises vs. reality over 9 releases)
2. Offered a better deal: continuous delivery with ability to change priorities anytime
3. Guaranteed throughput (features per month) instead of specific features by specific dates

Result? The transition went smoother than expected, with clients adapting well to the continuous delivery approach.

If that doesn't work, consider: The [UK government saved £800 million](https://www.gov.uk/government/publications/government-digital-strategy) by moving to agile contracts. If government procurement can evolve, so can yours.

**"This would never work in regulated industries!"**

This is actually where continuous delivery shines. Regulators care about outcomes and risk management, not your story points. In fact, continuous delivery often improves compliance by reducing batch sizes and increasing traceability. Smaller, more frequent releases are easier to audit and roll back if needed.

## The #NoEstimates movement was right all along

[Allen Holub](https://holub.com/noestimates-an-introduction/), one of the leading voices in the #NoEstimates movement, puts it bluntly: "Estimates are waste. Not only are they not necessary, but they introduce dysfunction into the team."

At Complyance, we lived this dysfunction for 54 weeks. Every estimate became a commitment. Every commitment became a crisis. Every crisis eroded trust.

[Ron Jeffries](https://ronjeffries.com/), Agile Manifesto signatory, puts it even more directly in his [analysis of estimation](https://ronjeffries.com/articles/019-01ff/estim-twitter/):

> "Backlog item estimates are unnecessary for effective Agile development. As they are unnecessary, they should be eliminated until shown to be necessary."

But here's where both Holub and our experience go further: Even with perfect psychological safety and no deadline pressure, estimates are waste. They're answering the wrong question.

The right question isn't "How long will this take?" It's "What should we work on next to deliver the most value?"

As Holub says: "Planning happens constantly. Your projections change every time you complete a story." That's exactly what we discovered—real predictability comes from measuring what we actually deliver, not guessing what we might deliver.

## Your 30-day no-estimates challenge

_Inspired by the [#NoEstimates movement](https://www.infoq.com/articles/noestimates-monte-carlo/)_

Still skeptical? Try this:

1. **Week 1-2:** Track everything but don't estimate. Just build and measure.
2. **Week 3:** Share daily what you completed, not what you planned.
3. **Week 4:** Forecast using your actual data, not guesses.
4. **Week 5:** Compare results to your last estimated sprint.

Teams that embrace this approach report the same pattern: less time talking about work, more time doing work, happier developers, and—surprisingly—happier stakeholders.

## The bottom line: a new mental model

Here's the fundamental shift: Software development is not construction. It's discovery.

When you build a house, you know what you're building. The unknowns are minimal. Estimation works.

When you develop software, you're discovering:

- What users actually need (versus what they say they want)
- What technical approaches work (versus what seemed good in theory)
- What the real constraints are (versus what you assumed)

You can't estimate discovery any more than Columbus could estimate how long it would take to "reach India." He was solving the wrong problem entirely.

The companies succeeding today—from Spotify to Amazon to Netflix—don't estimate better. They've built systems that make estimation irrelevant. They ship continuously, measure constantly, and pivot quickly.

The question isn't "How can we estimate better?"

It's "How can we build systems where estimation doesn't matter?"

Stop estimating. Start shipping. Your users are waiting.

---

_What's your experience with estimation? Have you tried working without estimates? Share your story in the comments or [reach out directly](/contact). I respond to every message._

## Further reading

- [The NoEstimates Movement](https://www.infoq.com/articles/noestimates-monte-carlo/) - Comprehensive overview
- [Vasco Duarte's NoEstimates Book](http://noestimatesbook.com/) - Deep dive into the practice
- [Allen Holub on Why Estimates Are Evil](https://www.youtube.com/watch?v=QVBlnCTu9Ms) - Excellent conference talk
- [Standish Group CHAOS Report 2015 Analysis](https://www.infoq.com/articles/standish-chaos-2015/) - Latest publicly available statistics
- [CHAOS Report Commentary](https://hennyportman.wordpress.com/2021/01/06/review-standish-group-chaos-2020-beyond-infinity/) - Analysis of the 2020 report

---

_Header photo by [Josh A. D.](https://unsplash.com/@mista_j) on [Unsplash](https://unsplash.com/photos/a-person-holding-a-tape-measure-in-their-hand-wTtBtw80erg)_

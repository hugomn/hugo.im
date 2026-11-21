---
author: Hugo Nogueira
pubDatetime: 2026-11-21T10:00:00.000Z
title: "Writing Code by Hand Is Over. We Just Don't Want to Admit It."
locale: en
postSlug: writing-code-by-hand-is-over
featured: true
draft: false
tags:
  - ai-agents
  - engineering
  - leadership
  - future-of-software
description: "A hot take. Hand-written software is done, and we just don't want to admit it yet. What is left for engineers is steering and signing, and in ten years we will buy software the way we buy bread: cheaply, from small shops we trust."
keywords: Hugo Nogueira, software bakeries, future of software engineering, AI agents, coding agents, software factory, code review, SaaS pricing, software moats, agent security, compliance
image: /images/blog/software-bakeries.jpg
imageAlt: "A round loaf of sourdough on a wooden board, seen from above, with curly braces scored into the crust"
---

This is a hot take, and I am very sure about it. Hand-written software is done. The latest models, inside a good harness, have already shown that we will not be writing software by hand any more. Typing code yourself is becoming artisanal, something people do for the love of it, the way some people still knead their own dough. Most of our industry does not want to admit it yet, and I still see a lot of resistance. I think it is only a matter of time.

Two things follow from that, and they are the rest of this post: what is left for engineers to do, and why I think that in ten years we will buy software the way we buy bread.

## We just don't want to admit it

The people saying it out loud are the ones I expected to say it last. Ryan Dahl, who created Node.js, [wrote in January](https://x.com/rough__sea/status/2013280952370573666) that "the era of humans writing code is over. Disturbing for those of us who identify as SWEs, but no less true." DHH, who built a career on the joy of writing beautiful code, said in July 2025 that he did not let AI drive his code. This October he [wrote](https://world.hey.com/dhh/over-my-dead-pencil-fb0f3647) that "we're not going to write the vast majority of code by hand any longer." Stripe [merges more than 1,300 pull requests a week](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2) with no human-written code in them, each one reviewed by a person.

I measured my own share for this post. Over the last 90 days, at least 84% of the code I merged was written by coding agents. I compared every line I merged with the lines Claude Code and Codex wrote in the session logs on my machine, and the true share is probably higher, because the match misses lines a formatter reflowed afterwards. I only have logs for my own machine, so I am not going to guess a number for the team. At Complyance a review agent reads every pull request before a person does, and a person approves every merge. Nothing reaches production because an agent said it was fine, which is the separation of duties auditors have asked of software teams for years.

The resistance is real, and I understand where it comes from. Part of it is identity. Dahl's word was "disturbing", and for people who chose this career because they love writing code, it is. Part of it comes from serious engineers. Linus Torvalds [said in May](https://www.youtube.com/watch?v=fi29pfLcW4I) that "AI is great, but AI is not changing programming."

And part of it is a fair reaction to a weak harness. Everyone has the same models, and very few companies have built what goes around them. Stripe's agents run against more than three million tests and get at most two rounds of CI before a person looks. If your repository has thin tests and a review process built for five human changes a day, an agent's pull request arrives as two thousand lines you cannot trust, and in that company the skeptic is right. The harness can be built, though, and the companies that built it are not going back. That is why I call it a matter of time.

## Steering and signing

Software engineering used to have three parts: deciding what to build and how, writing it, and standing behind it. With the writing gone, I call the two parts that remain steering and signing.

Steering is everything before the code exists: what to build, for whom, and how. The model proposes most of the how. In my experience it gets something like 80% of the design decisions right, and the other 20% is where an experienced engineer changes the outcome, because they know which boundary will hurt in a year and what must never touch production data. Product-minded engineers and architects are doing well right now because this was already their work.

Signing is everything after: review, quality, security, and putting your name on the change so that you answer for it when it breaks. Machines will do most of the reading, as I argued in [Machines Read, Humans Sign](https://hugo.im/posts/code-review-in-one-year/). I expect the signature to stay human for as long as contracts, regulators and courts need a person to hold responsible, and I see no sign of that changing by 2036. Banks call this maker-checker: whoever makes a change can never be the one who approves it, and the agent is now the maker.

This is why I don't see agents as a reason to employ fewer people. Each product will need fewer hands, and there will be far more products. At Complyance we use agents to build more and ship at a higher quality than we could before, and every one of those changes still needs someone who can judge it.

## Nobody bakes their own bread

If writing software becomes nearly free, the popular conclusion is that everyone will build their own. A month ago I [posted](https://x.com/hugomn/status/2111735491959627893) what I think of that: everyone will build their own software, just like everyone bakes their own bread every morning.

Bread needs flour, water, salt and yeast, the recipe is public, and every kitchen has an oven. We even automated it. Around 2000, about [one in five American households](https://melmagazine.com/en-us/story/the-rise-and-fall-of-the-1990s-bread-machine) owned a bread machine, and a few years later the fad was over. Software asks more of you than bread does. A loaf is finished when it leaves the oven, while software has to be kept running, patched and defended every day after it ships, and very few people want to be on call for their own email. JA Westenberg made the convenience argument well in ["The bread paradox"](https://www.joanwestenberg.com/p/the-bread-paradox-why-convenience). I want to follow it one step further, to the shops.

## The software bakery

The fashionable phrase this year is "software factory": agents writing and reviewing code with nobody in the loop. I think that describes production correctly. Factories are what made bread cheap, too: an American worked [13 minutes for a pound of it in 1919 and 4 minutes in 1997](https://fraser.stlouisfed.org/files/docs/historical/frbdal/1997_frb_dallas.pdf). What the factory picture leaves out is who sells the result and why you buy from them.

By a software bakery I mean a small team that serves customers it knows well, keeps its software running every day and puts its name on the door. The team rents its ovens, meaning the models, the compute and the test harness, from much larger companies. Nobody in that shop writes code by hand, any more than a baker kneads every loaf by hand, and the craft is in knowing what to make and whether it is good enough to sell. Customers do not bake. When they need something special they ask at the counter, the way you order a cake: someone describes a change in the morning and, once the team has checked and signed it, it ships the same day.

The price of that software has two parts. The code part falls towards the cost of compute, so I expect to still pay for my email, my storage and my streaming in 2036, and to pay much less for each of them. The other part is trust, and it does not fall. Software copies for free, which bread never did, so generic software ends up like supermarket bread: nearly free, made by a few giants, good enough. Britain's large plant bakers already make [75% of the country's bread by value](https://fob.uk.com/about-the-bread-industry/industry-facts/uk-bread-market), and a product whose only defence is that it was hard to write is heading for that shelf. A bakery survives next to the supermarket for reasons that have little to do with the recipe. It is on the customer's street, which in software means distribution and community, and its customers know who made the bread and can walk back in if something is wrong with it.

That matters more as the stakes rise. No bank will buy its risk system from five strangers because it is cheap. In regulated software the price pays for a vendor who answers when something breaks, can show an auditor how every change was approved, and will still exist in five years. Cheap code makes that more valuable, since buyers suddenly have a hundred vendors to choose from and no way to tell them apart. It is the part of the business I chose to work on.

I also write small cheques as an angel, and I think venture capital will keep making money from software, in a different shape. It is already visible in the funding data. Through September, [8,625 American startups raised their first venture round](https://www.saastr.com/a-record-8625-startups-raised-their-first-venture-round-this-year-smaller-vcs-now-have-to-find-founders-before-they-found-anything/), more than in all of 2021, while rounds of $100M or more were about 5% of deals and 75% of the money. The large funds are paying for ovens and for the few vendors that enterprises will trust with their most sensitive work. Everyone else can now start a software business with far less capital than it used to take, and I expect many more engineers to own one. If anything here deserves to be called the democratisation of software, I think it is that. As a16z [put it](https://a16z.com/good-news-ai-will-eat-application-software/), "code is never where the value has lived."

## Cheap bread needed inspectors

When Londoners stopped baking and started buying, they judged bread on the one thing they could see, how white it was, and bakers whitened it with alum. Between 1851 and 1854 the physician Arthur Hassall bought loaves across London for The Lancet and [found alum in every one he tested](https://archive.org/details/b2135554x). The first law, in 1860, relied on customers to complain and to pay for their own analysis, and it changed very little. The [1875 Act](https://www.legislation.gov.uk/ukpga/Vict/38-39/63/enacted) made analysis by public analysts compulsory, and that is what changed the bread.

I think software is in its 1850s. Buyers judge it on what they can see, the features and the price. They cannot see which dependencies are inside, what permissions it holds, who approved the last change or where the keys live. Last month a [compromised release of LiteLLM](https://docs.litellm.ai/blog/security-incident-oct-21-2026) on PyPI and [swapped OVHcloud CLI binaries](https://www.stepsecurity.io/blog/ovhcloud-cli-github-release-swap-glassworm) on GitHub reached developers' machines through channels they had every reason to trust. Multiply the amount of software by a hundred, written by agents and sold by vendors nobody has heard of, and a security questionnaire is the 1860 law: it depends on the seller's own answers.

What fixed bread was routine, independent testing against a published standard, with the results made public. I expect software to get the same thing, and I expect it to be one of the largest businesses of the next decade, because every bakery will need it to be believed. The other large one is infrastructure, since every bakery also rents its ovens. I work on compliance and agent security, so I am biased. I chose the field because I believe this.

## What worries me

Experienced engineers will be fine, and many will be better off. I am less sure about people starting out. Employment of software developers aged 22 to 25 in US payroll data fell by nearly 20% between late 2022 and mid 2025 in a [Stanford study](https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-artificial-intelligence/), and nobody learns to steer and sign without having built things first. Bakers learn through apprenticeship. We will have to rebuild something like it on purpose, and I don't know yet who pays for it.

## A matter of time

None of that changes where this is going. If you are still deciding whether agents should write your code, my suggestion is to spend the time on the harness instead: the tests, the review and the controls that let you trust what they write. Then move your own work to the two ends, steering and signing. Hand-written code will stay with us the way home-baked bread has, as something people make because they enjoy it. For everything else, whether you are an engineer or you run a software company, the useful question now is what you sell that is not the code.

---

_I'm CPTO at Complyance, where we build AI agents for enterprise compliance, and an occasional angel investor. Find me on [LinkedIn](https://linkedin.com/in/hugomn) or [X](https://x.com/hugomn)._

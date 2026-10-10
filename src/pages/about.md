---
layout: ../layouts/Page.astro
title: "About"
slug: "about"
description: "Hugo Nogueira is CPTO at Complyance, where he built the agent infrastructure behind its compliance agents. He writes about AI agents in production and publishes open research on how they fail."
---

I'm CPTO at [Complyance](https://www.complyance.com), an AI-native governance, risk and compliance platform. I joined in 2022 as CTO and the first employee, and I lead product, engineering and design. Complyance is used by Fortune 500 enterprises, and in 2026 we raised a $20M Series A led by GV.

## What I work on

Most of my time goes into the systems that let AI agents do real compliance work inside our customers' environments. I built the agent runtime those agents run on, and a credential-isolation broker that gives each agent a narrow capability to call a customer's GitHub or AWS account instead of a key it could leak. Compliance is a demanding place to learn this. Our customers are security teams who read every architecture diagram, and an agent that is right most of the time does not pass their review.

That work shapes what I write here. The posts I care most about deal with how agents fail in production, how to give them access without giving them trust they have not earned, and what changes for product and engineering leadership when execution becomes cheap.

## Research

In my own time I run small, public experiments on agent reliability. [LHC](/posts/lhc-v02-long-horizon-coherence-benchmark/) is an open benchmark for long-horizon coherence in 8B-class models, published with a decision matrix locked before any model ran, and with a fine-tune of mine that did not beat its base model, which I reported as it was. I also applied the MAST failure taxonomy to [639,000 production agent steps](/posts/mast-production-agent-failures/) and published the code and aggregate results. Both live on the [Research](/projects/) page.

## Before Complyance

I have been building software for more than twenty years. In Brazil I co-founded meuingresso.com, a self-service ticketing platform that was acquired in 2018, and I wrote about [what those years taught me](/posts/my-first-exit/). After moving to Berlin I was a venture CTO at BCG Digital Ventures, where I helped build more than eight ventures, among them Tilda, a DiGA-certified digital therapy app, and Tenera, which applied machine learning to construction tendering in 2020. I also led engineering at a finleap SME-banking venture, which is where I first learned to build under BaFin regulation and KYC requirements. I studied Computer Science at UFV in Brazil.

## Elsewhere

I live in Berlin and write in English and Portuguese. I speak about agents in production at conferences and meetups, and I occasionally invest in technical founders; [Talks](/talks/) and [Investing](/investing/) have the details. If you are working on similar problems, I am always glad to compare notes at [hello@hugo.im](mailto:hello@hugo.im).

---
layout: ../layouts/Page.astro
title: "Research & Projects"
slug: "projects"
description: "Open benchmarks, datasets and code from Hugo Nogueira's work on AI agents in production, plus the companies and ventures he has helped build."
---

Most of what I learn about agents comes from running them in production, and when I can, I turn that into something other people can check and reuse. Everything below is public, with the methodology written down, including the parts that did not work.

## Open research

### LHC: a benchmark for long-horizon agent coherence (2026)

An open benchmark for whether 8B-class models keep track of state, commitments and half-finished work across long stretches of unrelated context. It has 24 hand-curated tasks across three failure modes, each run under four gap conditions, and a decision matrix that was locked before any model was scored. The release also includes a deterministic parser of about eighty lines of Python, which turned out to be a useful floor for structured-state tasks, and the full journal of a fine-tune that did not measurably beat its base model. I published that result rather than the model.

[Dataset on Hugging Face](https://huggingface.co/datasets/hugonogueira/lhc-v0.2) · [Code](https://github.com/hugomn/lhc) · [Parser baseline](https://github.com/hugomn/lhc-resume-state-parser) · [Write-up](/posts/lhc-v02-long-horizon-coherence-benchmark/)

### How agents fail in production: MAST on real telemetry (2026)

Most failure research studies benchmark tasks. I applied the MAST taxonomy to 639,381 execution steps across 23,624 runs on a closed-alpha agent platform over five months. The most useful result was methodological: my first headline finding was an infrastructure bug that looked like agent behaviour. The code and aggregate results are public, and every number in the write-up can be reproduced from them.

[Code and results](https://github.com/hugomn/mast-taxonomy-production-telemetry) · [Write-up](/posts/mast-production-agent-failures/)

## Production systems I write about

At Complyance I built the agent runtime our compliance agents run on, and a broker that lets them call customers' GitHub, AWS and other systems from a sandbox that never holds a credential. That code is not open source, so I write about the architecture in as much detail as I can:

- [A Capability, Not a Credential](/posts/capability-not-credential/), on credential isolation for agents that write and run code
- [The 100th Tool Call Problem](/posts/100th-tool-call-problem/), on durability for long-running agents
- [The agent harness](/posts/agent-harness-infrastructure/), on the system around the model

## Companies and ventures

- **Complyance** (2022 to today). First employee, now CPTO. An AI-native GRC platform used by Fortune 500 enterprises, with a Series A led by GV.
- **BCG Digital Ventures**. Venture CTO across more than eight ventures, including Tilda, a DiGA-certified digital therapy app, and Tenera, machine learning for construction tendering.
- **finleap**. Engineering lead for an SME-banking venture built under BaFin and KYC requirements.
- **meuingresso.com**. Co-founder. Self-service event ticketing in Brazil, acquired in 2018. [The story](/posts/my-first-exit/).

More code lives on [GitHub](https://github.com/hugomn).

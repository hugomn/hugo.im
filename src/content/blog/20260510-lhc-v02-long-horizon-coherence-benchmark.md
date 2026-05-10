---
author: Hugo Nogueira
pubDatetime: 2026-05-10T20:00:00.000Z
title: "LHC v0.2: A Benchmark for Long-Horizon Agent Coherence (and the Methodology That Got It Honest)"
locale: en
postSlug: lhc-v02-long-horizon-coherence-benchmark
featured: true
draft: false
tags:
  - ai-agents
  - autonomous-systems
  - llm-evaluation
  - benchmarks
  - fine-tuning
  - engineering
description: I just published LHC v0.2, an open benchmark for long-horizon coherence in 8B-class agent models, plus a deterministic parser baseline that puts a useful floor on what fine-tuning is worth for structured-state tasks. This post explains what they're for, how to use them, and the methodology arc that produced them across five rounds of external review.
keywords: Hugo Nogueira, AI agents, long-horizon coherence, LHC, benchmark, agent evaluation, fine-tuning, Qwen3-8B, MLX, Apple Silicon, methodology, external review, decontamination
image: "/images/blog/lhc-v02-long-horizon-coherence-benchmark.jpg"
---

For the past three months I've been working on a small but stubborn question: how do you measure whether an autonomous agent is actually maintaining coherence across long-running work, instead of just appearing fluent in the next turn? Today I'm publishing the artifacts that came out of that work. They are useful on their own, and they are honest, which is the part I want to talk about.

The first artifact is **[LHC v0.2](https://huggingface.co/datasets/hugonogueira/lhc-v0.2)**, an open benchmark for long-horizon coherence in 8B-class language models. Twenty-four hand-curated tasks across three failure modes: state recall over a long context gap, decision consistency across a long gap, and workflow resumption after a long gap. Four gap-mode ablations per task. A pre-registered decision matrix that locks the verdict logic before any model runs. Full audit trail. Apache 2.0.

The second artifact is **[a deterministic parser baseline](https://github.com/hugomn/lhc-resume-state-parser)**, around two hundred lines of Python with no LLM in the forward pass. On the LHC v0.2 resumption suite it scores 0.75 out of 2.00. On two specific structured-state tasks it scores 2/2 deterministically. Every 8B-class LLM I tested averaged below 2.0 on at least one of those two tasks. The parser is a useful floor: if your fine-tune does not clear it on tasks where the state is structured, you are paying inference cost for a regression.

The third artifact is the [methodology trail itself](https://github.com/hugomn/lhc), the journal entries and the corrections, including a model I trained that did not measurably beat its base under matched inference. That model does not ship. The trail of what I learned trying to ship it does. This post is the long version of how that happened, and what I think it's good for if you are building or evaluating agent models.

## What LHC measures, and who it's for

The agents I write about in [my agent harness post](/posts/agent-harness-infrastructure/) are the ones that operate over weeks and months, not minutes. The current frontier of open agent models can sustain autonomous work in the order of hours, which is genuine progress, but the agents that matter operationally have to remember a decision they made on Monday when a contradictory request arrives on Friday, and pick up a half-finished workflow after a two-week pause without prompting. Most public benchmarks for LLM coherence test single-context-window behavior, and the proxies they use for "long" rarely reflect the structure of the failures we actually see in production agents.

LHC v0.2 is a small, manually-curated suite of twenty-four tasks. Eight per category across three categories: `state_recall`, `commitment`, and `resumption`. Each task is run under four gap conditions, where the "gap" is a sequence of synthetic side chatter inserted between the setup messages and the probe. The four gap modes (`none`, `placeholder`, `neutral`, `current`) test increasing distractor pressure, and the production-relevant one is `current`, where the gap content looks like real agent chatter. The judge is Claude Opus 4.7 against a binary two-dimensional rubric: correctness ∈ {0,1} and meta-awareness ∈ {0,1}, with the task score as their sum.

LHC is still a controlled prompt-level proxy, not a full multi-week agent-runtime benchmark; it tests whether setup state survives intervening context within a single conversation, not whether an agent system persists state correctly over calendar time. The proxy is useful precisely because it isolates the model's contribution to long-horizon coherence from the harness's contribution; for a real-world agent, both matter.

If you are training a model for long-horizon agent work and want to know whether your fine-tune is actually better than its base or just better at the test set, LHC has three properties most LHC-style benchmarks lack. It is **decontaminated**: no derivative-seed overlap with the synthetic data the reference fine-tune was trained on, with per-task provenance recorded in `manifest.json`. It is **gap-mode ablated**: the four-mode design surfaces coherence failures vs. surface memorization, which a single gap mode would conflate. And it has **pre-registered decision gates**: the [DECISION.md file](https://github.com/hugomn/lhc/blob/main/evals/v0.2/DECISION.md) was locked before any model run, so there is no path to argue around the verdict after the data comes in.

If you want to evaluate your own model, the harness lives at [`evals.runners.lhc`](https://github.com/hugomn/lhc/blob/main/evals/runners/lhc.py) and accepts any OpenAI-compatible endpoint. The repo's README has a one-cell invocation example and a multi-trial protocol section that explains why fresh server restarts matter for MLX-served models (more on that below).

## The deterministic parser, and why it's a load-bearing floor

While building the benchmark, I built a small parser to answer a question I expected to be easy: how much of the resumption category is actually solvable without an LLM? The answer was uncomfortable.

The parser is around two hundred lines of Python, with the load-bearing logic inside about eighty. It reads the task's setup messages, looks for explicit "next step" markers (`NEXT:`, `[NEXT]`, "next planned action"), and detects a specific kind of state inconsistency: when a recorded decision and a next-action note in the same loaded payload reference different formula identifiers (e.g., `RECIPE-A` vs. `RECIPE-B`). For tasks that do not have a structured marker, the parser declines explicitly. It does not free-associate from the gap content, which would be the obvious failure mode for a regex-based baseline.

Across the eight resumption tasks in LHC v0.2, the parser scores 0.75 / 2.00 mean. The interesting result is at the per-task level. On `resumption_v2_004` (a warehouse pick-pack tracker with a `[NEXT]` tag at line five of an active multi-line order), the parser scores 2/2 deterministically; the four 8B-class LLMs I tested across twelve cells per task scored a mean of 1.92, 1.67, 1.50, and 1.25. On `resumption_v2_008` (a bakery batch with a `RECIPE-A` decision and a `RECIPE-B` next-action note), the parser also scores 2/2 deterministically; the four LLMs scored means of 1.92, 1.50, 1.17, and 1.00. Some LLM cells hit 2/2; none of the LLMs match the parser's mean.

The conclusion is not that regex beats fine-tuning. The conclusion is more specific. **For production agent workflows where the inter-session state is structured, fine-tuning may be the wrong layer.** On these two structured-state task shapes, a schema validator and parser get you a deterministic 2/2 at zero inference cost, where an 8B-class LLM gets you 2/2 sometimes. If your agent's job is to maintain workflow state across sessions in a similarly structured way, build the parser first. If your fine-tune does not clear the parser on the structured-state tasks, you have learned something useful: the LLM is not doing what you thought it was doing on those tasks. That is the floor I think this baseline is good for.

The parser ships as [a standalone repo](https://github.com/hugomn/lhc-resume-state-parser) with the full source, the published scorecard, an example task, and a CLI that takes a task YAML and prints the response. It runs on stdlib plus pyyaml and has nine passing tests covering the patterns and the decline path.

## The methodology arc, in chronological order

The work I just described took five rounds of external adversarial review across seventy-two hours to get to a state I could publish honestly. I'm going to walk through what each round caught, because I think the pattern is more useful than any single finding.

Before any of that: the original plan was to fine-tune Qwen3-8B specifically for long-horizon coherence, measure it on what I called LHC v0.1 (twelve hand-curated tasks), and ship a model that beats its base. I was working on Apple Silicon, doing LoRA via MLX-LM, no cloud GPUs. By 2026-05-08 I had a fine-tune called Ember v0.1.5, a benchmark, and what looked like a clean leaderboard win. I asked a reviewer to challenge it before I shipped, with the prompt: tell me what I got wrong, what I overlooked, and what would change your mind.

**Round 1** caught six methodology issues. The largest was that my LHC v0.1 task scenarios overlapped with my training data via "based_on" derivative seeds, so the benchmark was effectively measuring memorization rather than long-horizon coherence in general. There was also a hash bug in the gap generator: the seed was Python's built-in `hash(task_id)`, which is process-randomized for security on Python 3.3+, so different processes generated different gaps for the same task, silently inflating trial-to-trial variance. There were four more, including a train/eval gap-style mismatch and truncated scorecards (I was only storing the first 400 characters of each model response, which made independent re-judging impossible). I accepted all six. Day 1 of the rebuild produced LHC v0.2: twenty-four decontaminated tasks, four gap modes, stable sha256-based gap seeding, full-message scorecards, and a thirteen-gate decision matrix locked before any model run.

**Round 2** caught two issues that broke the v0.2 sweep verdict. I had run a four-model sweep showing Ember worse than base Qwen3-8B by 0.13 mean overall and 0.25 on the production-relevant `current` gap mode (95% CI [-0.46, -0.06]). The pre-registered gates said this was a decisive failure, and I wrote it up as such. The reviewer pointed out that I had not run the comparison fairly. Ember was running through local MLX with a `/no_think` system prompt prefix, while base Qwen3-8B (and the other two OpenRouter models) ran without that prefix. Different inference paths. The reviewer also noted that my MLX runs produced byte-identical text across all three "trials" per cell, which meant my "n=3" was effectively n=1 for Ember while the OpenRouter models had real trial variance, and the bootstrap CI was treating both as if they had the same variance structure.

The reviewer's recommendation was a no-training diagnostic: run base Qwen3-8B locally via MLX with the same `/no_think` prefix, then re-compare. I built the diagnostic. The matched-inference apples-to-apples Δ on `current` overall was -0.04, not -0.25. About 5/6 of the apparent regression was inference confound, not weights.

**Round 3** endorsed the diagnostic with a wording correction (stop saying "Ember regresses against base"; start saying "Ember is not measurably better than base under matched inference") and asked for one optional cleanup: the diagnostic had reused Ember's scorecards from the original sweep, while base Qwen3-8B had been newly generated under a slightly different MLX server config. To close the audit symmetry, I should rerun Ember under the same config. The reviewer was explicit that this would not change the decision.

I did the rerun. The scores were materially different from the original sweep. The most striking single signal in the round-2 brief, a "byte-identical confident-wrong response" on a kitchen-86-list task, was no longer byte-identical and no longer wrong. The actual response text was completely different.

**Round 4** is where the underlying issue became clear. The original sweep had run all three trials for a given cell by hitting the same long-running MLX server with the same prompt three times in a row. In my setup, that produced byte-identical text within a server session. I still have not isolated whether the cause was prompt cache behavior, server state, sampling initialization, Metal kernels, or something else. But across separate MLX server starts, with the same model, same adapter, same flags, same prompts, same `/no_think` prefix, the output was different. Not slightly different. Materially different scores on the same task.

I have not isolated the source. It could be the MLX-LM server, Metal kernels, cache-state initialization, sampling defaults, warmup, process init, or some combination. I had been treating "n=3 byte-identical trials" as proof of determinism, when it was actually proof of within-session caching. So I replicated both Ember and base Qwen3-8B at proper n=3 with a fresh MLX server start per trial. The result:

| Gap | Ember mean (n=3) | Qwen-local mean (n=3) | Δ E−Q | 95% CI (task-bootstrap) |
|---|---:|---:|---:|---|
| `current` | 1.222 | 1.181 | **+0.042** | [−0.139, +0.222] |
| `neutral` | 1.319 | 1.333 | **−0.014** | [−0.139, +0.111] |

Both confidence intervals cross zero. Ember is not measurably better than base, and not measurably worse. It is a statistical tie. By my pre-registered bar (I wanted "significant improvement on at least one functionality compared to a same-class model"), the model does not ship. The reviewer endorsed this verdict with one wording constraint, which was important: do not call this "MLX is non-deterministic." That is a global claim and I have not isolated the source. Call it a replication-protocol observation:

> In our MLX-LM server setup on Apple Silicon, outputs were stable within a single server session but varied across fresh server starts. Benchmark replications should restart the server between trials, or explicitly state they are within-session repeats.

That is what I can defend, and I think it's worth flagging for anyone else benchmarking MLX-served models. Per-cell standard deviation across three restart trials in our setup was 0.02 to 0.13 on overall mean, with six of twenty-four tasks score-flipping per side. If your "n=3" comes from one MLX server session, you have one sample with within-session caching, not three independent trials.

**Round 5** was a holistic repo audit before I published anything to HuggingFace. The reviewer came back with eight release blockers. Among them: the published `verdict-final.json` artifact still encoded the original confounded gates and the retracted CI, so anyone downloading and citing it would cite a CI I had publicly retracted; my `diagnostic_compare.py` script was broken in a clean clone because it defaulted to reading from a gitignored working directory; my scorecards were not self-identifying because the JSON's top-level `model` field said `"Qwen/Qwen3-8B"` for both the Ember-LoRA and the base-Qwen scorecards (the harness wrote what `mlx_lm.server` reported, and filenames were the only disambiguator); and my benchmark spec doc still claimed the gap seed was `hash(task_id) & 0xFFFFFFFF`, which is exactly the round-1 hash bug I had fixed earlier in the rebuild. I corrected all eight, sent the repo back, and got endorsement to publish.

And then, while extracting the parser into its standalone repo for Path E #2, I caught one more issue myself.

For the parser repo's README I drafted a comparison table: how does the parser score against the four 8B-class LLMs on the two structured-state tasks where it scores 2/2? Pulling per-model means from the published scorecards, the table told a different story than the one I had been writing throughout the rebuild. The claim in the canonical docs was that the parser **beats every fine-tuned 8B model** on those two tasks. That claim is wrong on means: Llama-3.1-8B has a mean of 1.92 on `resumption_v2_004`, and Ministral has 1.92 on `resumption_v2_008`. The parser does have the highest mean, but the gap to second-best is small. The defensible claim is "the parser scores 2/2 deterministically; some LLM cells hit 2/2, but no LLM matches the parser's mean." Not the same as "beats every model."

This sentence had been in five places in the canonical docs (README, results.md, findings.md, changelog, the HF dataset card) since the v0.2 sweep. Five rounds of external review had not flagged it. I caught it because building a comparison table for an outside consumer of the parser forced a per-model comparison that the prose framing had hidden.

I corrected the wording across all five places, re-uploaded the dataset card, and added a journal entry recording the correction. The standalone parser repo's README has the right framing from the initial commit.

## What I think this is good for

I started this work wanting to ship a fine-tuned model. What I ended up shipping is a benchmark, a parser baseline, and a methodology trail. The model that doesn't ship is, in retrospect, the most useful single example in the trail. Everything else is more useful because the model is honestly characterized.

If you are building agent models for long-horizon work, I think the practical takeaways are:

- **Build the deterministic floor before you build the model.** A small parser can tell you whether the tasks you care about are even ones where fine-tuning has room to add value. If the parser already gets 2/2 on the structured-state tasks, your fine-tune is competing with regex, and any drop below 2.0 is a regression you are paying inference for. We had no floor in v0.1, and that lack of a floor is part of why the original verdict was easy to overstate.

- **Run apples-to-apples inference, or document loudly when you can't.** The original "Ember regresses by 0.25" was about 5/6 inference confound. If your fine-tune is on local MLX with one provider's defaults, and your base model is on a hosted endpoint with different defaults, you are measuring two things at once. Try to put them on the same path. If you can't, name the asymmetry in the writeup.

- **Pre-register your decision logic.** A written decision matrix that maps gate outcomes to actions, locked before any model run, removes the path to argue around the data after it comes in. The matrix's job is not to decide for you. It is to make moving the goalposts visible. When the matched-inference diagnostic flipped my result from "regresses" to "tied," the same matrix produced the same shipping decision. That is what you want.

If you are evaluating someone else's agent model, the same story has a different lesson:

- **Look at the inference path before you trust the leaderboard.** Mine fooled me for an entire sweep cycle, and would have fooled anyone else who downloaded the original verdict file. Self-identifying scorecards (with `model_slug`, `base_model`, `adapter`, `inference_path`, `system_prompt_prefix`, `server_config`) make this less awkward. The LHC v0.2 published scorecards now include all of those fields explicitly.

- **For MLX-served models specifically, ask whether trials were across server restarts or within a single session.** If it's the latter, the variance characterization is unreliable. We have not isolated the source of the within-session-vs-restart difference, but the protocol implication is the same regardless: restart between trials, or document the within-session caveat.

And for the broader methodology question, the one I find most interesting after all this:

- **Each round of adversarial review caught things the previous rounds did not, because each round was looking at the work from a different angle.** Round 1 looked at benchmark design. Round 2 looked at comparison setup. Round 3 looked at the diagnostic. Round 4 looked at replication. Round 5 looked at the repo as an artifact someone else would consume. After all five rounds passed, the act of extracting one piece of the work into a *different artifact for a different audience* surfaced an additional error that none of the holistic reads had caught. The lesson is not "do five rounds of review." The lesson is that **structured comparisons against a different consumer surface different errors than holistic-correctness review does.** If your work is going to be cited, build the citation surface yourself, in the format the citer would use, and read it cold. You will catch things that no amount of reading-your-own-prose-in-isolation will catch.

## Where to find it

- **Benchmark on HuggingFace:** [hugonogueira/lhc-v0.2](https://huggingface.co/datasets/hugonogueira/lhc-v0.2). Apache 2.0. Twenty-four task YAMLs, sixty scorecards, audit results, both verdict artifacts, decontamination manifest, dataset viewer with browsable Parquet companions.
- **Code, methodology, journal:** [github.com/hugomn/lhc](https://github.com/hugomn/lhc). The four review-round arc is in [`docs/journal/`](https://github.com/hugomn/lhc/tree/main/docs/journal), append-only.
- **Deterministic parser baseline:** [github.com/hugomn/lhc-resume-state-parser](https://github.com/hugomn/lhc-resume-state-parser). Around two hundred lines of Python, no LLM in the forward pass, nine passing tests.

If you run LHC against your own model and want to share the scorecard, the published diagnostic scorecards under `evals/results/published/lhc-v0.2/diagnostic-*` show the shape, including the self-identification fields. The benchmark is open and the methodology is open. If you find something I got wrong, please tell me. The previous five rounds suggest the work is better when other people look at it.

I'm going back to building agents that work. The model that didn't ship was the right call. The benchmark and the parser are what I think survived as useful, and the methodology trail is, I hope, useful to someone else doing similar work.

---

_Hugo Nogueira is CPTO at [Complyance](https://complyance.io), where he builds AI agent systems for enterprise compliance. He writes about AI agent architecture, evaluation, and infrastructure at hugo.im. Find him on [LinkedIn](https://linkedin.com/in/hugomn) or [X](https://x.com/hugomn). LHC and the methodology arc described in this post are open at [github.com/hugomn/lhc](https://github.com/hugomn/lhc) and [huggingface.co/datasets/hugonogueira/lhc-v0.2](https://huggingface.co/datasets/hugonogueira/lhc-v0.2)._

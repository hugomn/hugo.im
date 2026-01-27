---
author: Hugo Nogueira
pubDatetime: 2026-01-27T08:00:00.000Z
title: "The 100th Tool Call Problem: Why Most AI Agents Fail in Production"
locale: en
postSlug: 100th-tool-call-problem
featured: true
draft: false
tags:
  - ai-agents
  - autonomous-systems
  - production
  - durability
  - engineering
description: Demos run for minutes. Production runs for hours. Here's what breaks, and the durability patterns that actually work when your agent needs to make 200+ tool calls without losing its mind.
keywords: Hugo Nogueira, AI agents, durable agents, production agents, autonomous systems, checkpointing, agent reliability, AI engineering
image: "/images/blog/building-durable-agents.jpg"
---

Earlier this month, an agent I built ran autonomously for 1 hour and 40 minutes. It made 369 tool calls, consumed 9.7 million tokens, conducted 57 web searches, read 65 files, and produced 30 structured documents. Total cost: $2.74.

It was a research synthesis task: analyze emerging trends in a technical domain, cross-reference sources, evaluate opportunities, and produce structured reports. Work that would take a human analyst several days.

But here's the part I don't mention in demos: the agent also hit context limits twice, had to recover from a corrupted checkpoint once, and nearly published an incomplete analysis before a guardrail caught it.

This is the reality of production agents that nobody talks about at conferences.

## The Demo vs. Production Gap

Every agent demo looks impressive. The presenter types a prompt, the agent chains a few tool calls together, and magic happens. The audience applauds.

But demos run for minutes. Production runs for hours. And somewhere between minute 5 and hour 5, everything that can go wrong does.

I call this the **100th Tool Call Problem**. Not because failure happens exactly at 100 calls, but because degradation is inevitable once a task outgrows a single context window.

Here's what actually breaks:

**Context Window Overflow**: Your agent starts with a clear mission. 50 tool calls later, the context is stuffed with results, intermediate reasoning, and error messages. The model starts summarizing. Critical details get compressed. The agent "forgets" something essential.

**State Corruption**: The agent made a decision 30 minutes ago based on information that's now stale. Or worse, it made an assumption that seemed reasonable then but contradicts what it learned since.

**Cascading Failures**: One API times out. The agent retries. The retry returns different data. Now the agent is reasoning about inconsistent information, and every subsequent decision compounds the confusion.

**Silent Degradation**: The scariest failure mode. The agent keeps running, keeps producing output, but the quality quietly declines. You don't notice until a customer complains or an audit fails.

## The Durability Patterns That Actually Work

After months of running agents in production, both for enterprise work and personal automation, I've converged on a set of patterns that make the difference between "impressive demo" and "trusted system."

### 1. Resource-Aware Execution: Agents That Know When to Wrap Up

Most agents run until they hit a wall. Then they crash, or produce garbage, or exceed your budget.

The better pattern: **make the agent aware of its own resource consumption**. Not just by enforcing limits from outside, but by giving the agent visibility into how much runway it has left.

```python
class StepTracker:
    """Tracks execution steps and injects awareness into tool results."""

    def __init__(self, max_steps: int = 500):
        self.max_steps = max_steps
        self.current_step = 0

    def format_status(self) -> str:
        """Append to every tool result so agent sees its progress."""
        remaining_pct = (self.remaining / self.max_steps * 100)

        base = f"[Step {self.current_step}/{self.max_steps}]"

        if remaining_pct <= 10:
            return f"{base} ⚠️ CRITICAL: {self.remaining} steps left - wrap up now"
        elif remaining_pct <= 20:
            return f"{base} ⚠️ Low steps remaining - consider finishing current task"
        return base
```

The magic here: instead of just cutting the agent off when it hits a limit, every tool result includes the current step count. The agent _sees_ itself approaching the limit and can plan accordingly. "I have 50 steps left, so I should prioritize the most important remaining checks and defer the nice-to-haves."

This is a subtle but crucial shift from external constraint to internal awareness.

### 2. Checkpointing with Visibility Layers

Everyone knows you should checkpoint state. But most implementations miss a critical dimension: **not all state is equal**.

When an agent runs for hours, you're saving thousands of messages, tool calls, and intermediate results. Some of this is essential for recovery. Some is essential for debugging. Some should never be shown to users. And some is only relevant to the audit trail.

I use visibility metadata on every checkpoint:

```python
class CheckpointVisibility:
    """Classify what each piece of state is for."""

    VISIBLE = "visible"           # Show to end users
    USER_HIDDEN = "user_hidden"   # Show to operators, not users
    ALWAYS_HIDDEN = "always_hidden"  # Internal only (system prompts, etc.)

    def classify_message(self, message) -> str:
        if message.type == "system":
            return self.ALWAYS_HIDDEN
        elif message.type == "tool":
            return self.USER_HIDDEN  # Users don't need raw tool output
        elif message.type == "ai" and has_tool_calls(message):
            return self.USER_HIDDEN  # Hide the "thinking" steps
        return self.VISIBLE
```

This seems like a small thing, but it's transformative for production systems. You get:

- **Clean user-facing audit trails** that show decisions, not implementation details
- **Full debugging capability** when something goes wrong
- **Compliance-ready logging** that separates user data from system internals

### 3. Correlation IDs Everywhere

When an agent runs for nearly two hours and makes 369 tool calls, something will go wrong. The question is: can you trace exactly what happened?

Every operation in my agents carries a correlation ID that threads through the entire execution:

```python
class AuditLogger:
    def log_evaluation(self, cycle_number, decisions_count, ...) -> str:
        """Log an evaluation cycle and return correlation ID."""
        correlation_id = str(uuid.uuid4())

        self.log(
            event_type=AuditEventType.EVALUATION_COMPLETED,
            event_data={
                'cycle_number': cycle_number,
                'decisions_count': decisions_count,
            },
            correlation_id=correlation_id,
            tokens_used=tokens_used,
            cost_usd=cost_usd,
        )

        return correlation_id  # Pass this to all subsequent operations
```

When a user asks "why did the agent do X?", I can query by correlation ID and get the complete chain: what triggered the cycle, what context the agent had, what it decided, what tools it called, and what the results were.

This is table stakes for enterprise deployments, but I've seen it missing from most agent frameworks.

### 4. Human-in-the-Loop as Graph Interrupts

The naive HITL implementation: check a flag before tool execution, send a request somewhere, poll for a response.

The problem: this breaks the agent's execution model. You're now managing state across an async boundary, handling timeouts, dealing with race conditions.

The better pattern: treat human approval as a **graph interrupt**. The agent execution pauses at a semantically meaningful point, the interrupt captures exactly what needs approval, and resumption restores the full context.

```python
def with_approval_check(tool_guardrails, tool_name):
    """Decorator that wraps tools with interrupt-based approval."""

    async def wrapper(*args, **kwargs):
        # This isn't a flag check, it's a graph interrupt
        approval_response = interrupt({
            "request_id": f"approval-{uuid.uuid4().hex[:8]}",
            "tool_name": tool_name,
            "tool_args": kwargs,
            "message": f"Tool '{tool_name}' requires approval."
        })

        if not approval_response.get("approved"):
            return {"success": False, "error": "Rejected by user"}

        return await original_function(*args, **kwargs)

    return wrapper
```

The interrupt isn't just about "asking permission." It captures the exact state at the decision point. When the human approves and the graph resumes, the agent continues with full context—no state reconstruction needed.

### 5. Budget Guardrails: Constrain Before You Trust

Agents are optimists. They'll keep trying until they succeed or exhaust every resource you give them.

Budget guardrails are non-negotiable constraints that force the agent to stop and report rather than spiral into expensive territory:

```python
class BudgetGuardrails:
    def __init__(self, daily_limit=None, hourly_limit=None, per_call_limit=None):
        self.daily_limit = daily_limit
        self.hourly_limit = hourly_limit
        self.per_call_limit = per_call_limit

    def check_budget(self, estimated_cost: float) -> tuple[bool, str | None]:
        if self.per_call_limit and estimated_cost > self.per_call_limit:
            return False, f"Exceeds per-call limit ${self.per_call_limit}"

        if self.hourly_limit and (self.hourly_spent + estimated_cost) > self.hourly_limit:
            return False, f"Would exceed hourly limit ${self.hourly_limit}"

        if self.daily_limit and (self.daily_spent + estimated_cost) > self.daily_limit:
            return False, f"Would exceed daily limit ${self.daily_limit}"

        return True, None
```

The key insight: check _before_ the call with estimated cost, not just after. You want to stop the expensive operation, not just log that it happened.

## Testing Durable Agents

You can't test durability with unit tests. You need chaos.

My testing approach:

1. **Long-running simulations**: Let the agent run for hours on realistic tasks. Measure degradation over time.

2. **Failure injection**: Randomly fail tool calls, inject latency, corrupt responses. See how the agent recovers.

3. **State corruption tests**: Manually corrupt checkpoints and verify recovery behavior.

4. **Budget exhaustion tests**: Set very low limits and verify the agent stops gracefully rather than crashing.

5. **Regression on real incidents**: Every production failure becomes a test case.

The goal isn't to prove the agent works. It's to discover how it fails.

## The Infrastructure Moat

I'll say it plainly: **the LLM is a commodity. The orchestration layer is the moat.**

We already have models that can reason brilliantly. What we don't have is infrastructure that keeps them running reliably for hours, days, weeks.

The agents that matter in 2026 won't be the smartest. They'll be the ones that:

- Know when they're running low on resources and wrap up gracefully
- Maintain complete audit trails that humans can actually understand
- Interrupt for approval at exactly the right moments without losing context
- Recover from failures without corrupting state

The teams that win will be the ones that treat agent infrastructure like database infrastructure, with the same rigor around durability, consistency, and recovery.

The model you use will be table stakes. The orchestration you build around it will be the differentiator.

---

_I'm building agents for enterprise compliance work and running autonomous agents for personal productivity. If you're wrestling with production agent challenges, I'd love to hear what patterns you've discovered. Find me on [LinkedIn](https://linkedin.com/in/hugomn) or [X](https://x.com/hugomn)._

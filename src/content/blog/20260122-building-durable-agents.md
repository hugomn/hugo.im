---
author: Hugo Nogueira
pubDatetime: 2026-01-22T10:00:00.000Z
title: "Building Durable Agents: What I Learned Running Autonomous Systems in Production"
locale: en
postSlug: building-durable-agents
featured: true
draft: false
tags:
  - ai-agents
  - autonomous-systems
  - production
  - durability
  - engineering
description: Most AI agents fail at the 100th tool call. Here are the durability patterns I've learned from running autonomous systems in production—the hard-won lessons that separate demos from deployable systems.
keywords: Hugo Nogueira, AI agents, durable agents, production agents, autonomous systems, checkpointing, agent reliability, AI engineering
image: "/images/blog/building-durable-agents.jpg"
---

Last week, an agent I built made 247 tool calls over 6 hours to complete a compliance review. It processed documents, cross-referenced regulations, generated a report, and flagged three issues that would have taken a human analyst two days to find.

It also crashed twice. Lost context once. And nearly sent an incomplete report before a guardrail caught it.

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

After months of running agents in production—both for enterprise compliance work and for my personal automation—I've converged on a set of patterns that make the difference between "impressive demo" and "trusted system."

### 1. Checkpointing: Save State Like Your Job Depends On It

The most important pattern is also the simplest: **save state constantly**.

Every significant decision, every tool call result, every piece of reasoning—checkpoint it. Not just for recovery, but for auditability.

```python
class DurableAgent:
    def __init__(self, checkpoint_store):
        self.checkpoints = checkpoint_store
        self.current_state = {}
    
    async def execute_tool(self, tool_name, args):
        # Save state BEFORE the tool call
        checkpoint_id = await self.checkpoints.save({
            "state": self.current_state,
            "pending_action": {"tool": tool_name, "args": args},
            "timestamp": datetime.now()
        })
        
        try:
            result = await self.tools[tool_name](**args)
            
            # Update state with result
            self.current_state["last_result"] = result
            self.current_state["completed_actions"].append(tool_name)
            
            # Save state AFTER successful execution
            await self.checkpoints.save({
                "state": self.current_state,
                "completed_action": {"tool": tool_name, "result": result},
                "timestamp": datetime.now()
            })
            
            return result
            
        except Exception as e:
            # On failure, we can recover from the checkpoint
            await self.checkpoints.mark_failed(checkpoint_id, str(e))
            raise
```

The key insight: checkpointing isn't just about crash recovery. It's about creating a **decision trail** that lets you (and your future debugging self) understand exactly what the agent was thinking at every step.

### 2. Budget Guardrails: Constrain Before You Trust

Agents are optimists. They'll keep trying until they succeed or exhaust every resource you give them.

Budget guardrails are non-negotiable constraints that force the agent to stop and report rather than spiral into expensive or dangerous territory.

```python
class BudgetGuardrails:
    def __init__(self, config):
        self.max_tool_calls = config.get("max_tool_calls", 100)
        self.max_tokens = config.get("max_tokens", 50000)
        self.max_cost = config.get("max_cost_usd", 5.0)
        self.max_duration = config.get("max_duration_seconds", 3600)
        
        self.current = {
            "tool_calls": 0,
            "tokens": 0,
            "cost": 0.0,
            "start_time": time.time()
        }
    
    def check(self) -> tuple[bool, str]:
        """Returns (can_continue, reason_if_not)"""
        
        if self.current["tool_calls"] >= self.max_tool_calls:
            return False, f"Tool call limit ({self.max_tool_calls}) reached"
        
        if self.current["tokens"] >= self.max_tokens:
            return False, f"Token limit ({self.max_tokens}) reached"
        
        if self.current["cost"] >= self.max_cost:
            return False, f"Cost limit (${self.max_cost}) reached"
        
        elapsed = time.time() - self.current["start_time"]
        if elapsed >= self.max_duration:
            return False, f"Duration limit ({self.max_duration}s) reached"
        
        return True, ""
```

I set my guardrails conservatively and adjust based on observed behavior. It's much better to have an agent stop and ask "I've hit my limit, should I continue?" than to wake up to a $500 API bill.

### 3. Human-in-the-Loop Triggers: Know When to Ask

Not every decision should be autonomous. The art is knowing which ones require human judgment.

I use explicit **decision boundaries**—points where the agent must pause and explain its reasoning before proceeding:

```python
class DecisionBoundary:
    """Defines when an agent must pause for human review"""
    
    HIGH_STAKES_ACTIONS = [
        "send_email",
        "create_ticket", 
        "modify_database",
        "external_api_call",
        "financial_transaction"
    ]
    
    async def should_pause(self, action, context) -> tuple[bool, str]:
        # Always pause for high-stakes actions
        if action["tool"] in self.HIGH_STAKES_ACTIONS:
            return True, f"High-stakes action: {action['tool']}"
        
        # Pause if confidence is low
        if context.get("confidence", 1.0) < 0.7:
            return True, f"Low confidence: {context['confidence']}"
        
        # Pause if we've made many decisions without human input
        if context.get("decisions_since_human", 0) > 10:
            return True, "Checkpoint: 10 autonomous decisions made"
        
        # Pause if cost is accumulating
        if context.get("session_cost", 0) > 1.0:
            return True, f"Cost checkpoint: ${context['session_cost']}"
        
        return False, ""
```

The insight here: **the most trustworthy agents are the ones that know their limits**. An agent that asks for help at the right moments is more valuable than one that charges ahead and occasionally catastrophically fails.

### 4. Memory Hygiene: Forget Strategically

Long-running agents accumulate context. If you don't manage it actively, the agent drowns in its own history.

I use a three-tier memory architecture:

- **Working Memory**: Current task context. Cleared between sessions.
- **Episodic Memory**: What happened and when. Summarized aggressively.
- **Semantic Memory**: Facts and knowledge. Updated rarely, persisted permanently.

The key is **strategic forgetting**:

```python
class MemoryManager:
    def compress_context(self, messages: list[dict]) -> list[dict]:
        """Compress old context while preserving critical information"""
        
        # Keep recent messages intact
        recent = messages[-10:]
        old = messages[:-10]
        
        if not old:
            return messages
        
        # Summarize old messages
        summary = self.summarize(old)
        
        # Extract and preserve critical facts
        critical_facts = self.extract_critical_facts(old)
        
        return [
            {"role": "system", "content": f"Previous context summary: {summary}"},
            {"role": "system", "content": f"Critical facts: {critical_facts}"},
            *recent
        ]
    
    def extract_critical_facts(self, messages: list[dict]) -> str:
        """Pull out facts that must never be forgotten"""
        # Things like: user preferences, constraints, decisions made,
        # errors encountered, external state changes
        ...
```

The goal isn't to remember everything. It's to remember the **right things**—the facts and decisions that affect future actions.

## Testing Durable Agents

You can't test durability with unit tests. You need chaos.

My testing approach:

1. **Long-running simulations**: Let the agent run for hours on realistic tasks. Measure degradation over time.

2. **Failure injection**: Randomly fail tool calls, inject latency, corrupt responses. See how the agent recovers.

3. **State corruption tests**: Manually corrupt checkpoints and verify recovery behavior.

4. **Budget exhaustion tests**: Set very low limits and verify the agent stops gracefully rather than crashing.

5. **Regression on real incidents**: Every production failure becomes a test case.

## The Agents That Survive 2026

Here's my prediction: **the agents that matter in 2026 won't be the smartest. They'll be the most durable.**

We already have models that can reason brilliantly. What we don't have is infrastructure that keeps them running reliably for hours, days, weeks.

The winners will be the teams that treat agent infrastructure like they treat database infrastructure—with the same rigor around durability, consistency, and recovery.

The LLM is a commodity. The orchestration layer is the moat.

---

*I'm building agents for enterprise compliance at Complyance and running 5 autonomous agents for my personal life. If you're wrestling with production agent challenges, I'd love to hear what patterns you've discovered. Find me on [LinkedIn](https://linkedin.com/in/hugomn) or [X](https://x.com/hugomn).*

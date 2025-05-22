---
title: "Scoped Memory Architecture"
date: 2018-11-18T12:33:46+10:00
weight: 13
---

Enable agents to access global and private scoped memories, mimicking human-like memory separation in multi-agent systems.

<img src="/images/scoped-memory-architecture.png" width="500">

## Scoped Memory Architecture
<p class="lead">
Scoped Memory is one of the core innovations behind MemChain AI. It allows memories to be stored, retrieved, and reasoned over at different levels of visibility and control: global (default), tenant, and agent-specific. This layered approach brings structure and security to memory management, especially in systems that deal with multiple agents or organizational boundaries.
</p>
<p class="lead">
In most existing memory frameworks, all stored data tends to live in a flat namespace. There is little or no separation between what one agent stores and what another might retrieve. This can lead to data leakage, interference between agents, or manual efforts to simulate isolation. <i>MemChain solves this cleanly through scoped memory design, where each memory entry is tagged with a scope that defines its visibility.</i>
</p>
<p class="lead">
For example, a global scope can be used to store shared knowledge such as standard operating procedures or company-wide documents. A tenant scope might contain project-specific insights that only a single business unit should access. An agent scope stores private experiences, observations, or episodic memories unique to that agent alone. When an agent queries its memory, MemChain ensures it only retrieves what belongs to its active scope set.
</p>
<p class="lead">
This architecture provides strong isolation without requiring separate infrastructure. An enterprise can run hundreds of agents under one tenant, each with their own scoped memory, without any risk of cross-contamination. Scoped memory also makes permissioning more precise. You can allow summarization at a tenant level but restrict raw data access to an agent level, or grant read-only visibility across scoped boundaries under controlled conditions.
</p>

## Why this is unique to MemChain AI?

<p class="lead">
What sets MemChain apart is that this model is built in from the start. Scoping is not a tagging hack or an external policy layer. It is enforced at the API, storage, and access control layers. That means better security, clearer semantics, and easier reasoning for developers building agentic systems at scale. Other frameworks may offer basic tagging or namespaces, but MemChain delivers true memory compartmentalization, built for production and aligned with how intelligent agents need to operate.
</p>

---
title: "Multi-Tenant Architecture"
date: 2018-12-28T15:14:39+10:00
weight: 11
---

Isolated memory domains per tenant, with scoped access for agents—ideal for enterprises and teams.
<img src="/images/multi-tenant-3.png" width="500">

# Overview
<p class="lead">
MemChain AI is built on a secure, multi-tenant architecture that lets multiple organizations operate independently within a shared platform. Each tenant’s data, memory scopes, and user access are fully isolated and governed by token-based authentication. Memory is scoped at global, tenant, and agent levels, ensuring precise control over what each agent can access. For enterprises needing collaboration, MemChain supports federated sharing with fine-grained permissions and audit logs. This eliminates the need for separate deployments, allowing organizations to scale securely without compromising control or visibility.
</p>

# How MemChain AI Implements Multi-Tenancy
## Scoped Memory Isolation:
<p class="lead">
All memory entries are tagged with tenant-level identifiers. Scopes (global, tenant, agent) enforce strict boundaries between tenants, preventing data leakage or cross-tenant access.
</p>

## Auth and Permissions:
<p class="lead">
Token-based authentication includes tenant metadata. All API access checks ensure the user or agent only sees and manipulates memory within its authorized scope.
</p>

## Federated Controls (Optional):
<p class="lead">
For organizations that want agents to collaborate across teams or partners, federation controls allow secure, permissioned sharing between tenants — with full auditability.
</p>

## Deployment Flexibility:
<p class="lead">
Tenants can be hosted in shared infrastructure (SaaS), dedicated nodes (Enterprise Cloud), or completely isolated on-prem environments — all using the same architecture.
</p>

## Security-Focused
<p class="lead">
No Manual Partitioning:
MemChain AI handles memory isolation and access control natively. Enterprises don’t need to maintain separate instances or worry about custom logic for tenant separation.
</p>

## Secure by Design:
<p class="lead">
Every memory access is scoped, permission-checked, and auditable. Even in federated scenarios, sharing is explicit and revocable.
</p>

## Elastic and Scalable:
<p class="lead">
Whether managing a handful of agents or thousands across teams, MemChain AI scales while keeping each tenant’s memory cleanly separated and secure.
</p>
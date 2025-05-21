---
title: "Multi-Tenant Architecture"
date: 2018-12-28T15:14:39+10:00
weight: 1
---

Isolated memory domains per tenant, with scoped access for agents—ideal for enterprises and teams.
<img src="/images/multi-tenant-3.png" width="500">

# Overview

MemChain AI is designed with a modern multi-tenant architecture that allows multiple organizations to operate securely within the same platform. Each tenant is logically isolated, meaning their data, memory scopes, and user access are kept completely separate. This enables teams or enterprises to run independently while benefiting from a shared and scalable infrastructure.

Memory records in MemChain are scoped at different levels including global, tenant, and agent. Every request is tied to a tenant identity through secure token-based authentication. This ensures that agents or users only access what they are authorized to see. There’s no risk of data bleeding across tenants because access is strictly controlled at the memory and API layers.

For enterprises that require collaboration across teams or subsidiaries, MemChain offers federated sharing with granular permissions. Tenants can choose to share memory selectively, with full audit logs and control over what can be accessed or summarized by other agents.

This architecture eliminates the need for complex workarounds or maintaining separate instances per client. Enterprises can scale confidently, knowing that each tenant operates in an isolated, secure, and well-governed environment from day one.


# How MemChain AI Implements Multi-Tenancy
## Scoped Memory Isolation:
All memory entries are tagged with tenant-level identifiers. Scopes (global, tenant, agent) enforce strict boundaries between tenants, preventing data leakage or cross-tenant access.

## Auth and Permissions:
Token-based authentication includes tenant metadata. All API access checks ensure the user or agent only sees and manipulates memory within its authorized scope.

## Federated Controls (Optional):
For organizations that want agents to collaborate across teams or partners, federation controls allow secure, permissioned sharing between tenants — with full auditability.

## Deployment Flexibility:
Tenants can be hosted in shared infrastructure (SaaS), dedicated nodes (Enterprise Cloud), or completely isolated on-prem environments — all using the same architecture.


## Security-Focused
No Manual Partitioning:
MemChain AI handles memory isolation and access control natively. Enterprises don’t need to maintain separate instances or worry about custom logic for tenant separation.

## Secure by Design:
Every memory access is scoped, permission-checked, and auditable. Even in federated scenarios, sharing is explicit and revocable.

## Elastic and Scalable:
Whether managing a handful of agents or thousands across teams, MemChain AI scales while keeping each tenant’s memory cleanly separated and secure.
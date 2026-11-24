---
title: Sentinel Orchestrator
summary: Local-first, governed workflow and agentic orchestration platform bridging probabilistic AI reasoning with deterministic Policy-as-Code guardrails, Transactional Outbox, and Human-in-the-Loop (HITL) approval gates.
year: '2026'
featured: true
order: 1
stack:
  - .NET 10
  - Angular 22
  - PostgreSQL
  - Redis
  - SignalR
  - OpenTelemetry
repoUrl: https://github.com/rparana/sentinel-orchestrator
---

## Problem Solved

Allowing autonomous AI agents or automated runbooks to mutate production infrastructure introduces severe reliability and compliance risks. Sentinel enforces a strict boundary between probabilistic action proposals and deterministic execution.

## Key Architectural Decisions (ADRs)

1. **Deterministic State Machine & Policy Guardrails:** Pure C# Policy Engine evaluates schema-validated `ActionProposal` payloads (`Allow`, `RequireApproval`, or `Deny`) before any side effect runs.
2. **Transactional Outbox & Concurrency Safety:** Atomic state transitions in PostgreSQL combined with `FOR UPDATE SKIP LOCKED`, `xmin` optimistic concurrency tokens, and Redis idempotency locks (`workflowId:stepIndex:attempt`).
3. **Reactive Real-Time Control Plane:** Angular 22 (Zoneless + Signals) paired with typed SignalR push events (`WorkflowUpdated` / `ApprovalRequested`) for sub-second HITL inspection and approval.
4. **Local-First Observability:** Single-command orchestration via `.NET Aspire` with end-to-end correlated `traceId` waterfalls in OpenTelemetry.

---
title: Sentinel Orchestrator
summary: Plataforma local-first de orquestração governada de workflows e agentes de IA, unindo raciocínio probabilístico de LLMs a guardrails determinísticos (Policy-as-Code), Transactional Outbox e aprovações Human-in-the-Loop (HITL).
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

## Problema Resolvido

Permitir que agentes autônomos de IA ou scripts automatizados alterem infraestrutura de produção gera altos riscos de confiabilidade e compliance. O Sentinel impõe uma fronteira estrita entre proposta probabilística e execução determinística.

## Decisões Arquiteturais (ADRs)

1. **Máquina de Estados Determinística & Guardrails:** Motor de políticas em C# puro avalia payloads validados (`ActionProposal`) como `Allow`, `RequireApproval` ou `Deny` antes de qualquer efeito colateral.
2. **Transactional Outbox & Concorrência:** Transições atômicas no PostgreSQL com `FOR UPDATE SKIP LOCKED`, controle otimista via `xmin` e locks de idempotência no Redis.
3. **Control Plane Reativo em Tempo Real:** Angular 22 (Zoneless + Signals) conectado via eventos tipados SignalR para inspeção e aprovação HITL em tempo real.
4. **Observabilidade Local-First:** Orquestração em comando único com `.NET Aspire` e rastreamento distribuído ponta a ponta via OpenTelemetry.

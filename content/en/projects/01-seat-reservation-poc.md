---
title: High-Concurrency Seat Reservation POC
summary: Distributed seat-locking and real-time availability engine engineered to prevent double-booking under concurrent checkout spikes.
year: '2025'
featured: true
order: 1
stack:
  - Redis
  - MongoDB
  - Node.js
  - SSE
repoUrl: https://github.com/rparana/poc-asaas
---

## Problem

Concurrent seat selection workflows are prone to race conditions and double-booking when multiple users attempt to claim the same inventory simultaneously. Relying solely on database row locks or polling degrades responsiveness and increases contention under load.

## Architecture Decisions

- **Atomic Distributed Locking (Redis):** Implemented short-lived seat holds using atomic Redis primitives with TTL-based automatic expiration, ensuring orphaned reservations release deterministically.
- **Durable State Persistence (MongoDB):** Separated ephemeral hold state in Redis from confirmed reservation records in MongoDB, keeping write paths fast while preserving an auditable source of truth.
- **Real-Time State Push (Server-Sent Events):** Used SSE over standard HTTP to broadcast seat status transitions (`available`, `held`, `confirmed`) to connected clients without WebSocket infrastructure overhead.

## Trade-offs

- **Eventual Consistency Window:** Separating Redis holds from MongoDB confirmation introduces a brief reconciliation boundary if a Redis node restarts before confirmation; mitigated by TTL bounds and idempotent confirmation checks.
- **SSE vs. WebSockets:** Chose unidirectional SSE for simpler horizontal scaling and native browser reconnection, trading off bidirectional client-to-server socket frames (handled via standard REST mutations instead).

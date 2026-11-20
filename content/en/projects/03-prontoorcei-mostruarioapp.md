---
title: ProntoOrcei & MostruárioApp
summary: Offline-first mobile applications built with Flutter to support field quoting and product catalog presentation in low-connectivity environments.
year: '2023'
featured: true
order: 3
stack:
  - Flutter
  - Offline-first
  - Mobile
---

## Problem

Field sales representatives and service professionals frequently operate in locations with unreliable or absent mobile connectivity, where cloud-only apps stall quoting workflows and product demonstrations.

## Architecture Decisions

- **Offline-First Local Persistence:** Designed the Flutter client around local-first storage so catalog browsing, quote assembly, and customer interactions work deterministically without network access.
- **Single Codebase Cross-Platform Delivery:** Used Flutter to maintain consistent UI behavior and responsive performance across Android and iOS devices from a unified codebase.
- **Asynchronous Synchronization:** Decoupled local user actions from background network sync so connectivity drops never block day-to-day field operations.

## Trade-offs

- **Conflict Resolution Complexity:** Supporting offline mutations requires explicit sync ordering and conflict-handling rules compared to a purely server-authoritative REST model.
- **Local Storage Footprint:** Caching product catalogs and media locally improves field responsiveness at the cost of managing device storage lifecycle and incremental asset updates.

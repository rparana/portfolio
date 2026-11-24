<script setup lang="ts">
defineProps<{
  order: number
  title: string
}>()
</script>

<template>
  <div class="rounded-xl border border-slate-800 bg-[#070B14] p-4 sm:p-5">
    <!-- 01: Sentinel Orchestrator -->
    <svg
      v-if="order === 1"
      viewBox="0 0 640 264"
      class="h-auto w-full rounded-lg bg-[#0B1120]"
      role="img"
      :aria-label="`${title} — System Architecture`"
    >
      <defs>
        <marker
          id="arrow-cobalt-0"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563EB" />
        </marker>
        <marker
          id="arrow-emerald-0"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669" />
        </marker>
      </defs>

      <!-- Telemetry Overlay Badge -->
      <rect x="12" y="10" width="616" height="26" rx="5" fill="#1E293B" stroke="#059669" stroke-width="1" stroke-dasharray="4 3" />
      <circle cx="28" cy="23" r="3.5" fill="#059669" />
      <text x="326" y="27" text-anchor="middle" fill="#6EE7B7" font-size="9.5" font-family="JetBrains Mono, monospace">
        OpenTelemetry Correlated Tracing (.NET Aspire)
      </text>

      <!-- Row 1: Node 1 -> Node 2 -> Node 3 -->
      <rect x="12" y="54" width="184" height="66" rx="6" fill="#1E293B" stroke="#2563EB" stroke-width="1.25" />
      <text x="104" y="81" text-anchor="middle" fill="#F8FAFC" font-size="10.5" font-family="JetBrains Mono, monospace">Angular 22 Control Plane</text>
      <text x="104" y="99" text-anchor="middle" fill="#93C5FD" font-size="8.5" font-family="JetBrains Mono, monospace">Signals + SignalR Client</text>

      <line x1="196" y1="87" x2="226" y2="87" stroke="#2563EB" stroke-width="1.25" marker-start="url(#arrow-cobalt-0)" marker-end="url(#arrow-cobalt-0)" />

      <rect x="228" y="54" width="184" height="66" rx="6" fill="#1E293B" stroke="#2563EB" stroke-width="1.25" />
      <text x="320" y="81" text-anchor="middle" fill="#F8FAFC" font-size="10.5" font-family="JetBrains Mono, monospace">Sentinel.Api (.NET 10)</text>
      <text x="320" y="99" text-anchor="middle" fill="#93C5FD" font-size="8.5" font-family="JetBrains Mono, monospace">Minimal APIs + SignalR Hub</text>

      <line x1="412" y1="87" x2="442" y2="87" stroke="#059669" stroke-width="1.25" marker-end="url(#arrow-emerald-0)" />

      <rect x="444" y="54" width="184" height="66" rx="6" fill="#1E293B" stroke="#059669" stroke-width="1.25" />
      <text x="536" y="79" text-anchor="middle" fill="#F8FAFC" font-size="10.5" font-family="JetBrains Mono, monospace">Domain &amp; Policy Engine</text>
      <text x="536" y="96" text-anchor="middle" fill="#6EE7B7" font-size="8.5" font-family="JetBrains Mono, monospace">State Machine + Guardrails</text>
      <text x="536" y="109" text-anchor="middle" fill="#94A3B8" font-size="8" font-family="JetBrains Mono, monospace">Allow / HITL / Deny</text>

      <!-- Connector: Node 3 -> Node 4 -->
      <path
        d="M 536 120 L 536 146 L 166 146 L 166 170"
        fill="none"
        stroke="#059669"
        stroke-width="1.25"
        stroke-dasharray="4 3"
        marker-end="url(#arrow-emerald-0)"
      />

      <!-- Row 2: Node 4 -> Node 5 -->
      <rect x="24" y="172" width="284" height="72" rx="6" fill="#1E293B" stroke="#2563EB" stroke-width="1.25" />
      <text x="166" y="199" text-anchor="middle" fill="#F8FAFC" font-size="10.5" font-family="JetBrains Mono, monospace">PostgreSQL 17</text>
      <text x="166" y="217" text-anchor="middle" fill="#93C5FD" font-size="8.5" font-family="JetBrains Mono, monospace">Workflow State + Audit Log</text>
      <text x="166" y="231" text-anchor="middle" fill="#94A3B8" font-size="8" font-family="JetBrains Mono, monospace">Transactional Outbox + xmin</text>

      <line x1="308" y1="208" x2="342" y2="208" stroke="#2563EB" stroke-width="1.25" marker-end="url(#arrow-cobalt-0)" />

      <rect x="344" y="172" width="272" height="72" rx="6" fill="#1E293B" stroke="#059669" stroke-width="1.25" />
      <text x="480" y="199" text-anchor="middle" fill="#F8FAFC" font-size="10.5" font-family="JetBrains Mono, monospace">Outbox Worker + Redis 7</text>
      <text x="480" y="217" text-anchor="middle" fill="#6EE7B7" font-size="8.5" font-family="JetBrains Mono, monospace">FOR UPDATE SKIP LOCKED + Lock</text>
      <text x="480" y="231" text-anchor="middle" fill="#94A3B8" font-size="8" font-family="JetBrains Mono, monospace">IAgentPlanner / Ollama</text>
    </svg>

    <!-- 02: High-Concurrency Seat Reservation POC -->
    <svg
      v-else-if="order === 2"
      viewBox="0 0 640 210"
      class="h-auto w-full"
      role="img"
      :aria-label="`${title} — System Architecture`"
    >
      <defs>
        <marker
          id="arrow-cobalt-1"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3B82F6" />
        </marker>
        <marker
          id="arrow-slate-1"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748B" />
        </marker>
      </defs>

      <!-- Row 1: Client -> Node.js API -> Redis Distributed Lock -->
      <rect x="12" y="18" width="144" height="60" rx="6" fill="#0F172A" stroke="#334155" stroke-width="1.25" />
      <text x="84" y="45" text-anchor="middle" fill="#F8FAFC" font-size="11" font-family="JetBrains Mono, monospace">Client</text>
      <text x="84" y="62" text-anchor="middle" fill="#94A3B8" font-size="9" font-family="JetBrains Mono, monospace">HTTP Request</text>

      <line x1="156" y1="48" x2="206" y2="48" stroke="#3B82F6" stroke-width="1.25" marker-end="url(#arrow-cobalt-1)" />

      <rect x="208" y="18" width="164" height="60" rx="6" fill="#0F172A" stroke="#2563EB" stroke-width="1.25" />
      <text x="290" y="45" text-anchor="middle" fill="#F8FAFC" font-size="11" font-family="JetBrains Mono, monospace">Node.js API</text>
      <text x="290" y="62" text-anchor="middle" fill="#60A5FA" font-size="9" font-family="JetBrains Mono, monospace">Concurrency Gate</text>

      <line x1="372" y1="48" x2="422" y2="48" stroke="#3B82F6" stroke-width="1.25" marker-end="url(#arrow-cobalt-1)" />

      <rect x="424" y="18" width="204" height="60" rx="6" fill="#0F172A" stroke="#2563EB" stroke-width="1.25" />
      <text x="526" y="43" text-anchor="middle" fill="#F8FAFC" font-size="11" font-family="JetBrains Mono, monospace">Redis Distributed Lock</text>
      <text x="526" y="61" text-anchor="middle" fill="#60A5FA" font-size="9" font-family="JetBrains Mono, monospace">SET NX PX (Atomic TTL)</text>

      <!-- Connector: Redis -> MongoDB Transaction -->
      <path
        d="M 526 78 L 526 105 L 188 105 L 188 130"
        fill="none"
        stroke="#64748B"
        stroke-width="1.25"
        stroke-dasharray="4 3"
        marker-end="url(#arrow-slate-1)"
      />

      <!-- Row 2: MongoDB Transaction -> SSE Broadcast -->
      <rect x="64" y="132" width="248" height="60" rx="6" fill="#0F172A" stroke="#334155" stroke-width="1.25" />
      <text x="188" y="159" text-anchor="middle" fill="#F8FAFC" font-size="11" font-family="JetBrains Mono, monospace">MongoDB Transaction</text>
      <text x="188" y="176" text-anchor="middle" fill="#94A3B8" font-size="9" font-family="JetBrains Mono, monospace">Durable Seat Confirmation</text>

      <line x1="312" y1="162" x2="364" y2="162" stroke="#3B82F6" stroke-width="1.25" marker-end="url(#arrow-cobalt-1)" />

      <rect x="366" y="132" width="262" height="60" rx="6" fill="#0F172A" stroke="#2563EB" stroke-width="1.25" />
      <text x="497" y="159" text-anchor="middle" fill="#F8FAFC" font-size="11" font-family="JetBrains Mono, monospace">Server-Sent Events (SSE)</text>
      <text x="497" y="176" text-anchor="middle" fill="#60A5FA" font-size="9" font-family="JetBrains Mono, monospace">Real-Time State Broadcast</text>
    </svg>

    <!-- 03: jogosdeairsoft.com.br -->
    <svg
      v-else-if="order === 3"
      viewBox="0 0 640 210"
      class="h-auto w-full"
      role="img"
      :aria-label="`${title} — System Architecture`"
    >
      <defs>
        <marker
          id="arrow-cobalt-2"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3B82F6" />
        </marker>
        <marker
          id="arrow-slate-2"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748B" />
        </marker>
      </defs>

      <!-- Row 1: User -> Cloudflare Edge Cache & WAF -> Nuxt 4 SSR/SSG -->
      <rect x="12" y="18" width="132" height="60" rx="6" fill="#0F172A" stroke="#334155" stroke-width="1.25" />
      <text x="78" y="45" text-anchor="middle" fill="#F8FAFC" font-size="11" font-family="JetBrains Mono, monospace">User</text>
      <text x="78" y="62" text-anchor="middle" fill="#94A3B8" font-size="9" font-family="JetBrains Mono, monospace">Browser / SEO Bot</text>

      <line x1="144" y1="48" x2="188" y2="48" stroke="#3B82F6" stroke-width="1.25" marker-end="url(#arrow-cobalt-2)" />

      <rect x="190" y="18" width="210" height="60" rx="6" fill="#0F172A" stroke="#2563EB" stroke-width="1.25" />
      <text x="295" y="43" text-anchor="middle" fill="#F8FAFC" font-size="11" font-family="JetBrains Mono, monospace">Cloudflare Edge</text>
      <text x="295" y="61" text-anchor="middle" fill="#60A5FA" font-size="9" font-family="JetBrains Mono, monospace">Edge Cache &amp; WAF</text>

      <line x1="400" y1="48" x2="444" y2="48" stroke="#3B82F6" stroke-width="1.25" marker-end="url(#arrow-cobalt-2)" />

      <rect x="446" y="18" width="182" height="60" rx="6" fill="#0F172A" stroke="#2563EB" stroke-width="1.25" />
      <text x="537" y="43" text-anchor="middle" fill="#F8FAFC" font-size="11" font-family="JetBrains Mono, monospace">Nuxt 4 SSR/SSG</text>
      <text x="537" y="61" text-anchor="middle" fill="#60A5FA" font-size="9" font-family="JetBrains Mono, monospace">Semantic Routes</text>

      <!-- Connector: Nuxt 4 -> Node.js REST API -->
      <path
        d="M 537 78 L 537 105 L 220 105 L 220 130"
        fill="none"
        stroke="#64748B"
        stroke-width="1.25"
        stroke-dasharray="4 3"
        marker-end="url(#arrow-slate-2)"
      />

      <!-- Row 2: Node.js REST API -> MongoDB -->
      <rect x="108" y="132" width="224" height="60" rx="6" fill="#0F172A" stroke="#334155" stroke-width="1.25" />
      <text x="220" y="159" text-anchor="middle" fill="#F8FAFC" font-size="11" font-family="JetBrains Mono, monospace">Node.js REST API</text>
      <text x="220" y="176" text-anchor="middle" fill="#94A3B8" font-size="9" font-family="JetBrains Mono, monospace">Validation &amp; Queries</text>

      <line x1="332" y1="162" x2="394" y2="162" stroke="#3B82F6" stroke-width="1.25" marker-end="url(#arrow-cobalt-2)" />

      <rect x="396" y="132" width="232" height="60" rx="6" fill="#0F172A" stroke="#334155" stroke-width="1.25" />
      <text x="512" y="159" text-anchor="middle" fill="#F8FAFC" font-size="11" font-family="JetBrains Mono, monospace">MongoDB</text>
      <text x="512" y="176" text-anchor="middle" fill="#94A3B8" font-size="9" font-family="JetBrains Mono, monospace">Events, Fields &amp; Rules</text>
    </svg>

    <!-- 04: ProntoOrcei & MostruárioApp -->
    <svg
      v-else
      viewBox="0 0 640 120"
      class="h-auto w-full"
      role="img"
      :aria-label="`${title} — System Architecture`"
    >
      <defs>
        <marker
          id="arrow-cobalt-3"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3B82F6" />
        </marker>
        <marker
          id="arrow-slate-3"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748B" />
        </marker>
      </defs>

      <rect x="12" y="28" width="156" height="64" rx="6" fill="#0F172A" stroke="#2563EB" stroke-width="1.25" />
      <text x="90" y="57" text-anchor="middle" fill="#F8FAFC" font-size="11" font-family="JetBrains Mono, monospace">Flutter UI</text>
      <text x="90" y="75" text-anchor="middle" fill="#60A5FA" font-size="9" font-family="JetBrains Mono, monospace">Android &amp; iOS</text>

      <line x1="168" y1="60" x2="212" y2="60" stroke="#3B82F6" stroke-width="1.25" marker-end="url(#arrow-cobalt-3)" />

      <rect x="214" y="28" width="204" height="64" rx="6" fill="#0F172A" stroke="#2563EB" stroke-width="1.25" />
      <text x="316" y="55" text-anchor="middle" fill="#F8FAFC" font-size="11" font-family="JetBrains Mono, monospace">Local SQLite / Hive</text>
      <text x="316" y="74" text-anchor="middle" fill="#60A5FA" font-size="9" font-family="JetBrains Mono, monospace">Offline-First Storage</text>

      <line
        x1="422"
        y1="60"
        x2="462"
        y2="60"
        stroke="#64748B"
        stroke-width="1.25"
        stroke-dasharray="4 3"
        marker-start="url(#arrow-slate-3)"
        marker-end="url(#arrow-slate-3)"
      />

      <rect x="466" y="28" width="162" height="64" rx="6" fill="#0F172A" stroke="#334155" stroke-width="1.25" />
      <text x="547" y="55" text-anchor="middle" fill="#F8FAFC" font-size="11" font-family="JetBrains Mono, monospace">Background Sync</text>
      <text x="547" y="74" text-anchor="middle" fill="#94A3B8" font-size="9" font-family="JetBrains Mono, monospace">Reconcile Engine</text>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-vue-next'

interface HeroMetric {
  number: string
  value: string
  label: string
}

const { t, tm, rt } = useI18n()

const metrics = computed<HeroMetric[]>(() => {
  const raw = tm('hero.metrics') as Array<{
    number: unknown
    value: unknown
    label: unknown
  }>
  return raw.map((item) => ({
    number: rt(item.number as string),
    value: rt(item.value as string),
    label: rt(item.label as string),
  }))
})
</script>

<template>
  <section id="top" aria-labelledby="hero-headline" class="mx-auto max-w-6xl px-6 py-16 lg:py-24">
    <div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-12">
      <!-- Left Column (60%) -->
      <div class="space-y-8 lg:col-span-7">
        <div
          class="inline-flex items-center gap-2.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-1.5"
        >
          <span class="relative flex h-2 w-2" aria-hidden="true">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-status opacity-75"
            />
            <span class="relative inline-flex h-2 w-2 rounded-full bg-status" />
          </span>
          <span class="font-mono text-[11px] font-medium tracking-wider text-emerald-900">
            {{ t('status.badge') }}
          </span>
        </div>

        <h1
          id="hero-headline"
          class="text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]"
        >
          {{ t('hero.headline') }}
        </h1>

        <p class="max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
          {{ t('hero.bio') }}
        </p>

        <div class="flex flex-wrap items-center gap-4 pt-1">
          <a
            href="#contact"
            class="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <span>{{ t('hero.ctaPrimary') }}</span>
            <ArrowUpRight class="h-4 w-4" :stroke-width="1.75" />
          </a>

          <a
            href="#architecture"
            class="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
          >
            <span>{{ t('hero.ctaSecondary') }}</span>
            <ArrowDown class="h-4 w-4" :stroke-width="1.75" />
          </a>
        </div>

        <div class="flex items-center gap-2 pt-2 font-mono text-xs tracking-wider text-ink-muted">
          <MapPin class="h-3.5 w-3.5 text-accent" :stroke-width="1.5" />
          <span>{{ t('hero.location') }}</span>
        </div>
      </div>

      <!-- Right Column (40%) -->
      <div class="space-y-6 lg:col-span-5">
        <div class="pt-3 pr-3">
          <div class="relative">
            <div
              class="pointer-events-none absolute inset-0 translate-x-3 -translate-y-3 rounded-2xl border border-blue-600/30"
              aria-hidden="true"
            />
            <div
              class="relative aspect-[4/5] overflow-hidden rounded-2xl border border-slate-200 bg-surface"
            >
              <img
                src="/images/rafael-portrait.jpeg"
                alt="Rafael Paraná — Principal Software Architect & Hands-on Tech Lead"
                width="800"
                height="1000"
                loading="eager"
                fetchpriority="high"
                class="h-full w-full object-cover object-top"
              >
              <div
                class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-5"
              >
                <p class="font-mono text-[11px] font-medium tracking-widest text-white/95">
                  {{ t('hero.portraitRole') }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 divide-x divide-slate-200 rounded-xl border border-slate-200 bg-white">
          <div
            v-for="metric in metrics"
            :key="metric.number"
            class="p-3.5 sm:p-4"
          >
            <p class="font-mono text-[10px] tracking-wider text-ink-muted">
              {{ metric.number }}
            </p>
            <p class="mt-1 text-sm font-bold tracking-tight text-ink sm:text-base">
              {{ metric.value }}
            </p>
            <p class="mt-0.5 text-[11px] leading-tight text-ink-muted">
              {{ metric.label }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { locale, t } = useI18n()

const experienceCollection = computed(() =>
  locale.value === 'pt' ? 'experiences_pt' : 'experiences_en',
)

const { data: experiences } = await useAsyncData(
  () => `experiences-${locale.value}`,
  () => queryCollection(experienceCollection.value).order('order', 'ASC').all(),
)
</script>

<template>
  <section id="experience" class="border-t border-slate-200 bg-white py-20 lg:py-24">
    <div class="mx-auto max-w-6xl px-6">
      <div class="grid grid-cols-1 items-end gap-6 pb-12 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <p class="font-mono text-xs font-medium tracking-widest text-accent">
            {{ t('experience.eyebrow') }}
          </p>
          <h2 class="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {{ t('experience.title') }}
          </h2>
        </div>
        <p class="text-sm leading-relaxed text-ink-muted lg:col-span-5 lg:text-right">
          {{ t('experience.subtitle') }}
        </p>
      </div>

      <div v-if="experiences?.length" class="divide-y divide-slate-200 border-y border-slate-200">
        <article
          v-for="exp in experiences"
          :key="exp.id"
          class="grid grid-cols-1 gap-8 py-8 lg:grid-cols-12 lg:gap-8 lg:py-10"
        >
          <!-- Left 25% (3 of 12 cols) -->
          <div class="space-y-1.5 lg:col-span-3">
            <p class="font-mono text-xs font-medium tracking-wider text-accent">
              {{ exp.period }}
            </p>
            <h3 class="text-lg font-bold tracking-tight text-ink">
              {{ exp.company }}
            </h3>
            <p class="text-sm font-medium text-ink-muted">
              {{ exp.role }}
            </p>
          </div>

          <!-- Middle 37.5% & Right 37.5% (9 of 12 cols split 50/50) -->
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-9 lg:gap-8">
            <div
              v-for="(highlight, idx) in exp.highlights.slice(0, 2)"
              :key="idx"
              class="flex gap-3.5"
            >
              <span class="font-mono text-xs font-medium text-slate-400">
                {{ String(idx + 1).padStart(2, '0') }}
              </span>
              <p class="text-sm leading-relaxed text-ink-muted">
                {{ highlight }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

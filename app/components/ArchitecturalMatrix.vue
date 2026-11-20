<script setup lang="ts">
interface MatrixItem {
  number: string
  label: string
  skills: string[]
}

const { t, tm, rt } = useI18n()

const matrixItems = computed<MatrixItem[]>(() => {
  const raw = tm('matrix.items') as Array<{
    number: unknown
    label: unknown
    skills: unknown[]
  }>
  return raw.map((item) => ({
    number: rt(item.number as string),
    label: rt(item.label as string),
    skills: item.skills.map((skill) => rt(skill as string)),
  }))
})
</script>

<template>
  <section id="architecture" class="border-t border-slate-200 py-20 lg:py-24">
    <div class="mx-auto max-w-6xl px-6">
      <div class="grid grid-cols-1 items-end gap-6 pb-10 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <p class="font-mono text-xs font-medium tracking-widest text-accent">
            {{ t('matrix.eyebrow') }}
          </p>
          <h2 class="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {{ t('matrix.title') }}
          </h2>
        </div>
        <p class="text-sm leading-relaxed text-ink-muted lg:col-span-5 lg:text-right">
          {{ t('matrix.subtitle') }}
        </p>
      </div>

      <div
        class="grid grid-cols-1 gap-px border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4"
      >
        <article
          v-for="item in matrixItems"
          :key="item.number"
          class="bg-white p-6"
        >
          <div class="flex items-baseline gap-2 border-b border-slate-200 pb-3">
            <span class="font-mono text-xs font-medium text-accent">
              {{ item.number }}
            </span>
            <h3 class="font-mono text-xs font-semibold tracking-wider text-ink">
              {{ item.label }}
            </h3>
          </div>

          <ul class="mt-3 divide-y divide-slate-100">
            <li
              v-for="skill in item.skills"
              :key="skill"
              class="py-2 text-sm font-medium text-ink-muted"
            >
              {{ skill }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

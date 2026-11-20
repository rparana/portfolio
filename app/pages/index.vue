<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'

const { locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const collectionKey = computed(() =>
  locale.value === 'pt' ? 'projects_pt' : 'projects_en',
)

const { data: projects } = await useAsyncData(
  () => `projects-${locale.value}`,
  () => queryCollection(collectionKey.value).order('order', 'ASC').all(),
)

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
})
</script>

<template>
  <main class="mx-auto max-w-4xl px-6 py-20">
    <header class="flex items-center justify-between border-b border-border-subtle pb-6">
      <span class="font-mono text-sm text-status">
        {{ t('status.initialized') }}
      </span>
      <NuxtLink
        :to="switchLocalePath(locale === 'en' ? 'pt' : 'en')"
        class="inline-flex items-center gap-1 font-mono text-sm text-accent hover:underline"
      >
        {{ locale === 'en' ? 'PT' : 'EN' }}
        <ArrowUpRight class="h-3.5 w-3.5" :stroke-width="1.5" />
      </NuxtLink>
    </header>

    <section class="mt-12 space-y-4">
      <h1 class="text-3xl font-semibold tracking-tight text-ink">
        Rafael Paraná
      </h1>
      <p class="text-ink-muted">
        {{ t('meta.description') }}
      </p>
      <ul v-if="projects?.length" class="mt-6 space-y-3">
        <li
          v-for="project in projects"
          :key="project.id"
          class="rounded-lg border border-border-subtle bg-surface p-4"
        >
          <p class="font-medium text-ink">{{ project.title }}</p>
          <p class="mt-1 text-sm text-ink-muted">{{ project.summary }}</p>
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
})
</script>

<template>
  <div class="min-h-screen bg-alabaster text-ink">
    <AppHeader />
    <main>
      <HeroSection />
      <ArchitecturalMatrix />
      <ExperienceSection />
      <ProjectsSection />
    </main>
    <AppFooter />
  </div>
</template>

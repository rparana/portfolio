<script setup lang="ts">
const { locale, t } = useI18n()
const head = useLocaleHead()

useHead(head)

const personJsonLd = computed(() =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rafael Paraná',
    url: 'https://rafaelparana.me',
    image: 'https://rafaelparana.me/images/rafael-portrait.jpeg',
    jobTitle:
      locale.value === 'pt'
        ? 'Arquiteto de Software & Tech Lead'
        : 'Software Architect & Tech Lead',
    description: t('meta.description'),
    sameAs: [
      'https://rparana.me/github',
      'https://rparana.me/linkedin',
    ],
    knowsAbout: [
      'Distributed Systems',
      'Event-Driven Architecture',
      'Apache Kafka',
      'CDC / Debezium',
      'Clean Architecture',
      'Node.js',
      'TypeScript',
      'Multi-Cloud FinOps',
      'Kubernetes',
    ],
  }),
)

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: personJsonLd,
    },
  ],
})
</script>

<template>
  <NuxtPage />
</template>

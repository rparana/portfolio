<script setup lang="ts">
const { locale, t } = useI18n()
const route = useRoute()
const head = useLocaleHead()
const domain = 'https://rafaelparana.me'

useHead(head)

const canonicalUrl = computed(() => {
  const path = route.path === '/' ? '/' : route.path.replace(/\/$/, '')
  return `${domain}${path}`
})

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
  ogType: 'profile',
  ogSiteName: 'Rafael Paraná',
  ogTitle: () => t('meta.title'),
  ogDescription: () => t('meta.description'),
  ogUrl: () => canonicalUrl.value,
  ogLocale: () => (locale.value === 'pt' ? 'pt_BR' : 'en_US'),
  ogImage: `${domain}/images/og-card.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: () => t('meta.ogImageAlt'),
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('meta.title'),
  twitterDescription: () => t('meta.description'),
  twitterImage: `${domain}/images/og-card.png`,
})

const structuredData = computed(() =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${domain}/#person`,
        name: 'Rafael Paraná e Silva Landi',
        alternateName: ['Rafael Paraná', 'rparana'],
        url: domain,
        image: `${domain}/images/rafael-portrait.jpeg`,
        jobTitle:
          locale.value === 'pt'
            ? 'Arquiteto de Software Principal & Tech Lead Hands-on'
            : 'Principal Software Architect & Hands-on Tech Lead',
        description: t('meta.description'),
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Pontal do Paraná',
          addressRegion: 'PR',
          addressCountry: 'BR',
        },
        sameAs: [
          'https://rparana.me/linkedin',
          'https://rparana.me/github',
          'https://jogosdeairsoft.com.br',
        ],
        knowsAbout: [
          'Software Architecture',
          'Event-Driven Architecture',
          'Apache Kafka',
          'Change Data Capture',
          'Debezium',
          'Node.js',
          'TypeScript',
          'Clean Architecture',
          'Domain-Driven Design',
          'Kubernetes',
          'Terraform',
          'Multi-Cloud',
          'FinOps',
          'Platform Engineering',
        ],
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'UniCesumar',
        },
        worksFor: {
          '@type': 'Organization',
          name: 'Artcoder',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${domain}/#website`,
        url: domain,
        name: 'Rafael Paraná — Principal Software Architect & Hands-on Tech Lead',
        inLanguage: ['en-US', 'pt-BR'],
        publisher: {
          '@id': `${domain}/#person`,
        },
      },
    ],
  }),
)

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: structuredData,
    },
  ],
})
</script>

<template>
  <NuxtPage />
</template>

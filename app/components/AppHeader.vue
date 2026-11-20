<script setup lang="ts">
import { ArrowDown, Menu, X } from 'lucide-vue-next'

const { locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const isMobileMenuOpen = ref(false)

const cvHref = computed(() =>
  locale.value === 'en' ? '/cv-rafael-parana-en.pdf' : '/cv-rafael-parana.pdf',
)

const navLinks = computed(() => [
  { href: '#architecture', label: t('nav.architecture') },
  { href: '#experience', label: t('nav.experience') },
  { href: '#projects', label: t('nav.projects') },
  { href: '#contact', label: t('nav.contact') },
])

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-slate-200 bg-[#F8FAFC]/90 backdrop-blur-md">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
      <a
        href="#top"
        class="inline-flex items-center gap-2.5 font-mono text-sm font-medium tracking-tight text-ink"
      >
        <img
          src="/images/rpLogo.png"
          alt="Rafael Paraná"
          width="36"
          height="28"
          class="h-7 w-auto object-contain"
        >
        <span>rafaelparana.me</span>
      </a>

      <nav class="hidden items-center gap-7 md:flex" aria-label="Primary">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex items-center gap-3">
        <a
          :href="cvHref"
          download
          class="hidden items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 font-mono text-xs font-medium tracking-wide text-ink transition-colors hover:border-ink sm:inline-flex"
        >
          <span>{{ t('nav.downloadCv') }}</span>
          <ArrowDown class="h-3.5 w-3.5" :stroke-width="1.5" />
        </a>

        <NuxtLink
          :to="switchLocalePath(locale === 'en' ? 'pt' : 'en')"
          class="inline-flex items-center rounded-md border border-slate-200 bg-surface px-2.5 py-1.5 font-mono text-xs font-medium tracking-wide text-ink transition-colors hover:border-slate-300"
        >
          {{ t('nav.localeSwitch') }}
        </NuxtLink>

        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md border border-slate-200 p-1.5 text-ink md:hidden"
          :aria-expanded="isMobileMenuOpen"
          :aria-label="isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <X v-if="isMobileMenuOpen" class="h-4 w-4" :stroke-width="1.5" />
          <Menu v-else class="h-4 w-4" :stroke-width="1.5" />
        </button>
      </div>
    </div>

    <div
      v-if="isMobileMenuOpen"
      class="border-t border-slate-200 bg-[#F8FAFC] px-6 py-4 md:hidden"
    >
      <nav class="flex flex-col gap-3" aria-label="Mobile">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="py-1 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
          @click="closeMobileMenu"
        >
          {{ link.label }}
        </a>
        <a
          :href="cvHref"
          download
          class="mt-2 inline-flex w-fit items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 font-mono text-xs font-medium tracking-wide text-ink"
          @click="closeMobileMenu"
        >
          <span>{{ t('nav.downloadCv') }}</span>
          <ArrowDown class="h-3.5 w-3.5" :stroke-width="1.5" />
        </a>
      </nav>
    </div>
  </header>
</template>

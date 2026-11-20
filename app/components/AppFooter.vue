<script setup lang="ts">
import { ArrowUp, Check, Copy, Github, Linkedin, MessageCircle } from 'lucide-vue-next'

const { t } = useI18n()

const email = 'rafael@rafaelparana.me'
const copied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined

async function copyEmail() {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText(email)
    copied.value = true
    if (resetTimer) clearTimeout(resetTimer)
    resetTimer = setTimeout(() => {
      copied.value = false
    }, 2200)
  }
  catch {
    window.location.href = `mailto:${email}`
  }
}

onBeforeUnmount(() => {
  if (resetTimer) clearTimeout(resetTimer)
})
</script>

<template>
  <footer id="contact" class="bg-[#062419] pt-24 pb-12 text-white">
    <div class="mx-auto max-w-6xl px-6">
      <div class="max-w-3xl space-y-6">
        <p class="font-mono text-xs font-medium tracking-widest text-emerald-300">
          {{ t('footer.eyebrow') }}
        </p>
        <h2 class="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          {{ t('footer.headline') }}
        </h2>
      </div>

      <div
        class="mt-14 grid grid-cols-1 gap-8 border-t border-emerald-900/80 pt-10 md:grid-cols-3"
      >
        <!-- Email (click-to-copy) -->
        <div class="space-y-2">
          <p class="font-mono text-[11px] tracking-widest text-emerald-300/80">
            {{ t('footer.emailLabel') }}
          </p>
          <button
            type="button"
            class="inline-flex cursor-pointer items-center gap-2.5 text-left text-base font-medium text-white transition-colors hover:text-emerald-200"
            @click="copyEmail"
          >
            <span>{{ email }}</span>
            <span
              v-if="copied"
              class="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[11px] text-emerald-200"
            >
              <Check class="h-3 w-3" :stroke-width="2" />
              {{ t('footer.copied') }}
            </span>
            <Copy v-else class="h-4 w-4 text-emerald-300/80" :stroke-width="1.5" />
          </button>
        </div>

        <!-- WhatsApp -->
        <div class="space-y-2">
          <p class="font-mono text-[11px] tracking-widest text-emerald-300/80">
            {{ t('footer.whatsappLabel') }}
          </p>
          <a
            href="https://wa.me/5541998796809"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-base font-medium text-white transition-colors hover:text-emerald-200"
          >
            <MessageCircle class="h-4 w-4 text-emerald-300/80" :stroke-width="1.5" />
            <span>+55 41 99879-6809</span>
          </a>
        </div>

        <!-- LinkedIn & GitHub -->
        <div class="space-y-2">
          <p class="font-mono text-[11px] tracking-widest text-emerald-300/80">
            {{ t('footer.socialLabel') }}
          </p>
          <div class="flex flex-wrap items-center gap-5">
            <a
              href="https://rparana.me/linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-base font-medium text-white transition-colors hover:text-emerald-200"
            >
              <Linkedin class="h-4 w-4 text-emerald-300/80" :stroke-width="1.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://rparana.me/github"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-base font-medium text-white transition-colors hover:text-emerald-200"
            >
              <Github class="h-4 w-4 text-emerald-300/80" :stroke-width="1.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>

      <div
        class="mt-16 flex flex-col items-start justify-between gap-4 border-t border-emerald-900/80 pt-8 sm:flex-row sm:items-center"
      >
        <p class="font-mono text-xs text-emerald-200/70">
          © {{ new Date().getFullYear() }} {{ t('footer.copyright') }}
        </p>

        <a
          href="#top"
          class="inline-flex items-center gap-1.5 font-mono text-xs font-medium tracking-wider text-emerald-200 transition-colors hover:text-white"
        >
          <span>{{ t('footer.backToTop') }}</span>
          <ArrowUp class="h-3.5 w-3.5" :stroke-width="1.75" />
        </a>
      </div>
    </div>
  </footer>
</template>

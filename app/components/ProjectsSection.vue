<script setup lang="ts">
import { ArrowUpRight, ExternalLink, Github, X } from 'lucide-vue-next'

const { locale, t } = useI18n()

const projectCollection = computed(() =>
  locale.value === 'pt' ? 'projects_pt' : 'projects_en',
)

const { data: projects } = await useAsyncData(
  () => `projects-${locale.value}`,
  () => queryCollection(projectCollection.value).order('order', 'ASC').all(),
)

type ProjectItem = NonNullable<typeof projects.value>[number]

const selectedProject = ref<ProjectItem | null>(null)
const drawerRef = ref<HTMLDialogElement | null>(null)

function openDrawer(project: ProjectItem) {
  selectedProject.value = project
  drawerRef.value?.showModal()
}

function closeDrawer() {
  drawerRef.value?.close()
}

function handleDialogClose() {
  selectedProject.value = null
}

onMounted(() => {
  const dialog = drawerRef.value
  if (!dialog) return

  // Light-dismiss fallback for browsers without native closedby support (e.g. Safari)
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    const isOutside = (e: PointerEvent) => {
      const rect = dialog.getBoundingClientRect()
      return (
        e.clientX < rect.left
        || e.clientX > rect.right
        || e.clientY < rect.top
        || e.clientY > rect.bottom
      )
    }
    let pressedOutside = false
    dialog.addEventListener('pointerdown', (e) => {
      pressedOutside = isOutside(e)
    })
    dialog.addEventListener('pointerup', (e) => {
      if (pressedOutside && isOutside(e)) {
        dialog.close()
      }
    })
  }
})
</script>

<template>
  <section id="projects" class="bg-[#0B1120] py-24 text-white">
    <div class="mx-auto max-w-6xl px-6">
      <div class="grid grid-cols-1 items-end gap-6 pb-12 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <p class="font-mono text-xs font-medium tracking-widest text-blue-400">
            {{ t('projects.eyebrow') }}
          </p>
          <h2 class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {{ t('projects.title') }}
          </h2>
        </div>
        <p class="text-sm leading-relaxed text-slate-400 lg:col-span-5 lg:text-right">
          {{ t('projects.subtitle') }}
        </p>
      </div>

      <div v-if="projects?.length" class="divide-y divide-slate-800 border-y border-slate-800">
        <article
          v-for="(project, index) in projects"
          :key="project.id"
          class="group grid grid-cols-1 items-center gap-6 py-8 transition-colors lg:grid-cols-12 lg:gap-8"
        >
          <div class="flex items-baseline gap-4 lg:col-span-4">
            <span class="font-mono text-xs font-medium text-blue-400">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <h3 class="text-xl font-semibold tracking-tight text-white">
              {{ project.title }}
            </h3>
          </div>

          <div class="space-y-3 lg:col-span-5">
            <p class="text-sm leading-relaxed text-slate-300">
              {{ project.summary }}
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in project.stack"
                :key="tag"
                class="rounded border border-slate-700/80 bg-slate-900/80 px-2.5 py-0.5 font-mono text-[11px] text-slate-300"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <div class="flex lg:col-span-3 lg:justify-end">
            <button
              type="button"
              class="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-slate-700 bg-slate-900/60 px-4 py-2 font-mono text-xs font-medium tracking-wider text-white transition-colors hover:border-blue-400 hover:text-blue-300"
              @click="openDrawer(project)"
            >
              <span>{{ t('projects.viewProject') }}</span>
              <ArrowUpRight class="h-3.5 w-3.5" :stroke-width="1.75" />
            </button>
          </div>
        </article>
      </div>
    </div>

    <!-- Right-side Slide-Over Architectural Drawer -->
    <dialog
      ref="drawerRef"
      closedby="any"
      aria-labelledby="drawer-project-title"
      class="arch-drawer fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-dvh w-full max-w-2xl overflow-y-auto border-l border-slate-800 bg-[#0B1120] p-0 text-white shadow-2xl"
      @close="handleDialogClose"
    >
      <div v-if="selectedProject" class="flex min-h-full flex-col">
        <div
          class="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-800 bg-[#0B1120]/95 px-6 py-5 backdrop-blur-md"
        >
          <div>
            <p class="font-mono text-xs tracking-wider text-blue-400">
              {{ selectedProject.year }}
            </p>
            <h3 id="drawer-project-title" class="mt-1 text-xl font-bold tracking-tight text-white">
              {{ selectedProject.title }}
            </h3>
          </div>

          <button
            type="button"
            autofocus
            class="inline-flex cursor-pointer items-center justify-center rounded-md border border-slate-700 p-2 text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
            :aria-label="t('projects.closeDrawer')"
            @click="closeDrawer"
          >
            <X class="h-4 w-4" :stroke-width="1.75" />
          </button>
        </div>

        <div class="flex-1 space-y-8 p-6">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in selectedProject.stack"
              :key="tag"
              class="rounded border border-slate-700 bg-slate-900 px-2.5 py-1 font-mono text-xs text-slate-300"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Inline System Architecture Diagram -->
          <div class="space-y-3">
            <p class="font-mono text-xs font-medium tracking-widest text-blue-400">
              {{ t('projects.architectureDiagram') }}
            </p>
            <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <!-- Diagram 1: Seat Reservation POC -->
              <svg
                v-if="selectedProject.order === 1"
                viewBox="0 0 640 170"
                class="h-auto w-full"
                role="img"
                aria-label="High-Concurrency Seat Reservation Architecture"
              >
                <rect x="12" y="55" width="120" height="58" rx="8" fill="#0F172A" stroke="#334155" />
                <text x="72" y="81" text-anchor="middle" fill="#F8FAFC" font-size="11" font-family="monospace">Clients</text>
                <text x="72" y="98" text-anchor="middle" fill="#94A3B8" font-size="9" font-family="monospace">HTTP + SSE</text>

                <line x1="132" y1="84" x2="188" y2="84" stroke="#2563EB" stroke-width="1.5" stroke-dasharray="4 3" />

                <rect x="188" y="55" width="140" height="58" rx="8" fill="#0F172A" stroke="#2563EB" />
                <text x="258" y="81" text-anchor="middle" fill="#F8FAFC" font-size="11" font-family="monospace">Node.js API</text>
                <text x="258" y="98" text-anchor="middle" fill="#60A5FA" font-size="9" font-family="monospace">Lock + SSE Stream</text>

                <line x1="328" y1="70" x2="404" y2="42" stroke="#059669" stroke-width="1.5" />
                <line x1="328" y1="98" x2="404" y2="126" stroke="#64748B" stroke-width="1.5" />

                <rect x="404" y="14" width="220" height="54" rx="8" fill="#0F172A" stroke="#059669" />
                <text x="514" y="38" text-anchor="middle" fill="#F8FAFC" font-size="11" font-family="monospace">Redis</text>
                <text x="514" y="54" text-anchor="middle" fill="#34D399" font-size="9" font-family="monospace">Atomic Seat Lock + TTL</text>

                <rect x="404" y="100" width="220" height="54" rx="8" fill="#0F172A" stroke="#334155" />
                <text x="514" y="124" text-anchor="middle" fill="#F8FAFC" font-size="11" font-family="monospace">MongoDB</text>
                <text x="514" y="140" text-anchor="middle" fill="#94A3B8" font-size="9" font-family="monospace">Confirmed Reservations</text>
              </svg>

              <!-- Diagram 2: jogosdeairsoft.com.br -->
              <svg
                v-else-if="selectedProject.order === 2"
                viewBox="0 0 640 140"
                class="h-auto w-full"
                role="img"
                aria-label="jogosdeairsoft.com.br System Architecture"
              >
                <rect x="12" y="40" width="130" height="58" rx="8" fill="#0F172A" stroke="#334155" />
                <text x="77" y="66" text-anchor="middle" fill="#F8FAFC" font-size="11" font-family="monospace">Cloudflare</text>
                <text x="77" y="83" text-anchor="middle" fill="#94A3B8" font-size="9" font-family="monospace">Edge Cache + DNS</text>

                <line x1="142" y1="69" x2="178" y2="69" stroke="#2563EB" stroke-width="1.5" />

                <rect x="178" y="40" width="136" height="58" rx="8" fill="#0F172A" stroke="#2563EB" />
                <text x="246" y="66" text-anchor="middle" fill="#F8FAFC" font-size="11" font-family="monospace">Nuxt 4</text>
                <text x="246" y="83" text-anchor="middle" fill="#60A5FA" font-size="9" font-family="monospace">SSR + SEO Routes</text>

                <line x1="314" y1="69" x2="350" y2="69" stroke="#2563EB" stroke-width="1.5" />

                <rect x="350" y="40" width="130" height="58" rx="8" fill="#0F172A" stroke="#334155" />
                <text x="415" y="66" text-anchor="middle" fill="#F8FAFC" font-size="11" font-family="monospace">Node.js</text>
                <text x="415" y="83" text-anchor="middle" fill="#94A3B8" font-size="9" font-family="monospace">REST API Layer</text>

                <line x1="480" y1="69" x2="516" y2="69" stroke="#059669" stroke-width="1.5" />

                <rect x="516" y="40" width="112" height="58" rx="8" fill="#0F172A" stroke="#059669" />
                <text x="572" y="66" text-anchor="middle" fill="#F8FAFC" font-size="11" font-family="monospace">MongoDB</text>
                <text x="572" y="83" text-anchor="middle" fill="#34D399" font-size="9" font-family="monospace">Events &amp; Fields</text>
              </svg>

              <!-- Diagram 3: ProntoOrcei & MostruarioApp -->
              <svg
                v-else
                viewBox="0 0 640 140"
                class="h-auto w-full"
                role="img"
                aria-label="Offline-first Flutter Mobile Architecture"
              >
                <rect x="12" y="40" width="165" height="58" rx="8" fill="#0F172A" stroke="#2563EB" />
                <text x="94" y="66" text-anchor="middle" fill="#F8FAFC" font-size="11" font-family="monospace">Flutter App</text>
                <text x="94" y="83" text-anchor="middle" fill="#60A5FA" font-size="9" font-family="monospace">Quotes &amp; Catalog UI</text>

                <line x1="177" y1="69" x2="225" y2="69" stroke="#059669" stroke-width="1.5" />

                <rect x="225" y="40" width="180" height="58" rx="8" fill="#0F172A" stroke="#059669" />
                <text x="315" y="66" text-anchor="middle" fill="#F8FAFC" font-size="11" font-family="monospace">Local Store</text>
                <text x="315" y="83" text-anchor="middle" fill="#34D399" font-size="9" font-family="monospace">Offline-First Queue</text>

                <line x1="405" y1="69" x2="453" y2="69" stroke="#64748B" stroke-width="1.5" stroke-dasharray="4 3" />

                <rect x="453" y="40" width="175" height="58" rx="8" fill="#0F172A" stroke="#334155" />
                <text x="540" y="66" text-anchor="middle" fill="#F8FAFC" font-size="11" font-family="monospace">Async Sync</text>
                <text x="540" y="83" text-anchor="middle" fill="#94A3B8" font-size="9" font-family="monospace">Reconcile on Network</text>
              </svg>
            </div>
          </div>

          <!-- Case Study Body -->
          <div class="space-y-3">
            <p class="font-mono text-xs font-medium tracking-widest text-blue-400">
              {{ t('projects.technicalDetails') }}
            </p>
            <div
              class="space-y-4 text-sm leading-relaxed text-slate-300 [&_h2]:mt-6 [&_h2]:mb-2 [&_h2]:font-mono [&_h2]:text-xs [&_h2]:font-semibold [&_h2]:tracking-wider [&_h2]:text-white [&_h2]:uppercase [&_li]:my-1.5 [&_strong]:font-semibold [&_strong]:text-white [&_ul]:list-disc [&_ul]:pl-5"
            >
              <ContentRenderer :value="selectedProject" />
            </div>
          </div>
        </div>

        <div
          v-if="selectedProject.liveUrl || selectedProject.repoUrl"
          class="flex flex-wrap gap-3 border-t border-slate-800 px-6 py-5"
        >
          <a
            v-if="selectedProject.liveUrl"
            :href="selectedProject.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 font-mono text-xs font-medium tracking-wider text-white transition-colors hover:bg-blue-700"
          >
            <ExternalLink class="h-3.5 w-3.5" :stroke-width="1.75" />
            <span>{{ t('projects.liveSite') }}</span>
          </a>

          <a
            v-if="selectedProject.repoUrl"
            :href="selectedProject.repoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-900 px-4 py-2 font-mono text-xs font-medium tracking-wider text-white transition-colors hover:border-slate-500"
          >
            <Github class="h-3.5 w-3.5" :stroke-width="1.75" />
            <span>{{ t('projects.sourceCode') }}</span>
          </a>
        </div>
      </div>
    </dialog>
  </section>
</template>

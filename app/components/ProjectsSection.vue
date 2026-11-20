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
            <ProjectArchitectureDiagram
              :order="selectedProject.order"
              :title="selectedProject.title"
            />
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

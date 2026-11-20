import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

const experienceSchema = z.object({
  role: z.string(),
  company: z.string(),
  period: z.string(),
  location: z.string(),
  current: z.boolean().default(false),
  order: z.number().int(),
  stack: z.array(z.string()).default([]),
})

const projectSchema = z.object({
  title: z.string(),
  summary: z.string(),
  year: z.string(),
  featured: z.boolean().default(false),
  order: z.number().int(),
  stack: z.array(z.string()).default([]),
  liveUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
})

export default defineContentConfig({
  collections: {
    experiences_en: defineCollection({
      type: 'page',
      source: 'en/experiences/*.md',
      schema: experienceSchema,
    }),
    experiences_pt: defineCollection({
      type: 'page',
      source: 'pt/experiences/*.md',
      schema: experienceSchema,
    }),
    projects_en: defineCollection({
      type: 'page',
      source: 'en/projects/*.md',
      schema: projectSchema,
    }),
    projects_pt: defineCollection({
      type: 'page',
      source: 'pt/projects/*.md',
      schema: projectSchema,
    }),
  },
})

# Rafael Paraná — Portfolio

Personal portfolio website for Rafael Paraná ([rafaelparana.me](https://rafaelparana.me)), built with **Nuxt 4** (`compatibilityVersion: 4`) and configured for static site generation on **Cloudflare Pages**.

## Tech Stack

- **Framework:** [Nuxt 4](https://nuxt.com/) (`4.6.4`) with strict TypeScript (`strict: true`)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite` with CSS-first `@theme` design tokens
- **Content:** [`@nuxt/content`](https://content.nuxt.com/) v3 with Zod-validated locale collections (`node:sqlite` native connector)
- **Internationalization:** [`@nuxtjs/i18n`](https://i18n.nuxtjs.org/) (`en` default at `/`, `pt` at `/pt`, `strategy: 'prefix_except_default'`)
- **Typography:** [`@nuxt/fonts`](https://fonts.nuxt.com/) (`Plus Jakarta Sans` & `JetBrains Mono`)
- **Icons:** [`lucide-vue-next`](https://lucide.dev/)
- **Linting & Typechecking:** `@nuxt/eslint`, ESLint, and `vue-tsc`

## Project Structure

```text
├── app/
│   ├── assets/css/main.css    # Tailwind v4 @theme design tokens & base styles
│   ├── components/            # Vue UI components
│   ├── pages/                 # File-based routes
│   └── app.vue                # Root shell & i18n head management
├── content/
│   ├── en/
│   │   ├── experiences/       # English experience entries (.md)
│   │   └── projects/          # English project case studies (.md)
│   └── pt/
│       ├── experiences/       # Portuguese experience entries (.md)
│       └── projects/          # Portuguese project case studies (.md)
├── i18n/
│   └── locales/
│       ├── en.json            # English UI translations
│       └── pt.json            # Portuguese UI translations
├── content.config.ts          # @nuxt/content v3 collection schemas
├── eslint.config.mjs          # ESLint flat config
└── nuxt.config.ts             # Nuxt 4, SEO, fonts, i18n & Cloudflare Pages preset
```

## Getting Started

Install dependencies using `pnpm`:

```bash
pnpm install
```

### Development

Start the local development server:

```bash
pnpm dev
```

### Quality Checks

Run strict TypeScript typechecking and ESLint:

```bash
pnpm typecheck
pnpm lint
```

### Static Build & Preview

Generate the static site for Cloudflare Pages into `dist/`:

```bash
pnpm generate
```

Preview locally with Wrangler or Nuxt:

```bash
pnpm preview
# or
npx wrangler pages dev dist
```

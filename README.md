# Zogno & Partners — legalboutiques.com

Sito ufficiale dello studio legale boutique Zogno & Partners (Vicenza · Cipro).

**Production:** https://legalboutiques.com

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Supabase (auth, database, edge functions)
- React Router v6
- React Query
- Framer Motion

## Sviluppo locale

Requisiti: Node.js 18+ e npm.

```sh
git clone https://github.com/unvrslabs/barbarazogno.git
cd barbarazogno
npm install
npm run dev    # http://localhost:8080
```

## Script disponibili

| Comando             | Descrizione                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Dev server con hot reload            |
| `npm run build`     | Build di produzione (`dist/`)        |
| `npm run build:dev` | Build in modalità development        |
| `npm run lint`      | ESLint check                         |
| `npm run preview`   | Anteprima della build di produzione  |

## Struttura

```
src/
  pages/          Una pagina per route
  components/
    landing/      Sezioni della landing
    layout/       Navbar e layout shell
    dashboard/    Area riservata
    ui/           Primitivi shadcn/ui (non modificare manualmente)
  contexts/       Auth + i18n (LanguageContext)
  integrations/   Client Supabase
  hooks/          Custom hooks
  lib/            Utility
supabase/
  migrations/     Migrazioni SQL (in ordine)
  functions/      Edge functions (Deno)
public/
  books/          Copertine pubblicazioni
  contracts/      Anteprime contratti
```

## Convenzioni

- Componenti funzionali con named export
- Tailwind only (no inline styles)
- TypeScript strict (no `any`)
- Conventional Commits
- Mobile-first responsive (`sm:`, `md:`, `lg:`)

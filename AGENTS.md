# AGENTS.md — Coding Agent Instructions

## Project: Fresh Start Community Services Website

This is a Next.js 15/16 App Router project with TypeScript and Tailwind CSS v4.

## Key Files
- Database layer: `src/lib/db.ts`
- Auth utilities: `src/lib/auth.ts`
- Seed data: `src/lib/seed-data.ts`
- Database file: `data/fsc_database.json` (auto-created)
- Middleware: `middleware.ts` (admin route protection)
- Types: `src/types/database.ts`

## Important Rules
1. NEVER invent organizational facts, bios, statistics, or contact information
2. Mission and Vision statements must be preserved verbatim from seed-data.ts
3. Leadership bios are placeholder data — real bios await Google Drive access
4. Stripe integration is currently in MOCK MODE — do not claim it processes real payments
5. Password comparison in auth.ts is plaintext (dev only) — document but do not deploy to production
6. The JSON file DB at data/fsc_database.json does NOT persist on Vercel serverless

## Dev Commands
```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint check
```

## Admin Credentials (Dev Only)
- admin@freshstartcommunityservices.com / admin123
- content@freshstartcommunityservices.com / fsc2026!

## Brand Colors
- Primary Green: #258C4F
- Accent Lime: #ADFF1C
- Dark: #1E1E1E
- Off-white: #FCFCFC

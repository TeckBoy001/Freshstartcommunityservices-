# Fresh Start Community Services — Website & CMS

Full-stack nonprofit website and content management system for **Fresh Start Community Services, Inc.**

- **Domain:** freshstartcommunityservices.com
- **Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · React 19
- **Database:** Persistent file-based JSON (`data/fsc_database.json`)
- **Auth:** Cookie-based admin authentication (HMAC SHA-256 signed tokens)

---

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env.local

# 3. Edit .env.local and fill in required values (see Environment Variables below)

# 4. Start the development server
npm run dev

# 5. Open http://localhost:3000
```

---

## Admin CMS Login (Development Only)

> [!WARNING]
> **CHANGE THESE CREDENTIALS BEFORE PRODUCTION LAUNCH.**
> Passwords are stored as plaintext in dev mode. See [Security Notes](#security-notes).

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@freshstartcommunityservices.com | `admin123` |
| Content Lead | content@freshstartcommunityservices.com | `fsc2026!` |

**Admin panel:** http://localhost:3000/admin

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in each value. The table below explains every variable and when it is required.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | ✅ Always | Public base URL of the site (e.g. `https://freshstartcommunityservices.com`). Used for canonical URLs and OG tags. |
| `PORT` | Dev only | Local dev server port. Defaults to `3000` if omitted. |
| `ADMIN_SESSION_SECRET` | ✅ Always | Secret used to HMAC-sign admin session cookies. **Must be 32+ random characters in production.** |
| `STRIPE_SECRET_KEY` | Production | Stripe secret key (`sk_live_...`). Use `sk_test_...` for test mode. Currently mocked — see [Stripe Integration](#stripe-online-donations). |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Production | Stripe publishable key (`pk_live_...` or `pk_test_...`). Exposed to the browser. |
| `STRIPE_WEBHOOK_SECRET` | Production | Webhook signing secret (`whsec_...`) from Stripe Dashboard. Required to verify incoming webhook events. |
| `NEXT_PUBLIC_SUPABASE_URL` | Production | Supabase project URL. Required only when migrating away from the file-based JSON DB. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production | Supabase anonymous (public) key. Safe to expose to the browser. |
| `SUPABASE_SERVICE_ROLE_KEY` | Production | Supabase service-role key. **Server-side only. Never expose to the browser.** |
| `RESEND_API_KEY` | Production | API key from [resend.com](https://resend.com) for transactional email. Currently not connected — see [Email Notifications](#email-notifications-resend). |
| `FROM_EMAIL` | Production | Verified sender address for outbound email receipts (e.g. `receipts@freshstartcommunityservices.com`). |

---

## Website Architecture

### Public Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, mission statement, featured programs & impact stats |
| `/about` | Organization overview, history, and mission/vision |
| `/leadership` | Board of directors and staff profiles |
| `/programs` | Full program catalog |
| `/programs/[slug]` | Individual program detail page |
| `/impact` | Impact metrics, statistics, and success stories |
| `/news` | Blog and news listing |
| `/news/[slug]` | Individual article / blog post |
| `/events` | Upcoming events listing |
| `/get-involved` | Volunteer and engagement opportunities |
| `/donate` | Online donation form (Stripe-powered) |
| `/contact` | Contact form and location info |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/accessibility` | Accessibility Statement |

### Admin CMS Pages

| Route | Description |
|-------|-------------|
| `/admin` | Dashboard — overview and quick stats |
| `/admin/leadership` | Director and staff profile management |
| `/admin/programs` | Program catalog editor |
| `/admin/articles` | Blog & news article editor |
| `/admin/events` | Event creation and management |
| `/admin/campaigns` | Fundraising campaign management |
| `/admin/donations` | Donation records viewer with CSV export |
| `/admin/inquiries` | Contact form submissions and volunteer applications |
| `/admin/pages` | Site-wide content editor (static page copy) |
| `/admin/clients` | Case intake records — restricted access |
| `/admin/media` | Media library and file uploads |

All `/admin/*` routes are protected by Next.js middleware (`middleware.ts`). Unauthenticated requests are redirected to `/admin/login`.

---

## Database

- **File:** `data/fsc_database.json`
- **Initialized from:** `src/lib/seed-data.ts`
- **Reset:** Delete `data/fsc_database.json` — it is automatically recreated from seed data on the next server start.
- **Backup:** Copy `data/fsc_database.json` to a safe location before making destructive changes.

> [!CAUTION]
> The file-based JSON database does **NOT** persist on Vercel serverless deployments. Migrate to Supabase before going to production. See [Database Migration to Supabase](#database-migration-to-supabase-production-upgrade).

---

## Third-Party Integrations

### Stripe (Online Donations)

> [!NOTE]
> Currently in **MOCK MODE** — no real Stripe account is connected. Donation submissions are recorded locally but no real charges are processed.

To activate real Stripe payments:

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from **Stripe Dashboard → Developers → API Keys**
3. Set `STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY` in `.env.local`
4. Create a webhook endpoint in Stripe pointing to:
   ```
   https://yourdomain.com/api/donations/webhook
   ```
5. Set `STRIPE_WEBHOOK_SECRET` in `.env.local`
6. Update `src/app/api/donations/checkout/route.ts` to use the Stripe SDK

### Email Notifications (Resend)

> [!NOTE]
> Currently **NOT connected** — no email provider is configured. Donation receipts and contact confirmations are not sent.

To activate:

1. Create an account at [resend.com](https://resend.com)
2. Add and verify your domain (`freshstartcommunityservices.com`)
3. Set `RESEND_API_KEY` in `.env.local`
4. Set `FROM_EMAIL` to your verified sender address

---

## Security Notes

> [!CAUTION]
> The following **must** be addressed before any production launch.

1. **Change `ADMIN_SESSION_SECRET`** to a long, randomly-generated string (32+ characters).
2. **Replace plaintext password comparison** in `src/lib/auth.ts` with bcrypt:
   ```bash
   npm install bcryptjs @types/bcryptjs
   ```
   - Use `bcrypt.compare(attempt, hash)` instead of `admin.password_hash === attempt`
   - Re-hash all admin passwords with `bcrypt.hash(password, 12)` and update `src/lib/seed-data.ts`
3. **Admin route protection** is enforced by `middleware.ts` for all `/admin/*` routes.

---

## Database Migration to Supabase (Production Upgrade)

A PostgreSQL schema is available at `supabase/migrations/001_initial_schema.sql`.

To migrate:

1. Create a [Supabase](https://supabase.com) project
2. Run the migration SQL in **Supabase → SQL Editor**
3. Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`
4. Replace file-based functions in `src/lib/db.ts` with Supabase client queries

---

## Deployment (Vercel — Recommended)

1. Push this repository to GitHub
2. Connect the repo to Vercel at [vercel.com/new](https://vercel.com/new)
3. Set all production environment variables in **Vercel Dashboard → Settings → Environment Variables**
4. Deploy — Vercel auto-detects Next.js and builds correctly
5. Set your custom domain: `freshstartcommunityservices.com`

> [!WARNING]
> The file-based JSON database does **NOT** persist on Vercel serverless. Migrate to Supabase **before** production launch.

---

## Pre-Launch Checklist

- [ ] Obtain and configure real Stripe API keys
- [ ] Set up email provider (Resend) for donation receipts and contact notifications
- [ ] Change `ADMIN_SESSION_SECRET` to a production secret (32+ random chars)
- [ ] Replace plaintext passwords with bcrypt hashes in `src/lib/auth.ts` and `src/lib/seed-data.ts`
- [ ] Migrate database from JSON file to Supabase PostgreSQL
- [ ] Supply real leadership photos (currently Unsplash placeholders)
- [ ] Verify organization's EIN / 501(c)(3) status before using "tax-deductible" language
- [ ] Confirm contact info (phone, email, address) is accurate
- [ ] Verify and configure social media links in Footer component
- [ ] Point domain DNS (`freshstartcommunityservices.com`) to Vercel
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Set up Stripe webhook endpoint with production URL
- [ ] Test donation flow end-to-end with Stripe test mode
- [ ] Review and update Privacy Policy with an attorney if needed
- [ ] Configure Google Analytics or other analytics (optional)
- [ ] Set `metadataBase` in `layout.tsx` to production URL
- [ ] Upload actual organization logo files to `/public/`
- [ ] Create `/public/og-image.png` for social sharing (1200×630 px)

---

## Content Management Guide

Brief guide for non-technical admins. Log in at `/admin` with your credentials.

| Task | Steps |
|------|-------|
| Add a news article | Admin → **News & Blog** → New Article |
| Add a leadership profile | Admin → **Leadership** → Add Profile |
| Update a program | Admin → **Programs** → Edit |
| View / export donations | Admin → **Donations** (CSV export available) |
| Manage events | Admin → **Events** → Add Event |
| Edit static page content | Admin → **Pages** → select a page |

---

## Brand Guidelines

| Element | Value |
|---------|-------|
| Primary Green | `#258C4F` |
| Accent Lime | `#ADFF1C` |
| Dark / Ink | `#1E1E1E` |
| Off-white | `#FCFCFC` |
| Typeface | Montserrat |

---

## Support & Contributing

This project was built for **Fresh Start Community Services, Inc.** For technical questions, contact your web development team.

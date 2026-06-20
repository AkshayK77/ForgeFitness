# KavaFit

**AI-powered fitness coaching and workout tracking — built for people who want a smarter training loop.**

KavaFit combines personalized AI plan generation, live session logging, nutrition tracking, and performance analytics into a single, cohesive platform. Plans adapt to your equipment, experience level, and history. Sessions persist offline. Progress is always in front of you.

Live app: [kavafit.vercel.app](https://kavafit.vercel.app)

---

## What it does

| Area | Capability |
|---|---|
| **Workout planning** | AI generates weekly splits (3–7 days) based on your goals, equipment, and training history |
| **Session logging** | Live tracking of sets, reps, and weight with a built-in rest timer and warm-up suggestions |
| **Progress tracking** | Personal record detection, volume trends, muscle group heatmaps, and session history |
| **Nutrition** | Meal logging via USDA database, macro dashboard, AI recipe generation, and hydration tracking |
| **AI coach** | Chat interface with full context of your training data — adjusts plans and answers questions in natural language |
| **Gym finder** | Map-based search for fitness centers within 10 km using OpenStreetMap data |
| **Offline support** | Sessions persist locally and sync automatically when connection is restored |

---

## Tech stack

- **Frontend** — React 19, Vite, TypeScript, Tailwind CSS
- **Backend** — Supabase (PostgreSQL + Row Level Security + Auth)
- **AI / LLM** — Groq Llama 3.3 70B, accessed exclusively via Supabase Edge Functions
- **Edge functions** — Deno-based serverless proxies for Groq, USDA, RapidAPI, and OpenStreetMap
- **Observability** — Sentry (error tracking), PostHog (analytics)
- **Deployment** — Vercel (frontend), Supabase Cloud (backend)

---

## Local setup

### Prerequisites

- Node.js 18+
- [Supabase CLI](https://supabase.com/docs/guides/cli)

### Steps

```bash
# 1. Clone and install
git clone <repo-url>
cd kavafit
npm install

# 2. Configure environment variables
cp .env.example .env.local
# Fill in the values described in "Environment variables" below

# 3. Link your Supabase project
supabase link --project-ref <your-project-ref>

# 4. Apply database migrations
supabase db push

# 5. Deploy edge functions
supabase functions deploy ai-proxy
supabase functions deploy gyms
supabase functions deploy rapidapi-proxy
supabase functions deploy usda-proxy

# 6. Set edge function secrets
supabase secrets set GROQ_API_KEY=<value>
supabase secrets set USDA_API_KEY=<value>
supabase secrets set RAPIDAPI_KEY=<value>

# 7. Start the dev server
npm run dev
# → http://localhost:5173
```

---

## Environment variables

These go in `.env.local` for local development and in the Vercel dashboard for production.

```env
# Supabase — safe to expose in client bundles
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGc...

# Observability
VITE_SENTRY_DSN=https://...@....ingest.sentry.io/...
VITE_POSTHOG_KEY=phc_...
```

API keys for Groq, USDA, and RapidAPI are **never** bundled into client code. They are set as Supabase secrets and accessed only from edge functions.

---

## Available scripts

```bash
npm run dev        # Development server with HMR
npm run build      # Type-check + production build
npm run typecheck  # Type-check without emit
npm run lint       # ESLint
npm run preview    # Preview the production build locally
```

---

## Project structure

```
kavafit/
├── src/
│   ├── components/      # Shared UI components
│   ├── pages/           # Route-level views (Dashboard, Workout, Nutrition, Progress, …)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Supabase client, offline DB, analytics helpers
│   └── types/           # TypeScript types, Supabase-generated schema
├── supabase/
│   ├── functions/       # Edge functions (ai-proxy, gyms, rapidapi-proxy, usda-proxy)
│   └── migrations/      # Database migrations
└── public/
```

---

## Edge functions

| Function | Purpose |
|---|---|
| `ai-proxy` | LLM endpoint — workout generation, AI insights, recipes, warm-ups. Rate-limited to 20 req/60 s per user. |
| `gyms` | Queries OpenStreetMap Overpass API for nearby gyms with multi-endpoint fallback. |
| `rapidapi-proxy` | Shields RapidAPI key; returns food/nutrition search results. |
| `usda-proxy` | Proxies the USDA Food Composition Database for nutritional data. |

---

## Deployment

**Frontend (Vercel)**

Connect the repo to a Vercel project and add the `VITE_*` environment variables in the Vercel dashboard. Deployments trigger automatically on push to `main`.

**Backend (Supabase Cloud)**

Migrations and edge functions are managed via the Supabase CLI. Run `supabase db push` and `supabase functions deploy <name>` as part of your release process.

---

## User flow

1. **Sign up** and complete the onboarding questionnaire (goals, equipment, experience, targets).
2. **Generate a weekly plan** — the AI builds a training split tailored to your inputs.
3. **Log sessions** — open the day's workout, track each set in real time, and finish to trigger PR detection.
4. **Review progress** — see volume trends, muscle heatmaps, and personal records on the Progress screen.
5. **Talk to the AI coach** — ask questions, request plan adjustments, or get nutrition guidance at any point.

---

## Contributing

1. Fork the repository and create a feature branch.
2. Run `npm run typecheck` and `npm run lint` before opening a PR.
3. Edge function changes require `supabase functions serve <name>` for local testing.
4. PRs targeting `main` trigger a Vercel preview deployment automatically.

---

## License

MIT

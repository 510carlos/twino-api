# The Weekend Is Never Over

Twino API is the public homepage for **The Weekend Is Never Over**. The app is a small Next.js site with one art-deco landing page, a live 5 o'clock countdown, drink recommendations, and links into the table games site.

The codebase is intentionally lean. It does not include the old enterprise template, a separate backend server, Jest, or unused API scaffolding.

## What Runs Here

| Surface                                        | Purpose                                        |
| ---------------------------------------------- | ---------------------------------------------- |
| `/`                                            | Public landing page                            |
| `/api/health`                                  | Health check used by uptime/deployment tooling |
| `/health`, `/healthz`, `/api/healthz`, `/ping` | Rewrites to `/api/health`                      |

## Repository Layout

| Path                         | Purpose                                                         |
| ---------------------------- | --------------------------------------------------------------- |
| `app/page.tsx`               | Next.js home route that renders the landing experience          |
| `app/layout.tsx`             | Root layout and Google font wiring                              |
| `app/api/health/route.ts`    | Minimal health endpoint                                         |
| `components/FiveOclockDeco/` | Landing page UI components, data, styles, and Storybook stories |
| `components/Countdown/`      | Time-zone and countdown helpers                                 |
| `public/drinks/`             | Drink images used by the countdown panels                       |
| `public/flags/`              | Flag assets keyed by country                                    |
| `public/games/`              | Game card images linking to table games                         |
| `tests/e2e/`                 | Playwright smoke tests                                          |
| `.storybook/`                | Storybook configuration                                         |

## Component Shape

The landing page is split into small components so the UI can be documented and tested in isolation:

- `FiveOclockDeco.tsx` owns client state, countdown ticking, scroll reveal, parallax, and pointer effects.
- `HeroSection.tsx` composes the countdown, location, and drink panels.
- `CountdownPanel.tsx`, `LocationPanel.tsx`, `DrinkPanel.tsx`, and `GameCard.tsx` are presentational components.
- `GameNightSection.tsx`, `AboutSection.tsx`, `Header.tsx`, `Footer.tsx`, and `Atmosphere.tsx` hold page sections.
- `data.ts` maps time zones, drinks, flags, and game card metadata into UI-ready data.

## Development

Use pnpm through Corepack:

```bash
corepack pnpm install
corepack pnpm dev
```

Open `http://localhost:65210`.

## Scripts

```bash
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm build
corepack pnpm test:e2e
corepack pnpm storybook
corepack pnpm build-storybook
corepack pnpm format
```

## Testing Strategy

This repo uses Playwright smoke tests instead of Jest because the highest-risk behavior is page rendering and routing, not isolated business logic.

The e2e suite currently verifies:

- The homepage renders the main sections.
- Game cards link to `https://games.theweekendisneverover.com`.
- `/api/health` returns `{ "status": "ok" }`.

Add unit tests later only if the countdown/time-zone helpers become complex enough to need isolated edge-case coverage.

## Storybook

Storybook uses the Vite-based Next.js framework. The current stories cover the reusable art-deco panels and game card component.

```bash
corepack pnpm storybook
```

Open `http://localhost:6006`.

## Deployment

The site deploys on Vercel from this repository.

The canonical branch is `main`. `master` currently points at the same commit for compatibility while the deployment settings are cleaned up.

## Relationship To Table Games

This homepage links to the table games app at:

```text
https://games.theweekendisneverover.com
```

Game links are configured in `components/FiveOclockDeco/data.ts`.

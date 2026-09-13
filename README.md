# ShootFlow — landing page

Marketing landing page for ShootFlow, a CRM and follow-up tool for wedding
photographers. Built mobile-first, with layout decisions grounded in the
[Laws of UX](https://lawsofux.com/).

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Runtime | React 19 |
| Deploy target | Vercel (default Next build) |

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run typecheck
```

Node 22 (see `.nvmrc`).

## Environment

Copy `.env.example` to `.env.local`. Nothing is required to run locally.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public origin. Drives `metadataBase`, canonical and OG URLs, `robots.txt` and the sitemap. |
| `NEXT_PUBLIC_SIGNUP_URL` | Where every "Start Free Trial" button points. Falls back to the on-page `#signup` anchor. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional. See the commented analytics block in `src/app/layout.tsx`. |

**`NEXT_PUBLIC_SITE_URL` must be either unset or a full absolute URL** — never
set to an empty value. When it is unset the origin falls back to
`NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL`, then `NEXT_PUBLIC_VERCEL_URL` (both
provided by Vercel), then `http://localhost:3000`, so Vercel deploys resolve to
their real URL without it being set at all. A bare hostname gets `https://`
prepended and trailing slashes are stripped, so `shootflow.in/` and
`https://shootflow.in` are equivalent.

**Going live**: set `NEXT_PUBLIC_SIGNUP_URL`, or CTAs scroll to the bottom of
the page instead of starting a trial. Set `NEXT_PUBLIC_SITE_URL` too once a
custom domain is pointed at the project.

## Where things live

```
src/
  app/
    layout.tsx        root layout, metadata, viewport, fonts, analytics slot
    page.tsx          section composition + JSON-LD
    globals.css       design tokens (@theme) and base layer
    privacy/, terms/  placeholder legal pages
    robots.ts, sitemap.ts, not-found.tsx, icon.svg
  components/
    *.tsx             one component per page section
    ui/               Section, Container, CtaButton, Wordmark, LegalPage
  lib/
    content.ts        ALL page copy
    site.ts           SIGNUP_URL, SITE_URL and other constants
    schema.ts         JSON-LD, derived from content.ts
```

### Editing copy

Everything a reader sees is in `src/lib/content.ts`. Two rules for that file:

1. **Keep it serializable.** It crosses into a client component; a function or a
   component in there breaks the build.
2. **No Tailwind class fragments.** Tailwind v4 cannot see dynamically built
   class strings and will purge them.

### Styling

Tailwind v4 is CSS-first — **there is no `tailwind.config.js`**, and adding one
does nothing unless it is wired up with `@config`. Design tokens live in the
`@theme` block at the top of `src/app/globals.css`.

Every colour is plain sRGB hex rather than `oklch()`, and `color-mix()` is
avoided, so the palette degrades sensibly on older Android browsers below
Tailwind v4's Chrome 111 baseline.

Contrast is checked, not eyeballed. `--color-accent` (`#b4562f`) is a **fill**
colour — white on it is 4.9:1. As text on cream it measures 4.56:1, too close to
the 4.5 line to trust, so accent-coloured *text* uses `--color-accent-ink` or
`--color-accent-deep`. On the dark band the accent inverts to
`--color-accent-light`. Check any new pair before adding it.

## Design notes

The page is mobile-first in the literal sense: unprefixed classes are the phone
layout, and `sm:`/`md:`/`lg:` only ever add. A few decisions worth knowing before
changing them:

- **One primary action per screen** (Hick's Law). There is deliberately no
  secondary CTA in the hero and no WhatsApp button competing with the trial.
- **The sticky bottom CTA bar** is hero-gated, `lg:hidden`, and relies on
  `viewportFit: "cover"` in the layout's viewport export — without that,
  `env(safe-area-inset-bottom)` is 0 and it sits under the iPhone home
  indicator. The footer carries matching bottom padding so the bar never
  covers the copyright line.
- **All four product tab panels render**, stacked in one grid cell with
  `visibility` toggled rather than `display`. That keeps every feature in the
  HTML for search and in-page find, and keeps the container at a fixed height so
  switching tabs causes no layout shift.
- **The FAQ is native `<details>`/`<summary>`** — it works with JavaScript
  disabled and needs no accordion code.
- **Only the Pro tier is visually emphasised** (Von Restorff). Emphasising a
  second thing cancels both out.
- **Tap targets are 48px minimum**, footer links included.
- There is **no invented social proof** anywhere. Adding real testimonials is the
  highest-value change available to this page.

## Verifying changes

```bash
npm run build          # must pass clean
npm run start
```

Then check: no horizontal scroll at 320/360/390px, all tap targets ≥ 44px, the
page renders usefully with JavaScript disabled, and axe-core reports no
violations. The current build passes all of these.

## Known gaps

- `/privacy` and `/terms` are honest placeholders and need real legal text
  before paid acquisition or payment-gateway onboarding.
- `NEXT_PUBLIC_SIGNUP_URL` is unset, so CTAs currently resolve to `#signup`.
- No testimonials or customer references yet.
- Trial-end behaviour, per-seat vs per-studio pricing, and any annual plan are
  not covered by the current copy.

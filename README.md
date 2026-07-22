# JoyfulPass

joyfulpass.com — a single Next.js codebase hosting a growing family of exam-prep apps
(BritPass, CanadaPass, ...) as directory-based silos, per the site's SEO/IA brief.

## Getting started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How the site is organized

- `src/lib/apps.ts` — the app registry. Every product (BritPass, CanadaPass, and every
  app added after them) is one `AppRecord` here: slug, theme tokens, hero copy, app
  store links, tools, FAQs, stats. **Adding a new app is a content change, not a code
  change** — add a record here and its content below; the routes, sitemap, and nav
  pick it up automatically.
- `src/content/blog/{scope}/*.md` — blog posts as markdown with frontmatter
  (`title`, `description`, `date`, `author`, `authorCredential`). `scope` is `hub` for
  cross-app content or an app's `blogCategory` (currently equal to its slug).
- `src/lib/testCenters.ts` — sample test-center directory data, keyed by app slug.
- `src/components/tools/registry.tsx` — maps a tool slug (declared on an `AppRecord`)
  to the React component that renders it. Add a tool by adding an `AppTool` entry to
  the app record and a component here.

## Routes

```
/                          hub homepage (app directory)
/about/                    brand story
/tools/                    cross-app tool discovery index
/blog/, /blog/[slug]/      hub-level comparison content
/[app]/                    app landing page
/[app]/blog/, /[app]/blog/[slug]/
/[app]/test-centers/
/[app]/[tool]/             e.g. /britpass/ilr-calculator/
```

`/[app]/` is a dynamic segment resolved against the app registry (`dynamicParams =
false`, so unknown slugs 404). Static folders (`blog`, `test-centers`, `about`, ...)
always win over the dynamic segment at the same level, so adding an app never
collides with hub routes.

Future non-English content for a given app nests a language segment under that
app's own directory (e.g. `/germanpass/de/`) rather than a root-level `/de/` — not
wired up yet since no app currently ships more than one language, but the silo
structure supports it without a re-platform.

## SEO plumbing

- `src/app/sitemap.ts` generates one sitemap file per silo (hub + each app slug),
  which Next.js assembles into a sitemap index. Adding an app to the registry adds
  its sitemap automatically.
- `src/app/robots.ts` points crawlers at the sitemap index.
- JSON-LD: `Organization` (root layout), `EducationalOrganization` (per-app layout),
  `Course` + `FAQPage` (app landing pages), `Article` (blog posts), `WebApplication`
  (tool pages).
- Canonical tags are set per page via `alternates.canonical`.
- `next.config.ts` sets `trailingSlash: true` — every internal link and canonical in
  this project uses a trailing slash, matching the sitemap in the design brief.

## Analytics

`src/components/Analytics.tsx` is the single, domain-level attribution layer (GA4 +
Meta Pixel + TikTok Pixel), gated by env vars — see `.env.example`. Every app silo
inherits it automatically; do not wire up per-app tracking.

## Theming

Each app's accent color lives in its `AppRecord.theme` and is applied as CSS custom
properties (`--accent`, `--accent-dark`, `--accent-soft`) on a wrapper `div` in
`src/app/[app]/layout.tsx`. Shared components (`Hero`, `FaqAccordion`, `ToolCard`, ...)
read those variables, so every app reuses the same component library and layout grid
and differs only by color/icon/imagery — the hub-level header and footer stay on the
brand's own theme across every app, matching the Yousician/Simply reference model.

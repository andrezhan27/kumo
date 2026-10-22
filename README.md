# KUMO — Waterloo

Restaurant website for KUMO at Drève Richelle 8, 1410 Waterloo, Belgium. Built with Next.js 16, React 19, TypeScript and Tailwind CSS 4.

The original cream, black and gold visual style, geometric Manrope typography, full-screen hero and photo galleries are retained. French is the default language; English is available from the navigation. The choice is retained for the browser tab session.

## Development

Use Node.js 22.x and npm. The Node major is shared by `.nvmrc`, `package.json`, GitHub Actions, and Vercel. With nvm installed:

```bash
nvm use
npm ci
npm run dev
```

No environment variables are required. For a local override, copy `.env.example` to `.env.local` and uncomment the setting you need. Keep local environment files out of Git.

## Production and checks

```bash
npm run check
npm run build
npm start
# With the production server running, in another terminal:
npm run check:site
```

The home and reservation pages are statically rendered. `/menu` permanently redirects to `/#menu-section`; `/reservar` permanently redirects to `/reservation`. The `/reservation` page follows the full-height reservation layout and embeds `https://reserve.intelis.pt/kumo`; all reservation CTAs open this page. Unknown URLs return a branded 404 page.

`npm run check` runs ESLint with zero warnings allowed, generates Next.js route types, and checks TypeScript. It works on a fresh clone before a build. `check:site` checks the production HTML, internal links, redirects, security headers, reservation embed, 404 response, icons, and assets. Use `CHECK_SITE_URL=https://your-deployment.vercel.app npm run check:site` to check an accessible deployment.

## Push to GitHub

Commit the source, `public/` images, local fonts and licenses, `.env.example`, and `package-lock.json`. `.gitignore` excludes dependencies, generated builds, caches, logs, private environment files, keys, editor state, and local Vercel settings. `.gitattributes` normalizes text line endings.

Check `git remote -v` before pushing: this checkout originally points to `https://github.com/andrezhan27/sushi-king`. If KUMO belongs in a different repository, update `origin` to that repository first. Review the complete diff, including existing asset replacements and deleted legacy pages, before committing.

```bash
git status --short
git diff --check
npm run check
npm run build
git add -A
git diff --cached --stat
git commit -m "Prepare KUMO for deployment"
git push -u origin main
```

GitHub Actions installs from the lockfile, audits production dependencies for high/critical advisories, runs lint and type checks, builds, and checks a running production server on pushes and pull requests. Dependabot checks npm packages and GitHub Actions weekly. To make CI mandatory before merging, enable branch protection in the GitHub repository settings.

The full dependency audit currently reports a development-only `braces` advisory through `eslint-config-next`; no patched `braces` release is available. It affects parsing deeply nested glob patterns in lint tooling. See [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). Run `npm audit` to review the full tree; avoid `npm audit fix --force`, which currently proposes downgrading Next.js lint tooling to a different major.

## Deploy to Vercel

1. Push the repository to GitHub, then import it into a new Vercel project.
2. Use the repository root (`.`) as **Root Directory** and **Next.js** as the framework preset. `vercel.json` sets **Install Command** to `npm ci` and **Build Command** to `npm run build`. Leave **Output Directory** at the framework default; do not use `out/` or enable static export because redirects and image optimization use Next.js.
3. Node.js **22.x** is selected by `package.json`. No API credentials or database are required.
4. For a custom domain, add it in Vercel's Domains settings and set `SITE_URL` in the **Production** environment to its public origin, including `https://` and no path. Redeploy after changing this variable: social metadata is generated at build time. Without it, the site uses `VERCEL_PROJECT_PRODUCTION_URL`, then `VERCEL_URL`; local builds use `http://localhost:3000`.
5. Deploy, then check `/`, `/reservation`, `/menu`, `/reservar`, and an unknown URL. Confirm the booking provider loads in a browser and test French/English switching. The automated site check validates the embed URL and markup; the third-party booking service still needs this browser check.

Vercel handles HTTPS and deployments from the connected Git branch. See the official [project configuration](https://vercel.com/docs/project-configuration) and [Node.js version](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions) references.

## Restaurant content

Edit `lib/content.ts` for contact details, hours, translations and gallery entries. Opening hours are also declared in the restaurant structured data in `app/layout.tsx`; update both when hours change.

Verified on 22 October 2026:

- Address: Drève Richelle 8, 1410 Waterloo, Belgium.
- Reservations: +32 2 767 63 98. Booking actions open `/reservation`; the telephone contact remains available in Contacts.
- Open Wednesday–Monday, 12:00–14:30 and 18:30–22:30; closed Tuesday.
- Current dishes and prices are available directly from the restaurant. The pricing comparison table uses explicit placeholders for weekdays, weekends/public holidays, and children until prices and dining conditions are confirmed. No takeaway offers or social profiles from the previous restaurant are carried over.

Sources:

- [Google Maps listing supplied by the owner](https://maps.app.goo.gl/2EeE3jBLwH5xgsZS9): address, phone, coordinates and weekly hours.
- [Rich’l restaurant listing](https://richl.be/enseigne/kumo/): cuisine, opening hours and restaurant photography. Its listed mobile contact differs from Google Maps; this site uses the supplied Google listing’s landline.
- [Waterloo Plaza restaurant listing](https://www.waterlooplaza.be/waterloo/1854/kumo): phone, concept and restaurant photography.

## Loading efficiency

- All restaurant photos are locally hosted WebP files, resized and stripped of camera metadata. Next.js serves responsive optimized image sizes.
- Only the hero is preloaded. Below-the-fold photos use native lazy loading.
- One responsive interior gallery serves both mobile and desktop.
- Manrope is a locally hosted geometric sans-serif Latin WOFF2 font with `font-display: swap`; no Google Fonts requests are made during builds or visits. Licenses are in `app/fonts/`.
- CSS handles subtle hover effects and the food gallery. A lazy-loaded Google Maps embed in Contacts shows the location supplied by the owner. The separate reservation page eagerly loads the KUMO Intelis booking widget. No animation library, promotion SDK, analytics script or database client is shipped.
- The food gallery slides continuously on desktop and mobile, including on hover. Reduced-motion preferences replace animation with manual scrolling. On mobile, the food gallery uses two compact 128px-high strips. The space gallery uses large landscape photos in a swipeable, snapping rail with captions, a counter and previous/next controls. Desktop retains the three-column gallery with equal aspect ratios.

See `ASSET_SOURCES.md` for the photo source mapping.

The 64px navigation uses a solid ivory background throughout. Desktop tabs are centered independently of the logo and controls. The mobile dropdown animates open and closed, and closes on outside taps, Escape, navigation, or switching to desktop width. The language switch and desktop reservation CTA are both 40px high.

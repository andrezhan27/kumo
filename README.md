# KUMO — Waterloo

Restaurant website for KUMO at Drève Richelle 8, 1410 Waterloo, Belgium. Built with Next.js 16, React 19, TypeScript and Tailwind CSS 4.

The site uses pure black for its page, section and interface backgrounds. Headings, links and accents use #DCA959 gold; the hero tagline and body copy use warm off-white and muted warm gray. Primary buttons use gold backgrounds with dark text. The embedded contact map uses a grayscale dark treatment to fit the surrounding palette. Cards, navigation, menu controls and gallery fades share the dark palette across all three languages. The site uses Montserrat throughout. The full-screen black hero centers the gold koi logo above an uppercase tagline, with a compact outlined reservation link and gold clouds layered along the bottom. The owner-supplied gold koi logo appears in the navigation, footer, browser icons and restaurant structured data; CSS blends its dark background into the page. The reservation page has a black canvas; the external booking provider controls the embedded form’s internal colors. French is served at `/`; English is available at `/en` and Dutch at `/nl`. The language dropdown offers English, Français and Nederlands and uses prefetched Next.js links and client navigation to the equivalent home, menu or reservation page without a document reload. It retains the current query string, section hash and scroll position; choosing the current language does nothing. Navigation and booking links retain the selected language through their URLs, including after refreshing or sharing a page. Without JavaScript, the language links still navigate to the matching page.

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

The French, English and Dutch home, menu and reservation pages are statically rendered. The menu is served at `/menu`, `/en/menu` and `/nl/menu`. `/reservar` permanently redirects to `/reservation`; equivalent reservation redirects exist under `/en` and `/nl`. The `/reservation`, `/en/reservation` and `/nl/reservation` pages follow the full-height reservation layout and embed `https://reserve.intelis.pt/kumo`; all reservation CTAs and the dining slogan call +32 2 767 63 98. Unknown URLs return a branded, non-indexable 404 page. All three languages share one root layout: the document and language context follow the pathname during static rendering and client navigation. Language-specific route groups supply the server-rendered metadata. Next.js `globalNotFound` preserves the standalone branded 404.

`npm run test:carousel` checks fractional animation, batched scroll writes, native touch momentum, offscreen/hidden-tab pauses and reduced motion using a simulated browser clock. Physical iPhone verification remains a device check. `npm run check` runs ESLint with zero warnings allowed, generates Next.js route types, and checks TypeScript. It works on a fresh clone before a build. `check:site` checks the production HTML, internal links, redirects, security headers, reservation embed, 404 response, icons, and assets. Use `CHECK_SITE_URL=https://your-deployment.vercel.app npm run check:site` to check an accessible deployment.

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
2. Use the repository root (`.`) as **Root Directory** and **Next.js** as the framework preset. Leave **Install Command** at the Vercel default so npm can reuse cached dependencies; GitHub Actions retains `npm ci` for clean, lockfile-based verification. `vercel.json` sets **Build Command** to `npm run build`. Leave **Output Directory** at the framework default; do not use `out/` or enable static export because redirects and image optimization use Next.js.
3. Node.js **22.x** is selected by `package.json`. No API credentials or database are required.
4. For a custom domain, add it in Vercel's Domains settings and set `SITE_URL` in the **Production** environment to its public origin, including `https://` and no path. Redeploy after changing this variable: canonical URLs, language alternates, social metadata, the sitemap and structured data are generated at build time. Without it, the site uses `VERCEL_PROJECT_PRODUCTION_URL`, then `VERCEL_URL`; local builds use `http://localhost:3000`.
5. Enable Web Analytics in the Vercel project before deploying. The shared layout tracks page views across all three languages. [Vercel Web Analytics setup](https://vercel.com/docs/analytics/quickstart).
6. Deploy, then check `/`, `/reservation`, `/menu`, `/reservar`, and an unknown URL. Confirm the booking provider loads in a browser and test French/English/Dutch switching. The automated site check validates the embed URL and markup; the third-party booking service still needs this browser check.

Vercel handles HTTPS and deployments from the connected Git branch. See the official [project configuration](https://vercel.com/docs/project-configuration) and [Node.js version](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions) references.

## Restaurant content

Edit `lib/content.ts` for contact details, hours, translations and gallery entries. About KUMO immediately follows the hero, with the owner’s 6 November 2026 brochure text about refined Japanese cuisine and dishes ordered on a tablet, translated into all three languages. Four illustrated steps (choose on the tablet, order, enjoy, repeat) sit beside the existing restaurant photo. The contact section and shared footer include contacts.kumo@gmail.com and the Instagram account @kumowaterloo. Opening hours are also declared in the restaurant structured data in `lib/seo.ts`; update both when hours change.

The combined trilingual formulas and pricing section sits after the food gallery. It follows the owner’s formula table and brochure supplied on 5–6 November 2026. Each of the four cards combines its day/meal, adult and children’s prices, and adult order, dish and timing limits. Children’s order and timing rules are visible on every card; the adult Sunday/public-holiday lunch exception appears directly on the relevant card. Adults have 3 orders: up to 4 dishes per order at Monday–Saturday lunch, or 5 for the evening formula, which also applies all day on Sundays and public holidays. Adult waits are 15 minutes at lunch (including Sunday/public-holiday lunch) and 20 minutes in the evening. The children’s menu is for ages 3–10, with 2 orders of up to 4 dishes. Children wait 15 minutes at Monday–Saturday lunch and 20 minutes in the evening and all day on Sundays/public holidays; the table does not give children the adult Sunday/holiday lunch exception. Drinks and desserts are excluded from every formula. The previous 15/20 total-dish limits and 4 dinner orders no longer apply.

Five optional ordering tips appear below the cards in the same section, with accessible accordion buttons and animated panels respecting reduced motion. Prices, limits, waiting times, exclusions and service hours remain visible without expanding anything. Edit `diningFormulas`, `childrenMenu`, `diningPrices` and the matching translations in `lib/content.ts` together. The slogan “I don't do buffet. I do KUMO.” remains in a booking banner at the bottom of the combined section. All explanatory copy is present in the statically rendered HTML.

The reviews section follows Contacts in all three languages. `lib/reviews.ts` contains ten attributed excerpts from five-star Google reviews, checked against the owner’s [Google Maps listing](https://maps.app.goo.gl/RtnC6UqdoKyYLQ3Y8) on 27 October 2026. The original review language is recorded and translated excerpts are labeled. These are a manually selected snapshot, not a live feed or the restaurant’s overall rating; recheck the source when editing. The reviews appear in a compact, continuously sliding row of black cards overlapping the `space-05.webp` bar photograph, on the black section background. The photograph is capped at 1200px wide and 480px high on desktop. All ten reviews remain available on mobile and desktop through native swiping, horizontal scrolling, mouse dragging and arrow keys. There are no playback or arrow buttons. Reviews move at a gentle 16px per second, resume after interaction, and respect reduced-motion preferences. The menu and reviews share `components/useContinuousScroll.ts` for their seamless loops. Cards retain the full excerpts, authors and translation labels. The Google badge identifies selected five-star reviews without displaying an unverified overall rating; the Google link remains visible below the row. No third-party review widget or API key is needed.

## Search visibility

- Each language has its own crawlable home, menu and reservation URL, localized titles and descriptions, a self-referencing canonical, and reciprocal `fr-BE`, `en`, `nl-BE` and `x-default` alternates. English content is present in the initial HTML rather than dependent on a client-side language switch.
- `/robots.txt` allows crawling and points to `/sitemap.xml`, which lists all six canonical pages with their language alternates.
- Restaurant JSON-LD includes the public origin, photos, cuisine, address, coordinates, phone, opening hours, menu page and reservation action. Prices, ratings and reviews are not invented.
- The menu, space and footer use natural French/English/Dutch references to Asian cuisine, sushi, teppanyaki, dim sum, Waterloo in Belgium, Rich’l and Walloon Brabant/south of Brussels. The hero content and layout are unchanged.
- After deploying on the final domain, verify it in Google Search Console and submit `/sitemap.xml`. Keep the Google Business Profile name, address, phone, website and hours consistent with the site. Validate the public homepage with Google’s Rich Results Test. These account-level steps must be performed in the relevant owner accounts; code changes cannot guarantee rankings.
- Guidance: [Google multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) and [local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business).

Verified on 22 October 2026:

- Address: Drève Richelle 8, 1410 Waterloo, Belgium.
- Reservations: +32 2 767 63 98. Booking actions and the dining slogan use `tel:+3227676398`.
- Owner’s brochure update, 6 November 2026: lunch 12:00–14:30 (Sunday until 15:00), dinner 18:30–22:30; closed Tuesday except public holidays. These regular hours, the Sunday extension and public-holiday services are also reflected in the restaurant structured data.
- The latest owner-supplied price table gives adult/child prices of €31/€15.50 for Monday–Friday lunch, €36/€18 for Saturday lunch, €45/€22.50 for Monday–Thursday dinner, and €55/€27.50 for Friday/Saturday dinner and all day on Sundays/public holidays. The children’s menu applies to ages 3–10. The website shows these four formulas in responsive cards with background colors sampled from the owner’s brochure (weekday lunch #dedccf, Saturday lunch #dbd0b4, weekday dinner #efd6ae, weekends/holidays #d7bdac) and dark text, each with adult and children’s prices, plus service hours, exclusions and the Tuesday closure except public holidays. Public-holiday pricing overrides the usual weekday/Saturday rates. See the ordering and timing rules above. The KUMO email and Instagram account come from the owner’s brochure; no previous restaurant’s takeaway offers or social profiles are carried over.

Sources:

- [Google Maps listing supplied by the owner](https://maps.app.goo.gl/2EeE3jBLwH5xgsZS9): address, phone, coordinates and weekly hours.
- [Rich’l restaurant listing](https://richl.be/enseigne/kumo/): cuisine, opening hours and restaurant photography. Its listed mobile contact differs from Google Maps; this site uses the supplied Google listing’s landline.
- [Waterloo Plaza restaurant listing](https://www.waterlooplaza.be/waterloo/1854/kumo): phone, concept and restaurant photography.

## Loading efficiency

- All restaurant photos are locally hosted WebP files, resized and stripped of camera metadata. Next.js serves responsive optimized image sizes.
- The Concept section uses the former desktop hero photo, `public/hero/kumo-hero-desktop.webp`. Below-the-fold photos use native lazy loading.
- One responsive interior gallery serves both mobile and desktop.
- Montserrat is a locally hosted variable Latin WOFF2 font with `font-display: swap`; no Google Fonts requests are made during builds or visits. Licenses are in `app/fonts/`.
- CSS animates the hero copy on entry and, where scroll-driven animations are supported, adds a small cloud drift and section heading transitions. These effects respect reduced-motion preferences. CSS handles subtle hover effects; a requestAnimationFrame loop uses fractional transforms between batched native scroll updates for the food gallery and reviews, pausing offscreen and in hidden tabs. A lazy-loaded Google Maps embed in Contacts shows the location supplied by the owner. The separate reservation page eagerly loads the KUMO Intelis booking widget. No animation library, promotion SDK or database client is shipped.
- The food gallery slides continuously on desktop and mobile, including on hover. Visitors can swipe, scroll horizontally, drag with a mouse, or use the arrow keys; automatic sliding resumes from the current position after native swipe momentum settles (with a 250ms idle fallback where scrollend is unavailable). Reduced-motion preferences disable automatic movement while retaining manual scrolling. The food gallery uses one row of ten distinct food photographs. Cards use a consistent 4:3 ratio, with a mobile width of 68vw capped at 288px so the next card peeks into view. Tablet and desktop widths increase to 320px and 384px; automatic motion stays at 30px per second across screen sizes. The space gallery uses a tightly spaced mosaic with square corners: three equal photos above two rows of paired landscape photos on desktop. Mobile uses paired tiles, highlights the central-aisle interior at full width, and places the robot photo in the final pair to display all seven owner-supplied photos without a carousel. Gallery files are named `space-01.webp` through `space-07.webp` in `public/space/`.

A transparent gold cloud ornament, inspired by the owner’s menu artwork, appears as an oversized, low-opacity background behind About, the menu preview, pricing, space, contacts and the shared footer. The full menu also has a header background. Outside the hero, clouds span 48vw (up to 704px) on desktop and 82vw on mobile and are cropped at the section edges. Cloud ornaments use 58% opacity in the hero and 14% in the other sections. Content sits above the static, decorative, pointer-transparent artwork; the clouds occupy no layout space. The reservation page retains its full-height external embed. Fine gold eyebrow rules, a subtle photo frame, softly rounded pricing cards and a restrained slogan border complete the treatment. The four brochure-sampled pricing background colors are preserved.

See `ASSET_SOURCES.md` for the photo source mapping.

The 64px navigation uses the solid black background throughout, with a gold brand name and booking CTA. On the homepage, the header appears on scroll or keyboard focus. Desktop tabs are centered independently of the logo and controls. The mobile dropdown animates open and closed, and closes on outside taps, Escape, navigation, or switching to desktop width. The language switch and desktop reservation CTA are both 40px high.

The combined formulas and pricing section uses a centered 1024px maximum width on desktop, two card columns from 640px and one column on mobile. Each formula keeps adult and children’s prices together with its ordering rules.

## Full restaurant menu — 4 November 2026

The menu page retains the shared navigation and footer, black background and gold brand accents. Page and category titles, captions and controls use Montserrat. The centred container is capped at 1320px. Category links wrap on desktop; below 768px they are replaced by a labelled native select in normal flow. Dish cards use three columns from 1024px, two from 640px and one below 640px.

`lib/menu-data.json` records the 168 photos on the current menu from the kitchen and sushi folders, grouped into their 18 leaf categories and ordered from starters through sushi and cooked dishes to rice/sides, followed by dessert and drinks from the supplied drinks folder. There are no soup or sharing-platter folders in this source, so no additional categories are invented. `source` retains each original relative filename for audit and re-import. Dish captions, categories and controls are available in French, English and Dutch. At the owner’s request, 43 incomplete or placeholder filenames use descriptive names inferred from the photos, translated into all three languages. The captions use broad names where recipes, sauces or alcohol content are uncertain. [MENU_CONTENT.md](MENU_CONTENT.md) documents the source mapping. No dish is explicitly marked new in the source, so there are no New badges. Set `isNew` only after explicit confirmation.

All menu photos are local WebP, at most 1120 × 840px while preserving the original aspect ratio, with no upscaling or cropping. Cards fill their 4:3 frames using centred cover sizing to avoid side letterboxing. Only the first dish is eager-loaded; all later images use native lazy loading and responsive Next.js image optimization. To regenerate the assets from the supplied library:

```sh
node scripts/import-menu-images.mjs /path/to/library
```

The source library must contain the original `厨房` and `寿司` folders. The importer requires the project's installed `sharp` dependency (bundled with Next.js). The new menu links are wired into the shared header and footer; the homepage photo carousel remains in place. Canonical URLs, language alternates, sitemap and Restaurant `hasMenu` point to the real menu routes. Category links update shareable fragments; headings clear the fixed header. “Categories ↑” resets and focuses the selector on mobile, permitting repeated selection of the same category. Scrolling respects reduced motion, and the existing language switch retains the fragment.

`npm run check:site` checks all nine localized pages and every current menu image URL, plus the adult order limits, children’s rules and all eight adult/child prices in each language. It retains the metadata, links, redirects, booking embed and asset checks.

### Responsive category controls

Desktop category links use 14px medium Montserrat in warm muted gray, 44px minimum targets, wrapping rows, gold dot separators and gold underlined hover and selected states. At 767px and below, a full-width native select replaces the list. It has a visible translated label, 16px text, a 52px minimum height, a black background and an 8px radius. All sections remain visible.

`lib/menu-navigation.ts` updates the fragment with History API state preserved, avoiding the native anchor jump before smooth scrolling. It uses immediate scrolling when `prefers-reduced-motion: reduce` matches. `npm run test:menu` exercises both preferences, repeat selections and history preservation, without adding test dependencies. The component resets and focuses the native selector on return navigation, and marks the selected desktop link with `aria-current="location"`.

### Landing menu carousel selection — 4 November 2026

The ten landing-page photos now come from the supplied menu library: special sashimi, lobster uramaki, mixed special nigiri, A5 wagyu and truffle nigiri, scampi-style tartare, oysters, Pink tuna Ebiten, pan-seared foie gras, ikura bignè and tuna/passion-fruit carpaccio. Their existing menu names supply the French, English and Dutch image descriptions. Landing carousel and full menu photos fill their 4:3 cards edge to edge using centred cover sizing, avoiding side letterboxing. The existing continuous loop, dragging, swiping and reduced-motion handling remain in place. The ordering limits were subsequently replaced by the owner’s 5 November formula table described above.

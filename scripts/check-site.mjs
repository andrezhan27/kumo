import assert from "node:assert/strict";

const origin = process.env.CHECK_SITE_URL || "http://127.0.0.1:3000";
const fetchWithTimeout = (url, options = {}) => fetch(url, { ...options, signal: AbortSignal.timeout(15_000) });
const response = await fetchWithTimeout(origin);
assert.equal(response.status, 200, "Home page must return 200");
assert.equal(response.headers.get("x-powered-by"), null, "The framework header must be disabled");
assert.equal(response.headers.get("x-content-type-options"), "nosniff");
assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
assert.equal(response.headers.get("x-frame-options"), "SAMEORIGIN");
const html = await response.text();
assert.match(html, /<html[^>]+lang="fr"/, "Default document language must be French");
assert.match(html, /<h1[^>]*>KUMO<\/h1>/, "Home page must identify KUMO");
assert.doesNotMatch(html, /Sushi King|sushiking|Faro|Almancil|livroreclamacoes/);
const embeds = [...html.matchAll(/<iframe\b[^>]*>/g)].map(match => match[0]);
assert.equal(embeds.length, 1, "The contact section must contain one map embed");
assert.match(embeds[0], /src="https:\/\/www\.google\.com\/maps\/embed\?pb=/);
assert.match(embeds[0], /loading="lazy"/);
assert.match(embeds[0], /title="[^"]+"/);
assert.doesNotMatch(html, /Voir la carte sur Google Maps|gallery-motion-control/);
assert.match(html, /id="pricing"/);

const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, "DOM IDs must be unique");
const links = [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => match[1]);
for (const href of links) {
  const url = new URL(href.replaceAll("&amp;", "&"), origin);
  if (url.origin === new URL(origin).origin) {
    assert.ok(["/", "/reservation", "/en", "/en/reservation"].includes(url.pathname), `Unexpected extra page: ${url.pathname}`);
    if (url.hash) assert.ok(ids.includes(url.hash.slice(1)), `Broken anchor: ${href}`);
  }
}
assert.ok(links.includes("tel:+3227676398"), "KUMO’s phone must remain available");
assert.ok(links.filter(href => href === "/reservation").length >= 3, "Reservation CTAs must open the reservation page");
assert.ok(links.includes("https://maps.app.goo.gl/2EeE3jBLwH5xgsZS9"));

const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)[1]);
assert.equal(schema.name, "KUMO");
assert.equal(schema.address.addressLocality, "Waterloo");
assert.equal(schema.telephone, "+32 2 767 63 98");
assert.ok(schema.openingHoursSpecification.every(hours => !hours.dayOfWeek.includes("Tuesday")));
const canonicalOrigin = new URL(html.match(/<link rel="canonical" href="([^"]+)"/)[1]).origin;
assert.equal(schema["@id"], `${canonicalOrigin}/#restaurant`);
assert.equal(schema.url, `${canonicalOrigin}/`);
assert.equal(schema.hasMenu, `${canonicalOrigin}/#menu-section`);
assert.equal(schema.potentialAction.target.urlTemplate, `${canonicalOrigin}/reservation`);
assert.ok(schema.image.length >= 1, "Restaurant structured data must include photos");
assert.ok(schema.image.every(image => image.startsWith(`${canonicalOrigin}/`)));

for (const [route, destination] of [["/menu", "/#menu-section"], ["/reservar", "/reservation"], ["/en/menu", "/en#menu-section"], ["/en/reservar", "/en/reservation"]]) {
  const redirect = await fetchWithTimeout(new URL(route, origin), { redirect: "manual" });
  assert.equal(redirect.status, 308, `${route} must be permanently redirected`);
  const location = new URL(redirect.headers.get("location"), origin);
  assert.equal(`${location.pathname}${location.hash}`, destination);
}
const bookingResponse = await fetchWithTimeout(new URL("/reservation", origin));
assert.equal(bookingResponse.status, 200, "Reservation page must return 200");
const bookingHtml = await bookingResponse.text();
assert.match(bookingHtml, /<title>Réserver une table à Waterloo \| KUMO<\/title>/);
assert.match(bookingHtml, /<iframe[^>]*src="https:\/\/reserve\.intelis\.pt\/kumo"/);
assert.match(bookingHtml, /data-restaurant-slug="kumo"/);
assert.doesNotMatch(bookingHtml, /KOKO|kokosushi|Sushi King|sushiking/);

const pages = new Map([["/", html], ["/reservation", bookingHtml]]);
for (const route of ["/en", "/en/reservation"]) {
  const localizedResponse = await fetchWithTimeout(new URL(route, origin));
  assert.equal(localizedResponse.status, 200, `${route} must return 200`);
  pages.set(route, await localizedResponse.text());
}

for (const [route, pageHtml] of pages) {
  const isEnglish = route.startsWith("/en");
  const isReservation = route.endsWith("/reservation");
  const frenchPath = isReservation ? "/reservation" : "/";
  const englishPath = isReservation ? "/en/reservation" : "/en";
  const expectedUrl = `${canonicalOrigin}${route}`;
  assert.equal([...pageHtml.matchAll(/<html\b/g)].length, 1, `${route} must render one document`);
  assert.equal([...pageHtml.matchAll(/<body\b/g)].length, 1, `${route} must render one body`);
  assert.match(pageHtml, new RegExp(`<html[^>]+lang="${isEnglish ? "en" : "fr"}"`));
  const pageCanonical = pageHtml.match(/<link rel="canonical" href="([^"]+)"/)[1];
  assert.equal(new URL(pageCanonical).href, new URL(expectedUrl).href, `${route} must have its own canonical URL`);
  const alternates = new Map([...pageHtml.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)].map(match => [match[1], new URL(match[2]).href]));
  assert.equal(alternates.get("fr-BE"), new URL(frenchPath, canonicalOrigin).href);
  assert.equal(alternates.get("en"), new URL(englishPath, canonicalOrigin).href);
  assert.equal(alternates.get("x-default"), new URL(frenchPath, canonicalOrigin).href);
  const socialUrl = pageHtml.match(/<meta property="og:url" content="([^"]+)"/)[1];
  assert.equal(new URL(socialUrl).href, new URL(expectedUrl).href);
  assert.match(pageHtml, /<meta name="description" content="[^"]*Waterloo/);
  assert.match(pageHtml, /<meta name="twitter:card" content="summary_large_image"/);
  assert.doesNotMatch(pageHtml, /<meta name="robots" content="[^"]*noindex/);
  const expectedTitle = isReservation
    ? (isEnglish ? /<h1[^>]*>Book a table<\/h1>/ : /<h1[^>]*>Réserver<\/h1>/)
    : /<h1[^>]*>KUMO<\/h1>/;
  assert.match(pageHtml, expectedTitle, `${route} must render its localized heading on the server`);
  if (isReservation) {
    assert.match(pageHtml, /<iframe[^>]*src="https:\/\/reserve\.intelis\.pt\/kumo"/);
    assert.ok(pageHtml.includes(`href="${isEnglish ? "/en#menu-section" : "/#menu-section"}"`));
    assert.ok(pageHtml.includes(`href="${isEnglish ? frenchPath : englishPath}"`), "Language switch must link to the equivalent reservation page");
  } else {
    assert.match(pageHtml, isEnglish ? /Asian restaurant in Waterloo, Belgium/ : /Restaurant asiatique à Waterloo/);
    assert.match(pageHtml, /<address\b/);
    const pageIds = [...pageHtml.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(pageIds).size, pageIds.length);
    const pageLinks = [...pageHtml.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => match[1]);
    for (const href of pageLinks) {
      const link = new URL(href.replaceAll("&amp;", "&"), new URL(route, origin));
      if (link.origin !== new URL(origin).origin || !link.hash) continue;
      assert.equal(link.pathname, route, "Section links must retain the page language");
      assert.ok(pageIds.includes(link.hash.slice(1)), `Broken localized anchor: ${href}`);
    }
    assert.ok(pageLinks.filter(href => href === (isEnglish ? "/en/reservation" : "/reservation")).length >= 3);
  }
}

const robotsResponse = await fetchWithTimeout(new URL("/robots.txt", origin));
assert.equal(robotsResponse.status, 200);
const robots = await robotsResponse.text();
assert.match(robots, /User-Agent: \*/i);
assert.match(robots, /Allow: \//);
assert.ok(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));

const sitemapResponse = await fetchWithTimeout(new URL("/sitemap.xml", origin));
assert.equal(sitemapResponse.status, 200);
const sitemap = await sitemapResponse.text();
assert.match(sitemapResponse.headers.get("content-type"), /xml/);
const sitemapLocations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.deepEqual(new Set(sitemapLocations), new Set([...pages.keys()].map(route => `${canonicalOrigin}${route}`)));
assert.equal([...sitemap.matchAll(/hreflang="fr-BE"/g)].length, 4);
assert.equal([...sitemap.matchAll(/hreflang="en"/g)].length, 4);
assert.equal([...sitemap.matchAll(/hreflang="x-default"/g)].length, 4);

for (const route of ["/nonexistent-kumo-page", "/en/nonexistent-kumo-page"]) {
  const missing = await fetchWithTimeout(new URL(route, origin));
  assert.equal(missing.status, 404);
  const missingHtml = await missing.text();
  assert.match(missingHtml, /Cette page s’est envolée/);
  assert.match(missingHtml, /<meta name="robots" content="[^"]*noindex/);
}

const assetUrls = [...new Set([...html.matchAll(/(?:src|href)="([^"#]+)"/g)]
  .map(match => match[1].replaceAll("&amp;", "&"))
  .filter(url => url.startsWith("/_next/") || /\.(?:png|webp|jpg|woff2)$/.test(new URL(url, origin).pathname)))];
let totalBytes = 0;
for (const path of assetUrls) {
  const asset = await fetchWithTimeout(new URL(path, origin));
  assert.equal(asset.status, 200, `Broken asset: ${path}`);
  const data = await asset.arrayBuffer();
  assert.ok(data.byteLength, `Empty asset: ${path}`);
  totalBytes += data.byteLength;
}
console.log(`PASS: French/English home and reservation pages, localized links and headings, canonical URLs, language alternates, social metadata, sitemap, robots, KUMO embed, structured data, legacy redirects, branded 404 and ${assetUrls.length} assets.`);
console.log(`All enumerated assets: ${(totalBytes / 1024).toFixed(0)} KiB (uncompressed; includes offscreen images).`);

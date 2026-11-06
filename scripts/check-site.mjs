import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const menuCategories = JSON.parse(await readFile(new URL("../lib/menu-data.json", import.meta.url), "utf8"));

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
    assert.ok(["/", "/menu", "/reservation", "/en", "/en/menu", "/en/reservation", "/nl", "/nl/menu", "/nl/reservation"].includes(url.pathname), `Unexpected extra page: ${url.pathname}`);
    if (url.hash) assert.ok(ids.includes(url.hash.slice(1)), `Broken anchor: ${href}`);
  }
}
assert.ok(links.includes("tel:+3227676398"), "KUMO’s phone must remain available");
assert.ok(links.filter(href => href === "tel:+3227676398").length >= 5, "Reservation CTAs and the dining slogan must call KUMO");
assert.ok(links.includes("https://maps.app.goo.gl/2EeE3jBLwH5xgsZS9"));

const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)[1]);
assert.equal(schema.name, "KUMO");
assert.equal(schema.address.addressLocality, "Waterloo");
assert.equal(schema.telephone, "+32 2 767 63 98");
assert.ok(schema.openingHoursSpecification.every(hours => !hours.dayOfWeek.includes("Tuesday")));
assert.ok(schema.openingHoursSpecification.some(hours => hours.dayOfWeek.includes("Sunday") && hours.opens === "12:00" && hours.closes === "15:00"));
assert.ok(schema.openingHoursSpecification.some(hours => hours.dayOfWeek.includes("https://schema.org/PublicHolidays")));
assert.equal(schema.email, "contacts.kumo@gmail.com");
assert.ok(schema.sameAs.includes("https://www.instagram.com/kumowaterloo/"));
const canonicalOrigin = new URL(html.match(/<link rel="canonical" href="([^"]+)"/)[1]).origin;
assert.equal(schema["@id"], `${canonicalOrigin}/#restaurant`);
assert.equal(schema.url, `${canonicalOrigin}/`);
assert.equal(schema.hasMenu, `${canonicalOrigin}/menu`);
assert.equal(schema.potentialAction.target.urlTemplate, `${canonicalOrigin}/reservation`);
assert.ok(schema.image.length >= 1, "Restaurant structured data must include photos");
assert.ok(schema.image.every(image => image.startsWith(`${canonicalOrigin}/`)));

for (const [route, destination] of [["/reservar", "/reservation"], ["/en/reservar", "/en/reservation"], ["/nl/reservar", "/nl/reservation"]]) {
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
for (const route of ["/menu", "/en", "/en/menu", "/en/reservation", "/nl", "/nl/menu", "/nl/reservation"]) {
  const localizedResponse = await fetchWithTimeout(new URL(route, origin));
  assert.equal(localizedResponse.status, 200, `${route} must return 200`);
  pages.set(route, await localizedResponse.text());
}

for (const [route, pageHtml] of pages) {
  const language = route.startsWith("/en") ? "en" : route.startsWith("/nl") ? "nl" : "fr";
  const prefix = language === "fr" ? "" : `/${language}`;
  const isReservation = route.endsWith("/reservation");
  const isMenu = route.endsWith("/menu");
  const frenchPath = isReservation ? "/reservation" : isMenu ? "/menu" : "/";
  const englishPath = isReservation ? "/en/reservation" : isMenu ? "/en/menu" : "/en";
  const dutchPath = isReservation ? "/nl/reservation" : isMenu ? "/nl/menu" : "/nl";
  const expectedUrl = `${canonicalOrigin}${route}`;
  assert.equal([...pageHtml.matchAll(/<html\b/g)].length, 1, `${route} must render one document`);
  assert.equal([...pageHtml.matchAll(/<body\b/g)].length, 1, `${route} must render one body`);
  assert.match(pageHtml, new RegExp(`<html[^>]+lang="${language}"`));
  const pageCanonical = pageHtml.match(/<link rel="canonical" href="([^"]+)"/)[1];
  assert.equal(new URL(pageCanonical).href, new URL(expectedUrl).href, `${route} must have its own canonical URL`);
  const alternates = new Map([...pageHtml.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)].map(match => [match[1], new URL(match[2]).href]));
  assert.equal(alternates.get("fr-BE"), new URL(frenchPath, canonicalOrigin).href);
  assert.equal(alternates.get("en"), new URL(englishPath, canonicalOrigin).href);
  assert.equal(alternates.get("nl-BE"), new URL(dutchPath, canonicalOrigin).href);
  assert.equal(alternates.get("x-default"), new URL(frenchPath, canonicalOrigin).href);
  const socialUrl = pageHtml.match(/<meta property="og:url" content="([^"]+)"/)[1];
  assert.equal(new URL(socialUrl).href, new URL(expectedUrl).href);
  assert.match(pageHtml, /<meta name="description" content="[^"]*Waterloo/);
  assert.match(pageHtml, /<meta name="twitter:card" content="summary_large_image"/);
  assert.doesNotMatch(pageHtml, /<meta name="robots" content="[^"]*noindex/);
  const expectedTitle = isReservation
    ? new RegExp(`<h1[^>]*>${{ en: "Book a table", fr: "Réserver", nl: "Reserveren" }[language]}<\\/h1>`)
    : isMenu ? /<h1[^>]*>Menu<\/h1>/ : /<h1[^>]*>KUMO<\/h1>/;
  assert.match(pageHtml, expectedTitle, `${route} must render its localized heading on the server`);
  if (isReservation) {
    assert.match(pageHtml, /<iframe[^>]*src="https:\/\/reserve\.intelis\.pt\/kumo"/);
    assert.ok(pageHtml.includes(`href="${prefix}/menu"`));
    for (const path of [frenchPath, englishPath, dutchPath]) {
      assert.ok(pageHtml.includes(`href="${path}"`), "Language dropdown must link to every equivalent reservation page");
    }
  } else if (isMenu) {
    assert.equal([...pageHtml.matchAll(/<figure class="menu-dish-card"/g)].length, 183);
    assert.equal([...pageHtml.matchAll(/class="menu-category-section"/g)].length, 18);
    assert.match(pageHtml, /<select[^>]*id="menu-category"/);
    assert.ok(pageHtml.includes(`href="${prefix || "/"}"`), "Back link must retain the language");
    assert.ok([...pageHtml.matchAll(/<a\b[^>]*href="tel:\+3227676398"/g)].length >= 2, "Menu booking and contact links must call KUMO");
    assert.doesNotMatch(pageHtml, /menu-new-badge|View full menu|View prices|Complete menu/);
    const dishCards = [...pageHtml.matchAll(/<figure class="menu-dish-card">([\s\S]*?)<\/figure>/g)].map(match => match[1]);
    assert.equal(dishCards.filter(card => card.includes('loading="eager"')).length, 1);
    assert.equal(dishCards.filter(card => card.includes('loading="lazy"')).length, 182);
    const menuIds = [...pageHtml.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(menuIds).size, menuIds.length);
    for (const category of menuCategories) {
      assert.ok(menuIds.includes(category.id));
      assert.ok(pageHtml.includes(`href="#${category.id}"`));
      for (const dish of category.dishes) {
        const escapedName = dish.name[language].replaceAll("&", "&amp;").replaceAll("'", "&#x27;").replaceAll('"', "&quot;");
        assert.ok(pageHtml.includes(escapedName), `${route} missing caption: ${dish.id}`);
      }
    }
    for (const path of [frenchPath, englishPath, dutchPath]) assert.ok(pageHtml.includes(`href="${path}"`));
  } else {
    const combinedHtml = pageHtml.match(/<section[^>]*id="pricing"[^>]*>([\s\S]*?)<\/section>/)[1];
    assert.ok(combinedHtml.includes('id="how-it-works"'), "Ordering guidance and pricing must share one section");
    assert.doesNotMatch(pageHtml, /<section[^>]*id="how-it-works"/);
    const plainText = markup => markup.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/\s+/gu, " ").trim();
    assert.ok(plainText(combinedHtml).includes("I don't do buffet. I do KUMO."));
    const aboutHtml = pageHtml.match(/<section[^>]*id="our-story"[^>]*>([\s\S]*?)<\/section>/)[1];
    assert.ok(plainText(aboutHtml).includes({ fr: "À propos de KUMO", en: "About KUMO", nl: "Over KUMO" }[language]));
    assert.ok(plainText(aboutHtml).includes({ fr: "directement depuis votre tablette", en: "directly from your tablet", nl: "rechtstreeks via uw tablet" }[language]));
    assert.ok(pageHtml.includes('href="mailto:contacts.kumo@gmail.com"'));
    assert.ok(pageHtml.includes('href="https://www.instagram.com/kumowaterloo/"'));
    assert.ok(plainText(pageHtml).includes({ fr: "Fermé le mardi, sauf les jours fériés", en: "Closed on Tuesdays, except public holidays", nl: "Gesloten op dinsdag, behalve op feestdagen" }[language]));
    const childrenLabel = { fr: "Menu enfants", en: "Children’s menu", nl: "Kindermenu" }[language];
    assert.ok(plainText(combinedHtml).includes(childrenLabel));
    assert.ok(plainText(combinedHtml).includes("3–10"));
    assert.ok(plainText(combinedHtml).includes({ fr: "2 commandes par enfant", en: "2 orders per child", nl: "2 bestellingen per kind" }[language]));
    assert.ok(plainText(combinedHtml).includes({ fr: "4 plats maximum par commande", en: "4 dishes maximum per order", nl: "4 gerechten maximaal per bestelling" }[language]));
    for (const [formula, adult, child] of [["weekdayLunch", 31, 15.5], ["saturdayLunch", 36, 18], ["weekdayDinner", 45, 22.5], ["weekendHolidays", 55, 27.5]]) {
      const card = combinedHtml.match(new RegExp(`<article[^>]*aria-labelledby="price-${formula}"[^>]*>([\\s\\S]*?)<\\/article>`))[1];
      const priceMarkup = [...card.matchAll(/<dl\b[^>]*data-prices="true"[^>]*>([\s\S]*?)<\/dl>/g)].map(match => match[1]).join("");
      const amounts = [...priceMarkup.matchAll(/<dd\b[^>]*>([\s\S]*?)<\/dd>/g)].map(cell => Number(plainText(cell[1]).replace(/[^\d,.]/g, "").replace(",", ".")));
      assert.deepEqual(amounts, [adult, child], `${route}: incorrect adult/child prices for ${formula}`);
      assert.ok(plainText(card).includes(childrenLabel));
      const lunch = formula === "weekdayLunch" || formula === "saturdayLunch";
      const adultRules = card.match(/<dl[^>]*data-adult-rules="true"[^>]*>([\s\S]*?)<\/dl>/)[1];
      assert.deepEqual([...adultRules.matchAll(/<dd\b[^>]*>([\s\S]*?)<\/dd>/g)].map(cell => plainText(cell[1])),
        ["3", lunch ? "4" : "5", lunch ? "15 min" : formula === "weekendHolidays" ? "20 min*" : "20 min"], `${route}: incorrect ordering rules for ${formula}`);
      const childRules = plainText(card.slice(card.lastIndexOf('data-prices="true"')));
      assert.ok(childRules.includes("2"));
      assert.ok(childRules.includes({ fr: "4 plats maximum par commande", en: "4 dishes maximum per order", nl: "4 gerechten maximaal per bestelling" }[language]));
      assert.ok(childRules.includes(`${lunch ? 15 : 20} min`));
      if (formula === "weekendHolidays") assert.ok(plainText(card).includes({ fr: "15 min. le dimanche midi", en: "15 min. at Sunday", nl: "15 min. tijdens de lunch op zondag" }[language]));
    }
    assert.ok(plainText(pageHtml).includes({ fr: "Boissons et desserts non inclus.", en: "Drinks and desserts are not included.", nl: "Dranken en desserts zijn niet inbegrepen." }[language]));
    assert.ok(pageHtml.includes({ en: "Asian restaurant in Waterloo, Belgium", fr: "Restaurant asiatique à Waterloo", nl: "Aziatisch restaurant in Waterloo, België" }[language]));
    assert.match(pageHtml, /<details[^>]*class="language-dropdown/);
    assert.ok(pageHtml.indexOf('id="home"') < pageHtml.indexOf('id="our-story"'));
    assert.ok(pageHtml.indexOf('id="our-story"') < pageHtml.indexOf('id="menu-section"'));
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
    assert.ok(pageLinks.filter(href => href === "tel:+3227676398").length >= 5);
    assert.ok(!pageLinks.includes(`${prefix}/reservation`), "Home booking CTAs must use the phone number");
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
assert.equal([...sitemap.matchAll(/hreflang="fr-BE"/g)].length, 9);
assert.equal([...sitemap.matchAll(/hreflang="en"/g)].length, 9);
assert.equal([...sitemap.matchAll(/hreflang="x-default"/g)].length, 9);
assert.equal([...sitemap.matchAll(/hreflang="nl-BE"/g)].length, 9);

for (const route of ["/nonexistent-kumo-page", "/en/nonexistent-kumo-page", "/nl/nonexistent-kumo-page"]) {
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
console.log(`PASS: French/English/Dutch home, menu and reservation pages, language dropdown, restaurant story, localized links and headings, canonical URLs, language alternates, social metadata, sitemap, robots, KUMO embed, structured data, legacy redirects, branded 404 and ${assetUrls.length} assets.`);
console.log(`All enumerated assets: ${(totalBytes / 1024).toFixed(0)} KiB (uncompressed; includes offscreen images).`);

const dishes = menuCategories.flatMap(category => category.dishes);
assert.equal(new Set(dishes.map(dish => dish.source)).size, 183, "Each supplied image must appear once");
assert.equal(new Set(dishes.map(dish => dish.image)).size, 183);
for (let offset = 0; offset < dishes.length; offset += 12) {
  await Promise.all(dishes.slice(offset, offset + 12).map(async dish => {
    const image = await fetchWithTimeout(new URL(dish.image, origin));
    assert.equal(image.status, 200, `Missing menu image: ${dish.image}`);
    assert.match(image.headers.get("content-type"), /image\/webp/);
    assert.ok((await image.arrayBuffer()).byteLength > 0);
  }));
}
console.log("PASS: all 183 supplied menu images, 18 categories, localized captions, fragments, lazy loading, booking and telephone links.");

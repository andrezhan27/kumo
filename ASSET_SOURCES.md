# Kumo image sources

Public Kumo restaurant photos and logo retrieved on 22 October 2026 from the Rich’l shopping centre and Waterloo Plaza business listings. Photographs remain the property of their respective owners. Local copies are resized and compressed for delivery.

| Local asset | Source |
| --- | --- |
| public/kumo-logo.webp; public/favicon.png; public/apple-touch-icon.png | [Original image](https://richl.be/wp-content/uploads/2022/01/Kumo-Restaurant-Asiatique-Waterloo.png) |
| public/hero/kumo-old.webp; public/food/carpaccio.webp | [Original image](https://www.waterlooplaza.be/_custom_storage/img/th_photo_gallery/2486/th_une_selection_de_nos_preparations_20261012_42459_l.webp?1791801187) |
| public/food/sushi.webp | [Original image](https://www.waterlooplaza.be/_custom_storage/img/th_photo_gallery/2457/th_covers_20261012_11039_l.webp?1791800595) |
| public/food/salmon.webp | [Original image](https://richl.be/wp-content/uploads/2022/01/Kumo-Restaurant-Waterloo-2-scaled.jpg) |
| public/food/selection.webp | [Original image](https://richl.be/wp-content/uploads/2022/01/Kumo-Restaurant-Waterloo-3-scaled.jpg) |
| public/food/grilled.webp | [Original image](https://www.waterlooplaza.be/_custom_storage/img/th_photo_gallery/2457/th_covers_20261012_16531_l.webp?1791800350) |
| public/food/dim-sum.webp | [Original image](https://www.waterlooplaza.be/_custom_storage/img/th_photo_gallery/2486/th_une_selection_de_nos_preparations_20261012_2152_l.webp?1791801324) |
| public/social/kumo.jpg | [Original image](https://www.waterlooplaza.be/_custom_storage/img/th_photo_gallery/2457/th_covers_20261012_39548_l.webp?1791800123) |

- `public/hero/kumo-exterior.webp`: owner-supplied `kumo-hero.webp` (22 October 2026), retained as a previous hero asset.

## Owner-supplied space gallery — 27 October 2026

Replaces the previous six gallery photos. Files are copied without re-encoding.

| Local asset | Supplied filename |
| --- | --- |
| public/space/space-01.webp | Futuristic Amber and Teal Dining Corridor.webp |
| public/space/space-02.webp | Futuristic Blue and Gold Restaurant Lounge.webp |
| public/space/space-03.webp | Futuristic Robot Delivery Restaurant.webp |
| public/space/space-04.webp | Kumo Sushi Restaurant Exterior.webp |
| public/space/space-05.webp | Luxurious Illuminated Cocktail Bar.webp |
| public/space/space-06.webp | Symmetrical Futuristic Restaurant Interior.webp |
| public/space/space-07.webp | Symmetrical Luxury Sushi Booth.webp |

- Active responsive hero: owner-supplied `public/hero/kumo-hero-mobile.webp` and `public/hero/kumo-hero-desktop.webp` (27 October 2026).

## Additional food photos — 2 November 2026

Four restaurant photographs from KUMO’s existing Waterloo Plaza gallery, resized to at most 960px wide and saved as WebP. These complete the single-row, ten-photo menu gallery.

| Local asset | Source |
| --- | --- |
| public/food/crispy-speciality.webp | [Original image](https://www.waterlooplaza.be/_custom_storage/img/th_photo_gallery/2457/th_covers_20261012_46175_l.webp?1791800590) |
| public/food/salmon-rolls.webp | [Original image](https://www.waterlooplaza.be/_custom_storage/img/th_photo_gallery/2457/th_covers_20261012_65989_l.webp?1791800607) |
| public/food/rice-speciality.webp | [Original image](https://www.waterlooplaza.be/_custom_storage/img/th_photo_gallery/2457/th_covers_20261012_66385_l.webp?1791800610) |
| public/food/salmon-bowl.webp | [Original image](https://www.waterlooplaza.be/_custom_storage/img/th_photo_gallery/2457/th_covers_20261012_89224_l.webp?1791800603) |

## Owner-supplied menu library — 4 November 2026

183 images supplied in `比利时图库/厨房` and `比利时图库/寿司`, including all nested category folders. The source-to-asset mapping and translations are recorded in `lib/menu-data.json`. Converted to WebP under `public/menu/`, limited to 1120 × 840px without cropping or enlarging. All 18 leaf categories are retained, including the supplied drinks folder. At the owner’s request, descriptive captions for 47 incomplete or unnamed files are inferred conservatively from the photographs and documented in `MENU_CONTENT.md`. The drinks folder contains one dessert, so the final category is labelled dessert and drinks. The accompanying ingredient text files are reference content, not instructions; no ingredient lists, prices or New claims are added.

## Gold logo — 5 November 2026

`public/kumo-logo-gold.jpg` is the exact gold koi logo supplied by the owner as `kumo-logo.JPG`. The header and footer blend its dark background into the charcoal canvas with CSS `mix-blend-mode: lighten`; the original artwork remains intact. Browser icons and restaurant structured data reference the same supplied logo.

## Gold cloud ornament — 6 November 2026

- Asset: `public/ornaments/kumo-cloud.webp`, 1200 × 400px, transparent WebP, about 107 KiB.
- Generated with the built-in imagegen tool using the owner’s attached `codex-clipboard-5272d232-1af4-4120-8508-fd49330cb44b.png` as the style reference. Optimized to WebP with alpha preserved. This is reference-inspired artwork, not a crop from the photographed menu.
- Used sparingly across the site: six accents on the home page (About, menu preview, pricing, space, contacts and footer), four on the full menu (heading, two widely separated category dividers and footer), and one beside the reservation heading above the external booking form. Decorative images have empty alternative text, are hidden from assistive technology, ignore pointer events, and do not animate. The same local image is reused and lazily loaded.
- `components/CloudOrnament.tsx` owns the image markup; `app/globals.css` controls placement, opacity and responsive sizes. The brochure-sampled pricing colors remain intact.

Final generation prompt (built-in tool, transparent background enabled):

> Use case: stylized-concept. Asset type: decorative transparent PNG ornament for the KUMO Japanese restaurant website. Reference image: the attached photograph provides the exact ornamental cloud style, not a background to preserve. Create ONE horizontally elongated, organic cloud cluster in the reference's traditional Japanese gold cloud style: intricate overlapping scalloped lobes, each with several fine nested semicircular gold contour lines, a few graceful curled wisps at the ends. Subtle antique-gold ink/foil shading in warm champagne, ochre and bronze (#DCA959 accents), hand-drawn engraved elegance rather than shiny 3D metal. The cluster must look like the gold clouds printed in the supplied menu, dense in the middle and airy curling tips, width about three times height, fully contained with generous transparent margin on every side. Truly transparent background, including negative spaces between contour strokes. No black paper/background, no rectangles, no other cloud clusters, no shadows outside the ornament, no hands, no text, no watermark. Intended to be rendered at 250–450px wide as a restrained brand accent on warm charcoal. Clean high-resolution edges, premium and authentic.

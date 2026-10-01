# Sushi King

Premium sushi restaurant landing page built with Next.js 16, TypeScript, Tailwind CSS v4, and Framer Motion.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Bodoni Moda + Manrope (Google Fonts)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command          | Description                    |
| ---------------- | ------------------------------ |
| `npm run dev`    | Start development server       |
| `npm run build`  | Build for production           |
| `npm run start`  | Start production server        |
| `npm run typecheck` | Run TypeScript type check   |

## Project Structure

```
app/           # Next.js App Router pages
components/    # Reusable UI components
lib/           # Content data and utilities
public/        # Static assets (images)
```

## Deployment

This project is configured for zero-config deployment on [Vercel](https://vercel.com).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## Environment Variables

Copy `.env.example` to `.env.local` and fill in any required values.

The database-driven footer legal links require these variables locally and in
each applicable Vercel environment:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your-key
```

Use only a Supabase publishable key. Never configure a secret or service-role
key for this feature. Adding or changing either Vercel environment variable
requires a redeployment. Changes to the restaurant's legal URLs in Supabase
appear on the website after the five-minute revalidation interval.

## Promotion popup

`@andrezhan27/intelis-restaurant-ui` loads active promotions for restaurant ID
`sushiking` using the same Supabase environment variables. Its public
`get_restaurant_promotion_state` RPC and broadcast migrations must be installed
in that project. With no active promotions or missing configuration, no popup
or promotions button is shown.

Configure a promotion in the Intelis dashboard with a title, description, image
URL, image alt text, CTA text, and CTA destination `/reservar`. Use a portrait
image around a 4:5 ratio and one active promotion to match the reference's
desktop layout: white panel, poster on the left, complete copy and black CTA on
the right. Multiple active promotions use the package's card layout. On mobile,
the package fits the image and copy into a 65% viewport-height popup; long copy
is truncated to keep the CTA visible.

The popup opens automatically once per browser-tab session. Visitors can close
it with the close button, backdrop, or Escape, then reopen it with the floating
`Ver Promoções` button below the navbar. Promotion edits update through the
package's live subscription and scheduled refreshes.

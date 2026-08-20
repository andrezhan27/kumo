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

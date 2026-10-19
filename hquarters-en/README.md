# HQuarters — Frontend

React SPA for [hquarters.co.id](https://hquarters.co.id). Vite + React 19 + Tailwind CSS v4.

## Stack

- **React 19** + **Vite 6**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Framer Motion** — page/section animations
- **Lucide React** — icons
- **clsx** + **tailwind-merge** — conditional classnames

## Setup

```bash
npm install
npm run dev       # localhost:3000
npm run build     # output → dist/
npm run preview   # preview dist/
```

Dev server proxies `/wp-json` to `https://hquarters.co.id` (see `vite.config.js`).

## Project Structure

```
src/
  components/       # Shared/reusable sections
  pages/            # Full page components
  lib/              # Utilities
public/
  BUILDING/         # Building photos (AVIF + WebP responsive)
  SPACES/           # Space photos per category
  tenants/          # Company logos (WebP, max 400×280)
  homepagelogobaru/ # Homepage featured logos
  Function Room/    # Function room photos
  FASILITAS/        # Facilities photos
  LOGO/             # HQuarters brand assets
```

## Routing

Client-side routing via `currentPage` state in `App.jsx` (no React Router). URL paths mapped manually:

| Path | Page |
|------|------|
| `/` | HomePage |
| `/spaces` | SpacesPage |
| `/spaces/soho` | SpaceSohoDuplexPage |
| `/spaces/premium-office` | SpacePremiumOfficePage |
| `/spaces/serviced-office` | SpaceServicedOfficePage |
| `/spaces/virtual-office` | SpaceVirtualOfficePage |
| `/spaces/function-room` | EventFunctionRoomPage |
| `/building` | BuildingPage |
| `/companies` | CompaniesPage |
| `/find-space` | FindSpacePage |
| `/insights` | InsightsPage |
| `/location` | LocationPage |

## Key Components

| Component | Purpose |
|-----------|---------|
| `FindSpaceSection` | Lead form embedded in each space detail page |
| `FindSpacePageSection` | Standalone `/find-space` lead form |
| `CompaniesSection` | Tenant logos grouped by industry |
| `Hero` | Homepage hero with responsive AVIF/WebP image |
| `BuildingSection` | Building amenities + wellness gallery |

## Forms & Validation

Lead forms in `FindSpaceSection`, `FindSpacePageSection`, and `EventFunctionRoomPage` validate:
- **Name** — required, min 2 chars
- **WhatsApp** — required, Indonesian format (`08xxx` or `62xxx`), digits only

On submit, fires GTM `lead_form_success` event then opens WhatsApp `wa.me` link.

## GTM

Container `GTM-TMKCF6GF` in `index.html`. Custom event: `lead_form_success` with `space_type` parameter.

## Images

All images must be **WebP**. Hero uses responsive `srcset` (640w / 800w / 1536w).

Compress recipe:
```bash
# Photos (q:v 82)
ffmpeg -i input.jpg -vf "format=rgb24" -c:v libwebp -q:v 82 -f webp output.webp

# Logos (q:v 90, max 400×280)
ffmpeg -i input.png -vf "scale='min(400,iw)':'min(280,ih)':force_original_aspect_ratio=decrease,format=rgba" -c:v libwebp -q:v 90 -f webp output.webp
```

## Build & Deploy

```bash
npm run build
powershell -ExecutionPolicy Bypass -File postbuild.ps1
```

`postbuild.ps1` inlines the CSS `<link>` into a `<style>` tag (eliminates render-blocking CSS) and fixes `%2520` encoding in AVIF preload hrefs.

Deploy by uploading `dist/` contents to `~/public_html/` on the server, then clearing cache:

```bash
cd ~/public_html && unzip -qo prod.zip && rm -rf wp-content/cache/wp-rocket/* ~/lscache/* 2>/dev/null
```

## Cache Busting

Asset URLs use `?v=YYYYMMDD` query strings. Update the version string when replacing an image file.

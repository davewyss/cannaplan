# Cannaplan app

Refactored Vite + React project for the Cannaplan app.

## What changed

- `src/main.tsx` now only mounts the app
- screens split into separate files
- non-home screens lazy-loaded for better startup performance
- article, nav, and shared UI moved into reusable components
- image loading improved with `loading="lazy"`, `decoding="async"`, and fixed dimensions
- builder-facing copy removed from public app screens
- project zip cleaned so it no longer includes `.git`, `dist`, or `node_modules`

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Environment

Set your Google Apps Script endpoint in `.env`:

```bash
VITE_PUBLIC_SHEETS_URL=your-script-url-here
```

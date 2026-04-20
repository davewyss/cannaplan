# Cannaplan app

 This is the Refactored Vite + React project for the Cannaplan app. yay! huzzah!
 

## What changed

- `src/main.tsx` now only mounts the app
- screens split into separate files
- non-home screens lazy-loaded for better startup performance
- article, nav, and shared UI moved into reusable components
- image loading improved with `loading="lazy"`, `decoding="async"`, and fixed dimensions
- builder-facing copy removed from public app screens
- project zip cleaned so it no longer includes `.git`, `dist`, or `node_modules`

## Run locally


# Cannaplan V2 — ARTICULOS sheet connection

## 1. Add your Apps Script endpoint
Create `.env` in the project root:

```bash
VITE_PUBLIC_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

The app will request:

```text
${VITE_PUBLIC_SHEETS_URL}?sheet=ARTICULOS
```

## 2. Expected response shape
The endpoint should return JSON like:

```json
{
  "sheet": "ARTICULOS",
  "count": 2,
  "records": [
    {
      "Titulo": "...",
      "Extracto": "...",
      "Texto": "...",
      "Fecha": "2026-03-25",
      "Autor": "...",
      "Categoria": "Noticias",
      "Destacado": true,
      "Visibilidad": true,
      "Slug": "mi-articulo",
      "Enlace de Imagen Drive": "https://..."
    }
  ]
}
```

## 3. Run it
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
## Notes
- `Destacado: true` is used for the top featured story on Inicio.
- `Visibilidad: false` hides records.
- if no live data loads, the app falls back to mock content so the UI still works.
- later, this same mapping can be moved to a Sheets → Firestore sync job.

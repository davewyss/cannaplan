
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

## Notes
- `Destacado: true` is used for the top featured story on Inicio.
- `Visibilidad: false` hides records.
- if no live data loads, the app falls back to mock content so the UI still works.
- later, this same mapping can be moved to a Sheets → Firestore sync job.

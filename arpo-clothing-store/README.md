# Arpo Clothing Store
A ready-to-edit React + Vite + Tailwind storefront. Edit products live in the app (Edit Mode → JSON).

## Run locally
```bash
npm install
npm run dev
```

The dev server is configured to listen on `0.0.0.0:5173`, so you can open it from any device that can reach your machine (for example, a Codespaces/VPS preview or another computer on your network).

## Edit the storefront live
1. Run `npm run dev` and open the site in your browser.
2. Click **Edit Mode** in the top-right corner.
3. Update the JSON in the left textarea (change product details, theme colors, etc.).
4. Press **Save & Refresh** — the storefront will instantly reflect your edits.

## Build
```bash
npm run build
npm run preview
```

## Deploy to Vercel (recommended)
1. Create a GitHub repo (github.com → New).
2. Upload all files in this folder to that repo.
3. Go to vercel.com → Add New Project → Import Git Repository → pick your repo.
4. Framework: Vite (auto) | Build: `npm run build` | Output: `dist`
5. Deploy.

## Deploy to Netlify
**A) Import from GitHub**: Build `npm run build`, Publish `dist`.
**B) Drag & drop**: Run `npm run build` locally, then drag the `dist/` folder to app.netlify.com/drop.

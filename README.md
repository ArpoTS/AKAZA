# Arpo Clothing Store
A ready-to-edit React + Vite + Tailwind storefront. Edit products live in the app (Edit Mode → JSON).

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

## Deploy to Vercel (recommended)
1. Create a GitHub repo (github.com → New).
2. Upload all files in this folder to that repo.
3. Go to vercel.com → Add New Project → Import Git Repository → pick your repo.
4. Framework: Vite (auto) | Build: `npm run build` | Output: `dist`
5. Deploy.

## Deploy to Netlify
**A) Import from GitHub**: Build `npm run build`, Publish `dist`.
**B) Drag & drop**: Run `npm run build` locally, then drag the `dist/` folder to app.netlify.com/drop.

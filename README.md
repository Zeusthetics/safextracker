# SAFEX Engineering Operations

A Vite + React 19 + TypeScript + Tailwind CSS workspace that integrates the supplied `SideFolder` component and preserves the existing SAFEX tracker.

## Project structure

```text
safex-engineering-react/
├── public/
│   └── tracker.html              # Existing tracker; Google Sheets logic retained
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── side-folder.tsx   # Integrated SideFolder component
│   │       └── silk-mesh-shader-hero.tsx # Interactive WebGL silk background
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── components.json               # shadcn configuration
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig*.json
├── vite.config.ts
└── package.json
```

## Run locally

1. Install Node.js 20 or newer.
2. Open a terminal in this folder.
3. Run:

```bash
npm install
npm run dev
```

4. Open the local Vite address printed in the terminal.

To create a production build:

```bash
npm run build
npm run preview
```

## shadcn/ui setup

This project already has the shadcn-compatible structure and configuration:

- Component alias: `@/components`
- UI component alias: `@/components/ui`
- Utility alias: `@/lib/utils`
- Global styles: `src/index.css`
- shadcn configuration: `components.json`

The `src/components/ui` folder is the standard location for shadcn UI primitives. Keeping shared primitives there means future shadcn CLI additions, imports, and custom components follow one predictable path.

To add shadcn components later, run:

```bash
npx shadcn@latest add button card badge
```

If the shadcn CLI asks to initialize the project, choose the existing `src/components/ui` alias and `src/index.css` stylesheet.

## What was integrated

- `SideFolder` is installed at `src/components/ui/side-folder.tsx` and used in the Engineering File Vault panel.
- `SilkMeshShaderHero` is installed at `src/components/ui/silk-mesh-shader-hero.tsx` and runs as a full-page interactive WebGL background. It responds to pointer movement and click ripples, with reduced-motion and no-WebGL fallbacks.
- The embedded tracker uses translucent glass-like panels so the shader remains visible behind its KPIs, charts and project controls. Opening `tracker.html` directly retains its normal dark background.
- Tailwind CSS and TypeScript are configured.
- `lucide-react` supplies the engineering UI icons.
- The original tracker is retained at `public/tracker.html` and displayed inside the React shell. This deliberately preserves its existing Google Sheets integration, refresh interval, filters, sorting, project details, milestone progress and New Parts tab rather than rewriting its working data logic during a visual component integration.
- The original tracker palette has been aligned to a dark navy / blue / cyan engineering theme. Its four palette choices are retained as dark variants.

## GitHub Pages deployment

The Vite base path is relative (`./`) and the tracker iframe URL uses `import.meta.env.BASE_URL`, so the project works from a repository subpath. The workflow at `.github/workflows/deploy.yml` builds and deploys the site to GitHub Pages whenever `main` is updated. In repository Settings → Pages, select **GitHub Actions** as the source.

## Google Sheets note

The embedded tracker still reads the configured Google Sheet directly from the browser. The sheet must remain accessible to the intended viewers. If the embedded tracker reports an access error, verify the sheet's sharing permissions and network access.

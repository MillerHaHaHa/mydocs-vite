# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A VitePress v2 (alpha) static documentation site for embedded Linux development notes, focused on **Goke (国科微)** SoC platforms. Content is written in Chinese Markdown. Deployed to GitHub Pages at `https://huangmingle.github.io/mydocs-vite/`.

## Commands

```bash
npm run docs:dev      # Start dev server at http://localhost:5173/mydocs-vite/
npm run docs:build    # Build to docs/.vitepress/dist/
npm run docs:preview  # Preview the production build locally
```

The `base` path is `/mydocs-vite/`, so all URLs in dev and prod are prefixed with that.

## Adding or editing content

- All content lives as `.md` files under `docs/`. Chinese filenames are used without extension in sidebar links — VitePress resolves them automatically.
- **When creating a new page**, you must add it to the sidebar in `docs/.vitepress/config.mts` or it won't be navigable. The sidebar is manually maintained per section (`/goke/`, `/technology/`, `/trivia/`).
- Images go in `docs/image/` and are referenced from Markdown with relative paths.

## Architecture

```
docs/
├── index.md                    # Home page (hero layout)
├── .vitepress/config.mts       # Site config: nav, sidebar, base path, title
├── goke/                       # Goke platform docs
│   ├── common/                 # Cross-platform (kernel config, debugging, drivers, porting)
│   ├── v500/                   # V500 series-specific
│   ├── 7606v1/                 # 7606V1 series-specific
│   └── 7206v1/                 # 7206V1 series-specific
├── technology/                 # General tech notes
│   ├── embedded/               # Embedded dev (RaspberryPi, OpenIPC, HT1621, etc.)
│   └── linux_server/           # Linux server config (NFS, Nginx, Samba, SSH, LLM)
└── trivia/                     # Miscellaneous notes
```

## Deployment

Pushing to `master` triggers GitHub Actions (`.github/workflows/deploy.yml`) which builds with VitePress and deploys `docs/.vitepress/dist/` to the `gh-pages` branch via `peaceiris/actions-gh-pages@v4`.

## Key conventions

- `docs/.vitepress/cache/` and `docs/.vitepress/dist/` are git-ignored.
- The site uses VitePress v2 alpha (`^2.0.0-alpha.17`) — API may differ from v1. Check [vitepress.dev](https://vitepress.dev/) for current v2 docs.
- Sidebar groups use `collapsed: true` (Goke sections) or `collapsed: false` (Technology/Trivia sections) to control default expansion.

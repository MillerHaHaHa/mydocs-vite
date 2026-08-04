# Repository Guidelines

## Project Overview

This repository is a VitePress v2 (alpha) static documentation site for embedded Linux development notes, focused on Goke (国科微) SoC platforms. Content is authored in Chinese Markdown and deployed to GitHub Pages.

## Project Structure & Module Organization

- `docs/` — All documentation source (Markdown) and site assets.
- `docs/index.md` — Home page (hero layout).
- `docs/.vitepress/config.mts` — Site configuration: nav, sidebar, base path (`/mydocs-vite/`).
- `docs/goke/` — Goke platform docs: `common/`, `v500/`, `7606v1/`, `7206v1/`.
- `docs/technology/` — General tech notes: `embedded/`, `linux_server/`.
- `docs/trivia/` — Miscellaneous notes.
- `docs/image/` — Images, referenced from Markdown with relative paths.
- `.github/workflows/deploy.yml` — CI/CD pipeline for build and deploy.
- `docs/.vitepress/cache/` and `docs/.vitepress/dist/` — Generated output, git-ignored.

## Build, Test, and Development Commands

- `npm install` — Install dependencies (VitePress is the only dependency).
- `npm run docs:dev` — Start the dev server with hot reload at `http://localhost:5173/mydocs-vite/`.
- `npm run docs:build` — Build the static site into `docs/.vitepress/dist/`.
- `npm run docs:preview` — Preview the production build locally.

There is no test suite or linter; `npm run docs:build` is the primary validation step.

## Coding Style & Naming Conventions

- Write content in Chinese Markdown, keeping technical terms in English.
- Follow the existing heading structure and folder layout; add new pages to the sidebar in `docs/.vitepress/config.mts` or they won't be navigable.
- Use relative paths for images under `docs/image/` and keep image filenames descriptive.
- Chinese filenames are allowed; sidebar links reference them without the `.md` extension.
- Sidebar groups use `collapsed: true` for Goke sections and `collapsed: false` for Technology/Trivia.

## Testing Guidelines

This project has no automated tests. Verify changes by running `npm run docs:build` (check for build errors and broken links), then review with `npm run docs:preview`.

## Commit & Pull Request Guidelines

- Use Conventional Commits-style prefixes found in the history: `docs:` for documentation, `fix:` for fixes (e.g., `docs: 新增7206V1侧边栏入口`, `fix: 修复图片路径为相对路径`).
- Write concise, descriptive summaries in Chinese that match the affected content.
- In PRs, describe the change, link related issues if any, and call out sidebar or config updates.

## Deployment

Pushing to `master` (or `main`) triggers `.github/workflows/deploy.yml`, which runs `npm ci`, builds with VitePress, and publishes `docs/.vitepress/dist/` to the `gh-pages` branch. No manual deployment is needed.

## Agent-Specific Notes

AI agents should also read `CLAUDE.md` for additional conventions, and always register new pages in the sidebar in `docs/.vitepress/config.mts`.

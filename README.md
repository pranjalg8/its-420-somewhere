# It's 4:20 somewhere

A live 3D globe that rotates to wherever it's 4:20 next (AM or PM), with a countdown and a short summary of local cannabis law and culture.

- **Nearest 4:20** is computed from real IANA time zones (DST included) for ~45 curated cities.
- When several places share the same moment, the globe takes turns showing them.
- Click a pin or an item in "Coming up" to look at any place; "Follow the nearest 4:20" resumes auto-follow.
- Preview any moment with `?time=2026-04-20T10:49:55Z`.

Built with Vite, TypeScript and [globe.gl](https://globe.gl).

## Develop

```bash
npm install
npm run dev
npm run build
```

Pushes to `main` deploy to GitHub Pages through `.github/workflows/deploy.yml`.

## Data disclaimer

Legal summaries in `src/places.ts` are simplified and written from general knowledge. Cannabis law changes often and differs by region, so verify against official sources. This is not legal advice. PRs correcting entries are welcome.

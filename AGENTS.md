# AGENTS.md

## Cursor Cloud specific instructions

This is a React 19 + Vite 7 single-page corporate website (Jasmino Corporation). No backend, database, or external services are needed.

### Key commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (port 5000, binds to `0.0.0.0`) |
| Build | `npm run build` |
| Preview prod | `npm run preview` |

### Notes

- There are no lint, test, or typecheck scripts in `package.json`. The project is plain JavaScript (JSX), not TypeScript.
- The dev server runs on **port 5000** (configured in `vite.config.js`).
- Three.js 3D scenes (pressure vessel, globe, blueprint) require WebGL; headless/non-GPU environments will show SVG fallbacks.
- All content is static data in `src/data/`; no API keys or environment variables are needed.

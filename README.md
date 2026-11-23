# Clean React Native

Monorepo example showing a clean architecture for React Native applications (Nx + TypeScript + Expo).

## Structure

- `apps/bank-app` — main application (domain / application / infrastructure / presentation layers)
- `apps/bank-app-e2e` — Detox end-to-end tests
- `apps/storybook` — component workshop
- `libs/` — shared domain, UI, and utility libraries

## Requirements

- Node.js (see `.nvmrc`)
- npm

## Getting started

```bash
npm install
npx nx run bank-app:start
npx nx run storybook:start
```

## Tests

```bash
npx nx run-many --target=test --all
```

## License

MIT — see [LICENSE](./LICENSE).

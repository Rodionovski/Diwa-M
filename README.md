# Diwa-M

Сайт студії краси: Vue 3, Vue Router, SCSS. Фото й прайс редагуються через `/admin` після підключення Supabase.

```sh
npm ci
npm run serve
npm run build
```

Підключення адмінки, створення адміністраторів і налаштування Render: [supabase/README.md](supabase/README.md).

Публічні параметри Supabase задано у `.env.example`; локальні значення зберігайте у `.env.local`.

## CSP-compatible builds

`vue.config.js` uses external source maps in development (no eval wrappers), resolves browser globals through `globalThis`, and replaces three legacy core-js internals with browser-only equivalents in `build/csp/`. Dependencies are not modified. These adapters target the site's modern browsers, not Node/server bundles.

`npm run build` automatically runs `npm run check:csp`. The check parses every emitted JavaScript bundle and fails on direct eval/Function calls, constructors, and string timers. For another output directory: `npm run check:csp -- /absolute/path/to/js`.

This checks application assets; it does not diagnose CSP violations from browser extensions or a hosting policy. It does not add `unsafe-eval` or relax CSP.

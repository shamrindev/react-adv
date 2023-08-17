# artHub

A Reddit-style article-sharing single-page app: browse a community feed, read and
write articles, upvote/downvote, rate, and comment. Built as a production-grade
front-end showcase with **React 18 + TypeScript**, **Redux Toolkit / RTK Query**,
and a strict **Feature-Sliced Design** architecture.

🔗 **Live component library (Storybook):** https://ch4m4.github.io/react-adv/

<!-- Add a screenshot or GIF of the feed here, e.g. docs/feed.png, to make the
     README pop for reviewers. -->

---

## Features

- **Article feed** — infinite scroll, sort (views / title / date), filter by
  community, and full-text search.
- **Articles** — rich content blocks (text, image, code), create & edit, related
  recommendations (RTK Query).
- **Engagement** — upvote/downvote with optimistic local state, 5-star rating,
  and threaded comments.
- **Auth & RBAC** — mock login with role-based route guards (`USER` / `ADMIN` /
  `MANAGER`); guests can browse, authenticated users can contribute.
- **i18n** — full English/Russian localization (`react-i18next`).
- **Theming** — dark (default) and light themes via CSS custom properties.
- **Accessible** — labelled controls, keyboard-operable rating/voting, focus-trapped
  modals, Escape-to-close drawers.

## Tech stack

| Area | Choices |
| --- | --- |
| UI | React 18, TypeScript 4.8 (`strict`), SCSS Modules |
| State | Redux Toolkit, RTK Query, dynamically-injected reducers |
| Routing | react-router-dom 6 (lazy routes, RBAC guards) |
| Build | webpack 5 (hand-rolled config) with an alternative Vite config |
| i18n | i18next / react-i18next |
| Quality | ESLint, Stylelint, Prettier, Jest + Testing Library, Cypress, Storybook |
| Mock API | json-server |

## Architecture — Feature-Sliced Design

Code is organized into FSD layers, each importing only from the layers below it
(`app → pages → widgets → features → entities → shared`). Every slice exposes a
narrow public API through its `index.ts`; cross-slice imports go through those
barrels (enforced by the `@/` path alias).

```
src/
  app/        # providers (store, router, theme, error boundary), global styles
  pages/      # route-level screens (lazy-loaded)
  widgets/    # composite UI blocks (Navbar, Sidebar, Page)
  features/   # user scenarios (auth, add comment, rate article, edit profile…)
  entities/   # business units (Article, Comment, User, Profile, Rating…)
  shared/     # reusable UI kit, libs, hooks, config, types
```

Highlights worth a look:

- **Dynamic reducer manager** (`src/app/providers/StoreProvider/config/reducerManager.ts`)
  + `DynamicModuleLoader` — feature reducers mount on demand and tear down on
  unmount, so the Redux state tree is code-split rather than monolithic.
- **End-to-end typed thunks** via a shared `ThunkConfig<T>` with API dependency
  injection, plus a reusable generic `TestAsyncThunk` test harness.
- **Declarative, typed routing** with per-route `authOnly` / `roles`, covered by an
  integration test of the full auth matrix.

## Getting started

### Prerequisites

- Node.js **>= 18** (an `.nvmrc` pins the recommended LTS — run `nvm use`)

### Install

```bash
npm install
```

### Generate the local TLS cert for the mock API (one-time)

The mock server also exposes HTTPS, which needs a self-signed certificate. The
cert/key are git-ignored — generate your own:

```bash
openssl req -x509 -newkey rsa:2048 -nodes -days 365 \
  -keyout json-server/key.pem -out json-server/cert.pem -subj "/CN=localhost"
```

### Run (frontend + mock API together)

```bash
npm run start:dev        # webpack dev server (http://localhost:3003) + json-server
# or
npm run start:dev:vite   # same, using Vite instead of webpack
```

The mock API (json-server) runs on `http://localhost:8003` (and `https://localhost:8443`).

### Demo credentials

| Username | Password | Role |
| --- | --- | --- |
| `admin` | `123` | Admin |
| `user` | `123` | User |
| `manager` | `123` | Manager |

## Scripts

| Script | Description |
| --- | --- |
| `npm run start:dev` | Run the app (webpack) + mock API |
| `npm run start:dev:vite` | Run the app (Vite) + mock API |
| `npm run build:prod` | Production build |
| `npm run lint:ts` / `lint:scss` | Lint TypeScript / SCSS (append `:fix` to autofix) |
| `npm run types:check` | TypeScript type-check (`tsc --noEmit`) |
| `npm run test:unit` | Jest unit/integration tests |
| `npm run test:e2e` | Open Cypress (run the app first) |
| `npm run storybook` | Storybook component explorer |

## Testing

- **Unit & integration** — Jest + Testing Library, including slices, async thunks
  (via the `TestAsyncThunk` harness), and a routing/RBAC integration test.
- **E2E** — Cypress specs (login → create article → comment → rate). Run the app,
  then `npm run test:e2e`.
- **Component docs** — Storybook stories for the shared UI kit and key features.

## License

MIT © Vladislav Shamrin

# Contributing to Todo Plus

## Repository layout

| Path | What it is |
|---|---|
| `custom_components/todo_plus/` | The Home Assistant integration (Python), the bundled card (`www/`), and the translation files. This is the only thing HACS installs. |
| `frontend/` | TypeScript/Preact source for the Lovelace card. Dev-only — not shipped; the build output is committed into `custom_components/todo_plus/www/`. |
| `tests/` | Dependency-free backend tests (`python3 tests/run_tests.py`). |
| `scripts/` | Private, machine-specific dev scripts (git-ignored). |

## Backend (the integration)

- Pure Python, no third-party requirements.
- Recurrence math lives in `recurrence.py`; the data model / persistence and the
  recurrence engine in `store.py`; the `todo` entity and all `todo_plus.*`
  services in `todo.py`.
- Run the tests: `python3 tests/run_tests.py`.
- Translations are `custom_components/todo_plus/translations/<lang>.json`. These
  are the **single source** — used by the integration at runtime *and* by the
  card at build time (see below). There is no `strings.json`.

## Frontend (the Lovelace card)

The card is Preact + TypeScript, bundled with esbuild into
`custom_components/todo_plus/www/todo-plus-card.js`. That bundle is **committed**
so it ships with the HACS-installed component; the integration serves it and
registers it as a frontend module (no manual dashboard resource).

### Commands

```bash
cd frontend
npm install
npm run build      # typecheck + minified bundle
npm run dev        # unminified + sourcemap, rebuild on change
npm run watch      # rebuild on change (minified)
npm run lint       # ESLint — also checks formatting
npm run lint:fix   # auto-fix, incl. Prettier formatting
npm run format     # Prettier on everything
```

For a live loop against a running HA instance, `scripts/watch-frontend.sh`
rebuilds and pushes the bundle on every change (no HA restart — the file is
served statically; just reload the browser).

### Source structure

| Path | Responsibility |
|---|---|
| `src/index.ts` | Entry: registers the `<todo-plus-card>` element and the `customCards` entry. |
| `src/card/` | The custom element (`CardRoot`) and card-level composition (`Card`, `TodoList`, rows). |
| `src/components/` | Reusable, presentational primitives (`Icon`, `T`, `Checkbox`, `Badge`, …). |
| `src/dom/` | `css` tag + `registerCss`/`CssProvider`, and custom-element JSX typings. |
| `src/utils/` | i18n, element registration, date/sort helpers. |

### Component conventions

1. **Preact function components** with inline-typed props; hooks from `preact/hooks`.
2. **Class names are full, meaningful `entity-name`s in kebab-case — no
   abbreviations.** The class matches the component (a `Checkbox` uses
   `.checkbox`, not `.check`).
3. **State and variants are expressed as attributes, not modifier classes.**
   Prefer a native or ARIA attribute when one fits (`checked`, `disabled`,
   `hidden`, `aria-*`); otherwise use `data-*`. CSS selects on the attribute:
   ```tsx
   <span class="badge" data-priority="high" data-overdue="">…</span>
   ```
   ```css
   .badge[data-priority='high'] { … }
   .badge[data-overdue] { … }
   ```
4. **Styles are colocated** with each component: call `registerCss` with a `css`
   tagged template. `CssProvider` concatenates them into the card's single
   shadow-root `<style>`.
   Because that style is shared within the shadow root, keep class names
   globally unambiguous.
5. **Icons**: `<Icon name="calendar-clock" size={14} />` (renders `<ha-icon>`);
   names are typed against the MDI set.
6. **Custom elements** are registered through `registerCustomElement` (idempotent).

### Localization (single source)

Text is rendered with `<T token="card.…" />` inside a `<TranslationsProvider>`.
The strings come from the backend translation files
(`custom_components/todo_plus/translations/<lang>.json`, `card` section),
**imported at build time** and inlined into the bundle — one source, no runtime
loading. To add a language, add a `card` section to a new
`translations/<lang>.json` and rebuild.

### Linting & formatting

ESLint 9 (flat config, `eslint.config.js`) with `typescript-eslint`,
`eslint-plugin-react` (Preact `h` pragma) and `react-hooks`. Imports are
auto-sorted (`simple-import-sort`) and duplicate imports from the same module
are merged (`import-x/no-duplicates`). **Prettier runs through ESLint**
(`eslint-plugin-prettier`) — single quotes, 100-col (`.prettierrc.json`) — so
`lint:fix` formats for you. CI runs `npm run lint` and fails on lint or
formatting drift.

### The backend contract the card builds against

- **Reads** the entity's `tasks` attribute: an array of
  `{ uid, summary, description, status, due, start, priority, assignee,
  recurrence: { interval, unit, mode } | null }` (ISO date strings).
- **Writes** via `hass.callService('todo_plus', …, { entity_id, … })`:
  `create_task`, `update_task`, `set_recurrence`, `clear_recurrence`,
  `set_start_date`, `set_priority`, `set_assignee`, `delete_task`,
  `clear_completed`. Item-targeting services take `item` (summary or uid) or `uid`.

## Releasing (HACS)

HACS installs `custom_components/todo_plus/` at a git tag. Before tagging:
`(cd frontend && npm run build)` so the committed bundle matches source (CI
enforces this), bump `manifest.json` `version`, and push a matching tag.

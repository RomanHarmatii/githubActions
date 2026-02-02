# Copilot instructions — Playwright repo

Purpose: help AI agents be immediately productive when editing, running, or extending tests.

- **Run tests:** Use `npm run pw:test` to run the default project and `npm run pw:test:ui` for the Playwright UI. See [package.json](package.json#L1-L80).
- **Config source of truth:** Primary runner config is [playwright.config.js](playwright.config.js#L1-L200). It sets `testDir: "./tests"`, reporter `line`, `trace: "on"`, and shared `use` options.
- **Env loading:** Two patterns exist: [playwright.config.js](playwright.config.js#L1-L60) reads `.env`; [setup.js](setup.js#L1-L40) explicitly loads `.env.prod`. Do not hardcode `BASE_URL` — use `process.env.BASE_URL`.
- **Module type:** Project uses ESM (`"type": "module"` in [package.json](package.json#L1-L40)); use `import`/`export` syntax.
- **Test locations:** Config expects `./tests` but there are example specs in `e2e/` (e.g., [e2e/example.spec.js](e2e/example.spec.js#L1-L80)). Check and align `testDir` if you move files.
- **Integrations:** Allure and ReportPortal are present — see `allurerc.js` and devDeps in [package.json](package.json#L1-L120): `allure-playwright`, `@reportportal/agent-js-playwright`. Results appear under `allure-results/` and `allure-report/`.
- **Credentials & baseURL:** `httpCredentials` and `baseURL` are managed in `playwright.config.js` and environment variables; tests rely on these for auth and target site selection.
- **Concurrency & CI rules:** `workers: 2`, `retries` enabled on CI only, and `forbidOnly` is `!!process.env.CI`. Respect these flags when adding tests.
- **Traces & debugging:** `trace: "on"`. When investigating failures, open Playwright trace viewer (`npx playwright show-trace <trace.zip>`). Traces are enabled by default in config.
- **Report generation:** Allure config is in [allurerc.js](allurerc.js#L1-L80). Generated artifacts are kept in `allure-results/` — CI likely runs `allure generate` externally.
- **Coding style & conventions:** Use Playwright Test idioms (`test`, `expect`, fixtures). Examples follow ESM imports and role-based selectors (see [e2e/example.spec.js](e2e/example.spec.js#L1-L80)).
- **Dependencies & versions:** See [package.json](package.json#L1-L200). Playwright pinned via `@playwright/test` in devDeps; run `npm ci` or `npm install` before executing tests.

Quick tips for AI agents:
- Prefer editing `playwright.config.js` for global test behavior (timeouts, trace, retries) rather than patching tests for environment config.
- When adding helpers or reporters, reference existing files: [setup.js](setup.js#L1-L40) and [allurerc.js](allurerc.js#L1-L80).
- Avoid changing `type` in `package.json`; keep ESM style. Use `npx playwright` in scripts as shown.

If something here looks wrong or misses a workflow (CI commands, a specific env file, or custom reporters), tell me which area to expand and I will update this file.

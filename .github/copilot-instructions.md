# Copilot Instructions — Playwright E2E Suite

Purpose: make AI agents immediately productive when editing, running, or extending tests in this Playwright repo.

**Big Picture**

- **Test Runner:** Playwright Test orchestrates browser E2E across Chromium/WebKit/Firefox; config is in [playwright.config.js](playwright.config.js#L1-L200).
- **Architecture:** Tests live under [tests/](tests) (primary), with example specs in [e2e/](e2e). Page Object and Element abstractions live in [Helpers/](Helpers), enabling reusable UI interactions and fixtures.
- **Why:** Centralized config + helpers keep tests consistent across environments and simplify auth, navigation, and assertions.

**Run & Debug**

- **Install:** `npm ci`
- **Run default project:** `npm run pw:test`
- **Run UI mode:** `npm run pw:test:ui`
- **Trace viewer:** `npx playwright show-trace <trace.zip>` (traces are enabled via `trace: "on"`).
- **Docker:** Build + run using [Dockerfile](Dockerfile#L1-L40) on `mcr.microsoft.com/playwright:v1.58.0-noble` (CMD runs `pw:test`).

**Configuration Source of Truth**

- **Directories:** `testDir: "./tests"`; examples in [e2e/example.spec.js](e2e/example.spec.js#L1-L80).
- **Parallelism:** `fullyParallel: true`, `workers: 2`.
- **CI Rules:** `forbidOnly: !!process.env.CI`, `retries: 2` on CI only.
- **Timeouts:** `timeout: 60s`; `use.actionTimeout: 10s`, `use.navigationTimeout: 15s`.
- **Devices/Browser:** Base is `...devices["Desktop Chrome"]`.
- **Auth:** `use.httpCredentials` defaults to guest/welcome2qauto; override only if required.
- **Projects:** `default`, `staging` — both read `baseURL` from env via `process.env.BASE_URL`.

**Environment Loading**

- **Do not hardcode `BASE_URL`:** Always read from env. See [playwright.config.js](playwright.config.js#L1-L60) for `.env` loading.
- **Alternative loader:** [setup.js](setup.js#L1-L40) loads `.env.prod` via `dotenv`; use it for scripts/tools, not for altering runner behavior.
- **Module type:** ESM in [package.json](package.json#L1-L40); always use `import`/`export`.

**Helpers & Patterns**

- **Elements:** `BaseElement`, `Button`, `TextArea` abstract locators/actions — see [Helpers/Elements/Button.js](Helpers/Elements/Button.js#L1-L200).
- **Pages:** `BasePage` provides `navigate()` and common header — see [Helpers/Page%20Objects/BasePage.js](Helpers/Page%20Objects/BasePage.js#L1-L200) and [Helpers/Page%20Objects/HomePage.js](Helpers/Page%20Objects/HomePage.js#L1-L200).
- **Fixtures:** Extend Playwright fixtures to pre-navigate and expose page objects — see [Helpers/Fixtures/homePage.js](Helpers/Fixtures/homePage.js#L1-L200).
- **Selectors:** Prefer role-based selectors (`getByRole`) and stable attributes when wrapping in elements/pages.

**API & Network**

- **Requests:** Use `request` fixture for API calls and token handling; example in [tests/cypressMigration.spec.js](tests/cypressMigration.spec.js#L1-L200).
- **Mocking:** Intercept with `page.route()` and `route.fulfill()` to shape API responses; see [tests/seed.spec.ts](tests/seed.spec.ts#L1-L200).
- **Cookies:** Tokens are derived from `set-cookie`; pass with `headers: { Cookie: token }` for subsequent requests.

**Reporting & Artifacts**

- **Allure:** Minimal config in [allurerc.js](allurerc.js#L1-L80). Results appear in [allure-results/](allure-results). A static report may exist in [allure-report/](allure-report); generation is likely handled in CI.
- **ReportPortal:** Agent present in devDeps (see [package.json](package.json#L1-L120)); wires in via Playwright reporter when configured externally.
- **Playwright reports:** Built-in reports under [playwright-report/](playwright-report); raw run data under [test-results/](test-results).

**Conventions**

- **Add tests under `tests/`:** Keep examples under `e2e/` if they’re demos — adjust `testDir` only if moving primary locations.
- **Respect config:** Prefer changes in [playwright.config.js](playwright.config.js#L1-L200) for timeouts, retries, trace, devices.
- **Keep ESM:** Do not change `type` in [package.json](package.json#L1-L40).
- **Env-first:** Always use `process.env.BASE_URL`; never hardcode target URLs.
- **Do not use selectors by text** Always prefer role-based or stable attribute selectors.

If any workflow or integration is unclear (CI commands, report generation, additional reporters), call out the gaps and I’ll expand this file.

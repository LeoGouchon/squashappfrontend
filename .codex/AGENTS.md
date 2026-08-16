# Squash App Frontend Agent Guide

## Project Overview

This repository is an Angular 19 frontend for a squash match tracking application. It uses standalone Angular components, PrimeNG UI components, PrimeFlex utilities, RxJS, Karma/Jasmine tests, and strict TypeScript settings.

The app supports match creation and scoring, match history, player pages, statistics, login/register/profile flows, and admin player management. Most backend access is isolated in `src/app/services/api-*` services and typed through interfaces in the same folders.

## Key Commands

- Install dependencies: `npm install`
- Start local development server: `npm run dev`
- Start default Angular server: `npm start`
- Production build: `npm run build`
- Development watch build: `npm run watch`
- Unit tests: `npm test`
- Release: `npm run release`

`npm run build` runs `generate-env.js` first. That script requires `API_URL` and generates `src/environments/environment.prod.ts`. For local development, `ng serve --configuration development` expects `src/environments/environment.dev.ts`; create or preserve it locally if needed.

## Repository Layout

- `src/main.ts` bootstraps the Angular app.
- `src/app/app.config.ts` wires routing, PrimeNG theme, HTTP interceptors, and dependency injection providers.
- `src/app/app.routes.ts` defines routes. Use constants from `src/app/AppRoutes.ts` instead of duplicating route strings.
- `src/app/components/` contains standalone feature components. Each component usually has `.ts`, `.html`, `.css`, and `.spec.ts` files.
- `src/app/services/` contains API clients, auth/token logic, navigation, match state, guards, and interceptors.
- `src/app/types/` contains shared domain types.
- `src/environments/environment.ts` contains default environment values.
- `public/` contains static assets copied by Angular.

## Architecture Notes

- Components are standalone and declare dependencies in their `imports` array.
- UI is built mostly with PrimeNG components and PrimeFlex utility classes.
- The app uses the PrimeNG Aura theme with `.app-dark` as the dark mode selector.
- HTTP is configured with `provideHttpClient(withInterceptors([...]))` in `app.config.ts`.
- `authInterceptor` attaches bearer tokens and credentials.
- `error401Interceptor` refreshes tokens on 401 responses and redirects to login if refresh fails.
- `TokenService` stores the access token under `squashapp.accessToken` and refreshes via `/authenticate/refresh-token`.
- `MatchService` owns in-progress match state and persists it in `localStorage` under `currentMatch`.
- Several services are injected by string tokens such as `'ApiMatchInterface'` and `'NavigationServiceInterface'`. Preserve these existing tokens unless doing a broader DI cleanup.

## Coding Conventions

- Follow `.editorconfig`: UTF-8, 4-space indentation, final newline, trim trailing whitespace.
- TypeScript is strict. Avoid `any` unless matching an existing API surface or there is no useful local type yet.
- Prefer single quotes in TypeScript.
- Keep component logic in the `.ts`, markup in `.html`, and styling in the component `.css`.
- Keep route strings centralized in `AppRoutes`.
- Keep backend calls in API services and return `Observable` values from service methods.
- Use existing domain types from `src/app/types/` before creating new shapes.
- Preserve the existing French UI copy and terminology unless the task asks for text changes.
- Avoid unrelated refactors. This repo has a straightforward feature-folder layout; keep new files close to the feature or service they belong to.

## Angular and UI Guidance

- Use standalone components, not NgModules.
- Add required PrimeNG modules/components directly to the component `imports` array.
- Prefer PrimeNG components and PrimeFlex classes already used in the project.
- Existing templates use Angular control flow syntax such as `@if` and `@for`; follow that style for new template conditions and loops.
- Keep component CSS scoped unless a style is genuinely global.
- Global styles belong in `src/styles.css`.

## Testing Guidance

- Tests are Karma/Jasmine specs beside the code under test.
- Use Angular `TestBed` and import standalone components directly in `imports`.
- When adding logic to services or interceptors, add focused unit coverage where practical.
- For HTTP services, prefer Angular HTTP testing utilities over real network calls.
- Before finishing substantial changes, run at least `npm test` or a narrower relevant test command if available. Run `npm run build` when changing routing, environments, Angular configuration, or production-sensitive code.

## Environment and API Notes

- Production builds require `API_URL`.
- `environment.timeoutValue` is used by API services for RxJS `timeout`.
- API services build URLs from `environment.apiUrl`.
- Auth endpoints use credentials and refresh-token cookie behavior, so do not remove `withCredentials` from auth-related requests without checking backend expectations.

## Git and Generated Files

- Do not commit `node_modules/`, `dist/`, or generated Angular cache output.
- `src/environments/environment.prod.ts` is generated by `generate-env.js`; avoid hand-maintaining it unless the project policy changes.
- The working tree may contain user changes. Inspect `git status --short` before editing and do not revert unrelated modifications.

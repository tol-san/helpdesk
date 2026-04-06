# Project Guidelines

## Code Style

- Use TypeScript throughout and keep strict typing intact in both workspaces.
- Follow the existing style in [client/src/App.tsx](client/src/App.tsx), [client/src/main.tsx](client/src/main.tsx), [server/src/index.ts](server/src/index.ts), and [server/src/routes/api.ts](server/src/routes/api.ts).
- Prefer small, focused changes over broad refactors.
- Keep imports, formatting, and naming consistent with the surrounding file.

## Architecture

- This repository is a Bun workspace with two apps: [server](server/) for the Express API and [client](client/) for the React UI.
- The server exposes `/api/*` routes from [server/src/routes/api.ts](server/src/routes/api.ts) and starts from [server/src/index.ts](server/src/index.ts).
- The client is a Vite React app rooted at [client/src/main.tsx](client/src/main.tsx) and [client/src/App.tsx](client/src/App.tsx).
- Treat [project-scope.md](project-scope.md), [tech-stack.md](tech-stack.md), and [implementation-plan.md](implementation-plan.md) as the source of truth for product direction and phase ordering.
- This is still an early scaffold; some areas described in the docs are planned rather than implemented.

## Build and Test

- Use Bun commands, not npm or yarn.
- Root commands: `bun run dev`, `bun run build`, `bun run start`, and `bun run type-check`.
- Workspace commands: `bun run dev:server`, `bun run dev:client`, `bun run build:server`, and `bun run build:client`.
- Prefer running the narrowest command that validates the area you changed.

## Conventions

- Keep the client port at `5173` and the server port at `3001` unless a change explicitly updates the related config and docs together.
- Update CORS and client API settings together when server origins change.
- Preserve the existing request and response conventions in the API routes and keep the server’s error handling behavior intact.
- Link to the existing documentation in [README.md](README.md) and the project docs instead of repeating their content here.
- Use Context7 MCP for up-to-date documentation whenever a user asks about a library, framework, SDK, API, CLI tool, or cloud service.
- For documentation questions, resolve the library ID first, then query Context7 before answering.
- Prefer project-specific context from this repository when available, but do not rely on stale model knowledge for library APIs or CLI usage.

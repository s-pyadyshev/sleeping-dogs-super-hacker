# Requests & Remote Data

This app loads and writes remote data through a small API layer and **TanStack Query** (React Query). In-game UI state (digits, attempts, timer) lives in **React Context** (`GameProvider`)—not in the query layer.

## Overview

| Source | Purpose | Operation |
|--------|---------|-----------|
| GitHub REST API | Star count on About page | Read |
| Firebase Firestore `scores` | High-score leaderboard | Read / write |
| Firebase Firestore `stats/statsDoc` | Global wins / losses counters | Read / increment |

There is no shared HTTP client (no axios). GitHub uses native `fetch`; Firebase uses the compat SDK initialized in `src/firebase/firebase.util.tsx`.

## Architecture

```
Component
  → hook (useGithubStats, useScores, useSubmitScoreMutation, …)
    → TanStack Query (cache, loading, error, retries)
      → API function (src/api/*.ts)
        → fetch / Firestore
```

After a successful score submit or stats update, mutations **invalidate** related queries so the scoreboard can refetch fresh data.

## API layer (`src/api/`)

### GitHub — `github.ts`

- **Endpoint:** `GET https://api.github.com/repos/s-pyadyshev/sleeping-dogs-super-hacker`
- **Function:** `getGithubStats()` → `{ stargazers_count: number }`
- **Errors:** Non-OK responses throw; network errors are logged and rethrown.

### Firestore — `firestore-api.ts`

| Function | Collection / doc | Action |
|----------|------------------|--------|
| `fetchScores()` | `scores` | `.get()` all documents |
| `fetchGameStats()` | `stats/statsDoc` | `.get()` wins & lost |
| `submitScore(form)` | `scores/{username}` | `.set()` player result |
| `incrementStat(name)` | `stats/statsDoc` | `.update()` field increment (`wins` or `lost`) |

Types live in `src/api/types.ts` (`ScoreEntry`, `GameStatsDoc`, `GithubRepoStats`).

### Query keys — `query-keys.ts`

Stable keys for cache identity:

- `['github', 'repo-stats']`
- `['scores', 'list']`
- `['stats', 'doc']`

## Hooks (`src/hooks/queries/`)

| Hook | Type | Used by |
|------|------|---------|
| `useGithubStats` | `useQuery` | `AboutPage` |
| `useScores` | `useQuery` | `Scoreboard` |
| `useGameStats` | `useQuery` | `Scoreboard` |
| `useSubmitScoreMutation` | `useMutation` | `SubmitForm` |
| `useIncrementStatMutation` | `useMutation` | `SubmitForm` (wins), `GameSDSH` (lost) |

`useScoreboardStats` combines scores + game stats and computes average time and attempts in a `useMemo`.

## Component usage

### About page

Reads GitHub stars via `useGithubStats()`. Shows `stargazers_count` when loaded (0 while loading).

### Scoreboard

- `useScores()` — list of player entries
- `useGameStats()` — wins / lost from Firestore
- Derived averages from score list (client-side)
- Loading when either query is pending

### Submit form (win flow)

1. On mount: `useIncrementStatMutation` → `incrementStat('wins')`
2. On submit: `useSubmitScoreMutation` → `submitScore(userForm)`; on success invalidates `scores` and redirects after 3s

### Game screen (lose flow)

When attempts reach 0: `useIncrementStatMutation` → `incrementStat('lost')` (fire-and-forget via `mutate`).

## Configuration

Firebase credentials come from Vite env vars (copy `.env.example` to `.env`):

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_DATABASE_URL`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## Error handling

- API functions throw on failure; TanStack Query exposes `isError` / `error` on hooks.
- UI currently logs failures and shows minimal loading states (no global error boundary).
- Mutations log write errors to the console (same as before refactor).

## Game state (not TanStack Query)

- `GameProvider` (`src/contexts/GameProvider.tsx`) — secret code, attempts, unlock state, digit input, elapsed timer
- Pure logic in `src/game/game-logic.ts`

## Provider setup

`QueryProvider` wraps the app in `src/index.tsx` with a shared `QueryClient` (`staleTime: 60s`, `retry: 1` for queries). In development, **React Query Devtools** are mounted via `@tanstack/react-query-devtools`.

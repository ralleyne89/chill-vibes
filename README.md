# Chill Vibes Music Player

Chill Vibes is a React music player for saving and browsing relaxed listening sessions. It combines Firebase authentication, a curated royalty-free catalog, per-user library persistence, theme preferences, and responsive player panels in a Create React App project.

## Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Firebase Setup](#firebase-setup)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Catalog and Local Data](#catalog-and-local-data)
- [Build and Deployment](#build-and-deployment)
- [Troubleshooting](#troubleshooting)
- [Verification Checklist](#verification-checklist)

## Features

- Firebase Email/Password and Google signup, login, logout, and protected app routes.
- Curated 37-track catalog with stable song IDs, genre, mood, duration, cover art, audio source, and license/source metadata.
- Browse panel with search across title, artist, genre, and mood, plus genre and mood filter chips.
- Per-user library persistence keyed by Firebase `currentUser.uid`.
- Duplicate prevention, favorites, removal, empty states, and reload-safe saved library state.
- Theme toggle with local light/dark preference persistence.
- Accessible player controls, labeled progress slider, playback speed menu, and visible audio load errors.
- Responsive library and browse overlays so narrow layouts do not crush the player.

## Tech Stack

| Area | Tooling |
| --- | --- |
| App framework | React 17 with Create React App / `react-scripts` |
| Routing | `react-router-dom` v5 |
| Authentication | Firebase Auth v9 |
| Styling | Sass, Bootstrap, React Bootstrap |
| Icons | Font Awesome React components |
| Hosting config | Firebase Hosting with SPA rewrites |

## Prerequisites

- Node.js `>=16.0.0`, as declared in `package.json`.
- npm with lockfile support. This repo includes `package-lock.json`, so use npm instead of Yarn unless you intentionally migrate package managers.
- A Firebase project with a registered web app if you want authentication to work locally.
- Network access for Firebase plus the external cover image and audio URLs used by the catalog.

## Quick Start

1. Install dependencies.

   ```bash
   npm ci
   ```

2. Create your local environment file.

   ```bash
   cp .env.example .env.local
   ```

3. Fill `.env.local` with your Firebase web app config. See [Environment Variables](#environment-variables) for the full list.

4. Start the development server.

   ```bash
   npm start
   ```

5. Open the app at [http://localhost:3000](http://localhost:3000).

Create React App reads environment variables at server startup. If you edit `.env.local`, stop and restart `npm start`.

## Environment Variables

All client-exposed variables must use the `REACT_APP_` prefix. Keep `.env.local` private; it is ignored by git.

| Variable | Required by app | Notes |
| --- | --- | --- |
| `REACT_APP_FIREBASE_API_KEY` | Yes | Firebase web API key. |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | Yes | Usually `<project-id>.firebaseapp.com`. |
| `REACT_APP_FIREBASE_PROJECT_ID` | Yes | Firebase project ID. |
| `REACT_APP_FIREBASE_APP_ID` | Yes | Firebase web app ID. |
| `REACT_APP_FIREBASE_STORAGE_BUCKET` | Recommended | Included in Firebase web app config, even though the current app does not upload files. |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | Recommended | Included in Firebase web app config. |
| `REACT_APP_FIREBASE_MEASUREMENT_ID` | Optional | Enables Firebase Analytics in production when present. |

The login and signup screens display a setup warning when any required Firebase values are missing.

## Firebase Setup

In the Firebase console:

1. Create or select a Firebase project.
2. Add a web app and copy its config values into `.env.local`.
3. Go to Authentication -> Sign-in method.
4. Enable Email/Password.
5. Enable Google sign-in.
6. Add `localhost` and your deployed domain to Authentication -> Settings -> Authorized domains.

Google sign-in uses a popup first and falls back to redirect if the popup is blocked, so the Firebase auth domain and authorized domains need to be correct for both local and deployed environments.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm start` | Runs the local development server at `http://localhost:3000`. |
| `npm run build` | Creates a production build in `build/`. |
| `npm test` | Starts the Create React App test runner. |
| `npm run eject` | Ejects from Create React App. This is irreversible. |

There are currently no committed `*.test.*` or `*.spec.*` files. Add tests before relying on `npm test` as a pass/fail gate.

## Project Structure

```text
.
|-- public/                  Static CRA assets and HTML template
|-- src/
|   |-- components/          Player, library, navigation, and browse UI
|   |-- contexts/            Auth and theme providers
|   |-- images/              Local visual assets
|   |-- pages/               Route-level login, signup, and home screens
|   |-- styles/              Sass partials and app stylesheet
|   |-- utils/               Shared auth error helpers
|   |-- App.js               Router and provider composition
|   |-- data.js              Song catalog and default library helpers
|   `-- firebase.js          Firebase initialization and config validation
|-- .env.example             Local Firebase env template
|-- firebase.json            Firebase Hosting config
|-- package.json             Scripts, dependencies, and Node engine
`-- package-lock.json        Locked npm dependency tree
```

## Catalog and Local Data

The music catalog lives in `src/data.js`. Each catalog item includes:

- `id`
- `name`
- `artist`
- `genre`
- `mood`
- `cover`
- `audio`
- `color`
- `durationLabel`
- `source`
- `favorite`
- `active`

The initial saved library comes from `defaultLibraryIds` in `src/data.js`. User changes are stored in `localStorage` under `chill-vibes-library:<firebase-uid>`, and the theme preference is stored under `darkMode`.

The current catalog uses royalty-free Pixabay audio references and points source metadata to the [Pixabay Content License Summary](https://pixabay.com/service/license-summary/).

## Build and Deployment

Create a production build:

```bash
npm run build
```

For local verification without touching the repo's ignored `build/` folder, build into a temporary path:

```bash
CI=true BUILD_PATH=/tmp/chill-vibes-build npm run build
```

Firebase Hosting is configured in `firebase.json` to serve `build/` and rewrite all routes to `index.html`, which supports the React Router single-page app routes.

The GitHub workflows in `.github/workflows/` are Firebase CLI generated:

- Pull requests create Firebase Hosting preview channels.
- Pushes to `main` deploy to the live Firebase Hosting channel.
- Both workflows expect the `FIREBASE_SERVICE_ACCOUNT_CHILL_VIBES` repository secret.

For a manual Firebase deploy with the Firebase CLI installed and authenticated:

```bash
npm run build
firebase deploy --only hosting
```

## Troubleshooting

| Issue | What to check |
| --- | --- |
| Login or signup says Firebase is not configured | Confirm `.env.local` exists, includes the required `REACT_APP_FIREBASE_*` values, and that `npm start` was restarted after edits. |
| Google sign-in fails or redirects back to login | Confirm Google sign-in is enabled and `localhost` or the deployed host is listed in Firebase authorized domains. |
| The app redirects to `/login` immediately | Protected routes require a configured Firebase app and a signed-in user. |
| Audio or cover art fails to load | The catalog uses external URLs, so check network access, browser blockers, and the specific remote asset URL. |
| Build output appears in the repo | `build/` is ignored. Use `BUILD_PATH=/tmp/chill-vibes-build` for throwaway verification builds. |

## Verification Checklist

Before shipping a change, run the relevant checks:

```bash
npm ci
npm ls --depth=0
CI=true BUILD_PATH=/tmp/chill-vibes-build npm run build
npm audit --omit=dev
```

If `npm audit --omit=dev` reports transitive issues from Firebase, Create React App, or their build tooling, review the upgrade path before using `npm audit fix --force`; forced fixes can jump major versions or replace core packages.

For UI checks, use the in-app Browser Use flow against the local app. Verify login/signup setup states, protected-route redirects, library and browse overlays, light/dark themes, narrow viewport behavior, and player control accessibility.

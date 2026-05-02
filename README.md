# Chill Vibes Music Player

Chill Vibes is a React music player with Firebase authentication, a curated royalty-free catalog, local per-user library persistence, light/dark themes, and responsive player, library, and browse panels.

## Features

- Firebase email/password signup, login, logout, and protected app routes.
- Curated 36-track catalog with stable song IDs, genre, mood, duration, cover art, audio source, and license/source metadata.
- Browse search across title, artist, genre, and mood, plus genre and mood filter chips.
- Local per-user library storage keyed by Firebase `currentUser.uid`.
- Duplicate prevention, favorites, removal, empty states, and persisted library state after reload.
- Accessible player controls, labeled progress slider, playback speed menu, and visible audio load errors.
- Responsive overlay panels for library and browsing so narrow layouts do not crush the player.

## Setup

Install dependencies:

```bash
npm ci
```

Create a local `.env.local` from the example file:

```bash
cp .env.example .env.local
```

Fill in the Firebase values:

```bash
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
```

`REACT_APP_FIREBASE_MEASUREMENT_ID` is optional. The app shows a clear setup message on the login and signup screens when required Firebase values are missing.

## Development

Run the local development server:

```bash
npm start
```

Run a production build:

```bash
CI=true BUILD_PATH=/tmp/chill-vibes-build npm run build
```

Generated folders such as `node_modules/` and `build/` are intentionally ignored. Use `npm ci` and `npm run build` to recreate them locally or in CI.

## Catalog

The catalog lives in `src/data.js`. Tracks are normalized with:

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

The current curated set uses royalty-free Pixabay audio references and points source metadata to the [Pixabay Content License Summary](https://pixabay.com/service/license-summary/).

## Verification

Useful checks before shipping:

```bash
npm ci
npm ls --depth=0
CI=true BUILD_PATH=/tmp/chill-vibes-build npm run build
npm audit --omit=dev
```

For UI checks, use the in-app Browser Use flow against the local app. Verify login/signup setup states, protected-route redirects, library and browse overlays, light/dark themes, narrow viewport behavior, and player control accessibility.

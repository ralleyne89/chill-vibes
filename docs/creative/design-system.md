# Design system

## Tokens

### Color

- `--bg`: `#000000`
- `--stage`: `#000000`
- `--stage-soft`: `#121314`
- `--stage-card`: `#181818`
- `--surface`: `#ffffff`
- `--surface-soft`: `#f5f7fa`
- `--text`: `#ffffff`
- `--ink`: `#05070b`
- `--muted`: `rgba(255,255,255,0.7)`
- `--muted-light`: `rgba(0,0,0,0.6)`
- `--border`: `rgba(255,255,255,0.18)`
- `--border-light`: `#e8edf5`
- `--accent`: `#0070d1`
- `--accent-strong`: `#0064b7`
- `--accent-deep`: `#004d8d`
- `--danger`: `#c81b3a`

### Typography

- Display: light-weight system sans, `clamp(2.2rem, 5vw, 4.5rem)`, line-height `1.03`.
- Heading: 300 to 600 weight depending on scale, line-height `1.15`.
- Body: 16px to 18px, line-height `1.5`.
- Button: 14px to 18px, 700 weight, letter spacing `0`.

### Shape, spacing, and motion

- Radius: `0` for page bands, `4px` for inputs, `8px` for cards/media, `999px` for pills.
- Spacing: 8px base, 24px card gutters, 48px panel padding, 72px to 96px desktop chapter rhythm.
- Motion duration: 160ms micro, 260ms panel, 420ms stage image.
- Motion easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Z-index: nav 15, channel panels 24, menus 30.

## Components

- Header/navigation: dark full-width bar with brand, action pills, and compact menu.
- Hero/current track: dark media stage with album art, metadata, and session stats.
- CTA buttons: pill buttons for primary actions, transparent secondary on dark or light canvas.
- Player deck: white chapter with range rail, circular transport controls, speed menu.
- Library channel: left fixed panel with dark header, saved-track list, favorite/remove controls.
- Browse channel: right fixed panel with search, filter chips, and catalog rows.
- Auth screens: chaptered auth split with dark media panel and white form panel.
- Focus states: 3px blue outline with offset.
- Reduced-motion states: no transforms or animated panel slides.

## Diversity rules

- Use blue sparingly for action and active state, not for every surface.
- Keep chapter surfaces flat and full-width.
- Use album art as the emotional asset, not decorative generated shapes.
- Keep cards at 8px radius or less.
- Do not place cards inside cards.
- Do not use gradient orbs, bokeh, or decorative blobs.

## Usage rules

- Primary actions use pill buttons.
- Track rows use compact media tiles with fixed image dimensions.
- Song metadata uses chips only when it helps scanning.
- Progress and controls must never shift layout when playback state changes.
- Text must remain readable on dark and light surfaces.

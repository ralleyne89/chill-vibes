# IA and wireframes

## Information architecture

- Primary route `/`: authenticated listening deck.
- Secondary route `/login`: sign-in surface.
- Secondary route `/signup`: account creation surface.
- Primary in-app regions:
  - Navigation: brand, direct Browse, Library, theme, account/logout overflow.
  - Current track stage: album art, song title, artist, genre, mood, duration, and saved-session stats.
  - Player deck: seek, skip, play/pause, playback speed, and audio error feedback.
  - Library channel: saved tracks, favorite filter, favorite/remove actions.
  - Browse channel: search, genre/mood filters, catalog rows, add actions.

## Content strategy

- Hero headline: use the current track as the page headline.
- Hero subheadline: show artist, mood, genre, and duration as scan-friendly metadata.
- CTA labels: `Browse`, `Library`, `Play`, `Pause`, `Next`, `Previous`, `Speed`.
- Section headings: `Your library`, `Browse tracks`, `Session controls`.
- Footer/panel copy: keep it functional and low-key.
- Metadata title: `Chill Vibes Music Player`.
- Metadata description: `A private music player for saving, browsing, and playing chill sessions.`

## Desktop wireframe

### Navigation

- Purpose: expose core actions without hiding the app behind Menu.
- Layout: full-width dark bar, brand at left, direct action pills at right, menu as compact overflow.
- Content: logo, Chill Vibes, Browse, Library, theme, logout.
- Interaction: Browse opens right channel, Library opens left channel.
- Responsive behavior: actions collapse into smaller pills and then menu-first on mobile.
- Accessibility notes: real buttons, `aria-expanded` on panels, visible focus.

### Listening stage

- Purpose: make the active track the visual and emotional center.
- Layout: dark full-bleed stage with left metadata and right album-art media block.
- Content: current song, artist, genre, mood, duration, saved count, catalog count.
- Interaction: direct Browse and Library CTAs remain available.
- Responsive behavior: two columns on desktop, single column on mobile.
- Accessibility notes: heading order preserved, album art has alt text.

### Player deck

- Purpose: make playback feel like the main instrument.
- Layout: white chapter band with progress rail, time labels, control cluster, speed menu.
- Content: seek bar, previous, play/pause, next, speed.
- Interaction: existing playback handlers preserved.
- Responsive behavior: controls remain centered with no overflow.
- Accessibility notes: range input and buttons keep labels.

### Channels

- Purpose: keep library and browse powerful without leaving the player.
- Layout: fixed left/right panels, flat surfaces, dense rows, strong headers.
- Content: saved count, filters, track rows, add/remove/favorite buttons.
- Interaction: slide panels, focusable rows, filter chips.
- Responsive behavior: panels become full-width sheets on mobile.
- Accessibility notes: complementary landmarks and close buttons remain.

## Mobile wireframe

### Navigation

- Purpose: keep the app usable one-handed.
- Layout: compact dark header with logo, action icons, and menu.
- Interaction: direct Browse/Library still visible as compact buttons where space allows.
- Accessibility notes: tap targets stay at least 44px.

### Listening stage

- Purpose: keep current song readable above the fold.
- Layout: album art first, title below, metadata chips, action pills.
- Interaction: no hover-only functionality.
- Accessibility notes: no text overlaps album art.

### Player deck

- Purpose: keep playback controls stable.
- Layout: time rail, controls, speed control stacked with fixed dimensions.
- Accessibility notes: range remains reachable and labels remain accurate.

### Channels

- Purpose: browse and manage library without losing context.
- Layout: full-width drawers with sticky header, search/filters, scrollable rows.
- Accessibility notes: close action at top and no scroll trapping.

# Research board

## Research receipt

- Access date: May 7, 2026
- Research method: repo audit, in-app browser audit at `http://localhost:3001/`, `getdesign` preset scan, and web research across Awwwards music, sound, and audio-player references.
- Awwwards URLs opened:
  - https://www.awwwards.com/websites/music-sound/
  - https://www.awwwards.com/sites/radical-face
  - https://www.awwwards.com/sites/yame-the-molazone
  - https://www.awwwards.com/sites/damso
  - https://www.awwwards.com/sites/lo2s
  - https://www.awwwards.com/inspiration/audio-player-teletech
- Source limitations: Awwwards text and metadata were available. Several element previews were video/image highlights, so interaction details are inferred from page labels and public descriptions, not from full-site source inspection.
- Selected getdesign preset: `playstation`
- Install command: `npx getdesign@latest add playstation`
- Installed path: `DESIGN.md`

## Style-source receipt

`DESIGN.md` is the style source, not the creative concept. Chill Vibes will adapt the `playstation` preset's chaptered surfaces, airy display type, pill CTAs, 8px cards, image-led composition, and strict blue action moment. It will not copy PlayStation branding, console navigation, product-store language, game-specific colors, logo behavior, or platform identity.

Key tokens and rules to adapt:

- Three surfaces: true black, true white, and a single bright blue action surface.
- Display type: light-weight, editorial, spacious sans-serif display copy.
- Components: full-pill buttons, 8px media/card modules, flat surfaces, minimal shadow.
- Layout rhythm: full-bleed chapters, with imagery occupying the largest visual share.
- Interaction tone: channel-like transitions, crisp focus states, no decorative gradients.

## Awwwards research board

| Reference | URL | Category | Distinctive idea | Layout/navigation | Motion/interaction | Tech clues | Usability strengths | Risks | Abstract pattern to borrow | Details to avoid copying |
|---|---|---|---|---|---|---|---|---|---|---|
| Music & Sound collection | https://www.awwwards.com/websites/music-sound/ | Music and sound | Sound sites work best when audio and visuals reinforce each other | Curated listing of immersive audio references | Emphasis on multimedia, navigation, and sound-led interaction | Mixed stacks | Validates an audio-first visual direction | Collection is broad, not a single interaction model | Treat playback, browsing, and visuals as one experience | Generic "immersive" language without practical controls |
| Radical Face | https://www.awwwards.com/sites/radical-face | Artist hub | Narrative music world with artwork, written material, and audio | Editorial hub with visual, written, and audio highlights | Intro, gallery, homepage, and audio animation highlights | Music, animation, gallery | Rich artist-world feeling without losing content | Could become too artist-specific for a utility player | Album art plus copy can create a sense of place | Copying artist mythology or cream/black identity |
| Yamê - The Molazone | https://www.awwwards.com/sites/yame-the-molazone | Album world | Immersive universe around songs and exclusive content | Unusual navigation with exploratory scenes | 360, 3D, mini-game style interactions | Three.js, Next.js, Blender | Strong discovery energy | Heavy 3D would be excessive for this CRA app | Use "channels" and spatial browsing as metaphor | Full 3D world, mini-game, or album-launch clone |
| Damso | https://www.awwwards.com/sites/damso | Artist ecommerce and promo | Immersive artist universe with notable navigation transitions | Promotional experience with mobile and desktop nav highlights | Navigation transition system is a key feature | 3D, Shopify, Sanity | Memorable menu behavior | Ecommerce patterns are off-brief | Make Library and Browse feel like intentional panels | Shop-first structure, merchandise language, artist identity |
| LO2S | https://www.awwwards.com/sites/lo2s | Light and sound studio | Sound, light, and motion as sensory impact | React site with project cards and transitions | Preloader, page transition, works card view | React, photo/video | Relevant to a React music surface | Portfolio framing does not fit a player | Use high-contrast stage lighting and disciplined cards | Agency portfolio navigation or production-house claims |
| TELETECH audio player element | https://www.awwwards.com/inspiration/audio-player-teletech | Audio interaction | Audio player as a standalone interaction object | Element-level audio control reference | Audio player and interaction highlight | Event site | Directly relevant to playback UI | Element details are limited without full video inspection | Make the player feel like the centerpiece, not a footer | Copying event-site visuals or hidden controls |

## Current UI audit

What works:

- Playback, skip, speed, seek, browse, filters, favorites, and saved library flows are already functional.
- Album art and catalog metadata give the app enough content to support a media-led redesign.
- The app has a clear component split: `Nav`, `Song`, `Player`, `Library`, `SongBrowser`, auth pages, and SCSS partials.

What feels generic:

- The current centered circular album art plus pale blue gradient reads like a familiar music-player template.
- Key actions are hidden behind a Menu button even though browsing and library are core workflows.
- The player panel behaves like a bottom card instead of the main instrument.
- Side drawers are functional but visually disconnected from the player stage.

Preserve:

- Route behavior, Firebase auth boundaries, local library persistence, catalog data, external audio URLs, keyboard support, and reduced-risk React 17 patterns.

Adapt:

- Album art remains the core asset, but it should become a cinematic stage image rather than a circular avatar.
- Side drawers remain, but they become left/right channel panels with stronger headers, search/filter hierarchy, and flat chapter surfaces.

Replace:

- Soft blue gradient background, oversized rounded panels, centered-only composition, and hidden primary actions.

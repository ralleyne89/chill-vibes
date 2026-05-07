# Creative brief

- Project name: Chill Vibes
- Site type: private music-player web app with auth screens, saved library, browse, filters, and playback controls.
- Audience: people who want a calm but polished browser-based listening workspace for focus, study, late-night listening, and mood browsing.
- Primary goal: make selecting, saving, and playing tracks feel immediate, memorable, and premium while preserving the current working flows.
- Brand personality: quiet, cinematic, focused, media-native, and slightly console-like.
- Core message: open a track, settle into the mood, and keep the next session close.
- Emotional target: a private listening deck at night, crisp enough for daily use and cinematic enough to feel designed.
- Content requirements: current track title, artist, genre, mood, duration, playback state, saved-library count, browse count, filters, auth copy, error states, empty states, and navigation.
- Interaction ambition: crisp panel transitions, responsive media staging, purposeful hover/focus states, playback progress as a visual instrument, and reduced-motion fallbacks.
- Technical constraints: React 17, CRA, SCSS partials, Font Awesome icons, Firebase auth, no heavy animation dependency unless the concept requires it.
- Accessibility constraints: semantic landmarks, named controls, visible focus, 44px targets, no hover-only essential actions, no scroll trapping, and `prefers-reduced-motion` support.
- Performance constraints: use existing album-art assets and CSS motion; avoid WebGL/Three.js for this pass because the current app does not need it.
- Assumptions: this pass can change layout, visual system, and visible copy, but should not change auth architecture, playback logic, or data storage.

## Retrofit plan

- Preserve: routes, auth redirects, player logic, library persistence, catalog filtering, favorite/remove behavior, and drawer state.
- Adapt: navigation becomes a dark entertainment-console bar with visible core actions; album art becomes an image-led hero; player controls become a command deck.
- Replace: pale gradient canvas, circular album avatar, rounded card-heavy composition, and menu-only workflow.
- Add: mode-aware layout tokens, session stats, direct Browse and Library CTAs, chaptered panel styling, and reduced-motion rules.

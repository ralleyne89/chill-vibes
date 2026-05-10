# Motion and interaction blueprint

- Signature principle: cinematic signal deck. Motion should feel like a media console waking up, switching tracks, and settling back into listening mode.
- Player deck: the control surface is dark, layered, and luminous. The progress rail glows while playing, the play core pulses, and equalizer bars move as the visible "live" signal.
- Track change: hero copy, album art, and the player deck receive a WAAPI entrance sweep. No route or playback logic changes.
- Play state: `is-playing` activates rail flow, button pulse, equalizer movement, and a brighter status chip. Ready state keeps only a slow ambient shimmer.
- Speed menu: the speed popover scales and fades in with a spring-like motion.
- Platform motion: album art has a slow cinematic pan, Browse/Library panels slide with stronger channel-switch motion, and rows/buttons get press feedback.
- Scroll behavior: normal browser scroll only. No scroll-jacking.
- Mobile alternative: motion stays visible but smaller; panel sheets remain full width and controls keep fixed dimensions.
- Keyboard behavior: focus outlines remain visible and independent from decorative motion.
- Reduced-motion behavior: the `usePrefersReducedMotion` hook prevents WAAPI animations, and CSS disables pulsing, shimmer, equalizer, panel, and hover transforms under `prefers-reduced-motion: reduce`.
- Performance fallback: CSS and WAAPI only. No GSAP, WebGL, scroll-linked animation, or audio-reactive API.

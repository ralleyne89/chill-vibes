# Motion and interaction blueprint

- Signature principle: channel switching. Panels, controls, and track rows move like selected media surfaces, with short and purposeful transitions.
- Hero interaction: album art scales very slightly on load and hover-capable devices, but essential content remains static and readable.
- Scroll behavior: normal browser scroll only. No scroll-jacking.
- Hover behavior: translate 1 to 3px or change surface color for feedback. No large fade-up patterns.
- Navigation transition: menu opens as a compact dark surface; Library and Browse open as left/right channel panels.
- Loading sequence: preserve existing image-loading placeholders, restyled as flat media placeholders.
- Mobile alternative: panels become full-screen sheets, hover effects are removed, tap targets remain large.
- Keyboard behavior: focus outlines remain visible, Enter/Space selection behavior in library rows is preserved.
- Reduced-motion behavior: disable transforms and transitions where `prefers-reduced-motion: reduce` is set.
- Performance fallback: CSS-only motion, no WebGL, no animation library, no continuous render loop.

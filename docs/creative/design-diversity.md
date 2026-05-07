# Design diversity checkpoint

## Baseline patterns to avoid

- Current repo pattern: pale blue gradient canvas, centered circular album art, large rounded white control card, and hidden primary actions behind a menu.
- Common generated-site pattern: hero plus cards, soft teal or blue gradients, rounded floating panels, generic SaaS layout, and repeated fade-up sections.
- Preset clone risk: PlayStation logo treatment, game-console navigation, product-store wording, PS Plus gold gradient, and platform-specific iconography.

## Chosen direction

- Layout archetype: entertainment command center.
- Palette and material: true black listening stage, white utility/control deck, cool graphite panels, one precise electric-blue action tone, and no decorative background gradients.
- Typography: light-weight display hierarchy using local system fallbacks, with strong pill labels and compact metadata. Font size does not scale with viewport width.
- Asset/media strategy: existing album art and fallback covers become the visual engine. No decorative blobs, no generated fake imagery, no brand-clone assets.
- Signature interaction: channel panels slide from the left and right like media drawers, while playback controls behave like a hardware command deck.
- Differentiation proof: this redesign is not another soft music card UI because the visual rhythm is full-bleed chapter surfaces plus a media-console layout.

## Preset adaptation notes

- Adapt: black/white/blue chapter system, 8px card rule, pill buttons, image-led hierarchy, flat surfaces, and light display type.
- Avoid: PlayStation Blue as a brand claim, console product references, game-store architecture, PS Plus gradient, and PlayStation logo forms.
- Chill Vibes-specific rationale: the console language becomes "listening deck" instead of "game platform."

## Accessibility and performance guardrails

- Keep all core controls as real buttons or inputs with accessible labels.
- Maintain visible focus outlines with a blue offset ring.
- Respect `prefers-reduced-motion` by removing panel and hover transforms.
- Keep the audio element outside decorative surfaces and preserve current error handling.
- Avoid WebGL or continuous animation to protect app responsiveness.

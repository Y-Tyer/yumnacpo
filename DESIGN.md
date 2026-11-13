---
name: Yumna Tyer Orthotics and Prosthetics
description: A lilac-white, flat-colour landing page where one line-drawn figure moves through poses to show what support exists for each part of the body.
colors:
  ground: "#fbf7f9"
  white: "#fff"
  blush: "#f3dfe6"
  ink: "#2e1f38"
  ink-soft: "#5a4a66"
  plum: "#644473"
  plum-deep: "#3b2748"
  rose: "#9c4f73"
  mauve: "#c3819b"
  marigold: "#f2b84b"
  sage: "#8fb89a"
  lilac-mist: "#eadbe6"
typography:
  display:
    fontFamily: "Young Serif, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.1rem, 8.4vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Young Serif, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2rem, 7.5vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  headline-compact:
    fontFamily: "Young Serif, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.55rem, 6vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.015em"
  quote:
    fontFamily: "Young Serif, Iowan Old Style, Georgia, serif"
    fontSize: "1.45rem"
    fontWeight: 400
    lineHeight: 1.32
  title:
    fontFamily: "Figtree, Segoe UI, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0em"
  body:
    fontFamily: "Figtree, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  lede:
    fontFamily: "Figtree, Segoe UI, system-ui, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 400
    lineHeight: 1.55
  body-small:
    fontFamily: "Figtree, Segoe UI, system-ui, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 400
    lineHeight: 1.4
  action:
    fontFamily: "Figtree, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 650
    lineHeight: 1.1
  nav:
    fontFamily: "Figtree, Segoe UI, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
  label:
    fontFamily: "Figtree, Segoe UI, system-ui, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 700
    lineHeight: 1.2
rounded:
  focus: "6px"
  tag: "0.5rem"
  row: "1rem"
  card: "1.25rem"
  tile: "1.75rem"
  pill: "999px"
spacing:
  gutter: "1.25rem"
  gutter-wide: "clamp(2rem, 5vw, 5rem)"
  stack: "0.75rem"
  section: "4.5rem"
  section-wide: "7rem"
  dock-space: "5.25rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.4rem"
    height: "3.25rem"
  button-primary-hover:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.white}"
  button-quiet:
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.4rem"
    height: "3.25rem"
  button-quiet-hover:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.ink}"
  button-light:
    backgroundColor: "{colors.marigold}"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.4rem"
    height: "3.25rem"
  button-light-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
  tag-sage:
    backgroundColor: "{colors.sage}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "0.32rem 0.7rem"
  tag-plum:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "0.32rem 0.7rem"
  tag-marigold:
    backgroundColor: "{colors.marigold}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "0.32rem 0.7rem"
  menu:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.nav}"
    rounded: "{rounded.pill}"
    padding: "0.3rem"
  menu-link-hover:
    backgroundColor: "{colors.blush}"
  rail-chip:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.35rem 0.9rem"
    height: "2.5rem"
  rail-chip-hover:
    backgroundColor: "{colors.blush}"
  rail-chip-current:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "0.85rem 1rem"
  card-soon:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "1rem 1.1rem"
  todo:
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.card}"
    padding: "1rem 1.2rem"
  story-slot:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.white}"
    typography: "{typography.quote}"
    rounded: "{rounded.tile}"
    padding: "2rem 1.5rem"
  contact-panel:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "1.75rem 1.25rem 1.5rem"
  contact-row:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.row}"
    padding: "0.7rem 1rem"
    height: "3.75rem"
  dock:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0.35rem"
  dock-button:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "3rem"
  dock-button-hover:
    backgroundColor: "{colors.blush}"
  dock-whatsapp:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0 1.15rem 0 0.95rem"
    height: "3rem"
  dock-whatsapp-hover:
    backgroundColor: "{colors.plum}"
  dock-hint:
    backgroundColor: "{colors.marigold}"
    textColor: "{colors.ink}"
    padding: "0.45rem 0.8rem"
---

# Design System: Yumna Tyer Orthotics and Prosthetics

## Overview

**Creative North Star: "The Figure Leads"**

One line-drawn woman carries the page. She stands on a lilac-white ground and moves through eight poses; each pose points at a part of the body, and the supports for that part appear beside her on bright flat tiles. Everything else is built from the same few materials: solid-colour sections, cut-out flat-colour product illustrations, pill-shaped controls, small coloured labels with cursor arrows, a hand-drawn marigold underline and four-point sparkles. The effect is warm and plain-spoken for a clinical subject: nothing glossy, nothing gradient, nothing that looks like a clinic template.

The system is mobile-first and dense only where it has to be. The pinned services stage fits a heading, a body-area rail, the figure, a text panel and one product card into a single small viewport; the sections around it are generous and quiet. Colour is used as surface, not as decoration on text: plum-black ink does the reading, the bright colours sit behind things.

Motion belongs to the figure. Short clips play between neighbouring poses and always run to their end; around her, cards slide a few pixels and labels bob. Everything has a still, fully usable form for visitors who ask for reduced motion or have no JavaScript or WebGL.

**Key Characteristics:**
- Lilac-white ground with solid plum-deep, blush and ink sections; no gradients anywhere.
- Marigold, sage and plum tiles behind cut-out product illustrations and behind the portrait.
- Young Serif display in two tones (ink plus one coloured phrase), Figtree for everything else.
- Pills for anything pressable; soft rounded rectangles for anything that holds content.
- Soft plum-tinted drop shadows only on white surfaces that float; tonal layering otherwise.
- One pinned stage where scroll position drives the figure's pose, the text panel and the product deck together.
- Honest, visibly marked placeholders for content that has not been supplied.

## Colors

A plum family carries structure and text; marigold and sage are the bright tiles; pinks soften. Every text pairing shipped clears WCAG AA, most clear AAA.

### Primary
- **Plum Ink** (`ink`, #2e1f38): body text and headings on light surfaces (14.4:1 on the ground); the fill of the primary button, the dock's WhatsApp pill, the current rail chip, the skip link, hotspot dots and the footer.
- **Plum** (`plum`, #644473): focus rings on light surfaces, the deck progress bar and current dot, contact icons, placeholder-card links, one of the three tile colours, and the story panel fill. White on it is 8.0:1.
- **Deep Plum** (`plum-deep`, #3b2748): the full-bleed ground of the patient stories section. White on it is 13.4:1.

### Secondary
- **Marigold** (`marigold`, #f2b84b): tile behind the portrait and behind products, the light button, the hand-drawn underline, the selection highlight, the dock hint, the coloured headline phrase on deep plum (7.5:1), and focus rings on dark sections. Carries ink text only (8.6:1).
- **Sage** (`sage`, #8fb89a): tile behind products and behind the About photo, and one label colour. Carries ink text only (6.9:1).

### Tertiary
- **Rose** (`rose`, #9c4f73): the second tone of display headings on the light ground (5.2:1), and one sparkle.
- **Mauve** (`mauve`, #c3819b): decorative only. The hero circle, list bullets, a sparkle, the scrollbar thumb. Never text.

### Neutral
- **Lilac White** (`ground`, #fbf7f9): the page ground, and the colour the figure's clips are repainted to.
- **White** (`white`, #fff): floating surfaces (menu, cards, contact rows, dock) and text on ink and plum.
- **Blush** (`blush`, #f3dfe6): the contact panel, placeholder cards, and the hover fill for every quiet control.
- **Soft Ink** (`ink-soft`, #5a4a66): secondary text on ground (7.6:1), white (8.1:1) and blush (6.3:1).
- **Lilac Mist** (`lilac-mist`, #eadbe6): secondary text on dark surfaces (6.0:1 on plum, 11.5:1 on ink). Written as a literal in the stylesheet, not yet a custom property.

### Named Rules
**The Tile Rule.** Marigold, sage and mauve are surfaces and marks, never text on the light ground (1.7:1, 2.1:1 and 2.9:1). Marigold and sage carry ink; plum and deep plum carry white.

**The Two-Tone Rule.** A display heading is ink with exactly one phrase in a second tone: rose on light sections, marigold on deep plum.

**The Solid Section Rule.** Sections and tiles are one flat colour each. No gradients, no tints fading into each other.

## Typography

**Display Font:** Young Serif, weight 400 only (with Iowan Old Style, Georgia, serif)
**Body Font:** Figtree, variable 400 to 700 (with Segoe UI, system-ui, sans-serif)

Both are self-hosted as WOFF2 in `assets/fonts/` (`young-serif.woff2`, `figtree-var.woff2`), preloaded, and loaded with `font-display: swap`. No third-party font request is made.

**Character:** A soft, slightly old-fashioned serif says the human things in large type; a friendly geometric sans does the explaining and all the controls. The serif is never bold and never small.

### Hierarchy
- **Display** (400, clamp(2.1rem, 8.4vw, 4.25rem), 1.14, -0.015em): the hero mission line only.
- **Headline** (400, clamp(2rem, 7.5vw, 3.75rem), 1.05): section headings and the body-area name inside the stage.
- **Headline compact** (400, clamp(1.55rem, 6vw, 2.75rem), 1.08): the stage heading, which shares a pinned viewport with everything else; the contact heading sits in the same band.
- **Quote** (Young Serif 400, 1.45rem, 1.32): the lead sentence of the story panel.
- **Title** (Figtree 700, 1.05rem, 1.2; 1.2rem in wide decks): product names and placeholder headings.
- **Body** (400, 1.0625rem, 1.55): running text. Measure is capped between 32ch and 58ch depending on the block. The hero lede steps up to 1.1rem (1.2rem wide).
- **Body small** (400, 0.92rem, 1.4): card descriptions and the footer.
- **Action** (650, 1.0625rem, 1.1): buttons. Navigation and rail chips use 600 at 0.9 to 0.95rem.
- **Label** (700, 0.82rem, 1.2, sentence case): pill labels on the portrait and hotspots.

All headings use `text-wrap: balance`. Nothing is set in uppercase and nothing is letter-spaced wide.

### Named Rules
**The Serif Speaks Once Rule.** Young Serif is for headings, the mission line and one quoted lead. Product names, labels, buttons and navigation are always Figtree.

## Layout

Mobile-first, single column, with one breakpoint at 56rem where sections become two columns and the stage becomes three (text, figure, deck). A second query handles short phones (under 40rem tall) by tightening the stage only.

- **Gutter:** 1.25rem, growing to clamp(2rem, 5vw, 5rem) at 56rem. Section content is capped at 68rem; the hero at 84rem; the menu and placeholder blocks at 34rem.
- **Section rhythm:** 4.5rem top and 5rem bottom, 7rem on wide screens. Stacks inside a section use 0.75rem (cards, buttons) to 2.5rem (major blocks).
- **Hero:** logo, mission, lede, two buttons, then the portrait on its tile. From 56rem the portrait sits right in a 1.15fr / 0.85fr grid. Two solid circles (mauve, marigold) bleed off the edges behind it.
- **Pinned stage:** the services section is a tall scroll track (one viewport plus 78svh per body area) holding a sticky, viewport-high stage. On mobile the stage stacks heading, rail, figure and a fixed-height panel (16.25rem) so nothing reflows between areas. On wide screens the panel overlays the stage as a three-column grid with the figure in the centre column.
- **Fixed chrome:** a floating dock sits bottom-centre on mobile and bottom-right on wide screens. Sections reserve `dock-space` (5.25rem mobile) so it never covers content.
- **Without JavaScript:** the stage is not pinned. Body areas stack as ordinary sections and every product card is listed.

## Elevation & Depth

Mostly flat. Depth comes from solid colour on solid colour: a tile behind a photo, a white card on the ground, a plum panel on deep plum. Shadows are reserved for white surfaces that float above the page and for photographs, and they are always the same kind: a soft, plum-tinted drop with a strongly negative spread so it reads as a short contact shadow rather than a glow. There are no hard offset shadows and no inner shadows.

### Shadow Vocabulary
- **Float** (`box-shadow: 0 8px 24px -16px rgb(46 31 56 / .45)`): the top menu.
- **Card** (`box-shadow: 0 14px 30px -22px rgb(46 31 56 / .55)`): product cards.
- **Action** (`box-shadow: 0 10px 24px -12px rgb(46 31 56 / .7)`, lifting to `0 16px 28px -14px` on hover): the primary button.
- **Photo** (`box-shadow: 0 24px 40px -24px rgb(46 31 56 / .6)`): portraits sitting on a tile.
- **Dock** (`box-shadow: 0 16px 34px -14px rgb(46 31 56 / .55), 0 0 0 1px rgb(46 31 56 / .06)`): the fixed dock, with a hairline so it holds on white.
- **Label** (`box-shadow: 0 8px 16px -10px rgb(46 31 56 / .6)`): hotspot labels and the dock hint.

### Named Rules
**The Inset Outline Rule.** Edges are drawn with an inset box-shadow, not a border: 2px ink on the quiet button, 1.5px plum at 45% on rail chips, 2px plum at 30% on placeholder cards, 2px white at 16% on the story panel. The only real border in the system is the dashed one that marks content still to be supplied.

**The Tinted Shadow Rule.** Every shadow is ink (46 31 56) at 45 to 70% with negative spread. Never neutral black, never a spread glow.

## Shapes

Two families. Anything pressable is a full pill (999px) or a circle: buttons, the menu and its links, rail chips, the dock and its buttons, deck dots. Anything that holds content is a soft rounded rectangle: 1.75rem for tiles and large panels (portrait tile, About photo, story panel, contact panel), 1.25rem for cards and placeholders, 1rem for contact rows, 0.5rem for small labels.

Recurring marks: full circles bleeding off the hero edge; a four-point sparkle in rose, plum, marigold, sage or mauve; a small cursor arrow attached to each portrait label; a teardrop bullet (a square with three rounded corners, rotated 45 degrees) in mauve; a hand-drawn wavy underline in marigold beneath one phrase. Photographs sit offset on a coloured tile of the same radius, either shifted down and right or counter-rotated by 3 degrees.

Icons are inline SVG, drawn with a 1.8px rounded stroke in the current text colour at 1.35em.

## Components

### Buttons
Rounded, sturdy and easy to hit; they lift slightly rather than change shape.
- **Shape:** full pill (999px), at least 3.25rem tall, 0.8rem by 1.4rem padding, icon and label 0.6rem apart.
- **Primary:** ink fill, white text, Action shadow. Used for the WhatsApp action.
- **Quiet:** transparent with a 2px inset ink outline. Used for the phone number.
- **Light:** marigold fill, ink text. Used on plum and deep-plum surfaces.
- **Hover / Focus:** primary turns plum and rises 2px with a deeper shadow; quiet fills blush; light turns white and rises 2px. Active presses to 98% scale. Transforms ease over 0.35s on `cubic-bezier(.16, 1, .3, 1)`; colours over 0.2s.

### Tags and pill labels
- **Style:** small rounded rectangle (0.5rem), 0.82rem bold Figtree, in sage with ink, plum with white, or marigold with ink.
- **On the portrait:** two labels float over the tile edges, each with a small ink cursor arrow, and bob gently on a 6 to 7 second loop. They are decorative and hidden from assistive tech; the caption carries the same words.
- **As hotspots:** on the resting figure each label is a button anchored to a body part by an ink dot with a white ring and a slow outward ping. The hit area extends well past the label. Hover and focus scale the label to 108%; the focus ring is drawn on the label.

### Rail chips
- **Style:** pill, at least 2.5rem tall, 0.9rem semibold, 1.5px inset plum outline at 45%. Hover fills blush.
- **Current:** ink fill, white text, no outline, marked with `aria-current`. The rail scrolls sideways on mobile with proximity snapping and centres the current chip; on wide screens it wraps to the right of the heading.

### Cards
- **Corner Style:** 1.25rem, clipped.
- **Background:** white body with a solid art tile in marigold, sage or plum holding a cut-out product illustration.
- **Shadow Strategy:** Card shadow (see Elevation).
- **Layout:** on mobile a 6.75rem art column beside the text; in the wide deck the art sits on top at 4:3.
- **Internal Padding:** 0.85rem by 1rem (1.1rem by 1.25rem wide). Title in Figtree 700, description in body small, soft ink.

### Deck
One card at a time, in place, beside the figure.
- A 4px vertical progress bar on the left fills in plum over the dwell time (4.6s), then the next card rises 18px into place while the last leaves upward.
- Controls below: one dot per card (the current dot stretches into a short plum bar) and a pause/play toggle. Tapping anywhere on the deck pauses it. Cards that are not showing are `inert`.
- It only runs while its body area is active and the stage is at least half on screen. Under reduced motion it does not auto-advance and the toggle is hidden.

### Placeholders
Content that has not been supplied is shown as such, never faked.
- **Todo block:** 2px dashed plum border at 40%, 1.25rem radius, a Figtree title and soft-ink text reading "To be added."
- **Coming-soon card:** the last card in a deck. Blush fill, 2px inset plum outline at 30%, no art tile, with a bold plum link.
- **Story slot:** a plum panel (1.75rem radius, 2px inset white outline at 16%) on deep plum, with a marigold quote mark, one Young Serif sentence saying stories will be shared with permission, and a light button inviting a patient to share theirs.

### Navigation
- **Top menu:** a white pill holding four equal links, 0.95rem semibold, capped at 34rem and centred. Hover fills blush. It overlaps the top of the hero and scrolls away with it.
- **Dock:** a fixed white pill with two 3rem circular buttons (previous and next section) and an ink WhatsApp pill. The arrows move between whole sections, never between body areas, and disable at the ends of the page. The WhatsApp pill stays collapsed while the hero's own WhatsApp button is on screen, then widens in. If a visitor scrolls past two or more body areas at once, a marigold hint ("Skip to patient stories") appears above the next arrow for five seconds, at most twice.
- **Contact rows:** white rows (1rem radius, at least 3.75rem tall) on the blush contact panel, each with a plum icon, a small soft-ink label and the value. Hover slides the row 4px right and adds a shadow.

### The pinned stage and the figure
The signature component. Scroll position chooses a step from 0 to 7; the step sets the figure's pose, the visible text panel, the current rail chip and the active deck together.
- **Stills first.** Each pose is a PNG, cross-faded over 0.7s. Stills are what shows at rest, without WebGL, and under reduced motion.
- **Clips between neighbours.** Moving to the next body area plays a short MP4. Frames are drawn to a canvas through a WebGL shader that divides each pixel by the clip's own background (read from its corners), multiplies by the page ground, and feathers the frame edges, so the figure sits on the page with no visible box and no blend mode.
- **A small sequencer.** It tracks the pose shown and the pose wanted. A clip, once started, always runs to its end; if the page has moved on it speeds up (1.35x normal, 3x hurried), then chains into the next clip, lands on the sharp still, or cross-fades. A stalled clip is abandoned after 9 seconds.
- **Committing a step.** A step commits 14% of the way toward the next area in the direction of travel, after an 80ms beat, so fast scrolling skips areas instead of flashing them. Reversals need 7% of travel before they count. Programmatic jumps (menu, dock, rail, hotspots) hold the stage still and settle once on arrival; a jump to the neighbouring area plays its clip.
- **Panels.** The inactive text panels and decks are `inert` and hidden; the active one fades in over 0.35s and rises 14px.

### Accessibility commitments in the build
- A skip link to the services section, visible on focus.
- A 3px focus ring offset by 3px on everything focusable: plum on light surfaces, marigold inside the stories section and the footer.
- `prefers-reduced-motion: reduce` collapses all transitions and animations, shows the underline drawn, turns smooth scrolling off, stops deck auto-advance and never loads the motion clips.
- Hidden panels and cards are `inert`; current items carry `aria-current`; icon-only buttons have labels; decorative marks are `aria-hidden`.
- The auto-advancing deck has a visible pause control.
- Primary actions are 3rem to 3.25rem tall.

## Do's and Don'ts

### Do:
- **Do** set reading text in ink or soft ink on ground, white or blush, and white or lilac mist on plum, deep plum and ink.
- **Do** put products and photographs on a solid marigold, sage or plum tile, as cut-outs, with the same radius as the tile.
- **Do** give each display heading one phrase in the second tone: rose on light, marigold on deep plum.
- **Do** make pressable things pills or circles and content holders soft rectangles (1.75rem, 1.25rem, 1rem, 0.5rem).
- **Do** draw outlines with inset box-shadows and keep shadows plum-tinted with negative spread.
- **Do** ease movement with `cubic-bezier(.16, 1, .3, 1)` and keep UI travel small (2px lifts, 14 to 18px entrances).
- **Do** mark missing content with the dashed todo block, the coming-soon card or the story slot.
- **Do** give every moving thing a still equivalent and gate ambient loops behind `prefers-reduced-motion: no-preference`.
- **Do** keep the logo intact and unaltered; it is a binding brand asset.

### Don't:
- **Don't** use marigold, sage or mauve as text on the light ground; they fail contrast (1.7:1, 2.1:1, 2.9:1).
- **Don't** use gradients, or blend one section colour into another.
- **Don't** set Young Serif bold, small, or on controls and labels.
- **Don't** interrupt or scrub the figure's clips; a clip always runs to its end.
- **Don't** place the figure with a CSS blend mode; her ground is repainted to the page ground in the shader.
- **Don't** invent testimonials, credentials, outcomes or clinical claims to fill a placeholder.
- **Don't** add a second line-drawn character; the system has one figure.

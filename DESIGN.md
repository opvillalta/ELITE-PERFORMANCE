---
name: Kinetic Dark
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c9ac'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9379'
  outline-variant: '#444933'
  surface-tint: '#abd600'
  primary: '#ffffff'
  on-primary: '#283500'
  primary-container: '#c3f400'
  on-primary-container: '#556d00'
  inverse-primary: '#506600'
  secondary: '#e9b3ff'
  on-secondary: '#510074'
  secondary-container: '#7d01b1'
  on-secondary-container: '#e5a9ff'
  tertiary: '#ffffff'
  on-tertiary: '#21323e'
  tertiary-container: '#d2e5f5'
  on-tertiary-container: '#556774'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c3f400'
  primary-fixed-dim: '#abd600'
  on-primary-fixed: '#161e00'
  on-primary-fixed-variant: '#3c4d00'
  secondary-fixed: '#f6d9ff'
  secondary-fixed-dim: '#e9b3ff'
  on-secondary-fixed: '#310048'
  on-secondary-fixed-variant: '#7200a3'
  tertiary-fixed: '#d2e5f5'
  tertiary-fixed-dim: '#b6c9d8'
  on-tertiary-fixed: '#0b1d29'
  on-tertiary-fixed-variant: '#374956'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-metrics:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-margin: 1.25rem
  gutter: 1rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
  touch-target-min: 3rem
---

## Brand & Style

The design system is built for a high-intensity fitness environment where speed of information processing and ease of interaction are critical. The brand personality is **aggressive, focused, and professional**, evoking the atmosphere of a high-end performance gym. 

The aesthetic leverages **Minimalism** combined with **High-Contrast** elements. It prioritizes a "no friction" experience by using oversized touch targets and a stark visual hierarchy that guides the eye immediately to performance metrics. The vibe is strictly "Mobile-First," optimized for one-handed use during active movement.

**Emotional Response:**
- Motivated and energized.
- Confident in the accuracy and professionalism of the data.
- Focused on the task without digital distraction.

## Colors

The palette is optimized for OLED displays to maximize battery life and visual punch. 

- **Primary (Electric Lime):** Used exclusively for primary CTAs, active progress states, and critical success metrics. It is the "go" color.
- **Secondary (Bright Violet):** Used for secondary data visualizations, categorized activities (e.g., recovery or flexibility), and interactive accents.
- **Neutral/Background:** A true black (#000000) is used for the base canvas to allow the lime and violet to "pop." Surface containers use a deep charcoal (#1C1C1E) to create subtle depth without losing the dark-mode intensity.
- **High-Contrast Text:** Pure white is used for all primary data and headers to ensure legibility under harsh gym lighting or during rapid movement.

## Typography

The design system utilizes **Inter** for its exceptional legibility and modern, neutral character. 

- **Metric Scaling:** For workout tracking, the `display-metrics` role is used for weights and reps. These must be the largest elements on the screen.
- **Weight:** Heavy weights (Bold/ExtraBold) are used for all interactive elements and headers to maintain the high-energy brand feel.
- **Mobile Adjustments:** On mobile, `headline-lg` scales down to 28px to ensure container padding is maintained while keeping the bold impact.
- **Case:** Labels for metadata (e.g., "SETS", "BPM", "KCAL") should use `label-bold` with uppercase styling and increased letter spacing for quick scanning.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a focus on vertical stacking for mobile ease-of-use. 

- **Grid:** A 4-column grid for mobile and 12-column for desktop/tablet.
- **Rhythm:** An 8px linear scale (0.5rem) governs all spacing.
- **Margins:** A consistent 20px (1.25rem) safe area is maintained on the left and right edges of all screens.
- **Touch Targets:** No interactive element (buttons, chips, toggles) should be smaller than 48px (3rem) in height to accommodate sweaty or moving hands.

## Elevation & Depth

This design system avoids traditional shadows in favor of **Tonal Layers** and **Low-Contrast Outlines**.

- **Surfaces:** Depth is created by placing cards (`#1C1C1E`) on the true black canvas (`#000000`).
- **Outlines:** Cards and input fields use a subtle 1px border (#2C2C2E) to define boundaries without adding visual clutter.
- **Active State:** When an element is focused or active, the border color transitions to the Primary Electric Lime. 
- **Z-Index:** The bottom navigation bar uses a slight background blur (Backdrop Filter: 20px) and a semi-transparent surface to suggest it sits above the scrolling content.

## Shapes

The shape language is **Rounded**, striking a balance between professional structural lines and approachable modern software. 

- **Standard Elements:** Buttons and cards use a 0.5rem (8px) radius.
- **Large Components:** Hero cards and bottom sheets use a 1rem (16px) radius to feel more "app-like" and friendly.
- **Pills:** Status indicators, chips, and tags use a fully rounded (pill) shape to differentiate them from actionable cards.

## Components

### Buttons
- **Primary:** Background in Electric Lime, text in Black (#000000), ExtraBold weight. Full-width on mobile for maximum "tap-ability."
- **Secondary:** Transparent background with a 2px Electric Lime border.

### Cards
- Layouts are primarily card-based. 
- Cards should have a padding of `stack-md` (16px).
- Internal metrics within cards should be grouped with `stack-sm` spacing.

### Input Fields
- Specifically designed for numeric entry. Large font sizes (`headline-md`) within the input. 
- Background matches the surface container, with a clear active state border.

### Progress Indicators
- Use thick strokes (4px - 8px) for rings and bars.
- Use the Primary color for current progress and a muted version (#2C2C2E) for the track.

### Bottom Navigation
- Uses high-contrast white icons. 
- The active state is indicated by a Primary color icon and a small dot indicator underneath.
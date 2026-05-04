---
name: Mediterranean Editorial
colors:
  surface: '#fef9f1'
  surface-dim: '#ded9d2'
  surface-bright: '#fef9f1'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f3eb'
  surface-container: '#f2ede5'
  surface-container-high: '#ece8e0'
  surface-container-highest: '#e7e2da'
  on-surface: '#1d1c17'
  on-surface-variant: '#444748'
  inverse-surface: '#32302b'
  inverse-on-surface: '#f5f0e8'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#171818'
  on-primary: '#ffffff'
  primary-container: '#2c2c2c'
  on-primary-container: '#949393'
  inverse-primary: '#c8c6c5'
  secondary: '#635e54'
  on-secondary: '#ffffff'
  secondary-container: '#e7dfd3'
  on-secondary-container: '#676259'
  tertiary: '#211504'
  on-tertiary: '#ffffff'
  tertiary-container: '#382916'
  on-tertiary-container: '#a58f76'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e4e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1b1c1c'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e9e1d5'
  secondary-fixed-dim: '#cdc6ba'
  on-secondary-fixed: '#1e1b14'
  on-secondary-fixed-variant: '#4b463e'
  tertiary-fixed: '#f8dec1'
  tertiary-fixed-dim: '#dbc3a6'
  on-tertiary-fixed: '#261907'
  on-tertiary-fixed-variant: '#55442e'
  background: '#fef9f1'
  on-background: '#1d1c17'
  surface-variant: '#e7e2da'
typography:
  headline-lg:
    fontFamily: notoSerif
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: notoSerif
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: notoSerif
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  functional-data:
    fontFamily: manrope
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  label-caps:
    fontFamily: manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.08em
  trust-signal:
    fontFamily: manrope
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  section-gap: 80px
---

## Brand & Style

This design system blends the relaxed, sun-drenched aesthetic of a Mediterranean lifestyle magazine with the rigorous conversion logic of a premium booking platform. The personality is sophisticated, tactile, and intentional. It aims to evoke an emotional response of "effortless luxury"—where the user feels both inspired by the imagery and confident in the functional interface.

The design style is a hybrid of **Minimalism** and **Modern Editorial**. It prioritizes high-quality negative space and elegant serif typography to create a sense of breathability, but reinforces it with structured, high-contrast UI elements that guide the user toward clear transactional goals. The focus is on clarity without sacrificing the "slow-living" brand sentiment.

## Colors

The palette is anchored by the organic warmth of the Mediterranean coast. 

*   **Primary (#2C2C2C):** Used exclusively for high-priority actions, primary buttons, and core headlines to ensure maximum legibility and conversion focus.
*   **Secondary (#E8E0D4):** Serves as the structural "container" color, used for section backgrounds and secondary UI elements like card borders.
*   **Neutral (#F5F0E8):** The global canvas color. This off-white provides a softer, more premium experience than pure white, reducing eye strain and enhancing the editorial feel.
*   **Tertiary (#A69076):** A muted "clay" tone reserved for sophisticated accents, subtle icons, and sophisticated trust signals.

## Typography

This design system utilizes a dual-font approach to balance editorial elegance with functional scanning.

*   **Headlines (Noto Serif):** Used for storytelling and property titles. It conveys the "Editorial" heritage.
*   **Body & UI (Manrope):** A refined sans-serif chosen for its geometric clarity. It is used for all functional information, descriptions, and amenities.
*   **Visual Hierarchy:** Price points and distances utilize the `functional-data` token—using a heavier weight and slightly larger scale—to ensure they are the first things a user sees when comparing options. 
*   **Metadata:** Use `label-caps` for amenities and categories to create a rhythmic, scannable grid of information.

## Layout & Spacing

This design system uses a **Fixed Grid** model to maintain the integrity of the editorial layouts across large screens. 

*   **Grid:** A 12-column layout with generous 24px gutters. 
*   **Margins:** Large desktop margins (64px) are essential to prevent the content from feeling "crowded," maintaining the premium, spacious feel.
*   **Rhythm:** Vertical spacing should follow an 8px incremental scale. Section gaps are intentionally large (80px+) to clearly delineate different content types or property features.

## Elevation & Depth

To maintain the "Editorial" aesthetic, this design system avoids heavy shadows or high-altitude elevation. 

*   **Tonal Layering:** Depth is primarily communicated through color blocks. The off-white (#F5F0E8) base is layered with warm beige (#E8E0D4) containers to group related content.
*   **Low-Contrast Outlines:** Instead of shadows, use 1px solid borders in a slightly darker shade of beige or the tertiary clay color for cards and input fields.
*   **Interaction States:** Only use subtle, soft ambient shadows on hover for interactive cards to provide a "lift" sensation without breaking the flat editorial plane.

## Shapes

The shape language is **Soft**. It avoids the clinical feel of sharp corners while steering clear of the "bubbly" look of high-roundedness. 

*   **Base Radius:** 4px (0.25rem) for smaller elements like badges and buttons.
*   **Large Radius:** 8px (0.5rem) for images and primary containers/cards.
*   **Consistency:** All interactive elements must maintain this subtle rounding to feel approachable yet structured.

## Components

### Buttons
*   **Primary:** Solid Charcoal (#2C2C2C) with white text. High contrast for high conversion. Bold, rectangular with a 4px corner radius.
*   **Secondary:** Outlined in Charcoal or Solid Warm Beige. Used for less critical actions like "View Gallery."

### Cards
*   Editorial cards should lead with large, high-aspect-ratio photography. 
*   Data points (Price, Rating, Distance) are placed in a dedicated high-contrast area at the bottom of the card using the `functional-data` typography.

### Trust Signals & Badges
*   **Ratings:** Small stars or numerical ratings should be paired with the Tertiary color (#A69076) to feel integrated rather than loud.
*   **Badges:** Use the `label-caps` style within a light beige pill shape for attributes like "Verified" or "Rare Find."

### Input Fields
*   Text inputs use a warm beige background with a subtle bottom-border in Charcoal when focused. This mimics the look of high-end stationery.

### Feature Lists
*   Amenities (e.g., "Infinity Pool," "Sea View") should be displayed in a multi-column grid with custom monochromatic icons (Charcoal) and `label-caps` text for instant scannability.
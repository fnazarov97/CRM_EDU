# EduFlow Enterprise Design System

The design system is engineered for high-performance educational management, blending **Corporate Modern** reliability with a **Minimalist** focus on data density. It targets administrative staff and educators who require an interface that minimizes cognitive load while managing complex student lifecycles.

The aesthetic is characterized by a "Clear Canvas" approach: high-utility layouts, purposeful whitespace, and a sophisticated professional tone. The UI should evoke a sense of structural integrity, growth, and systematic efficiency. Every interaction is designed to feel intentional and precise, moving away from decorative elements toward functional clarity.

---

## Brand & Style

The palette is anchored by **Deep Professional Blue** (#2563EB), representing stability and the institutional nature of education. **Emerald Green** (#059669) is utilized as a secondary accent to signify student growth, successful payments, and "active" statuses.

- **Primary:** Actions, primary navigation, and brand touchpoints.
- **Secondary:** Success states, attendance markers, and positive financial indicators.
- **Tertiary (Amber):** Pending leads, warnings, and mid-level priority tasks.
- **Neutral:** A refined Slate scale used for typography, borders, and subtle background layering to maintain high legibility and professional contrast.

---

## Colors & Tokens

### Material/Theme Colors (HEX)
```yaml
background: '#f8f9ff'
on-background: '#0b1c30'
surface: '#f8f9ff'
surface-dim: '#cbdbf5'
surface-bright: '#f8f9ff'
surface-container-lowest: '#ffffff'
surface-container-low: '#eff4ff'
surface-container: '#e5eeff'
surface-container-high: '#dce9ff'
surface-container-highest: '#d3e4fe'
on-surface: '#0b1c30'
on-surface-variant: '#434655'
inverse-surface: '#213145'
inverse-on-surface: '#eaf1ff'
outline: '#737686'
outline-variant: '#c3c6d7'
surface-tint: '#0053db'

primary: '#004ac6'
on-primary: '#ffffff'
primary-container: '#2563eb'
on-primary-container: '#eeefff'
inverse-primary: '#b4c5ff'

secondary: '#006c4a'
on-secondary: '#ffffff'
secondary-container: '#82f5c1'
on-secondary-container: '#00714e'

tertiary: '#784b00'
on-tertiary: '#ffffff'
tertiary-container: '#996100'
on-tertiary-container: '#ffeedd'

error: '#ba1a1a'
on-error: '#ffffff'
error-container: '#ffdad6'
on-error-container: '#93000a'
```

---

## Typography

This design system utilizes **Inter** for all levels of the hierarchy. Inter's tall x-height and systematic spacing make it ideal for data-heavy CRM environments where legibility of numbers and student names is paramount.

- **Headlines:** Use Semi-Bold (600) for section titles like "O'quvchilar ro'yxati" (Student List).
- **Numbers:** Tabular lining should be enabled for data tables to ensure columns of figures align perfectly.
- **Language Nuance:** Since the UI is in Uzbek, ensure line heights account for occasional diacritics and longer word lengths typical in Central Asian Turkic languages.

### Typography Scale
*   **display-lg**: Font 48px, Weight 700, Line height 60px, Letter spacing -0.02em
*   **headline-lg**: Font 32px, Weight 600, Line height 40px, Letter spacing -0.01em
*   **headline-lg-mobile**: Font 24px, Weight 600, Line height 32px
*   **headline-md**: Font 24px, Weight 600, Line height 32px
*   **title-lg**: Font 20px, Weight 600, Line height 28px
*   **title-md**: Font 16px, Weight 600, Line height 24px
*   **body-lg**: Font 16px, Weight 400, Line height 24px
*   **body-md**: Font 14px, Weight 400, Line height 20px
*   **label-md**: Font 12px, Weight 500, Line height 16px

---

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy within a fluid container. A standard 12-column grid is used for dashboard layouts, while specialized views (like the Attendance Grid) use a flexible repeating column model.

- **Sidebar:** A fixed 260px left-hand navigation remains persistent on desktop to allow quick switching between "Kurslar", "Moliya", and "Guruhlar".
- **Density:** Use a 4px base unit. For data tables, use "Compact" (8px vertical padding) and "Default" (12px vertical padding) modes to accommodate different screen sizes.
- **Breakpoints:**
  - Mobile (<768px): Single column, hidden sidebar (hamburger menu).
  - Tablet (768px - 1024px): 8-column grid, collapsed icon-only sidebar.
  - Desktop (>1024px): 12-column grid with full sidebar.

---

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Soft Ambient Shadows**. We avoid heavy borders in favor of depth to keep the interface feeling modern and airy.

- **Surface 0 (Background):** #F8FAFC (Slate 50) - The foundation layer.
- **Surface 1 (Cards/Sidebar):** #FFFFFF - Primary content containers use a very soft shadow (Y: 1px, Blur: 3px, Opacity: 0.05) to separate from the background.
- **Surface 2 (Modals/Popovers):** Higher elevation with a more diffused shadow (Y: 10px, Blur: 20px, Opacity: 0.1) to focus user attention on forms or student details.
- **Interactive States:** Buttons lift slightly on hover using a more pronounced shadow rather than a drastic color change.

---

## Shapes

The system uses a **Rounded** (Level 2) logic. 8px (0.5rem) is the standard radius for standard components, providing a balance between industrial precision and modern approachability.

- **Inputs & Small Buttons:** 8px (rounded).
- **Cards & Modals:** 12px (rounded-lg).
- **Status Badges & Search Bars:** 9999px (full pill) to distinguish them from actionable square-ish buttons.
- **Active Indicators:** Vertical 4px rounded bars on the left side of active navigation items.

---

## Components & Guidelines

### Data Tables (Jadvallar)
Tables are the heart of the CRM. Use sticky headers and "Zebra" striping (Slate 50) on hover. Columns for "Status" use colored badges, while "Amallar" (Actions) are grouped in a trailing icon menu.

### Status Badges (Statuslar)
- **Active (Faol):** Emerald Green background (10% opacity) with Emerald Green text.
- **Lead (Yangi):** Blue background (10% opacity) with Blue text.
- **Debt (Qarzdor):** Red background (10% opacity) with Red text.

### Buttons (Tugmalar)
Primary buttons use a solid #2563EB fill with white text. Secondary buttons use a Slate 100 background. All buttons have a minimum height of 40px for touch-target safety.

### Statistics Cards (Statistika)
Feature a large "Display-MD" number, a "Label-MD" description (e.g., "Jami o'quvchilar"), and a small trend sparkline or percentage indicator in the corner.

### Form Fields (Kiritish maydonlari)
Labels are always persistent above the field in "Label-MD". Placeholders should be descriptive (e.g., "Ismni kiriting..."). Use a 2px Primary Blue border only on focus.

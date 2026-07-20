# Design System
# NSTU School Website

> Single source of truth for all visual decisions.
> Every value used in CSS must reference a token defined here.

---

## 1. Design Principles

| Principle | Implementation |
|-----------|---------------|
| Token-first | No raw hex, px, or magic numbers anywhere in component CSS |
| Mobile-first | Base styles target mobile; breakpoints add complexity upward |
| Reuse | One Button, one Card, one Input — variants via props/modifiers |
| Accessibility | WCAG 2.1 AA — 4.5:1 contrast, keyboard nav, focus rings |
| Performance | No decorative images that block render; transitions only on compositor properties |
| Bilingual | Font and line-height chosen for Bengali + English coexistence |

---

## 2. Tokens (globals.css)

```css
:root {
  /* ── Color ──────────────────────────────────────── */

  /* Brand */
  --color-primary:       #1a3460;
  --color-primary-dark:  #0c1f3f;
  --color-primary-light: #dbeafe;
  --color-primary-mid:   #1d4ed8;

  /* Semantic */
  --color-accent:   #dc2626;   /* urgent, destructive */
  --color-success:  #16a34a;
  --color-warning:  #d97706;
  --color-info:     #0284c7;

  /* Surface */
  --color-bg:          #f9fafb;
  --color-surface:     #ffffff;
  --color-surface-alt: #f3f4f6;
  --color-border:      #e5e7eb;
  --color-border-strong: #d1d5db;

  /* Text */
  --color-text:         #111827;
  --color-text-secondary:#374151;
  --color-text-muted:   #6b7280;
  --color-text-inverse: #ffffff;
  --color-text-link:    #1d4ed8;

  /* Nav / Footer */
  --color-nav-bg:     #0c1f3f;
  --color-nav-text:   #ffffff;
  --color-nav-muted:  rgba(255,255,255,0.65);

  /* ── Typography ──────────────────────────────────── */

  --font-sans: 'Inter', 'Hind Siliguri', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Scale */
  --text-xs:   0.75rem;    /* 12px */
  --text-sm:   0.875rem;   /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg:   1.125rem;   /* 18px */
  --text-xl:   1.25rem;    /* 20px */
  --text-2xl:  1.5rem;     /* 24px */
  --text-3xl:  1.875rem;   /* 30px */
  --text-4xl:  2.25rem;    /* 36px */

  /* Weight */
  --font-normal:   400;
  --font-medium:   500;
  --font-semibold: 600;
  --font-bold:     700;

  /* Leading — 1.75 for Bengali readability */
  --leading-tight:   1.25;
  --leading-normal:  1.5;
  --leading-relaxed: 1.75;

  /* ── Spacing (4px base grid) ─────────────────────── */

  --space-1:  0.25rem;   /* 4px  */
  --space-2:  0.5rem;    /* 8px  */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-5:  1.25rem;   /* 20px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */

  /* ── Layout ──────────────────────────────────────── */

  --container-max:  1200px;
  --sidebar-width:  240px;
  --navbar-height:  64px;

  /* ── Radius ──────────────────────────────────────── */

  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-full: 9999px;

  /* ── Shadow ──────────────────────────────────────── */

  --shadow-sm:   0 1px 3px rgba(0,0,0,0.07);
  --shadow-card: 0 2px 8px rgba(12,31,63,0.08);
  --shadow-md:   0 4px 16px rgba(0,0,0,0.10);
  --shadow-lg:   0 8px 32px rgba(0,0,0,0.12);

  /* ── Transitions ─────────────────────────────────── */

  --transition-fast: 100ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;

  /* ── Z-index ─────────────────────────────────────── */

  --z-sticky:   100;
  --z-dropdown: 200;
  --z-modal:    300;
  --z-toast:    400;
}
```

---

## 3. Breakpoints

Mobile-first. Base CSS = mobile. Breakpoints layer on top.

```css
/* md  — tablet  */ @media (min-width: 768px)  { ... }
/* lg  — laptop  */ @media (min-width: 1024px) { ... }
/* xl  — desktop */ @media (min-width: 1280px) { ... }
```

---

## 4. Typography

Fonts loaded via `next/font/google` — no external link tags.

```tsx
// app/layout.tsx
import { Inter, Hind_Siliguri } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const hind  = Hind_Siliguri({ weight: ['400','500','600','700'], subsets: ['bengali','latin'], variable: '--font-hind', display: 'swap' });
```

Usage rule: `--font-sans` resolves to both fonts in stack order. Bengali characters render in Hind Siliguri, Latin in Inter — automatically.

Base styles:

```css
/* globals.css */
body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text);
  background: var(--color-bg);
  -webkit-font-smoothing: antialiased;
}

h1 { font-size: var(--text-4xl); font-weight: var(--font-bold);     line-height: var(--leading-tight); }
h2 { font-size: var(--text-3xl); font-weight: var(--font-bold);     line-height: var(--leading-tight); }
h3 { font-size: var(--text-2xl); font-weight: var(--font-semibold); line-height: var(--leading-tight); }
h4 { font-size: var(--text-xl);  font-weight: var(--font-semibold); line-height: var(--leading-normal); }
h5 { font-size: var(--text-lg);  font-weight: var(--font-medium);   line-height: var(--leading-normal); }
```

---

## 5. Components

### 5.1 Button

**One component. All variants via `variant` prop.**

```tsx
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize    = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  as?: 'button' | 'a';
  href?: string;
}
```

```css
/* Button.module.css */

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-sans);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-md);
  border: 2px solid transparent;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  transition: background var(--transition-base),
              border-color var(--transition-base),
              transform var(--transition-fast),
              box-shadow var(--transition-base);
}

/* Sizes */
.sm { font-size: var(--text-sm);  padding: var(--space-2) var(--space-4); min-height: 36px; }
.md { font-size: var(--text-base); padding: var(--space-3) var(--space-6); min-height: 44px; }
.lg { font-size: var(--text-lg);  padding: var(--space-4) var(--space-8); min-height: 52px; }

/* Variants */
.primary {
  background: var(--color-primary);
  color: var(--color-text-inverse);
}
.primary:hover:not(:disabled) {
  background: var(--color-primary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.secondary {
  background: transparent;
  border-color: var(--color-primary);
  color: var(--color-primary);
}
.secondary:hover:not(:disabled) {
  background: var(--color-primary-light);
}

.ghost {
  background: transparent;
  color: var(--color-text);
}
.ghost:hover:not(:disabled) {
  background: var(--color-surface-alt);
}

.danger {
  background: var(--color-accent);
  color: var(--color-text-inverse);
}

/* States */
.button:focus-visible {
  outline: 2px solid var(--color-primary-mid);
  outline-offset: 2px;
}

.button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none;
}

.button:active:not(:disabled) {
  transform: translateY(0);
}
```

---

### 5.2 Badge

Single component, `variant` prop controls color.

```tsx
type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
interface BadgeProps { label: string; variant?: BadgeVariant; }
```

```css
.badge {
  display: inline-flex;
  align-items: center;
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
}

.primary { background: var(--color-primary-light); color: var(--color-primary); }
.success { background: #dcfce7; color: var(--color-success); }
.warning { background: #fef3c7; color: var(--color-warning); }
.danger  { background: #fee2e2; color: var(--color-accent);  }
.neutral { background: var(--color-surface-alt); color: var(--color-text-secondary); }
```

---

### 5.3 Card

Base wrapper. All card-like UI extends this or uses it directly.

```css
/* Card.module.css */
.card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  padding: var(--space-6);
  box-shadow: var(--shadow-card);
}

/* Optional interactive modifier — apply when card is clickable */
.interactive {
  cursor: pointer;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.interactive:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
```

---

### 5.4 Input

```css
.input {
  width: 100%;
  height: 44px;
  padding: 0 var(--space-4);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--color-text);
  background: var(--color-surface);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
}

.input::placeholder { color: var(--color-text-muted); }

.input:focus {
  outline: none;
  border-color: var(--color-primary-mid);
  box-shadow: 0 0 0 3px rgba(29,78,216,0.15);
}

.input.error {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(220,38,38,0.12);
}
```

---

### 5.5 Skeleton Loader

```css
@keyframes shimmer {
  from { background-position: -200% center; }
  to   { background-position:  200% center; }
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
  background-size: 200%;
  animation: shimmer 1.4s ease infinite;
  border-radius: var(--radius-md);
}
```

---

## 6. Layout Components

### Container

```css
.container {
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 768px)  { .container { padding: 0 var(--space-6); } }
@media (min-width: 1280px) { .container { padding: 0 var(--space-8); } }
```

### Section

```css
.section { padding: var(--space-16) 0; }
.section + .section { padding-top: 0; }

@media (min-width: 768px) { .section { padding: var(--space-20) 0; } }
```

### Grid

```tsx
interface GridProps {
  cols?: { base?: number; md?: number; lg?: number; xl?: number };
  gap?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
```

CSS output driven by `data-cols-*` attributes — no separate CSS file per column count.

---

## 7. Navigation

### Public Navbar

```
Structure:
  nav.navbar
    div.container
      a.logo          ← school logo + name
      ul.nav-links    ← desktop links (hidden mobile)
      div.nav-actions ← language toggle
      button.hamburger ← mobile only
    div.mobile-drawer   ← full-height overlay on mobile
```

```css
.navbar {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  height: var(--navbar-height);
  background: var(--color-nav-bg);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  box-shadow: var(--shadow-md);
}

/* Desktop nav links */
.navLink {
  color: var(--color-nav-muted);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: color var(--transition-base), background var(--transition-base);
}
.navLink:hover    { color: var(--color-nav-text); background: rgba(255,255,255,0.08); }
.navLink[aria-current="page"] { color: var(--color-nav-text); background: rgba(255,255,255,0.12); }

/* Mobile drawer */
.drawer {
  position: fixed;
  inset: 0;
  background: var(--color-nav-bg);
  z-index: var(--z-dropdown);
  display: flex;
  flex-direction: column;
  padding: var(--space-6);
  transform: translateX(-100%);
  transition: transform var(--transition-slow);
}
.drawer[data-open="true"] { transform: translateX(0); }
```

---

## 8. Page Layouts

### Public Pages

```
Navbar (sticky)
  Page content
    [Section] Hero / Page header
    [Section] Main content
    [Section] Secondary content
Footer
```

Vertical rhythm: all sections use `var(--space-16)` or `var(--space-20)` vertical padding. No inconsistent spacing between sections.

### Admin Pages

```
div.adminLayout
  aside.sidebar       ← 240px, hidden on mobile
  main.adminMain
    header.adminHeader ← page title + breadcrumb + user menu
    div.adminContent   ← page-specific content
```

Mobile: sidebar hidden; top bar with hamburger opens slide-in drawer.

---

## 9. Specific Page Component Structure

### Notice Board

```
NoticesPage (Server Component — fetches data)
  PageHeader
  NoticeFilterTabs      ← category filter, search input
  NoticeGrid
    NoticeCard[]        ← reuse Card + Badge + DownloadLink
  Pagination
```

### Teacher Directory

```
TeachersPage (Server Component)
  PageHeader
  DepartmentFilter
  TeacherGrid
    TeacherCard[]       ← photo, name, designation, subject badge, contact
```

### Result Search

```
ResultsPage (Client Component — needs interactivity)
  PageHeader
  ResultSearchForm      ← select exam, input roll, select class, submit
  ResultTable           ← conditionally rendered after search
  DownloadButton        ← conditionally rendered
```

### Gallery

```
GalleryPage (Server Component)
  PageHeader
  AlbumGrid
    AlbumCard[]

AlbumPage (Server Component + Client lightbox)
  AlbumHeader
  PhotoGrid
    PhotoItem[]         ← click opens Lightbox
  Lightbox              ← Client Component, portaled to body
```

---

## 10. Animations

Only animate compositor-promoted properties: `transform`, `opacity`, `box-shadow`.

Never animate: `width`, `height`, `top`, `left`, `color`, `background-color` directly.

| Pattern | CSS |
|---------|-----|
| Card lift | `transform: translateY(-2px)` on hover, `200ms ease` |
| Button press | `transform: translateY(0)` on `:active` |
| Fade-in mount | `opacity: 0` → `opacity: 1`, `300ms ease` |
| Slide drawer | `transform: translateX(-100%)` → `translateX(0)`, `300ms ease` |
| Notice ticker | `@keyframes ticker { from { transform: translateX(100%) } to { transform: translateX(-100%) } }` |
| Skeleton shimmer | `background-position` animation, `1.4s infinite` |

Reduce motion:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 11. Accessibility Requirements

- Contrast: `--color-text` on `--color-bg` = 12.6:1. `--color-text-secondary` on `--color-surface` = 5.8:1. Both pass AA.
- All inputs have `<label>` — no aria-label substitutes on form inputs
- All icon-only buttons have `aria-label`
- Focus ring: `outline: 2px solid var(--color-primary-mid); outline-offset: 2px` — never remove, never use `outline: none` without providing alternative
- Modal traps focus; `Escape` closes; `aria-modal="true"` on overlay
- Skip link: `<a href="#main-content" class="sr-only focus-visible">Skip to content</a>` in Navbar
- Images: `alt=""` for decorative, descriptive text for content images
- No autoplay on any media

```css
/* Screen reader only utility */
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
```

---

## 12. File Structure

```
apps/web/
  app/
    (public)/               ← public pages
    (admin)/                ← admin pages, route group
  components/
    ui/
      Button/
        Button.tsx
        Button.module.css
      Badge/
      Card/
      Input/
      Select/
      Modal/
      Spinner/
      Skeleton/
      Pagination/
      EmptyState/
    layout/
      Navbar/
      Footer/
      Container/
      Section/
      Grid/
      AdminSidebar/
    sections/               ← page-specific, composed from ui/
      HeroBanner/
      NoticeTicker/
      NoticeCard/
      TeacherCard/
      AlbumCard/
      ResultSearchForm/
      ResultTable/
  styles/
    globals.css             ← tokens + reset + base typography
```

No component creates a new CSS class for something that already exists in `globals.css`. No duplicated token values in component CSS.

---

*This document is the design authority. If a visual decision is not here, add it here first, then implement.*

# Meong.id Style Guide

## Overview

Meong.id is a cat-themed community platform with a warm, friendly aesthetic. The design system emphasizes natural, organic colors inspired by nature (soft greens and creams) combined with clean, modern UI patterns. The overall feel is welcoming and playful while maintaining professional readability.

## Color Palette

### Primary Colors
- **Soft Green** (`#A9C47F` / `--soft-green`)
  - Primary brand color
  - Used for active states, underlines, and primary CTAs
  - RGB: 169, 196, 127
  
- **Dark Green** (`#4C6A4C` / `--dark-green`)
  - Secondary brand color
  - Used for headers and emphasis
  - RGB: 76, 106, 76

### Neutral Colors
- **Light Cream** (`#F6F4EE` / `--light-cream`)
  - Background color for main content areas
  - Creates a warm, paper-like texture
  - RGB: 246, 244, 238

- **White** (`#FFFFFF` / `--white`)
  - Pure white for cards and elevated surfaces
  - RGB: 255, 255, 255

- **Light Gray** (`#DADADA` / `--light-gray`)
  - Borders and subtle dividers
  - RGB: 218, 218, 218

- **Text Black** (`#333333` / `--text-black`)
  - Primary text color
  - RGB: 51, 51, 51

- **Medium Gray** (`#636e72`)
  - Secondary text and navigation items
  - RGB: 99, 110, 114

### Extended Palette (DaisyUI Integration)
- **Base Colors**: `oklch(100% 0 0)` to `oklch(95% 0 0)`
- **Primary**: `oklch(45% .24 277.023)` - Purple-tinted accent
- **Secondary**: `oklch(65% .241 354.308)` - Pink accent
- **Accent**: `oklch(77% .152 181.912)` - Cyan accent
- **Success**: `oklch(76% .177 163.223)` - Green
- **Warning**: `oklch(82% .189 84.429)` - Yellow-orange
- **Error**: `oklch(71% .194 13.428)` - Red

## Typography

### Font Families
- **Primary Font**: `Nunito, sans-serif`
  - Rounded, friendly sans-serif
  - Used for all body text and UI elements
  
- **System Fallback**: `ui-sans-serif, system-ui, sans-serif`
  - Ensures consistent rendering across platforms

- **Monospace**: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas`
  - For code snippets (if used)

### Font Sizes & Weights

#### Headings
- **Hero Heading** (Main "Welcome to Meong id")
  - Size: Large (approximately 3-4rem)
  - Weight: 700 (bold)
  - Color: Dark green
  - Line-height: 1.2

- **Subheading** ("Lapor dan Temukan Kucing kamu yang hilang")
  - Size: Medium-large (approximately 1.5-2rem)
  - Weight: 600 (semi-bold)
  - Color: Soft green
  - Line-height: 1.4

#### Body Text
- **Regular Body**
  - Size: 1rem (16px)
  - Weight: 400 (normal)
  - Line-height: 1.6
  - Color: Text black (#333333)

- **Small Body**
  - Size: 0.875rem (14px)
  - Weight: 400
  - Line-height: 1.5

#### Navigation
- **Nav Items**
  - Size: 0.95rem (15.2px)
  - Weight: 600 (semi-bold)
  - Color: #636e72
  - Line-height: 1.5

### Line Height System
- Tight: 1.2 (headings)
- Normal: 1.5 (UI elements)
- Relaxed: 1.6 (body text)

## Spacing System

### Base Unit
The design follows an 8px base grid system:

- **0.5rem** (8px) - Micro spacing
- **1rem** (16px) - Small spacing
- **1.5rem** (24px) - Medium spacing
- **2rem** (32px) - Large spacing
- **3rem** (48px) - Extra large spacing
- **4rem** (64px) - Section spacing

### Component-Specific Spacing
- **Navigation Items**: `padding: 0.5rem 0` (vertical)
- **Nav Item Gap**: `gap: 8px` (icon to text)
- **Button Padding**: Approximately `1rem 2rem`

## Component Styles

### Navigation Bar
```css
.nav-item {
  text-decoration: none;
  color: #636e72;
  font-weight: 600;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
}

.nav-item::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #A9C47F;
  transition: width 0.3s ease;
  border-radius: 2px;
}

.nav-item:hover::after {
  width: 100%;
}
```

### Buttons

#### Primary Button (Daftar)
- Background: Soft green (#A9C47F)
- Text: White
- Border-radius: 2rem (fully rounded)
- Padding: 0.75rem 2.5rem
- Font-weight: 600
- Transition: All 0.3s ease

#### Secondary Button (Login)
- Background: Transparent/White
- Border: 2px solid (likely soft green or gray)
- Text: Dark text
- Border-radius: 2rem
- Padding: 0.75rem 2.5rem
- Font-weight: 600

#### Login Button (Top Right)
- Background: Dark (#333333 or similar)
- Text: White
- Border-radius: 2rem
- Padding: 0.75rem 1.5rem
- Arrow icon included

### Cards & Containers
- Background: White (#FFFFFF)
- Border-radius: 0.5rem to 1rem
- Box-shadow: `0 2px 10px rgba(0, 0, 0, 0.1)`

## Shadows & Elevation

### Shadow System
```css
--shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
--shadow-hover: 0 4px 20px rgba(0, 0, 0, 0.15);
```

### Elevation Levels
- **Level 0**: No shadow (flat elements)
- **Level 1**: `0 2px 10px rgba(0, 0, 0, 0.1)` - Cards, buttons
- **Level 2**: `0 4px 20px rgba(0, 0, 0, 0.15)` - Hover states, modals
- **Level 3**: `0 8px 30px rgba(0, 0, 0, 0.2)` - Dropdowns, popovers

### Depth Variable
- `--depth: 1` - Used for layering contexts

## Animations & Transitions

### Timing Functions
- **Default**: `ease` - Natural, smooth transitions
- **Ease-out**: `ease-out` - Quick start, slow end

### Duration Standards
- **Fast**: `0.15s` - Micro-interactions
- **Normal**: `0.3s` - Most transitions (color, transform, width)
- **Slow**: `0.5s` - Large movements, page transitions

### Common Transitions
```css
/* Navigation underline */
transition: width 0.3s ease;

/* Color changes */
transition: color 0.3s ease;

/* Background scroll effect */
transition: background-color 0.3s ease-out;

/* Multi-property */
transition: all 0.3s ease;
```

### Hover Effects
- Navigation items: Color change + underline expansion
- Buttons: Background darkening + shadow increase
- Cards: Shadow elevation increase

## Border Radius

### Radius System
- **Small** (`--radius-field`): `0.25rem` (4px) - Input fields, small elements
- **Medium** (`--radius-box`, `--radius-selector`): `0.5rem` (8px) - Cards, containers
- **Large**: `1rem` (16px) - Larger cards
- **Full** (`2rem` or `9999px`): Fully rounded - Pills, buttons

### Usage
- Navigation underline: `border-radius: 2px`
- Buttons: `border-radius: 2rem` (pill shape)
- Cards: `border-radius: 0.5rem` to `1rem`

## Opacity & Transparency

### Opacity Levels
- **Subtle**: `0.1` - Very light overlays
- **Light**: `0.2` - Background noise texture
- **Medium**: `0.35` - Scrollbar color mixing
- **Standard**: `0.6-0.8` - Disabled states
- **Strong**: `0.9` - Modal backgrounds

### Color Mixing
```css
/* Scrollbar with transparency */
scrollbar-color: color-mix(in oklch, currentColor 35%, transparent) transparent;

/* Page backdrop effect */
color-mix(in srgb, var(--root-bg), oklch(0% 0 0) calc(var(--page-has-backdrop, 0) * 40%));
```

## Common Tailwind CSS Usage in Project

While the project appears to use custom CSS primarily, it integrates DaisyUI (Tailwind component library). Common patterns:

### Layout Classes
```
flex, items-center, justify-between
gap-2, gap-4, gap-8
px-4, py-2, p-6
mx-auto, container
```

### Responsive Classes
```
sm:, md:, lg:, xl:, 2xl:
hidden sm:block
flex-col md:flex-row
```

### Utility Classes
```
rounded-full, rounded-lg
shadow, shadow-lg, shadow-xl
transition-all, duration-300
hover:scale-105, hover:shadow-xl
```

## Example Component Reference

### Hero Section
```html
<section class="hero-section" style="
  background-color: #F6F4EE;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
">
  <div class="hero-content">
    <h1 style="
      font-size: 3.5rem;
      font-weight: 700;
      color: #4C6A4C;
      margin-bottom: 1rem;
    ">
      Welcome to Meong id
    </h1>
    
    <h2 style="
      font-size: 1.75rem;
      font-weight: 600;
      color: #A9C47F;
      margin-bottom: 1.5rem;
    ">
      Lapor dan Temukan Kucing kamu yang hilang
    </h2>
    
    <p style="
      font-size: 1rem;
      line-height: 1.6;
      color: #333333;
      margin-bottom: 2rem;
      max-width: 500px;
    ">
      kamu juga bisa bergabung dengan komunitas kucing di seluruh dunia Daftar Sekarang Gratis
    </p>
    
    <div style="display: flex; gap: 1rem;">
      <button class="btn-primary" style="
        background-color: #A9C47F;
        color: white;
        padding: 0.75rem 2.5rem;
        border-radius: 2rem;
        border: none;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      ">
        Daftar
      </button>
      
      <button class="btn-secondary" style="
        background-color: transparent;
        color: #333333;
        padding: 0.75rem 2.5rem;
        border-radius: 2rem;
        border: 2px solid #636e72;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      ">
        Login
      </button>
    </div>
  </div>
  
  <div class="hero-image">
    <img src="cat-image.png" alt="Cute cat" style="
      max-width: 600px;
      height: auto;
    ">
  </div>
</section>
```

### Navigation Component
```html
<nav style="
  display: flex;
  gap: 2rem;
  align-items: center;
">
  <a href="#" class="nav-item" style="
    text-decoration: none;
    color: #636e72;
    font-weight: 600;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0.5rem 0;
    position: relative;
    transition: color 0.3s ease;
  ">
    <svg><!-- icon --></svg>
    Beranda
  </a>
  <!-- Repeat for other nav items -->
</nav>
```

## Design Tokens

### JavaScript/JSON Format
```json
{
  "colors": {
    "brand": {
      "soft-green": "#A9C47F",
      "dark-green": "#4C6A4C"
    },
    "neutral": {
      "light-cream": "#F6F4EE",
      "white": "#FFFFFF",
      "light-gray": "#DADADA",
      "text-black": "#333333",
      "medium-gray": "#636e72"
    }
  },
  "typography": {
    "fontFamily": {
      "primary": "Nunito, sans-serif"
    },
    "fontSize": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "nav": "0.95rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem"
    },
    "fontWeight": {
      "normal": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700
    },
    "lineHeight": {
      "tight": 1.2,
      "normal": 1.5,
      "relaxed": 1.6
    }
  },
  "spacing": {
    "xs": "0.25rem",
    "sm": "0.5rem",
    "base": "1rem",
    "md": "1.5rem",
    "lg": "2rem",
    "xl": "3rem",
    "2xl": "4rem"
  },
  "borderRadius": {
    "sm": "0.25rem",
    "md": "0.5rem",
    "lg": "1rem",
    "full": "9999px"
  },
  "shadows": {
    "default": "0 2px 10px rgba(0, 0, 0, 0.1)",
    "hover": "0 4px 20px rgba(0, 0, 0, 0.15)"
  },
  "transitions": {
    "fast": "0.15s",
    "normal": "0.3s",
    "slow": "0.5s"
  }
}
```

### CSS Custom Properties
```css
:root {
  /* Brand Colors */
  --soft-green: #A9C47F;
  --dark-green: #4C6A4C;
  --light-cream: #F6F4EE;
  --light-gray: #DADADA;
  --white: #FFFFFF;
  --text-black: #333333;
  
  /* Shadows */
  --shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 4px 20px rgba(0, 0, 0, 0.15);
  
  /* Border Radius */
  --radius-selector: 0.5rem;
  --radius-field: 0.25rem;
  --radius-box: 0.5rem;
  
  /* Sizing */
  --size-selector: 0.25rem;
  --size-field: 0.25rem;
  
  /* Effects */
  --border: 1px;
  --depth: 1;
  --noise: 0;
}
```

## Additional Design Notes

### Texture & Effects
- **Noise Texture**: SVG-based fractal noise overlay at 20% opacity for organic feel
- Applied via: `--fx-noise` CSS variable
- Creates subtle paper-like texture on backgrounds

### Scrollbar Styling
- Custom scrollbar color using `color-mix()`
- Transparent background with 35% opacity foreground
- Maintains minimal, unobtrusive appearance

### Accessibility Considerations
- High contrast ratios maintained (text black on light cream: >10:1)
- Focus states should be implemented on interactive elements
- Touch targets meet minimum 44x44px size on mobile
- Color is not the only means of conveying information

### Responsive Breakpoints (Standard)
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Large Desktop: > 1280px

### Icon System
- Icons appear to use line-style icons
- Consistent stroke width
- Size: Approximately 20-24px
- Color matches text color with transitions

## Implementation Best Practices

1. **Use CSS Variables**: Leverage the existing custom property system for consistency
2. **Maintain Hierarchy**: Keep the established visual hierarchy in new components
3. **Transition Everything**: Apply smooth transitions to interactive states
4. **Shadow Sparingly**: Use elevation to create depth, not decoration
5. **Round Generously**: Embrace the friendly, rounded aesthetic throughout
6. **Green as Accent**: Use soft green as the primary action color
7. **Spacing Rhythm**: Maintain the 8px grid for visual harmony
8. **Typography Scale**: Use established font sizes for consistency
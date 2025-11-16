# How Sizing Works in This Repository

## Repository Structure
```
LakeStarSponsors/
├── index.html          (Main HTML file - loads CSS and JS)
├── mobile.html         (Iframe wrapper that loads index.html)
├── css/
│   └── style.css       (All styles including mobile breakpoints)
└── js/
    └── main.js         (JavaScript that applies dynamic fixes)
```

## How the Stats Grid Sizing Works

### 1. HTML Structure (index.html lines 57-94)
```html
<section id="criteria" class="about">
    <div class="container">                    <!-- Container with max-width: 1200px -->
        <!-- ... other content ... -->
        <div class="stats-grid fade-in">        <!-- THE STATS GRID -->
            <div class="stat-item">...</div>     <!-- 4 stat items -->
            <div class="stat-item">...</div>
            <div class="stat-item">...</div>
            <div class="stat-item">...</div>
        </div>
    </div>
</section>
```

**Key Point:** The `.stats-grid` is INSIDE a `.container` div, which is inside the `.about` section.

### 2. Base CSS Styles (style.css lines 495-524)
**Desktop (default):**
- `.stats-grid`: `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`
  - This is DYNAMIC - creates columns based on available space
  - Minimum 200px per column, grows to fill space
- `.stat-item`: `padding: 60px 20px` (large padding)
- `.stat-number`: `font-size: 48px` (large font)
- `.stat-label`: `font-size: 12px`

**This is NOT static** - it uses CSS Grid's `auto-fit` which is responsive.

### 3. Mobile CSS Override (style.css lines 1383-1412)
**Mobile (@media max-width: 768px):**
- `.stats-grid`: `grid-template-columns: 1fr 1fr !important`
  - Forces exactly 2 columns
  - `width: 100%` - takes full width of container
- `.stat-item`: `padding: 30px 12px !important` (smaller padding)
- `.stat-number`: `font-size: 28px !important` (smaller font)
- `.stat-label`: `font-size: 9px !important` (smaller font)

**This IS static** - fixed 2-column layout on mobile.

### 4. Container Padding (style.css lines 1362-1381)
**Mobile:**
- `.container`: `padding-left: 20px !important; padding-right: 20px !important`
- This constrains the container width

### 5. JavaScript Dynamic Fix (main.js lines 125-162)
**What it does:**
1. Applies 20px padding to ALL containers (via inline styles)
2. Calculates grid width: `container width - padding`
3. Forces each stat-item to be exactly: `(gridWidth - 1px gap) / 2`
4. Sets inline styles: `item.style.width = calculatedWidth + 'px'`

**This OVERRIDES CSS** - JavaScript sets fixed pixel widths on items.

## The Problem: Why Changes Might Not Show

### Issue #1: Browser Cache
- CSS and JS files are cached
- Hard refresh needed: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

### Issue #2: JavaScript Timing
- JavaScript runs on page load
- If it runs before CSS loads, it might not work
- Multiple timeouts try to fix this (100ms, 500ms, 1000ms)

### Issue #3: Iframe Context
- `mobile.html` loads `index.html` in an iframe
- JavaScript runs in the iframe's context
- Changes might not be visible if iframe hasn't fully loaded

### Issue #4: CSS Specificity Conflict
- Base CSS: `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`
- Mobile CSS: `grid-template-columns: 1fr 1fr !important`
- JavaScript: Sets inline `width` on items
- **Conflict:** CSS Grid `1fr 1fr` vs JavaScript fixed `width` on items

## Non-Dynamic Parts

### Static Elements:
1. **Grid Background:** `background: #000` (black border) - always 2px padding
2. **Grid Gap:** `gap: 1px` on mobile (fixed)
3. **Container Max-Width:** `max-width: 1200px` on desktop (fixed)
4. **Stat Decoration:** Positioned absolutely (not responsive)

### Dynamic Elements:
1. **Grid Columns:** Changes from `auto-fit` (desktop) to `1fr 1fr` (mobile)
2. **Item Padding:** Changes from `60px 20px` to `30px 12px` on mobile
3. **Font Sizes:** Reduce on mobile
4. **Container Padding:** Added via JavaScript on mobile

## Current State (from browser check):
- Container width: 335px
- Container padding: 20px each side ✅
- Grid width: 295px (335 - 40px padding) ✅
- Grid columns: `147px 147px` (set by JavaScript) ✅
- Last item right: 338px (within 375px viewport) ✅
- **NO OVERFLOW** ✅

## Why It Might Not Be Visible:
1. **Browser cache** - old CSS/JS still loaded
2. **JavaScript not running** - check browser console for errors
3. **Iframe loading delay** - iframe might not have loaded JS yet
4. **CSS not loading** - check Network tab for 404 errors

## Solution: Force Clear Cache
1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"
4. Or add cache-busting: `?v=2` to CSS/JS links


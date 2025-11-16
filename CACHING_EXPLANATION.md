# Why `mobile.html?v=2` Works But `mobile.html` Doesn't

## The Problem: Browser Caching

### What's Happening:

1. **`http://localhost:8000/mobile.html`** (no query string):
   - Browser loads `mobile.html` from cache (old version)
   - Old cached `mobile.html` has: `<iframe src="index.html"></iframe>` (no version)
   - This loads old cached `index.html`, `css/style.css`, and `js/main.js`
   - **Result:** Shows old broken version

2. **`http://localhost:8000/mobile.html?v=2`** (with query string):
   - Browser treats `?v=2` as a **different URL**
   - Forces browser to fetch fresh `mobile.html` from server
   - Fresh `mobile.html` has: `<iframe src="index.html?v=4"></iframe>`
   - This loads fresh `index.html?v=4` with cache-busting
   - Fresh `index.html` loads `css/style.css?v=3` and `js/main.js?v=5`
   - **Result:** Shows fixed version

## The Root Cause:

**`mobile.html` itself is cached!** When you visit `mobile.html` without a query string, your browser serves the old cached version that doesn't have the version parameters in the iframe src.

## The Solution:

You need to **clear your browser cache** or **always use a versioned URL** for `mobile.html`.

### Option 1: Clear Browser Cache
- **Chrome/Edge:** `Cmd+Shift+Delete` (Mac) or `Ctrl+Shift+Delete` (Windows)
- **Safari:** `Cmd+Option+E` (clear cache)
- **Firefox:** `Cmd+Shift+Delete` (Mac) or `Ctrl+Shift+Delete` (Windows)

### Option 2: Hard Refresh
- **Mac:** `Cmd+Shift+R`
- **Windows/Linux:** `Ctrl+Shift+R` or `Ctrl+F5`

### Option 3: Use Versioned URL
Always visit: `http://localhost:8000/mobile.html?v=latest`

## Current File State:

**`mobile.html` (line 25):**
```html
<iframe src="index.html?v=4"></iframe>
```

**`index.html` (line 7):**
```html
<link href="css/style.css?v=3" rel="stylesheet">
```

**`index.html` (line 286):**
```html
<script src="js/main.js?v=5"></script>
```

So the files ARE correct, but your browser is serving a cached version of `mobile.html` when you don't use a query string.


# Bazillin Realtors - frontend site (HTML, CSS, JavaScript)

No build step and no framework. Upload the whole folder to any static host
(cPanel, Netlify, Vercel, GitHub Pages) or open `index.html` through a local server.

    python3 -m http.server 8000     # then open http://localhost:8000

## Pages
- index.html       Scroll-controlled walkthrough hero, search, featured homes, categories, process, cities
- properties.html  All listings with filters (buy/rent, type, city, bedrooms, search, sort) and saved homes
- property.html    Detail page (?id=...) with gallery, features, payment/rent calculator, viewing form
- categories.html  Duplex, villa, bungalow, terrace, apartment, penthouse, land, commercial explained
- about.html       Services and FAQ
- contact.html     Call and WhatsApp on 0701 434 5122, form that opens WhatsApp with the message ready

## Edit your listings
Open `js/data.js`. Every listing is one object in `BZ_PROPERTIES`; categories are in `BZ_CATEGORIES`;
the phone/WhatsApp number is in `BZ_CONTACT`. All pages update automatically.
The listings there are SAMPLE entries - replace the prices, areas, documents and descriptions with real ones.

Add real photos: put them in `assets/img/` and list them in the listing, e.g.
`photos: ['bodija-1', 'bodija-2']` (file names without extension, saved as .webp).
Listings with an empty `photos: []` show a drawn elevation instead.

## The hero
`js/hero.js` plays `assets/frames/` (a frame sequence cut from the original walkthrough video) on a canvas.
The video's hard cuts are dissolved with a slow push-in, and neighbouring frames are blended so scrubbing is smooth.
To use a different video, re-export its frames, update `N`, `CUTS` and `STARTS` at the top of `hero.js`.

## Notes
- Fonts load from Google Fonts; the site falls back to system fonts offline.
- Saved homes use the browser's localStorage.

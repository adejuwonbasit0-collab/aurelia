/* ==========================================================================
   Bazillin Realtors - shared helpers
   ========================================================================== */
(function () {
  var C = window.BZ_CONTACT;
  var BZ = (window.BZ = {});

  /* ---------- formatting ---------- */
  var full = new Intl.NumberFormat('en-NG');
  BZ.naira = function (n) { return '\u20A6' + full.format(n); };
  BZ.short = function (n) {
    function t(v) { return (Math.round(v * 10) / 10).toString().replace(/\.0$/, ''); }
    if (n >= 1e9) return '\u20A6' + t(n / 1e9) + 'B';
    if (n >= 1e6) return '\u20A6' + t(n / 1e6) + 'M';
    if (n >= 1e3) return '\u20A6' + t(n / 1e3) + 'K';
    return '\u20A6' + n;
  };
  BZ.priceShort = function (p) { return BZ.short(p.price) + (p.per ? ' / ' + p.per : ''); };
  BZ.priceFull = function (p) { return BZ.naira(p.price) + (p.per ? ' per ' + p.per : ''); };
  BZ.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  /* ---------- lookups ---------- */
  BZ.cat = function (id) {
    for (var i = 0; i < BZ_CATEGORIES.length; i++) if (BZ_CATEGORIES[i].id === id) return BZ_CATEGORIES[i];
    return { id: id, name: id };
  };
  BZ.get = function (id) {
    for (var i = 0; i < BZ_PROPERTIES.length; i++) if (BZ_PROPERTIES[i].id === id) return BZ_PROPERTIES[i];
    return null;
  };
  BZ.q = function (name) { return new URLSearchParams(location.search).get(name) || ''; };

  /* ---------- contact links ---------- */
  BZ.wa = function (text) { return 'https://wa.me/' + C.whatsapp + (text ? '?text=' + encodeURIComponent(text) : ''); };
  BZ.tel = 'tel:' + C.phoneTel;

  /* ---------- saved homes ---------- */
  var KEY = 'bz-saved';
  BZ.saved = function () {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; }
  };
  function store(list) { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) { /* storage blocked */ } }
  BZ.isSaved = function (id) { return BZ.saved().indexOf(id) > -1; };
  BZ.toggleSaved = function (id) {
    var list = BZ.saved(), i = list.indexOf(id);
    if (i > -1) list.splice(i, 1); else list.push(id);
    store(list); BZ.paintSaved();
    return i === -1;
  };
  BZ.paintSaved = function () {
    var n = BZ.saved().length;
    document.querySelectorAll('[data-saved-count]').forEach(function (el) { el.textContent = n; el.hidden = n === 0; });
    document.querySelectorAll('.save').forEach(function (b) {
      var on = BZ.isSaved(b.getAttribute('data-id'));
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.classList.toggle('is-on', on);
    });
  };

  /* ---------- icons ---------- */
  var I = {
    bed: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18V7M3 14h18v4M21 14v-2.5A2.5 2.5 0 0 0 18.5 9H11v5M7 11.5h.01"/></svg>',
    bath: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h18v2.5A4.5 4.5 0 0 1 16.5 19h-9A4.5 4.5 0 0 1 3 14.5V12ZM6 12V6.5A2.5 2.5 0 0 1 8.5 4 2.5 2.5 0 0 1 11 6M7 19l-1 2M17 19l1 2"/></svg>',
    area: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
    car: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 16V11l2-5h10l2 5v5M5 16h14M5 16v2.5M19 16v2.5M7.5 13h.01M16.5 13h.01"/></svg>',
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.2 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z"/></svg>',
    wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.27-1.38A9.93 9.93 0 1 0 12.04 2Zm0 18.1a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.13.82.84-3.05-.2-.31a8.1 8.1 0 1 1 6.92 3.85Zm4.45-6.06c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06a6.6 6.6 0 0 1-1.94-1.2 7.3 7.3 0 0 1-1.34-1.67c-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>',
    chev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/></svg>'
  };
  BZ.icon = function (n) { return I[n] || ''; };

  /* ---------- media (photo or drawn elevation) ---------- */
  BZ.photoSrc = function (name) { return 'assets/img/' + name + '.webp'; };
  BZ.media = function (p, i, lazy) {
    i = i || 0;
    if (p.photos && p.photos[i]) {
      return '<img src="' + BZ.photoSrc(p.photos[i]) + '" alt="' + BZ.esc(p.title + ', ' + p.area + ', ' + p.city) + '"' + (lazy === false ? '' : ' loading="lazy"') + ' decoding="async">';
    }
    return window.BZ_ART(p);
  };

  /* ---------- facts line ---------- */
  BZ.facts = function (p) {
    var f = [];
    if (p.cat === 'land') {
      f.push('<li>' + I.area + p.plot + ' sqm plot</li>');
      return f.join('');
    }
    if (p.beds) f.push('<li>' + I.bed + p.beds + ' bed</li>');
    if (p.baths) f.push('<li>' + I.bath + p.baths + ' bath</li>');
    if (p.size) f.push('<li>' + I.area + p.size + ' sqm</li>');
    if (!p.beds && p.parking) f.push('<li>' + I.car + p.parking + ' parking</li>');
    return f.join('');
  };

  /* ---------- property card ---------- */
  BZ.card = function (p, opts) {
    opts = opts || {};
    var href = 'property.html?id=' + encodeURIComponent(p.id);
    var badge = p.status === 'rent' ? 'For rent' : 'For sale';
    return '' +
      '<article class="card' + (opts.large ? ' card--large' : '') + (opts.fill ? ' card--fill' : '') + '">' +
        '<a class="card-media" href="' + href + '" tabindex="-1" aria-hidden="true">' + BZ.media(p, 0) + '<span class="badge badge--' + p.status + '">' + badge + '</span></a>' +
        '<button class="save" type="button" data-id="' + p.id + '" aria-pressed="false" aria-label="Save ' + BZ.esc(p.title) + '">' + I.heart + '</button>' +
        '<div class="card-body">' +
          '<p class="card-price">' + BZ.priceShort(p) + '</p>' +
          '<h3 class="card-title"><a href="' + href + '">' + BZ.esc(p.title) + '</a></h3>' +
          '<p class="card-loc">' + BZ.esc(p.area) + ', ' + BZ.esc(p.city) + '</p>' +
          '<ul class="facts">' + BZ.facts(p) + '</ul>' +
        '</div>' +
      '</article>';
  };

  /* ---------- WhatsApp / phone links (any element with data-wa) ---------- */
  function wireLinks() {
    document.querySelectorAll('[data-wa]').forEach(function (a) {
      a.href = BZ.wa(a.getAttribute('data-wa'));
      a.target = '_blank'; a.rel = 'noopener';
    });
  }

  /* ---------- header ---------- */
  function header() {
    var h = document.querySelector('.site-header'); if (!h) return;
    var btn = h.querySelector('.menu-btn'), nav = document.getElementById('site-nav');
    var overHero = h.hasAttribute('data-over-hero');
    var hero = document.getElementById('walk');
    function onScroll() {
      var past = true;
      if (overHero) past = hero ? hero.getBoundingClientRect().bottom < h.offsetHeight + 4 : window.scrollY > 24;
      h.classList.toggle('is-solid', past || document.body.classList.contains('menu-open'));
    }
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    if (btn) btn.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false'); onScroll();
    });
    if (nav) nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { document.body.classList.remove('menu-open'); if (btn) btn.setAttribute('aria-expanded', 'false'); onScroll(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { document.body.classList.remove('menu-open'); if (btn) { btn.setAttribute('aria-expanded', 'false'); btn.focus(); } onScroll(); }
    });
  }

  /* ---------- delegated save buttons ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.save'); if (!b) return;
    e.preventDefault();
    var on = BZ.toggleSaved(b.getAttribute('data-id'));
    var live = document.getElementById('live'); if (live) live.textContent = on ? 'Saved to your list' : 'Removed from your list';
    if (document.body.hasAttribute('data-saved-view') && !on && window.BZ_refresh) window.BZ_refresh();
  });

  document.addEventListener('DOMContentLoaded', function () {
    header(); wireLinks(); BZ.paintSaved();
    var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
  });
})();

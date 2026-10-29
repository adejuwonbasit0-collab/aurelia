/* Categories page */
(function () {
  var host = document.getElementById('cat-list');
  host.innerHTML = BZ_CATEGORIES.map(function (c) {
    var list = BZ_PROPERTIES.filter(function (p) { return p.cat === c.id; });
    var first = list[0] || { cat: c.id, title: c.name, art: { seed: 4, tone: 1 }, photos: [] };
    var sale = list.filter(function (p) { return p.status === 'sale'; });
    var rent = list.filter(function (p) { return p.status === 'rent'; });
    var stats = '<div><b>' + c.typical + '</b><span>Typical size</span></div>' +
      '<div><b>' + list.length + '</b><span>' + (list.length === 1 ? 'Listing' : 'Listings') + ' now</span></div>';
    if (sale.length) stats += '<div><b>' + BZ.short(Math.min.apply(null, sale.map(function (p) { return p.price; }))) + '</b><span>Buy from</span></div>';
    if (rent.length) stats += '<div><b>' + BZ.short(Math.min.apply(null, rent.map(function (p) { return p.price; }))) + '</b><span>Rent from, per year</span></div>';
    function ul(a) { return '<ul class="dots">' + a.map(function (x) { return '<li>' + BZ.esc(x) + '</li>'; }).join('') + '</ul>'; }
    return '<section class="cat-block" id="' + c.id + '">' +
      '<div class="cat-art">' + BZ.media(first, 0) + '</div>' +
      '<div class="cat-info"><h2>' + BZ.esc(c.name) + '</h2><p class="short">' + BZ.esc(c.short) + '</p><p>' + BZ.esc(c.blurb) + '</p>' +
      '<div class="cat-stats">' + stats + '</div>' +
      '<div class="two"><div><h3>Suits</h3>' + ul(c.suits) + '</div><div><h3>Check before you pay</h3>' + ul(c.check) + '</div></div>' +
      '<div class="row"><a class="btn" href="properties.html?cat=' + c.id + '">See ' + (list.length === 1 ? 'the listing' : list.length + ' listings') + '</a>' +
      '<a class="btn btn--ghost" data-wa="Hello Bazillin Realtors, I am looking for a ' + BZ.esc(c.name.toLowerCase()) + '. Please send me options." href="#">Ask us about this</a></div></div></section>';
  }).join('');
  document.querySelectorAll('[data-wa]').forEach(function (a) { a.href = BZ.wa(a.getAttribute('data-wa')); a.target = '_blank'; a.rel = 'noopener'; });
  if (location.hash) { var el = document.getElementById(location.hash.slice(1)); if (el) setTimeout(function () { el.scrollIntoView(); }, 50); }
})();

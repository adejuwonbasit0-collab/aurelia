/* Home page: finder, featured homes, categories, cities */
(function () {
  var P = BZ_PROPERTIES;

  /* ----- finder ----- */
  var cat = document.getElementById('f-cat'), city = document.getElementById('f-city'), max = document.getElementById('f-max');
  BZ_CATEGORIES.forEach(function (c) { cat.insertAdjacentHTML('beforeend', '<option value="' + c.id + '">' + BZ.esc(c.name) + '</option>'); });
  Object.keys(BZ_CITIES).forEach(function (c) { city.insertAdjacentHTML('beforeend', '<option>' + c + '</option>'); });
  var BUDGET = {
    sale: [['', 'Any budget'], [20e6, 'Up to \u20A620M'], [50e6, 'Up to \u20A650M'], [100e6, 'Up to \u20A6100M'], [250e6, 'Up to \u20A6250M'], [500e6, 'Up to \u20A6500M'], [1e9, 'Up to \u20A61B']],
    rent: [['', 'Any budget'], [2e6, 'Up to \u20A62M / year'], [5e6, 'Up to \u20A65M / year'], [10e6, 'Up to \u20A610M / year'], [30e6, 'Up to \u20A630M / year']]
  };
  function budget() {
    var st = document.querySelector('#finder [name=status]:checked').value;
    max.innerHTML = BUDGET[st].map(function (o) { return '<option value="' + o[0] + '">' + o[1] + '</option>'; }).join('');
  }
  document.querySelectorAll('#finder [name=status]').forEach(function (r) { r.addEventListener('change', budget); });
  budget();
  document.getElementById('finder').addEventListener('submit', function (e) {
    // drop empty params for a clean URL
    var f = new FormData(this), q = new URLSearchParams();
    f.forEach(function (v, k) { if (v) q.set(k, v); });
    e.preventDefault(); location.href = 'properties.html' + (q.toString() ? '?' + q.toString() : '');
  });

  /* ----- featured ----- */
  var feat = P.filter(function (p) { return p.featured; }).slice(0, 7);
  var html = feat.map(function (p, i) {
    return BZ.card(p, { large: i === 0 || i === 3, fill: i === 1 || i === 2 });
  }).join('');
  document.getElementById('featured').innerHTML = html;

  /* ----- categories ----- */
  function from(list) {
    var sale = list.filter(function (p) { return p.status === 'sale'; });
    if (sale.length) return 'from ' + BZ.short(Math.min.apply(null, sale.map(function (p) { return p.price; })));
    if (list.length) return 'from ' + BZ.short(Math.min.apply(null, list.map(function (p) { return p.price; }))) + ' / year';
    return '';
  }
  document.getElementById('cats').innerHTML = '<div class="cats">' + BZ_CATEGORIES.map(function (c) {
    var list = P.filter(function (p) { return p.cat === c.id; });
    var first = list[0] || { cat: c.id, title: c.name, art: { seed: 5, tone: 0 }, photos: [] };
    return '<a class="cat-row" href="properties.html?cat=' + c.id + '">' +
      '<div class="cat-thumb">' + BZ.media(first, 0) + '</div>' +
      '<div><h3>' + BZ.esc(c.name) + '</h3><p>' + BZ.esc(c.short) + '</p></div>' +
      '<div class="cat-meta"><span><b>' + list.length + (list.length === 1 ? ' listing' : ' listings') + '</b>' + from(list) + '</span>' + BZ.icon('chev') + '</div></a>';
  }).join('') + '</div>';

  /* ----- cities ----- */
  document.getElementById('cities').innerHTML = Object.keys(BZ_CITIES).map(function (c) {
    var n = P.filter(function (p) { return p.city === c; }).length;
    var areas = BZ_CITIES[c].map(function (a) { return '<li><a href="properties.html?city=' + encodeURIComponent(c) + '&q=' + encodeURIComponent(a) + '">' + BZ.esc(a) + '</a></li>'; }).join('');
    return '<div class="city"><h3><a href="properties.html?city=' + encodeURIComponent(c) + '" style="text-decoration:none">' + c + '</a></h3><p class="n">' + n + ' listings</p><ul>' + areas + '</ul></div>';
  }).join('');

  BZ.paintSaved();
})();

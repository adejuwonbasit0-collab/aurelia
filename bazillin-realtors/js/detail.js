/* Property detail page */
(function () {
  var app = document.getElementById('app');
  var p = BZ.get(BZ.q('id'));

  if (!p) {
    app.innerHTML = '<div class="empty"><h2>We could not find that property</h2><p>It may have been sold or let. Browse what is available, or tell us what you need.</p>' +
      '<a class="btn" href="properties.html">See all properties</a></div>';
    document.title = 'Property not found | Bazillin Realtors';
    return;
  }

  var cat = BZ.cat(p.cat), isRent = p.status === 'rent';
  var url = location.href.split('#')[0];
  var photos = p.photos && p.photos.length ? p.photos : [null];
  var idx = 0;

  document.title = p.title + ', ' + p.area + ' | Bazillin Realtors';
  var md = document.querySelector('meta[name=description]'); if (md) md.content = p.summary;

  /* ----- key facts ----- */
  var key = [];
  if (p.beds) key.push([p.beds, 'Bedrooms']);
  if (p.baths) key.push([p.baths, 'Bathrooms']);
  if (p.size) key.push([p.size + ' sqm', 'Building']);
  if (p.plot) key.push([p.plot.toLocaleString('en-NG') + ' sqm', 'Plot']);
  if (p.parking) key.push([p.parking, 'Parking']);
  var keyHtml = key.map(function (k) { return '<div><b>' + k[0] + '</b><span>' + k[1] + '</span></div>'; }).join('');

  /* ----- details list ----- */
  var rows = [['Type', cat.name], ['Status', isRent ? 'For rent' : 'For sale'], ['Location', p.area + ', ' + p.city]];
  if (p.condition) rows.push(['Condition', p.condition]);
  if (p.furnished) rows.push(['Furnishing', p.furnished]);
  if (p.toilets) rows.push(['Toilets', p.toilets]);
  if (p.docs) rows.push([isRent ? 'Agreement' : 'Documents', p.docs]);
  var dl = rows.map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + BZ.esc(r[1]) + '</dd></div>'; }).join('');

  /* ----- similar ----- */
  var sim = BZ_PROPERTIES.filter(function (x) { return x.id !== p.id; }).map(function (x) {
    return { p: x, s: (x.cat === p.cat ? 2 : 0) + (x.city === p.city ? 1 : 0) + (x.status === p.status ? 1 : 0) };
  }).sort(function (a, b) { return b.s - a.s; }).slice(0, 3).map(function (x) { return x.p; });

  var waMsg = 'Hello Bazillin Realtors, I am interested in "' + p.title + '" in ' + p.area + ', ' + p.city + ' (' + BZ.priceFull(p) + '). ' + url;

  app.innerHTML =
    '<nav class="crumbs" aria-label="Breadcrumb" style="padding-top:2rem"><a href="index.html">Home</a><span>/</span><a href="properties.html">Properties</a><span>/</span><a href="properties.html?cat=' + p.cat + '">' + BZ.esc(cat.name) + '</a></nav>' +
    '<div class="pd-top" style="padding-top:0"><div><h1>' + BZ.esc(p.title) + '</h1><p class="pd-loc">' + BZ.icon('pin') + BZ.esc(p.area) + ', ' + BZ.esc(p.city) + '</p></div>' +
    '<div class="pd-price"><b>' + BZ.naira(p.price) + '</b><span>' + (isRent ? 'per ' + p.per : 'Asking price') + '</span></div></div>' +
    '<div class="gallery" id="gallery"><div class="g-main" id="g-main" tabindex="0" aria-label="Photo gallery. Use left and right arrow keys."></div><div class="g-thumbs" id="g-thumbs"></div></div>' +
    '<div class="pd-body"><div>' +
      (keyHtml ? '<div class="key">' + keyHtml + '</div>' : '') +
      '<section class="blk"><h2>About this property</h2><div class="prose">' + p.description.map(function (t) { return '<p>' + BZ.esc(t) + '</p>'; }).join('') + '</div></section>' +
      '<section class="blk"><h2>Features</h2><ul class="feat">' + p.features.map(function (f) { return '<li>' + BZ.esc(f) + '</li>'; }).join('') + '</ul></section>' +
      '<section class="blk"><h2>Details</h2><dl class="dl">' + dl + '</dl></section>' +
      '<section class="blk"><h2>Location</h2><p class="prose">' + BZ.esc(p.area) + ', ' + BZ.esc(p.city) + '. We share the exact address and meeting point on WhatsApp when you book a viewing.</p></section>' +
      '<section class="blk"><h2>About this type of property</h2><p class="prose">' + BZ.esc(cat.blurb) + ' <a class="link" href="categories.html#' + cat.id + '">Read the full guide</a></p></section>' +
    '</div><aside class="side" aria-label="Contact and tools">' +
      '<div class="panel"><h3>Ask about this property</h3><p>Reply time is fastest on WhatsApp.</p>' +
        '<a class="btn btn--wa btn--block" data-wa="' + BZ.esc(waMsg) + '" href="#">' + BZ.icon('wa') + 'WhatsApp us</a>' +
        '<a class="btn btn--ghost btn--block" href="' + BZ.tel + '">' + BZ.icon('phone') + 'Call ' + BZ_CONTACT.phoneDisplay + '</a></div>' +
      '<div class="panel"><h3>Book a viewing</h3><p>Pick a day and we confirm it on WhatsApp.</p>' +
        '<form id="vform" novalidate><label class="field"><span>Your name</span><input name="name" autocomplete="name" required><span class="err" data-err="name"></span></label>' +
        '<div class="pair"><label class="field"><span>Preferred day</span><input name="date" type="date"></label>' +
        '<label class="field"><span>Time</span><select name="time"><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label></div>' +
        '<button class="btn btn--block" type="submit">Request viewing</button></form></div>' +
      '<div class="panel" id="calc"></div>' +
      '<div class="share"><button class="btn btn--ghost btn--sm save-detail" type="button" data-id="' + p.id + '">' + BZ.icon('heart') + '<span>Save</span></button><button class="btn btn--ghost btn--sm" type="button" id="copy">Copy link</button></div>' +
    '</aside></div>' +
    '<section class="mini" style="padding-bottom:5rem"><div class="sec-head"><h2>You may also like</h2></div><div class="grid">' + sim.map(function (x) { return BZ.card(x); }).join('') + '</div></section>';

  /* ----- gallery ----- */
  var main = document.getElementById('g-main'), thumbs = document.getElementById('g-thumbs');
  function show(i) {
    idx = (i + photos.length) % photos.length;
    var inner = photos[idx] ? '<img src="' + BZ.photoSrc(photos[idx]) + '" alt="' + BZ.esc(p.title + ', photo ' + (idx + 1)) + '">' : window.BZ_ART(p);
    main.innerHTML = inner;
    if (photos.length > 1) {
      main.insertAdjacentHTML('beforeend',
        '<button class="g-nav prev" type="button" aria-label="Previous photo">' + BZ.icon('chev') + '</button>' +
        '<button class="g-nav next" type="button" aria-label="Next photo">' + BZ.icon('chev') + '</button>' +
        '<span class="g-count">' + (idx + 1) + ' / ' + photos.length + '</span>');
    }
    [].forEach.call(thumbs.children, function (b, n) { b.setAttribute('aria-current', n === idx ? 'true' : 'false'); });
  }
  if (photos.length > 1) {
    thumbs.innerHTML = photos.map(function (ph, n) { return '<button type="button" aria-label="Show photo ' + (n + 1) + '"><img src="' + BZ.photoSrc(ph) + '" alt="" loading="lazy"></button>'; }).join('');
    thumbs.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) show([].indexOf.call(thumbs.children, b)); });
  } else { thumbs.hidden = true; }
  main.addEventListener('click', function (e) {
    if (e.target.closest('.prev')) show(idx - 1); else if (e.target.closest('.next')) show(idx + 1);
  });
  main.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { show(idx - 1); e.preventDefault(); } else if (e.key === 'ArrowRight') { show(idx + 1); e.preventDefault(); }
  });
  show(0);

  /* ----- calculator ----- */
  var calc = document.getElementById('calc');
  function money(n) { return BZ.naira(Math.round(n)); }
  if (isRent) {
    calc.innerHTML = '<h3>Estimate what you pay up front</h3><p>Fees differ by landlord. We give you an itemised list before you commit.</p>' +
      '<div class="pair"><label class="field"><span>Agency fee %</span><input id="c-a" type="number" min="0" max="30" step="1" value="10"></label>' +
      '<label class="field"><span>Legal fee %</span><input id="c-l" type="number" min="0" max="30" step="1" value="10"></label></div>' +
      '<div class="calc-out"><span>Estimated total</span><b id="c-total"></b><dl><div><dt>Rent</dt><dd id="c-rent"></dd></div><div><dt>Agency fee</dt><dd id="c-af"></dd></div><div><dt>Legal fee</dt><dd id="c-lf"></dd></div></dl></div>';
    var run = function () {
      var a = +document.getElementById('c-a').value || 0, l = +document.getElementById('c-l').value || 0;
      document.getElementById('c-rent').textContent = money(p.price);
      document.getElementById('c-af').textContent = money(p.price * a / 100);
      document.getElementById('c-lf').textContent = money(p.price * l / 100);
      document.getElementById('c-total').textContent = money(p.price * (1 + (a + l) / 100));
    };
    calc.addEventListener('input', run); run();
  } else {
    calc.innerHTML = '<h3>Estimate monthly payments</h3><p>For planning only. Rates and terms depend on your lender or the seller\u2019s payment plan.</p>' +
      '<div class="pair"><label class="field"><span>Deposit %</span><input id="c-d" type="number" min="0" max="90" step="5" value="30"></label>' +
      '<label class="field"><span>Years</span><input id="c-y" type="number" min="1" max="25" step="1" value="10"></label></div>' +
      '<label class="field" style="margin-top:.7rem"><span>Interest rate % per year</span><input id="c-r" type="number" min="0" max="50" step="0.5" value="18"></label>' +
      '<div class="calc-out"><span>Estimated monthly payment</span><b id="c-m"></b><dl><div><dt>Deposit</dt><dd id="c-dep"></dd></div><div><dt>Amount financed</dt><dd id="c-fin"></dd></div><div><dt>Total interest</dt><dd id="c-int"></dd></div></dl></div>';
    var go = function () {
      var d = Math.min(90, Math.max(0, +document.getElementById('c-d').value || 0));
      var y = Math.min(25, Math.max(1, +document.getElementById('c-y').value || 1));
      var r = Math.max(0, +document.getElementById('c-r').value || 0) / 100 / 12, n = y * 12;
      var dep = p.price * d / 100, fin = p.price - dep;
      var m = r === 0 ? fin / n : fin * r / (1 - Math.pow(1 + r, -n));
      document.getElementById('c-m').textContent = money(m);
      document.getElementById('c-dep').textContent = money(dep);
      document.getElementById('c-fin').textContent = money(fin);
      document.getElementById('c-int').textContent = money(m * n - fin);
    };
    calc.addEventListener('input', go); go();
  }

  /* ----- viewing form ----- */
  document.getElementById('vform').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = this.elements, err = this.querySelector('[data-err=name]');
    if (!f.name.value.trim()) { err.textContent = 'Enter your name so we know who to ask for.'; f.name.setAttribute('aria-invalid', 'true'); f.name.focus(); return; }
    err.textContent = ''; f.name.removeAttribute('aria-invalid');
    var day = f.date.value ? ' on ' + f.date.value : '';
    var t = 'Hello Bazillin Realtors, my name is ' + f.name.value.trim() + '. I would like to view "' + p.title + '" in ' + p.area + ', ' + p.city + day + ' (' + f.time.value.toLowerCase() + '). ' + url;
    window.open(BZ.wa(t), '_blank', 'noopener');
  });

  /* ----- save + copy ----- */
  var sb = document.querySelector('.save-detail');
  function paintSave() { var on = BZ.isSaved(p.id); sb.querySelector('span').textContent = on ? 'Saved' : 'Save'; sb.classList.toggle('is-on', on); sb.setAttribute('aria-pressed', on); }
  sb.classList.add('save-btn-d');
  sb.addEventListener('click', function (e) { e.stopPropagation(); BZ.toggleSaved(p.id); paintSave(); });
  paintSave();
  // detail save button must not be treated as a card heart
  sb.classList.remove('save');
  document.getElementById('copy').addEventListener('click', function () {
    var b = this;
    function ok() { b.textContent = 'Link copied'; setTimeout(function () { b.textContent = 'Copy link'; }, 1800); }
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(ok, ok); else ok();
  });

  document.querySelectorAll('[data-wa]').forEach(function (a) { a.href = BZ.wa(a.getAttribute('data-wa')); a.target = '_blank'; a.rel = 'noopener'; });
  BZ.paintSaved();
})();

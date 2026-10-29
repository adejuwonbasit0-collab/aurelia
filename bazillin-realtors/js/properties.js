/* Properties page: filter, sort, search */
(function () {
  var P = BZ_PROPERTIES;
  var form = document.getElementById('f-in');
  var out = document.getElementById('results');
  var state = { status: '', cat: '', city: '', beds: '', max: '', q: '', sort: 'new', saved: '' };

  function fillOptions() {
    var cat = form.elements.cat, city = form.elements.city;
    BZ_CATEGORIES.forEach(function (c) { cat.insertAdjacentHTML('beforeend', '<option value="' + c.id + '">' + BZ.esc(c.name) + '</option>'); });
    Object.keys(BZ_CITIES).forEach(function (c) { city.insertAdjacentHTML('beforeend', '<option>' + c + '</option>'); });
  }
  function fromUrl() { Object.keys(state).forEach(function (k) { var v = BZ.q(k); if (v) state[k] = v; }); }
  function toForm() {
    ['cat', 'city', 'beds', 'sort', 'q'].forEach(function (k) { form.elements[k].value = state[k]; });
    var r = form.querySelectorAll('[name=status]'); r.forEach(function (x) { x.checked = x.value === state.status; });
  }
  function toUrl() {
    var q = new URLSearchParams();
    Object.keys(state).forEach(function (k) { if (state[k] && !(k === 'sort' && state[k] === 'new')) q.set(k, state[k]); });
    history.replaceState(null, '', location.pathname + (q.toString() ? '?' + q.toString() : ''));
  }
  function readForm() {
    state.cat = form.elements.cat.value; state.city = form.elements.city.value; state.beds = form.elements.beds.value;
    state.sort = form.elements.sort.value; state.q = form.elements.q.value.trim();
    state.status = form.querySelector('[name=status]:checked').value;
  }

  function match(p) {
    if (state.saved && !BZ.isSaved(p.id)) return false;
    if (state.status && p.status !== state.status) return false;
    if (state.cat && p.cat !== state.cat) return false;
    if (state.city && p.city !== state.city) return false;
    if (state.beds && !(p.beds && p.beds >= +state.beds)) return false;
    if (state.max && p.price > +state.max) return false;
    if (state.q) {
      var hay = (p.title + ' ' + p.area + ' ' + p.city + ' ' + BZ.cat(p.cat).name + ' ' + p.summary).toLowerCase();
      if (state.q.toLowerCase().split(/\s+/).some(function (w) { return hay.indexOf(w) === -1; })) return false;
    }
    return true;
  }

  function title() {
    if (state.saved) return 'Your saved properties';
    var t = state.cat ? BZ.cat(state.cat).name : 'Properties';
    if (state.status === 'sale') t += ' for sale'; else if (state.status === 'rent') t += ' to rent';
    else if (!state.cat) t += ' for sale and rent';
    if (state.city) t += ' in ' + state.city;
    return t;
  }

  function chips() {
    var c = [];
    function add(k, label) { c.push('<span class="chip">' + BZ.esc(label) + '<button type="button" data-clear="' + k + '" aria-label="Remove filter ' + BZ.esc(label) + '">&times;</button></span>'); }
    if (state.saved) add('saved', 'Saved only');
    if (state.status) add('status', state.status === 'sale' ? 'For sale' : 'To rent');
    if (state.cat) add('cat', BZ.cat(state.cat).name);
    if (state.city) add('city', state.city);
    if (state.beds) add('beds', state.beds + '+ bedrooms');
    if (state.max) add('max', 'Up to ' + BZ.short(+state.max));
    if (state.q) add('q', '\u201C' + state.q + '\u201D');
    return c.join('');
  }

  function render() {
    var list = P.filter(match);
    if (state.sort === 'low') list.sort(function (a, b) { return a.price - b.price; });
    else if (state.sort === 'high') list.sort(function (a, b) { return b.price - a.price; });
    else list.sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });

    document.getElementById('ptitle').textContent = title();
    document.title = title() + ' | Bazillin Realtors';
    document.getElementById('count').textContent = list.length;
    document.getElementById('count-label').textContent = list.length === 1 ? 'property' : 'properties';
    document.getElementById('chips').innerHTML = chips();

    if (!list.length) {
      var msg = state.saved
        ? 'You have not saved anything yet. Tap the heart on a property to keep it here.'
        : 'Nothing matches those filters right now. Try removing one, or tell us what you need and we will look for it.';
      out.innerHTML = '<div class="empty" style="grid-column:1/-1"><h2>No properties found</h2><p>' + msg + '</p>' +
        '<a class="btn btn--wa" data-wa="Hello Bazillin Realtors, I could not find what I need on the site. I am looking for: ' + BZ.esc(title()) + '." href="#">Tell us on WhatsApp</a></div>';
      document.querySelectorAll('[data-wa]').forEach(function (a) { a.href = BZ.wa(a.getAttribute('data-wa')); a.target = '_blank'; a.rel = 'noopener'; });
    } else {
      out.innerHTML = list.map(function (p) { return BZ.card(p); }).join('');
    }
    BZ.paintSaved();
  }

  function update() { readForm(); toUrl(); render(); }
  window.BZ_refresh = render;

  fillOptions(); fromUrl(); toForm();
  if (state.saved) document.body.setAttribute('data-saved-view', '');
  render();

  form.addEventListener('change', function (e) { if (e.target !== form.elements.q) update(); });
  form.elements.q.addEventListener('input', update);

  document.getElementById('chips').addEventListener('click', function (e) {
    var b = e.target.closest('[data-clear]'); if (!b) return;
    state[b.getAttribute('data-clear')] = ''; if (!state.saved) document.body.removeAttribute('data-saved-view');
    toForm(); toUrl(); render();
  });

  var tgl = document.getElementById('f-toggle'), fl = document.getElementById('filters');
  tgl.addEventListener('click', function () { var o = fl.classList.toggle('is-open'); tgl.setAttribute('aria-expanded', o); });
})();

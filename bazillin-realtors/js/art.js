/* ==========================================================================
   Drawn elevations
   When a listing has no photos, the site draws a clean elevation of the
   property type instead (dusk sky, lit windows). Replace by adding photo
   paths to the listing's `photos` array in data.js.
   ========================================================================== */
(function () {
  var uid = 0;

  function rng(seed) {
    var a = (seed * 2654435761) >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  var TONES = [
    { sky: ['#243452', '#7F7A9C', '#F0B27C'], wall: '#DAD4C8', wall2: '#C4BDAE', clad: '#6E4326', roof: '#2A2E34' },
    { sky: ['#2F4B66', '#9DB0C0', '#F3D4A6'], wall: '#E7E2D8', wall2: '#CFC9BC', clad: '#3F4D55', roof: '#272C31' },
    { sky: ['#292D49', '#9C6A7C', '#F2976C'], wall: '#D2CBBE', wall2: '#B9B1A2', clad: '#8B5B36', roof: '#2B2A30' }
  ];

  function win(x, y, w, h, lit, id, mull) {
    var s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="#1B232C"/>' +
      '<rect x="' + (x + 2) + '" y="' + (y + 2) + '" width="' + (w - 4) + '" height="' + (h - 4) + '" fill="url(#' + (lit ? 'lit' : 'gl') + id + ')"/>';
    if (mull) s += '<rect x="' + (x + w / 2 - 1) + '" y="' + y + '" width="2" height="' + h + '" fill="#1B232C"/>';
    return s;
  }

  function tree(x, gy, sc, col) {
    var r = 16 * sc;
    return '<rect x="' + (x - 2 * sc) + '" y="' + (gy - 26 * sc) + '" width="' + 4 * sc + '" height="' + 26 * sc + '" fill="#2A2420"/>' +
      '<circle cx="' + x + '" cy="' + (gy - 38 * sc) + '" r="' + r + '" fill="' + col + '"/>' +
      '<circle cx="' + (x - 11 * sc) + '" cy="' + (gy - 28 * sc) + '" r="' + r * 0.7 + '" fill="' + col + '"/>' +
      '<circle cx="' + (x + 12 * sc) + '" cy="' + (gy - 30 * sc) + '" r="' + r * 0.72 + '" fill="' + col + '"/>';
  }

  function palm(x, gy, sc) {
    var s = '<path d="M' + x + ' ' + gy + ' Q' + (x + 6 * sc) + ' ' + (gy - 50 * sc) + ' ' + (x + 2 * sc) + ' ' + (gy - 95 * sc) + '" stroke="#2A2420" stroke-width="' + 4 * sc + '" fill="none"/>';
    var top = gy - 95 * sc, tx = x + 2 * sc;
    var ang = [-150, -120, -90, -60, -30, -165, -15];
    for (var i = 0; i < ang.length; i++) {
      var a = ang[i] * Math.PI / 180, l = 38 * sc;
      var ex = tx + Math.cos(a) * l, ey = top + Math.sin(a) * l * 0.5 + 12 * sc;
      s += '<path d="M' + tx + ' ' + top + ' Q' + (tx + Math.cos(a) * l * 0.55) + ' ' + (top + Math.sin(a) * l * 0.5 - 8 * sc) + ' ' + ex + ' ' + ey + '" stroke="#24382B" stroke-width="' + 3 * sc + '" fill="none" stroke-linecap="round"/>';
    }
    return s;
  }

  function skyline(r, gy, color) {
    var s = '', x = 0;
    while (x < 800) {
      var w = 20 + r() * 40, h = 20 + r() * 70;
      if (r() > 0.35) s += '<rect x="' + x + '" y="' + (gy - h) + '" width="' + w + '" height="' + h + '" fill="' + color + '"/>';
      x += w + r() * 6;
    }
    return s;
  }

  /* ---------- building drawers ---------- */
  function duplex(t, r, gy, id) {
    var s = '', lit = function () { return r() > 0.3; };
    var x0 = 200 + Math.floor(r() * 30);
    // garage
    s += '<rect x="' + (x0 - 100) + '" y="' + (gy - 78) + '" width="120" height="78" fill="' + t.wall2 + '"/>';
    s += '<rect x="' + (x0 - 92) + '" y="' + (gy - 62) + '" width="104" height="62" fill="#2A2E33"/>';
    for (var i = 1; i < 6; i++) s += '<rect x="' + (x0 - 92) + '" y="' + (gy - 62 + i * 10) + '" width="104" height="1.4" fill="#454B52"/>';
    s += '<rect x="' + (x0 - 106) + '" y="' + (gy - 84) + '" width="132" height="7" fill="' + t.roof + '"/>';
    // lower volume
    s += '<rect x="' + x0 + '" y="' + (gy - 108) + '" width="390" height="108" fill="' + t.wall + '"/>';
    s += win(x0 + 24, gy - 90, 150, 76, true, id, true);
    s += '<rect x="' + (x0 + 226) + '" y="' + (gy - 92) + '" width="46" height="92" fill="' + t.clad + '"/>';
    s += '<rect x="' + (x0 + 262) + '" y="' + (gy - 56) + '" width="4" height="12" rx="2" fill="#D7B87E"/>';
    s += win(x0 + 300, gy - 86, 70, 70, lit(), id, false);
    // upper volume
    s += '<rect x="' + (x0 + 30) + '" y="' + (gy - 214) + '" width="360" height="104" fill="' + t.wall + '"/>';
    s += '<rect x="' + (x0 + 230) + '" y="' + (gy - 214) + '" width="160" height="104" fill="' + t.clad + '"/>';
    for (var k = 0; k < 7; k++) s += '<rect x="' + (x0 + 236 + k * 22) + '" y="' + (gy - 214) + '" width="1.5" height="104" fill="rgba(0,0,0,.22)"/>';
    s += win(x0 + 52, gy - 196, 64, 70, lit(), id, false);
    s += win(x0 + 132, gy - 196, 64, 70, lit(), id, false);
    s += win(x0 + 250, gy - 196, 120, 70, true, id, true);
    s += '<rect x="' + (x0 + 24) + '" y="' + (gy - 222) + '" width="376" height="9" fill="' + t.roof + '"/>';
    s += '<rect x="' + (x0 - 6) + '" y="' + (gy - 112) + '" width="404" height="6" fill="' + t.roof + '"/>';
    return s;
  }

  function villa(t, r, gy, id) {
    var s = '', lit = function () { return r() > 0.25; };
    // left wing
    s += '<rect x="90" y="' + (gy - 120) + '" width="230" height="120" fill="' + t.wall + '"/>';
    s += win(110, gy - 100, 190, 86, true, id, true);
    s += '<rect x="82" y="' + (gy - 128) + '" width="246" height="9" fill="' + t.roof + '"/>';
    // central tower
    s += '<rect x="300" y="' + (gy - 200) + '" width="210" height="200" fill="' + t.wall2 + '"/>';
    s += '<rect x="300" y="' + (gy - 200) + '" width="70" height="200" fill="' + t.clad + '"/>';
    for (var k = 0; k < 4; k++) s += '<rect x="' + (306 + k * 16) + '" y="' + (gy - 200) + '" width="1.5" height="200" fill="rgba(0,0,0,.22)"/>';
    s += win(392, gy - 182, 100, 70, true, id, true);
    s += win(392, gy - 96, 100, 80, lit(), id, true);
    s += '<rect x="292" y="' + (gy - 209) + '" width="226" height="10" fill="' + t.roof + '"/>';
    // right wing
    s += '<rect x="500" y="' + (gy - 140) + '" width="220" height="140" fill="' + t.wall + '"/>';
    s += win(522, gy - 122, 176, 56, true, id, true);
    s += win(522, gy - 56, 80, 44, lit(), id, false);
    s += win(616, gy - 56, 82, 44, lit(), id, false);
    s += '<rect x="492" y="' + (gy - 148) + '" width="236" height="9" fill="' + t.roof + '"/>';
    s += '<rect x="470" y="' + (gy - 100) + '" width="60" height="5" fill="' + t.roof + '"/>';
    // pool
    s += '<rect x="170" y="' + (gy + 24) + '" width="330" height="54" rx="3" fill="#B7C5C9"/>';
    s += '<rect x="176" y="' + (gy + 29) + '" width="318" height="44" rx="2" fill="url(#pool' + id + ')"/>';
    return s;
  }

  function bungalow(t, r, gy, id) {
    var s = '';
    s += '<rect x="190" y="' + (gy - 108) + '" width="420" height="108" fill="' + t.wall + '"/>';
    s += '<polygon points="160,' + (gy - 104) + ' 250,' + (gy - 178) + ' 550,' + (gy - 178) + ' 640,' + (gy - 104) + '" fill="#4A3B35"/>';
    for (var i = 1; i < 6; i++) s += '<line x1="' + (160 + i * 4) + '" y1="' + (gy - 104 - i * 12) + '" x2="' + (640 - i * 4) + '" y2="' + (gy - 104 - i * 12) + '" stroke="rgba(0,0,0,.28)" stroke-width="1.2"/>';
    s += '<rect x="200" y="' + (gy - 80) + '" width="86" height="58" fill="#1B232C"/><rect x="204" y="' + (gy - 76) + '" width="78" height="50" fill="url(#lit' + id + ')"/>';
    s += '<rect x="198" y="' + (gy - 82) + '" width="12" height="62" fill="' + t.clad + '"/><rect x="276" y="' + (gy - 82) + '" width="12" height="62" fill="' + t.clad + '"/>';
    s += '<rect x="368" y="' + (gy - 88) + '" width="64" height="88" fill="' + t.clad + '"/><rect x="420" y="' + (gy - 46) + '" width="4" height="12" rx="2" fill="#D7B87E"/>';
    s += '<rect x="510" y="' + (gy - 80) + '" width="86" height="58" fill="#1B232C"/><rect x="514" y="' + (gy - 76) + '" width="78" height="50" fill="url(#' + (r() > 0.4 ? 'lit' : 'gl') + id + ')"/>';
    s += '<rect x="508" y="' + (gy - 82) + '" width="12" height="62" fill="' + t.clad + '"/><rect x="586" y="' + (gy - 82) + '" width="12" height="62" fill="' + t.clad + '"/>';
    // veranda
    s += '<rect x="330" y="' + (gy - 98) + '" width="140" height="7" fill="' + t.roof + '"/>';
    s += '<rect x="334" y="' + (gy - 92) + '" width="6" height="92" fill="' + t.wall2 + '"/><rect x="460" y="' + (gy - 92) + '" width="6" height="92" fill="' + t.wall2 + '"/>';
    s += '<ellipse cx="226" cy="' + (gy + 2) + '" rx="34" ry="12" fill="#2D4634"/><ellipse cx="578" cy="' + (gy + 2) + '" rx="34" ry="12" fill="#2D4634"/>';
    return s;
  }

  function terrace(t, r, gy, id) {
    var s = '', cols = [t.wall, t.clad, t.wall2, t.wall], w = 140, x0 = 120;
    for (var i = 0; i < 4; i++) {
      var h = 150 + (i % 2) * 18, x = x0 + i * w;
      s += '<rect x="' + x + '" y="' + (gy - h) + '" width="' + w + '" height="' + h + '" fill="' + cols[i] + '"/>';
      s += '<rect x="' + (x - 2) + '" y="' + (gy - h - 8) + '" width="' + (w + 4) + '" height="9" fill="' + t.roof + '"/>';
      s += '<rect x="' + (x + w - 1) + '" y="' + (gy - h) + '" width="2" height="' + h + '" fill="rgba(0,0,0,.25)"/>';
      s += win(x + 18, gy - h + 22, 44, 50, r() > 0.25, id, false);
      s += win(x + 78, gy - h + 22, 44, 50, r() > 0.25, id, false);
      s += '<rect x="' + (x + 20) + '" y="' + (gy - 70) + '" width="38" height="70" fill="' + (i % 2 ? t.wall : t.clad) + '"/>';
      s += win(x + 78, gy - 66, 44, 44, r() > 0.4, id, false);
    }
    return s;
  }

  function apartment(t, r, gy, id) {
    var s = '', floors = 4, fh = 58;
    s += '<rect x="190" y="' + (gy - floors * fh) + '" width="420" height="' + floors * fh + '" fill="' + t.wall + '"/>';
    s += '<rect x="190" y="' + (gy - floors * fh) + '" width="90" height="' + floors * fh + '" fill="' + t.clad + '"/>';
    for (var f = 0; f < floors; f++) {
      var y = gy - (f + 1) * fh;
      s += '<rect x="184" y="' + y + '" width="432" height="5" fill="' + t.roof + '"/>';
      if (f === 0) {
        s += win(300, y + 14, 100, 40, true, id, true);
        s += '<rect x="440" y="' + (y + 12) + '" width="36" height="46" fill="#1B232C"/>';
        s += win(500, y + 14, 90, 40, r() > 0.4, id, true);
      } else {
        for (var c = 0; c < 4; c++) s += win(300 + c * 76, y + 14, 60, 36, r() > 0.3, id, false);
      }
    }
    s += '<rect x="184" y="' + (gy - floors * fh - 6) + '" width="432" height="7" fill="' + t.roof + '"/>';
    s += '<rect x="410" y="' + (gy - 62) + '" width="70" height="6" fill="' + t.roof + '"/>';
    return s;
  }

  function shop(t, r, gy, id) {
    var s = '';
    s += '<rect x="130" y="' + (gy - 140) + '" width="540" height="140" fill="' + t.wall + '"/>';
    s += '<rect x="130" y="' + (gy - 140) + '" width="540" height="34" fill="' + t.clad + '"/>';
    s += '<rect x="148" y="' + (gy - 134) + '" width="140" height="22" fill="rgba(255,255,255,.88)"/>';
    s += '<rect x="298" y="' + (gy - 128) + '" width="60" height="10" fill="rgba(255,255,255,.55)"/>';
    for (var i = 0; i < 11; i++) s += '<rect x="' + (130 + i * 49.1) + '" y="' + (gy - 106) + '" width="24.5" height="20" fill="' + (i % 2 ? '#F2E8D5' : t.clad) + '"/>';
    s += win(150, gy - 80, 190, 74, true, id, true);
    s += win(360, gy - 80, 190, 74, true, id, true);
    s += '<rect x="572" y="' + (gy - 80) + '" width="72" height="80" fill="#1B232C"/><rect x="576" y="' + (gy - 76) + '" width="64" height="72" fill="url(#lit' + id + ')"/>';
    return s;
  }

  function office(t, r, gy, id) {
    var s = '', rows = 9, cols = 6, cw = 50, ch = 34, x0 = 250, h = rows * ch + 18;
    s += '<rect x="' + (x0 - 12) + '" y="' + (gy - h) + '" width="' + (cols * cw + 24) + '" height="' + h + '" fill="' + t.wall2 + '"/>';
    for (var y = 0; y < rows; y++) for (var c = 0; c < cols; c++) {
      var on = r() > 0.35;
      s += '<rect x="' + (x0 + c * cw + 2) + '" y="' + (gy - h + 12 + y * ch) + '" width="' + (cw - 4) + '" height="' + (ch - 6) + '" fill="url(#' + (on ? 'lit' : 'gl') + id + ')"/>';
    }
    s += '<rect x="' + (x0 - 18) + '" y="' + (gy - h - 8) + '" width="' + (cols * cw + 36) + '" height="9" fill="' + t.roof + '"/>';
    s += '<rect x="' + (x0 + 90) + '" y="' + (gy - 42) + '" width="120" height="42" fill="#1B232C"/><rect x="' + (x0 + 94) + '" y="' + (gy - 38) + '" width="112" height="38" fill="url(#lit' + id + ')"/>';
    s += '<rect x="' + (x0 + 70) + '" y="' + (gy - 50) + '" width="160" height="7" fill="' + t.clad + '"/>';
    return s;
  }

  function land(t, r, p, id) {
    var s = '';
    // field
    s += '<polygon points="0,350 800,350 800,600 0,600" fill="url(#field' + id + ')"/>';
    for (var i = 1; i < 9; i++) s += '<line x1="400" y1="350" x2="' + (-300 + i * 150) + '" y2="600" stroke="rgba(255,255,255,.07)" stroke-width="1"/>';
    for (var j = 1; j < 6; j++) s += '<line x1="0" y1="' + (350 + j * j * 8) + '" x2="800" y2="' + (350 + j * j * 8) + '" stroke="rgba(255,255,255,.06)" stroke-width="1"/>';
    // road
    s += '<polygon points="340,350 460,350 640,600 160,600" fill="#8B8478" opacity=".55"/>';
    // plot outline
    s += '<polygon points="170,420 520,420 640,540 90,540" fill="rgba(255,255,255,.06)" stroke="#F5E9CF" stroke-width="2" stroke-dasharray="9 7"/>';
    var pts = [[170, 420], [520, 420], [640, 540], [90, 540]];
    for (var k = 0; k < 4; k++) {
      s += '<rect x="' + (pts[k][0] - 3) + '" y="' + (pts[k][1] - 20) + '" width="6" height="22" fill="#F4F0E6"/><rect x="' + (pts[k][0] - 3) + '" y="' + (pts[k][1] - 20) + '" width="6" height="6" fill="#C9473A"/>';
    }
    // sign
    s += '<rect x="354" y="' + 440 + '" width="6" height="66" fill="#2A2420"/><rect x="316" y="410" width="82" height="50" rx="2" fill="#F4F0E6"/>';
    s += '<text x="357" y="431" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="14" fill="#1D2731">FOR SALE</text>';
    s += '<text x="357" y="449" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="11" fill="#6E4326">' + (p.plot || 600) + ' sqm</text>';
    return s;
  }

  /* ---------- main ---------- */
  window.BZ_ART = function (p, opts) {
    opts = opts || {};
    var a = p.art || { seed: 1, tone: 0 };
    var t = TONES[a.tone % TONES.length];
    var r = rng(a.seed + 7);
    var id = '_' + (++uid);
    var gy = 440;
    var cat = p.cat;
    var isLand = cat === 'land';
    var horizon = isLand ? 350 : 440;

    var defs =
      '<defs>' +
      '<linearGradient id="sky' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + t.sky[0] + '"/><stop offset=".55" stop-color="' + t.sky[1] + '"/><stop offset="1" stop-color="' + t.sky[2] + '"/></linearGradient>' +
      '<radialGradient id="sun' + id + '" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFE0A8" stop-opacity=".95"/><stop offset="1" stop-color="#FFE0A8" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="lit' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F8CE8A"/><stop offset="1" stop-color="#E88F49"/></linearGradient>' +
      '<linearGradient id="gl' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4E6277"/><stop offset="1" stop-color="#26313D"/></linearGradient>' +
      '<linearGradient id="ground' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3B3A35"/><stop offset="1" stop-color="#1E211F"/></linearGradient>' +
      '<linearGradient id="field' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6F6B4B"/><stop offset="1" stop-color="#3B3F2C"/></linearGradient>' +
      '<linearGradient id="pool' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E9B27F"/><stop offset=".5" stop-color="#6C8AA3"/><stop offset="1" stop-color="#2F4B66"/></linearGradient>' +
      '</defs>';

    var svg = '<rect width="800" height="600" fill="url(#sky' + id + ')"/>';
    var sunX = 120 + r() * 560;
    svg += '<circle cx="' + sunX + '" cy="' + (horizon - 20) + '" r="200" fill="url(#sun' + id + ')"/>';
    svg += skyline(r, horizon, 'rgba(36,40,60,.30)');
    if (!isLand) {
      svg += '<rect x="0" y="' + gy + '" width="800" height="160" fill="url(#ground' + id + ')"/>';
      svg += '<polygon points="300,' + gy + ' 500,' + gy + ' 620,600 150,600" fill="#8F897D" opacity=".5"/>';
    }

    var kind = cat;
    if (cat === 'commercial') kind = /office/i.test(p.title) ? 'office' : 'shop';
    var fn = { duplex: duplex, villa: villa, bungalow: bungalow, terrace: terrace, apartment: apartment, penthouse: apartment, shop: shop, office: office }[kind];

    if (isLand) {
      svg += tree(70, 352, 1.2, '#2A3B2C') + tree(150, 350, 0.9, '#2F4632') + tree(690, 352, 1.3, '#2A3B2C') + tree(760, 350, 1, '#2F4632');
      svg += land(t, r, p, id);
    } else {
      svg += tree(60 + r() * 40, gy + 4, 1.3, '#26382C');
      svg += tree(740 - r() * 40, gy + 4, 1.1, '#2B4231');
      if (kind === 'villa' || kind === 'apartment' || kind === 'penthouse') svg += palm(80, gy + 6, 1.1) + palm(730, gy + 6, 1);
      svg += fn(t, r, gy, id);
      svg += '<rect x="0" y="' + gy + '" width="800" height="3" fill="rgba(0,0,0,.35)"/>';
    }

    var label = (opts.label || p.title).replace(/"/g, '');
    return '<svg class="art" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Drawn elevation: ' + label + '" xmlns="http://www.w3.org/2000/svg">' + defs + svg + '</svg>';
  };
})();

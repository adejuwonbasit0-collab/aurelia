/* ==========================================================================
   Scroll-controlled walkthrough
   --------------------------------------------------------------------------
   The original clip was several shots joined with hard cuts and keyframes
   two seconds apart, so scrubbing it jumped and stuttered. This version:
     1. plays a pre-cut frame sequence on a canvas (every frame is instantly
        available, so scrubbing is smooth in both directions),
     2. blends neighbouring frames for sub-frame smoothness,
     3. dissolves through each cut with a slow push-in, so the joins read as
        one camera move instead of a cut.
   ========================================================================== */
(function () {
  var walk = document.getElementById('walk');
  if (!walk) return;

  var canvas = walk.querySelector('.walk-canvas');
  var poster = walk.querySelector('.walk-poster');
  var ctx = canvas.getContext('2d', { alpha: false });
  var chapters = [].slice.call(walk.querySelectorAll('.chap'));
  var railItems = [].slice.call(walk.querySelectorAll('.rail li'));
  var railFill = walk.querySelector('.rail-fill');
  var loadEl = walk.querySelector('[data-load]');
  var nameEl = walk.querySelector('[data-room]');

  var N = 181;                       // frames in the sequence (12 fps)
  var CUTS = [25, 56, 81, 111, 137, 157, 169]; // first frame of each new shot
  var STARTS = [0, 25, 56, 81, 111, 137, 169]; // chapter start frames
  var HOLD = 0.93;                   // last 7% of scroll holds on the final frame
  var W = 5;                         // dissolve half-width (frames)
  var small = window.matchMedia('(max-width: 800px)').matches;
  var dir = 'assets/frames/' + (small ? 'sm' : 'lg') + '/f';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----- loading ----- */
  var imgs = new Array(N), ok = new Array(N), loaded = 0, firstDrawn = false;
  function name(i) { return dir + ('0000' + (i + 1)).slice(-4) + '.webp'; }
  var order = [], seen = {};
  [N - 1, 0].forEach(function (i) { order.unshift(i); seen[i] = 1; });
  [24, 12, 6, 3, 1].forEach(function (step) {
    for (var i = 0; i < N; i += step) if (!seen[i]) { seen[i] = 1; order.push(i); }
  });
  var qi = 0, inflight = 0, MAX = 6;
  function pump() {
    while (inflight < MAX && qi < order.length) {
      (function (i) {
        inflight++;
        var im = new Image();
        im.onload = im.onerror = function (ev) {
          inflight--;
          if (ev && ev.type === 'load') {
            imgs[i] = im; ok[i] = true; loaded++;
            if (loadEl) loadEl.textContent = loaded < N ? Math.round(loaded / N * 100) + '% loaded' : '';
            dirty = true;
          }
          pump();
        };
        im.src = name(i);
      })(order[qi++]);
    }
  }

  function near(i) {
    i = Math.max(0, Math.min(N - 1, Math.round(i)));
    if (ok[i]) return imgs[i];
    for (var d = 1; d < N; d++) {
      if (i - d >= 0 && ok[i - d]) return imgs[i - d];
      if (i + d < N && ok[i + d]) return imgs[i + d];
    }
    return null;
  }

  /* ----- canvas ----- */
  var cw = 0, ch = 0;
  function size() {
    var r = walk.querySelector('.walk-stage').getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    cw = Math.max(2, Math.round(r.width * dpr)); ch = Math.max(2, Math.round(r.height * dpr));
    canvas.width = cw; canvas.height = ch; dirty = true;
  }
  function draw(img, alpha, scale) {
    if (!img || alpha <= 0) return;
    var s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight) * (scale || 1);
    var w = img.naturalWidth * s, h = img.naturalHeight * s;
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  }
  function ease(t) { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); }

  function render(p) {
    ctx.globalAlpha = 1; ctx.fillStyle = '#1d2731'; ctx.fillRect(0, 0, cw, ch);
    // inside a dissolve window?
    for (var k = 0; k < CUTS.length; k++) {
      var c = CUTS[k];
      if (p > c - W - 1 && p < c + W) {
        var a = Math.min(p, c - 1), b = Math.max(p, c);
        var t = ease((p - (c - W - 1)) / (2 * W + 1));
        var zoom = reduce ? 0 : 0.06;
        draw(near(a), 1, 1 + zoom * t);
        draw(near(b), t, 1 + zoom * (1 - t));
        ctx.globalAlpha = 1; return;
      }
    }
    var f = Math.floor(p), fr = p - f;
    draw(near(f), 1, 1);
    if (fr > 0.02 && f + 1 < N) draw(near(f + 1), fr, 1);
    ctx.globalAlpha = 1;
  }

  /* ----- scroll mapping ----- */
  var target = 0, pos = 0, dirty = true, active = -1, visible = true, last = performance.now();
  function readScroll() {
    var rect = walk.getBoundingClientRect();
    var max = Math.max(1, walk.offsetHeight - window.innerHeight);
    var p = Math.max(0, Math.min(1, -rect.top / max));
    target = Math.min(1, p / HOLD) * (N - 1);
    return p;
  }
  var prog = 0;
  window.addEventListener('scroll', function () { prog = readScroll(); }, { passive: true });

  function chapterOf(p) {
    var idx = 0;
    for (var i = 0; i < STARTS.length; i++) if (p >= STARTS[i] - 2) idx = i;
    return idx;
  }

  function setChapter(i) {
    if (i === active) return; active = i;
    chapters.forEach(function (c, n) { c.classList.toggle('is-on', n === i); c.setAttribute('aria-hidden', n === i ? 'false' : 'true'); });
    railItems.forEach(function (li, n) { li.classList.toggle('is-on', n === i); li.classList.toggle('is-past', n < i); });
    if (nameEl) nameEl.textContent = railItems[i] ? railItems[i].getAttribute('data-name') : '';
  }

  function tick(now) {
    var dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (visible) {
      var diff = target - pos;
      if (Math.abs(diff) > 0.002) {
        pos = reduce ? target : pos + diff * (1 - Math.exp(-dt * 8));
        if (Math.abs(target - pos) < 0.004) pos = target;
        dirty = true;
      }
      if (dirty && ok.length) {
        render(pos); dirty = false;
        if (!firstDrawn && near(0)) { firstDrawn = true; canvas.classList.add('is-ready'); if (poster) poster.classList.add('is-off'); }
        setChapter(chapterOf(pos));
        if (railFill) railFill.style.transform = 'scaleY(' + Math.min(1, pos / (N - 1)).toFixed(4) + ')';
      }
    }
    requestAnimationFrame(tick);
  }

  /* ----- rail + buttons ----- */
  function goto(frame) {
    var max = Math.max(1, walk.offsetHeight - window.innerHeight);
    var p = Math.min(1, (frame / (N - 1)) * HOLD);
    window.scrollTo({ top: walk.offsetTop + p * max + 2, behavior: reduce ? 'auto' : 'smooth' });
  }
  railItems.forEach(function (li, n) {
    var b = li.querySelector('button');
    if (b) b.addEventListener('click', function () { goto(STARTS[n] + (n === 0 ? 0 : 3)); });
  });

  document.addEventListener('keydown', function (e) {
    var r = walk.getBoundingClientRect();
    if (r.top > 0 || r.bottom < window.innerHeight * 0.5) return;
    if (/input|textarea|select/i.test(e.target.tagName)) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      var n = Math.max(0, Math.min(STARTS.length - 1, active + (e.key === 'ArrowRight' ? 1 : -1)));
      goto(STARTS[n] + (n === 0 ? 0 : 3)); e.preventDefault();
    }
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) dirty = true; }).observe(walk);
  }
  window.addEventListener('resize', function () { size(); prog = readScroll(); });

  size(); prog = readScroll(); pos = target; setChapter(chapterOf(pos));
  pump(); requestAnimationFrame(tick);
})();

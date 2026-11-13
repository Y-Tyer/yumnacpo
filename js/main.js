(() => {
  'use strict';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  const track = $('.track');
  const stage = $('.stage');
  const figure = $('.figure');
  const frame = $('.figure__frame');
  const regions = $$('.region');
  const railButtons = $$('.rail button');
  const dock = $('.dock');
  const STEPS = regions.length;
  const SEGMENTS = STEPS - 1;

  const POSES = ['00-rest', '01-chest', '02-back-core', '03-arm-wrist', '04-knee', '05-leg', '06-foot', '07-whole'];
  const GROUND = [0xfb / 255, 0xf7 / 255, 0xf9 / 255];
  const CLIP_RATE = 1.35;
  const CLIP_RATE_HURRIED = 3;
  const COMMIT_DELAY = 80;
  // Share of the distance between two areas a visitor must scroll back before it counts as turning round.
  const REVERSE = 0.07;
  // How far past a pose (as a share of the scroll distance to the next one)
  // the visitor scrolls before the page commits to the next area. Kept small
  // so the clip starts as soon as they set off, not on arrival.
  const COMMIT = 0.14;

  /* ---------- figure: stills ---------- */
  const poseEls = new Map([[0, $('.figure__pose')]]);

  function pose(i) {
    if (!poseEls.has(i) && POSES[i]) {
      const img = new Image(760, 1344);
      img.className = 'figure__pose';
      img.alt = '';
      img.decoding = 'async';
      img.src = `assets/site/figure-${POSES[i]}.png`;
      frame.insertBefore(img, $('.spots', frame));
      poseEls.set(i, img);
    }
    return poseEls.get(i);
  }

  function showStill(i) {
    pose(i);
    poseEls.forEach((el, k) => el.classList.toggle('is-active', k === i));
  }

  /* ---------- figure: clips drawn through WebGL ----------
     Each clip has an off-white ground that differs slightly from the page and
     decodes differently per browser. The shader divides every pixel by the
     clip's own ground (read from its corners), which turns that ground into
     pure white, then multiplies by the page ground. It also feathers the frame
     edges so a hand that leaves the clip fades out instead of being cut. */
  const painter = (() => {
    const canvas = document.createElement('canvas');
    canvas.className = 'figure__canvas';
    canvas.width = 720;
    canvas.height = 1280;
    canvas.setAttribute('aria-hidden', 'true');
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, preserveDrawingBuffer: true });
    if (!gl) return null;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = compile(gl.VERTEX_SHADER, 'attribute vec2 p;varying vec2 uv;void main(){uv=p*.5+.5;gl_Position=vec4(p,0.,1.);}');
    const fs = compile(gl.FRAGMENT_SHADER, `
      precision mediump float;
      varying vec2 uv;
      uniform sampler2D tex;
      uniform vec3 ground;
      void main() {
        vec3 c = texture2D(tex, uv).rgb;
        vec3 bg = max(max(texture2D(tex, vec2(.03, .03)).rgb, texture2D(tex, vec2(.97, .03)).rgb),
                      max(texture2D(tex, vec2(.03, .97)).rgb, texture2D(tex, vec2(.97, .97)).rgb));
        vec3 n = clamp(c / (bg * .985), 0., 1.);
        float edge = smoothstep(0., .08, uv.x) * smoothstep(0., .08, 1. - uv.x)
                   * smoothstep(0., .03, uv.y) * smoothstep(0., .06, 1. - uv.y);
        gl_FragColor = vec4(mix(vec3(1.), n, edge) * ground, 1.);
      }`);
    if (!vs || !fs) return null;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
    gl.useProgram(prog);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.uniform3fv(gl.getUniformLocation(prog, 'ground'), GROUND);

    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    frame.insertBefore(canvas, frame.firstChild);
    let lost = false;
    canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); lost = true; });

    return {
      draw(video) {
        if (lost) return false;
        try {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, video);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
          return true;
        } catch (e) { return false; }
      },
    };
  })();

  const clipEls = new Map();
  function clip(seg) {
    if (!painter || reduced.matches || seg < 0 || seg >= SEGMENTS) return null;
    if (!clipEls.has(seg)) {
      const v = document.createElement('video');
      v.className = 'figure__clip';
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      v.setAttribute('playsinline', '');
      v.setAttribute('muted', '');
      v.preload = 'auto';
      v.setAttribute('aria-hidden', 'true');
      v.tabIndex = -1;
      v.src = `assets/generated/figure-move-0${seg}-0${seg + 1}.mp4`;
      frame.appendChild(v);
      // iOS only buffers a video once it has been asked to play, so play it
      // for an instant, then park it on its first frame.
      const primed = v.play();
      if (primed) primed.then(() => {
        if (playing === v) return;
        v.pause();
        v.currentTime = 0;
      }).catch(() => {});
      clipEls.set(seg, v);
    }
    return clipEls.get(seg);
  }

  /* The figure is a small sequencer. `shown` is the pose she is in, `wanted`
     is the pose the page is asking for. A clip, once started, always runs to
     its end: nothing interrupts it, so she never snaps or flickers. When it
     ends she either carries straight on into the next clip, lands on a sharp
     still, or cross-fades to wherever the page has moved on to. */
  let shown = 0;
  let wanted = 0;
  let playing = null;   // the video currently driving the canvas
  let heading = 0;      // the pose that video ends on
  let busy = false;
  let stallTimer = 0;

  function want(i) {
    wanted = i;
    pose(i);
    pose(i + 1);
    clip(i);
    if (!busy) advance();
    // The page has moved on while a clip is still running: hurry it along.
    else if (playing && wanted !== heading) playing.playbackRate = CLIP_RATE_HURRIED;
  }

  function advance() {
    if (wanted === shown) return;
    const from = shown;
    const v = wanted === from + 1 ? clip(from) : null;
    if (!v || v.readyState < 2 || !v.duration) {
      shown = wanted;
      showStill(shown);          // plain cross-fade between stills
      return;
    }
    busy = true;
    startClip(v, from + 1);
  }

  function startClip(v, endsOn) {
    playing = v;
    heading = endsOn;
    // If the network stalls mid-clip, give up on it instead of leaving her frozen.
    clearTimeout(stallTimer);
    stallTimer = setTimeout(() => { if (playing === v) finishClip(); }, 9000);
    const begin = () => {
      if (playing !== v) return;
      v.playbackRate = wanted === heading ? CLIP_RATE : CLIP_RATE_HURRIED;
      const started = v.play();
      if (started) started.catch(() => { if (playing === v) land(); });
      requestAnimationFrame(paint);
    };
    // Always start from the first frame, and only once the video is really there.
    if (v.currentTime > 0.03) {
      v.addEventListener('seeked', begin, { once: true });
      v.currentTime = 0;
    } else begin();
  }

  function paint() {
    const v = playing;
    if (!v) return;
    if (v.ended || v.currentTime >= v.duration - 0.04) { finishClip(); return; }
    // The still stays on screen until the first real frame has been drawn.
    if (!v.seeking && v.readyState >= 2 && painter.draw(v) && !figure.classList.contains('is-moving')) {
      figure.classList.add('is-moving');
      poseEls.forEach(el => el.classList.remove('is-active'));
    }
    requestAnimationFrame(paint);
  }

  function finishClip() {
    const v = playing;
    v.pause();
    shown = heading;
    // Carry straight on into the next clip: the canvas keeps the last frame
    // until the next clip's first frame replaces it, so there is no gap.
    const next = wanted === shown + 1 ? clip(shown) : null;
    if (next && next.readyState >= 2 && next.duration) { startClip(next, shown + 1); return; }
    land();
  }

  // Swap the canvas for the sharp still, but only once that still is decoded.
  function land() {
    playing = null;
    const img = pose(shown);
    const swap = () => {
      showStill(shown);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        figure.classList.remove('is-moving');
        busy = false;
        advance();
      }));
    };
    const ready = () => (img.decode ? img.decode().then(swap, swap) : swap());
    if (img.complete && img.naturalWidth) ready(); else img.addEventListener('load', ready, { once: true });
  }

  /* ---------- product decks ---------- */
  let stageVisible = false;

  const decks = regions.map(region => {
    const el = $('.deck', region);
    if (!el) return null;
    const cards = $$('.card', el);
    const deck = { el, cards, index: 0, paused: false, active: false };

    const progress = document.createElement('div');
    progress.className = 'deck__progress';
    progress.innerHTML = '<span></span>';
    el.prepend(progress);
    const bar = progress.firstChild;

    const controls = document.createElement('div');
    controls.className = 'deck__controls';
    const dots = cards.map((card, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'deck__dot';
      b.setAttribute('aria-label', `Show ${$('h4', card).textContent}`);
      b.addEventListener('click', e => { e.stopPropagation(); deck.pause(); deck.show(i); });
      controls.appendChild(b);
      return b;
    });
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'deck__toggle';
    toggle.addEventListener('click', e => { e.stopPropagation(); deck.paused ? deck.resume() : deck.pause(); });
    controls.appendChild(toggle);
    el.appendChild(controls);

    const restartBar = () => { bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = ''; };
    const sync = () => {
      const auto = !reduced.matches;
      el.classList.toggle('is-auto', auto);
      el.classList.toggle('is-running', auto && deck.active && !deck.paused && stageVisible);
      toggle.hidden = !auto;
      toggle.setAttribute('aria-label', deck.paused ? 'Resume cycling through products' : 'Pause cycling through products');
      toggle.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#i-${deck.paused ? 'play' : 'pause'}"/></svg>`;
    };

    deck.show = i => {
      const prev = deck.index;
      deck.index = (i + cards.length) % cards.length;
      cards.forEach((c, k) => {
        c.classList.toggle('is-current', k === deck.index);
        c.classList.toggle('is-leaving', k === prev && k !== deck.index);
        c.toggleAttribute('inert', k !== deck.index);
      });
      dots.forEach((d, k) => d.setAttribute('aria-current', k === deck.index));
      restartBar();
    };
    deck.pause = () => { deck.paused = true; sync(); };
    deck.resume = () => { deck.paused = false; restartBar(); sync(); };
    deck.setActive = on => {
      deck.active = on;
      if (on && !deck.paused) deck.show(0);
      sync();
    };
    deck.sync = sync;

    bar.addEventListener('animationend', () => deck.show(deck.index + 1));
    el.addEventListener('click', () => { if (!deck.paused) deck.pause(); });
    deck.show(0);
    return deck;
  });

  new IntersectionObserver(([entry]) => {
    stageVisible = entry.isIntersecting;
    decks.forEach(d => d && d.sync());
  }, { threshold: 0.5 }).observe(stage);
  reduced.addEventListener('change', () => decks.forEach(d => d && d.sync()));

  /* ---------- steps: which body area's text and cards are showing ---------- */
  let step = -1;

  function applyStep(next) {
    if (next === step) return;
    step = next;
    stage.classList.toggle('is-rest', step === 0);
    regions.forEach((r, i) => {
      r.classList.toggle('is-active', i === step);
      r.toggleAttribute('inert', i !== step);
    });
    railButtons.forEach(b => b.setAttribute('aria-current', Number(b.dataset.go) === step));
    const current = railButtons.find(b => Number(b.dataset.go) === step);
    const rail = current && current.parentElement;
    if (rail && rail.scrollWidth > rail.clientWidth) {
      rail.scrollTo({ left: current.offsetLeft - rail.clientWidth / 2 + current.offsetWidth / 2, behavior: reduced.matches ? 'auto' : 'smooth' });
    }
    decks.forEach((d, i) => d && d.setActive(i === step));
  }

  const trackTop = () => track.getBoundingClientRect().top + scrollY;
  const trackSpan = () => track.offsetHeight - innerHeight;
  const stepY = i => trackTop() + (i / SEGMENTS) * trackSpan();
  const progress = () => clamp((scrollY - trackTop()) / trackSpan(), 0, 1) * SEGMENTS;

  /* ---------- travelling: programmatic scrolls ----------
     A long jump (ribbon, dock, menu) would otherwise flick through every body
     area on the way. While travelling, the stage holds still and settles once
     on the destination. */
  let travelling = false;
  let travelTimer = 0;
  let lastY = -1;
  let stillFrames = 0;

  function settle() {
    travelling = false;
    clearTimeout(travelTimer);
    const p = progress();
    applyStep(Math.round(p));
    want(Math.round(p));
    updateDock();
  }

  function watchTravel() {
    if (!travelling) return;
    stillFrames = Math.abs(scrollY - lastY) < 0.5 ? stillFrames + 1 : 0;
    lastY = scrollY;
    if (stillFrames > 8) settle(); else requestAnimationFrame(watchTravel);
  }

  function go(y, opts = {}) {
    const instant = opts.instant || reduced.matches;
    const top = Math.round(clamp(y, 0, document.documentElement.scrollHeight - innerHeight));
    if (!instant && opts.hold !== false && Math.abs(top - scrollY) > 4) {
      travelling = true;
      stillFrames = 0;
      lastY = -1;
      clearTimeout(travelTimer);
      travelTimer = setTimeout(settle, 4000);
      requestAnimationFrame(watchTravel);
    }
    scrollTo({ top, behavior: instant ? 'instant' : 'smooth' });
  }
  if ('onscrollend' in window) addEventListener('scrollend', () => { if (travelling) settle(); });

  // Jump to a body area. A hop to the neighbouring area plays its clip; a longer one holds.
  $$('[data-go]').forEach(b => b.addEventListener('click', () => {
    const to = Number(b.dataset.go);
    go(stepY(to), { hold: Math.abs(to - Math.max(step, 0)) !== 1 });
  }));

  /* ---------- dock ---------- */
  const sections = $$('[data-stop]');
  const sectionStops = () => [...sections.map(s => s.getBoundingClientRect().top + scrollY), trackTop()].sort((a, b) => a - b);
  const prevBtn = $('[data-nav="prev"]');
  const nextBtn = $('[data-nav="next"]');

  // Up and down move between whole sections, never between body areas.
  prevBtn.addEventListener('click', () => {
    // From anywhere inside the services section, up goes to the very top of the page.
    const inServices = scrollY > trackTop() + 8 && scrollY <= trackTop() + trackSpan() + 8;
    const y = inServices ? 0 : sectionStops().filter(s => s < scrollY - 8).pop();
    go(y === undefined ? 0 : y);
  });
  nextBtn.addEventListener('click', () => {
    dock.classList.remove('is-hinting');
    const y = sectionStops().find(s => s > scrollY + 8);
    if (y !== undefined) go(y);
  });

  function updateDock() {
    prevBtn.disabled = scrollY < 8;
    nextBtn.disabled = scrollY + innerHeight >= document.documentElement.scrollHeight - 8;
  }

  const heroAction = $('.hero .btn--primary');
  new IntersectionObserver(([entry]) => {
    dock.classList.toggle('has-wa', !entry.isIntersecting);
  }).observe(heroAction);

  /* ---------- in-page links ---------- */
  function hashTarget(hash) {
    if (!hash || hash === '#') return null;
    const id = decodeURIComponent(hash.slice(1));
    const region = $(`[data-region="${CSS.escape(id)}"]`);
    if (region) return stepY(Number(region.dataset.step));
    const el = document.getElementById(id);
    return el ? el.getBoundingClientRect().top + scrollY : null;
  }

  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const y = hashTarget(link.getAttribute('href'));
    if (y === null) return;
    e.preventDefault();
    history.pushState(null, '', link.getAttribute('href'));
    go(y);
  });
  addEventListener('hashchange', () => { const y = hashTarget(location.hash); if (y !== null) go(y); });

  /* ---------- scroll ---------- */
  let ticking = false;
  function onScroll() {
    ticking = false;
    updateDock();
    if (travelling) return;
    const p = progress();
    trackDirection(p);
    const next = candidate(p);
    if (next === Math.max(step, 0)) { clearTimeout(commitTimer); pending = -1; return; }
    // Wait a beat before committing. A steady scroll commits after that beat;
    // a fast one keeps changing its mind, so the areas it flies past are never
    // shown and only the one it slows down on is.
    if (next === pending) return;
    pending = next;
    clearTimeout(commitTimer);
    commitTimer = setTimeout(commit, COMMIT_DELAY);
  }

  let pending = -1;
  let commitTimer = 0;
  /* Which way the visitor is scrolling. An area is committed early, a short
     way after setting off, so a single scroll position can belong to two
     areas: the one ahead when scrolling down and the one behind when scrolling
     up. Only the direction of travel can tell them apart. Without it the page
     flipped between the two on every scroll event. A reversal has to cover a
     little distance before it counts, so a wobbling finger changes nothing. */
  let dir = 1;
  let pivot = 0;
  function trackDirection(p) {
    if (dir === 1) {
      if (p >= pivot) pivot = p;
      else if (pivot - p > REVERSE) { dir = -1; pivot = p; }
    } else if (p <= pivot) pivot = p;
    else if (p - pivot > REVERSE) { dir = 1; pivot = p; }
  }

  const candidate = p => {
    const prev = Math.max(step, 0);
    // More than a whole area away (after a jump): go by position alone.
    if (Math.abs(p - prev) > 1) return Math.round(p);
    if (dir === 1 && p > prev + COMMIT) return Math.ceil(p - COMMIT);
    if (dir === -1 && p < prev - COMMIT) return Math.floor(p + COMMIT);
    return prev;
  };

  function commit() {
    pending = -1;
    if (travelling) return;
    const prev = Math.max(step, 0);
    const next = candidate(progress());
    if (next === prev) return;
    applyStep(next);
    want(next);
    if (next - prev >= 2) hintSkip();
  }

  /* A visitor racing through the body areas probably wants what comes after
     them, so point at the arrow that takes them there. Shown twice at most. */
  const hint = $('.dock__hint');
  let hintsLeft = 2;
  let hintTimer = 0;
  function hintSkip() {
    if (!hint || hintsLeft <= 0 || nextBtn.disabled) return;
    hintsLeft--;
    dock.classList.add('is-hinting');
    clearTimeout(hintTimer);
    hintTimer = setTimeout(() => dock.classList.remove('is-hinting'), 5000);
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', onScroll);

  /* ---------- hand-drawn underline ---------- */
  const seen = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-seen'); seen.unobserve(e.target); }
  }), { threshold: 0.6 });
  $$('.mark').forEach(m => seen.observe(m));

  /* ---------- start ---------- */
  applyStep(0);
  addEventListener('load', () => {
    const y = hashTarget(location.hash);
    if (y !== null && $(`[data-region="${CSS.escape(location.hash.slice(1))}"]`)) go(y, { instant: true });
    onScroll();
  });
})();

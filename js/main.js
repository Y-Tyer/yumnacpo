(() => {
  'use strict';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const track = $('.track');
  const stage = $('.stage');
  const figure = $('.figure');
  const frame = $('.figure__frame');
  const regions = $$('.region');
  const railButtons = $$('.rail button');
  const STEPS = regions.length;

  const POSES = ['00-rest', '01-chest', '02-back-core', '03-arm-wrist', '04-knee', '05-leg', '06-foot', '07-whole'];
  const CLIP_RATE = 1.5;

  /* ---------- figure: stills and transition clips ---------- */
  const poseEls = new Map([[0, $('.figure__pose')]]);
  const clipEls = new Map();
  let moveToken = 0;

  function pose(i) {
    if (!poseEls.has(i) && POSES[i]) {
      const img = new Image(760, 1344);
      img.className = 'figure__pose';
      img.alt = '';
      img.decoding = 'async';
      img.src = `assets/site/figure-${POSES[i]}.png`;
      frame.insertBefore(img, frame.firstChild);
      poseEls.set(i, img);
    }
    return poseEls.get(i);
  }

  function clip(from) {
    if (reduced.matches || from < 0 || from >= STEPS - 1) return null;
    if (!clipEls.has(from)) {
      const v = document.createElement('video');
      v.className = 'figure__clip';
      v.muted = true;
      v.playsInline = true;
      v.preload = 'auto';
      v.setAttribute('aria-hidden', 'true');
      v.src = `assets/generated/figure-move-0${from}-0${from + 1}.mp4`;
      frame.appendChild(v);
      clipEls.set(from, v);
    }
    return clipEls.get(from);
  }

  function showStill(i) {
    pose(i);
    poseEls.forEach((el, k) => el.classList.toggle('is-active', k === i));
  }

  function endMove() {
    figure.classList.remove('is-moving');
    clipEls.forEach(v => { v.classList.remove('is-live'); v.pause(); });
  }

  function movePose(from, to) {
    const token = ++moveToken;
    endMove();
    const v = to === from + 1 ? clip(from) : null;
    if (!v || v.readyState < 3) { showStill(to); return; }

    v.currentTime = 0;
    v.playbackRate = CLIP_RATE;
    const finish = () => {
      if (token !== moveToken) return;
      showStill(to);
      endMove();
    };
    v.onended = finish;
    v.play().then(() => {
      if (token !== moveToken) { v.pause(); return; }
      v.classList.add('is-live');
      figure.classList.add('is-moving');
      pose(to);
    }).catch(finish);
  }

  /* ---------- product decks ---------- */
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

  let stageVisible = false;
  new IntersectionObserver(([entry]) => {
    stageVisible = entry.isIntersecting;
    decks.forEach(d => d && d.sync());
  }, { threshold: 0.5 }).observe(stage);
  reduced.addEventListener('change', () => decks.forEach(d => d && d.sync()));

  /* ---------- steps ---------- */
  let step = 0;

  function applyStep(next, animate) {
    const prev = step;
    step = next;
    stage.classList.toggle('is-rest', step === 0);
    regions.forEach((r, i) => {
      r.classList.toggle('is-active', i === step);
      r.toggleAttribute('inert', i !== step);
    });
    railButtons.forEach(b => b.setAttribute('aria-current', Number(b.dataset.go) === step));
    const current = railButtons.find(b => Number(b.dataset.go) === step);
    if (current && current.parentElement.scrollWidth > current.parentElement.clientWidth) {
      current.parentElement.scrollTo({ left: current.offsetLeft - current.parentElement.clientWidth / 2 + current.offsetWidth / 2, behavior: reduced.matches ? 'auto' : 'smooth' });
    }
    decks.forEach((d, i) => d && d.setActive(i === step));
    if (animate) movePose(prev, step); else { moveToken++; endMove(); showStill(step); }
    pose(step + 1);
    clip(step);
  }

  const trackTop = () => track.getBoundingClientRect().top + scrollY;
  const trackSpan = () => track.offsetHeight - innerHeight;
  const stepY = i => trackTop() + (i / (STEPS - 1)) * trackSpan();

  function stepFromScroll() {
    const p = (scrollY - trackTop()) / trackSpan();
    return Math.max(0, Math.min(STEPS - 1, Math.round(p * (STEPS - 1))));
  }

  /* ---------- stops and dock ---------- */
  const sections = $$('[data-stop]');
  function stops() {
    const list = [];
    sections.forEach(s => list.push(s.getBoundingClientRect().top + scrollY));
    for (let i = 0; i < STEPS; i++) list.push(stepY(i));
    return list.sort((a, b) => a - b);
  }
  const go = (y, instant) => scrollTo({ top: Math.round(y), behavior: instant || reduced.matches ? 'instant' : 'smooth' });

  const prevBtn = $('[data-nav="prev"]');
  const nextBtn = $('[data-nav="next"]');
  prevBtn.addEventListener('click', () => {
    const y = stops().filter(s => s < scrollY - 8).pop();
    go(y === undefined ? 0 : y);
  });
  nextBtn.addEventListener('click', () => {
    const y = stops().find(s => s > scrollY + 8);
    if (y !== undefined) go(y);
  });

  $$('[data-go]').forEach(b => b.addEventListener('click', () => go(stepY(Number(b.dataset.go)))));

  let ticking = false;
  function onScroll() {
    ticking = false;
    const next = stepFromScroll();
    if (next !== step) applyStep(next, true);
    prevBtn.disabled = scrollY < 8;
    nextBtn.disabled = scrollY + innerHeight >= document.documentElement.scrollHeight - 8;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', onScroll);

  /* ---------- deep links: #region-knee ---------- */
  function fromHash(instant) {
    const target = location.hash && document.querySelector('[data-region="' + CSS.escape(location.hash.slice(1)) + '"]');
    if (target) {
      go(stepY(Number(target.dataset.step)), instant);
      return true;
    }
    return false;
  }
  addEventListener('hashchange', () => fromHash(false));

  /* ---------- hand-drawn underline ---------- */
  const marks = $$('.mark');
  const seen = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-seen'); seen.unobserve(e.target); }
  }), { threshold: 0.6 });
  marks.forEach(m => seen.observe(m));

  /* ---------- start ---------- */
  applyStep(0, false);
  addEventListener('load', () => {
    if (!fromHash(true)) { step = -1; applyStep(stepFromScroll(), false); }
    onScroll();
  });
})();

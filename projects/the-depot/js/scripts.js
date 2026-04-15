/* ============================================================
  THE DEPOT MOTION IDENTITY ENGINE
   1. Lenis Weighted Scroll
   2. Custom Cursor + Expand Ring
   3. Shutter Page Transition
   4. Button Glitch Text Shuffle
   5. Product Card Noise Flash
   6. Clip-Path Header Reveals
   7. Staggered Scroll Reveals
   8. Counter / Data Point Animation
   9. Existing: progress bar, coords, filters, cart
   ============================================================ */

/* ── 1. LENIS WEIGHTED SCROLL ─────────────────────────────── */
const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  mouseMultiplier: 1.0,
});

function lenisRaf(time) {
  lenis.raf(time);
  requestAnimationFrame(lenisRaf);
}
requestAnimationFrame(lenisRaf);

lenis.on('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  if (progressBar) progressBar.style.width = Math.min(100, pct).toFixed(1) + '%';
});

/* ── 2. CURSOR DOT ───────────────────────────────────────── */
(function() {
  const dot = document.getElementById('cursor-dot');
  if (!dot) return;
  let realX = -20, realY = -20;
  let dotX  = -20, dotY  = -20;
  const LAG = 80; // ms
  const queue = [];

  document.addEventListener('mousemove', e => {
    queue.push({ x: e.clientX, y: e.clientY, t: performance.now() });
    realX = e.clientX; realY = e.clientY;
  });

  function renderDot(ts) {
    // Drain queue entries older than LAG
    while (queue.length > 1 && queue[1].t <= ts - LAG) queue.shift();
    if (queue.length) {
      const entry = queue[0];
      // Interpolate between queue[0] and queue[1] if available
      if (queue.length >= 2) {
        const a = queue[0], b = queue[1];
        const lag_t = ts - LAG;
        const t = Math.max(0, Math.min(1, (lag_t - a.t) / (b.t - a.t || 1)));
        dotX = a.x + (b.x - a.x) * t;
        dotY = a.y + (b.y - a.y) * t;
      } else {
        dotX = entry.x; dotY = entry.y;
      }
      dot.style.left = dotX + 'px';
      dot.style.top  = dotY + 'px';
    }
    requestAnimationFrame(renderDot);
  }
  requestAnimationFrame(renderDot);

  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; });
})();

/* ── 3. VENETIAN BLIND TRANSITION ────────────────────────── */
const slats = document.querySelectorAll('.blind-slat');
const SLAT_STAGGER = 55;   // ms between each slat
const SLAT_DUR    = 220;   // ms each slat takes to close/open

function blindIn(cb) {
  if (!slats.length) { if(cb) cb(); return; }
  // Close: slats sweep in left→right, staggered top→bottom
  slats.forEach((s, i) => {
    s.style.transition = 'none';
    s.style.transformOrigin = 'left center';
    s.style.transform = 'scaleX(0)';
  });
  // Force reflow
  slats[0].getBoundingClientRect();

  slats.forEach((s, i) => {
    setTimeout(() => {
      s.style.transition = `transform ${SLAT_DUR}ms cubic-bezier(0.76, 0, 0.24, 1)`;
      s.style.transform = 'scaleX(1)';
    }, i * SLAT_STAGGER);
  });

  const total = SLAT_STAGGER * (slats.length - 1) + SLAT_DUR;
  setTimeout(cb, total);
}

function blindOut() {
  if (!slats.length) return;
  // Open: slats retract right→left, staggered bottom→top
  const reversed = [...slats].reverse();
  reversed.forEach((s, i) => {
    setTimeout(() => {
      s.style.transition = `transform ${SLAT_DUR}ms cubic-bezier(0.76, 0, 0.24, 1)`;
      s.style.transformOrigin = 'right center';
      s.style.transform = 'scaleX(0)';
    }, i * SLAT_STAGGER);
  });
}

// Intercept same-page anchor links (excluding UI toggles like cart)
document.querySelectorAll('a[href^="#"]:not(#cartToggle)').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = a.getAttribute('href');
    blindIn(() => {
      if (target && target !== '#') {
        const el = document.querySelector(target);
        if (el) lenis.scrollTo(el, { immediate: true });
      }
      blindOut();
    });
  });
});

// Fire on initial load
blindOut();

/* ── 4. BUTTON GLITCH TEXT SHUFFLE ───────────────────────── */
const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%&';
const activeIntervals = new WeakMap();

function clearShuffleInterval(el) {
  if (activeIntervals.has(el)) {
    clearInterval(activeIntervals.get(el));
    activeIntervals.delete(el);
  }
}

function shuffleText(el, finalText, duration = 400, onDone) {
  clearShuffleInterval(el);
  const frames = Math.floor(duration / 40);
  let frame = 0;
  const interval = setInterval(() => {
    if (frame >= frames) {
      el.textContent = finalText;
      clearInterval(interval);
      activeIntervals.delete(el);
      if (onDone) onDone();
      return;
    }
    const progress = frame / frames;
    el.textContent = finalText.split('').map((ch, i) => {
      if (ch === ' ') return ' ';
      if (i / finalText.length < progress) return ch;
      return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
    }).join('');
    frame++;
  }, 40);
  activeIntervals.set(el, interval);
}

// Exit: reverse direction — letters dissolve right-to-left back into noise, then snap to original
function shuffleTextExit(el, finalText, duration = 300) {
  clearShuffleInterval(el);
  const frames = Math.floor(duration / 40);
  let frame = 0;
  const interval = setInterval(() => {
    if (frame >= frames) {
      el.textContent = finalText;
      clearInterval(interval);
      activeIntervals.delete(el);
      return;
    }
    const progress = frame / frames;
    el.textContent = finalText.split('').map((ch, i) => {
      if (ch === ' ') return ' ';
      // Exit: right-to-left resolve — tail chars glitch last
      const norm = 1 - (i / finalText.length);
      if (norm < progress) return ch;
      return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
    }).join('');
    frame++;
  }, 40);
  activeIntervals.set(el, interval);
}

document.querySelectorAll('.filter-btn, .pdp-add-btn, .nav-link, .footer-link, .footer-social-link, .footer-nl-btn, .product-quick-add, button').forEach(el => {
  const original = el.textContent.trim();
  el.addEventListener('mouseenter', () => shuffleText(el, original, 300));
  el.addEventListener('mouseleave', () => shuffleTextExit(el, original, 240));
});


/* ── 5. PRODUCT CARD REVEAL EFFECT ───────────────────────── */
(function() {
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    const sim = card.querySelector('.product-img-sim');
    const img = sim ? sim.querySelector('img') : null;
    if (!sim || !img) return;

    // Set background image variable for the B&W base
    sim.style.setProperty('--bg-img', `url("${img.src}")`);
    
    let radius = 0;
    let targetRadius = 0;
    let animId = null;
    let mx = 50, my = 50;

    const animate = () => {
      // Easing factor - 0.05 for a nice gradual spread
      radius += (targetRadius - radius) * 0.05;
      
      const mask = `radial-gradient(circle at ${mx}% ${my}%, #000 0%, #000 ${radius}%, transparent ${radius + 15}%)`;
      img.style.webkitMaskImage = mask;
      img.style.maskImage = mask;
      
      // Continue if moving or if the radius is significant
      if (Math.abs(targetRadius - radius) > 0.1 || (targetRadius === 200 && radius < 199)) {
        animId = requestAnimationFrame(animate);
      } else {
        // Complete the state
        if (targetRadius > 100) {
          img.style.webkitMaskImage = 'none'; // Fully color
          img.style.maskImage = 'none';
        } else {
          img.style.webkitMaskImage = `radial-gradient(circle at ${mx}% ${my}%, #000 0%, transparent 0%)`; // Fully BW
          img.style.maskImage = `radial-gradient(circle at ${mx}% ${my}%, #000 0%, transparent 0%)`;
        }
        animId = null;
      }
    };

    card.addEventListener('mouseenter', (e) => {
      const rect = sim.getBoundingClientRect();
      mx = ((e.clientX - rect.left) / rect.width) * 100;
      my = ((e.clientY - rect.top) / rect.height) * 100;
      targetRadius = 200; 
      if (!animId) animate();
    });

    card.addEventListener('mousemove', (e) => {
      const rect = sim.getBoundingClientRect();
      mx = ((e.clientX - rect.left) / rect.width) * 100;
      my = ((e.clientY - rect.top) / rect.height) * 100;
    });

    card.addEventListener('mouseleave', () => {
      targetRadius = 0;
    });
  });
})();

/* ── 6. CLIP-PATH HEADER REVEALS (IntersectionObserver) ─── */
const clipObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const inners = entry.target.querySelectorAll('.reveal-clip-inner');
      inners.forEach((inner, i) => {
        setTimeout(() => inner.classList.add('revealed'), i * 80);
      });
      clipObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.oversize-header, .oversize-text').forEach(el => clipObserver.observe(el));

/* ── 7. STAGGERED SCROLL REVEALS ─────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.scroll-reveal').forEach((el, i) => {
  // Stagger siblings in same grid
  const siblings = el.parentElement ? [...el.parentElement.children].filter(c => c.classList.contains('scroll-reveal')) : [];
  const idx = siblings.indexOf(el);
  el.style.transitionDelay = `${idx * 0.08}s`;
  revealObserver.observe(el);
});

/* ── 8. DATA COUNTER ANIMATION ───────────────────────────── */
function animateCount(el, end, duration = 600, prefix = '') {
  const start = 0;
  const startTime = performance.now();
  const update = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * end);
    el.textContent = prefix + value.toLocaleString('en-IN');
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = prefix + end.toLocaleString('en-IN');
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const raw = el.getAttribute('data-count');
    const prefix = el.getAttribute('data-prefix') || '';
    if (raw) animateCount(el, parseInt(raw), 700, prefix);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

// Tag prices and scores for counting
document.querySelectorAll('.recently-price, .grail-price, .pdp-price-amount').forEach(el => {
  const txt = el.textContent.replace(/[₹,]/g, '').trim();
  const num = parseInt(txt);
  if (!isNaN(num)) {
    el.setAttribute('data-count', num);
    el.setAttribute('data-prefix', '₹');
    el.textContent = '₹0';
    counterObserver.observe(el);
  }
});

document.querySelectorAll('.grail-score > span').forEach(el => {
  const num = parseInt(el.textContent);
  if (!isNaN(num)) {
    el.setAttribute('data-count', num);
    el.setAttribute('data-prefix', '');
    el.textContent = '0';
    counterObserver.observe(el);
  }
});

/* ── SCORE BAR FILL ANIMATION ─────────────────────────────── */
const scoreBarObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const fill = entry.target;
    const finalWidth = fill.getAttribute('data-width');
    if (finalWidth) {
      setTimeout(() => { fill.style.width = finalWidth; }, 120);
    }
    scoreBarObserver.unobserve(fill);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.score-bar-fill').forEach(fill => {
  const w = fill.style.width || '0%';
  fill.setAttribute('data-width', w);
  fill.style.width = '0';
  scoreBarObserver.observe(fill);
});

/* ── 9. EXISTING: progress bar, filter btns, cart ─────────── */
const progressBar = document.getElementById('progressBar');

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

const pdpAddBtn = document.querySelector('.pdp-add-btn');
if (pdpAddBtn) {
  pdpAddBtn.addEventListener('click', function() {
    const original = this.getAttribute('data-label') || this.textContent;
    this.textContent = 'ADDED TO CART ✓';
    this.style.background = 'var(--orange)';
    this.style.borderColor = 'var(--orange)';
    setTimeout(() => {
      this.textContent = original;
      this.style.background = 'var(--black)';
      this.style.borderColor = 'var(--black)';
    }, 2000);
  });
}

/* ── SEARCH BAR ───────────────────────────────────────────── */
const searchToggle = document.getElementById('searchToggle');
const searchInput  = document.getElementById('searchInput');
if (searchToggle && searchInput) {
  searchToggle.addEventListener('click', () => {
    searchInput.classList.toggle('open');
    searchInput.classList.contains('open') ? searchInput.focus() : (searchInput.blur(), searchInput.value = '');
  });
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Escape') { searchInput.classList.remove('open'); searchInput.value = ''; }
  });
}

/* ── CART TOGGLE & CLICK-OUTSIDE ─────────────────────────── */
(function() {
  const cartToggle   = document.getElementById('cartToggle');
  const cartDropdown = document.getElementById('cartDropdown');
  if (!cartToggle || !cartDropdown) return;

  cartToggle.addEventListener('click', (e) => {
    e.preventDefault();
    cartDropdown.classList.toggle('open');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!cartDropdown.contains(e.target) && !cartToggle.contains(e.target)) {
      cartDropdown.classList.remove('open');
    }
  });

  // Also close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cartDropdown.classList.remove('open');
  });
})();

/* ── PDP THUMBNAIL CLICK & AUTO-SLIDE ─────────────────────── */
(function() {
  const thumbs   = document.querySelectorAll('.pdp-thumb');
  const mainImg  = document.getElementById('pdpMainImage');
  if (!thumbs.length || !mainImg) return;

  let currentIndex = 0;
  let autoSlideInterval = null;

  function setActive(index) {
    const thumb = thumbs[index];
    mainImg.src = thumb.dataset.full || thumb.src;
    thumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    currentIndex = index;
  }

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      setActive(index);
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    });
  });

  autoSlideInterval = setInterval(() => {
    let nextIndex = (currentIndex + 1) % thumbs.length;
    setActive(nextIndex);
  }, 4000);
})();

/* ── LIQUID HERO EFFECT (WebGL) ──────────────────────────── */
(function() {

const VERT = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAG = `
  precision highp float;
  varying vec2 v_uv;
  uniform sampler2D u_image;
  uniform vec2      u_mouse;
  uniform float     u_time;
  uniform float     u_strength;
  uniform float     u_speed;
  uniform float     u_maskRadius;

  #define MAX_WAKE 8
  uniform int   u_wakeCount;
  uniform vec3  u_wake[MAX_WAKE];

  void main() {
    vec2 uv = v_uv;

    // Wake trail ripples
    for (int i = 0; i < MAX_WAKE; i++) {
      if (i >= u_wakeCount) break;
      vec2  w    = u_wake[i].xy;
      float age  = u_time - u_wake[i].z;
      float dist = distance(uv, w);
      float amp  = exp(-dist * 16.0) * exp(-age * 1.2);
      float ripple = sin(32.0 * dist - age * 8.0 * u_speed) * 0.04;
      vec2 dir = normalize(uv - w);
      uv += dir * ripple * u_strength * amp * 2.0;
    }

    // Live mouse ripple
    if (u_mouse.x >= 0.0 && u_mouse.x <= 1.0 &&
        u_mouse.y >= 0.0 && u_mouse.y <= 1.0) {
      float dist   = distance(uv, u_mouse);
      float ripple = sin(32.0 * dist - u_time * 8.0 * u_speed) * 0.04;
      float effect = exp(-dist * 12.0);
      vec2 dir = normalize(uv - u_mouse);
      uv += dir * ripple * u_strength * effect * 2.0;
    }

    uv = clamp(uv, 0.0, 1.0);
    vec4 color = texture2D(u_image, uv);

    // Grayscale
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));

    // Color reveal mask — spreads out from cursor
    float mask = 0.0;
    if (u_mouse.x >= 0.0 && u_mouse.x <= 1.0 &&
        u_mouse.y >= 0.0 && u_mouse.y <= 1.0 && u_maskRadius > 0.0) {
      float d = distance(uv, u_mouse);
      mask = max(mask, smoothstep(u_maskRadius, u_maskRadius * 0.8, d));
    }
    for (int i = 0; i < MAX_WAKE; i++) {
      if (i >= u_wakeCount) break;
      float d = distance(uv, u_wake[i].xy);
      mask = max(mask, smoothstep(u_maskRadius, u_maskRadius * 0.8, d));
    }

    vec3 finalColor = mix(vec3(gray), color.rgb, mask);
    gl_FragColor = vec4(finalColor, color.a);
  }
`;


class HeroLiquid {
  constructor(canvas) {
    this.canvas    = canvas;
    this.dpr       = window.devicePixelRatio || 1;
    this.mouse     = { x: -10, y: -10, active: false };
    this.wake      = [];
    this.hovered   = false;
    this.maskRadius = 0;
    this.startTime = performance.now();
    this.loaded    = false;
    this.animId    = null;

    this._initGL();
    this._loadImage();
    this._bindEvents();
    this._watchResize();
    this._animateMask();
  }

  _initGL() {
    const gl = this.canvas.getContext('webgl');
    if (!gl) return;
    this.gl = gl;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    this.prog = prog;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    this.u = {
      time:       gl.getUniformLocation(prog, 'u_time'),
      mouse:      gl.getUniformLocation(prog, 'u_mouse'),
      strength:   gl.getUniformLocation(prog, 'u_strength'),
      speed:      gl.getUniformLocation(prog, 'u_speed'),
      maskRadius: gl.getUniformLocation(prog, 'u_maskRadius'),
      wake:       gl.getUniformLocation(prog, 'u_wake'),
      wakeCount:  gl.getUniformLocation(prog, 'u_wakeCount'),
      image:      gl.getUniformLocation(prog, 'u_image'),
    };

    this.tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.activeTexture(gl.TEXTURE0);
    gl.uniform1i(this.u.image, 0);
  }

  _loadImage() {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      this.img = img;
      this._resize();
      this._uploadTexture();
      this.loaded = true;
      this._render();
    };
    img.onerror = () => {
      // Fallback: draw a dark placeholder so canvas isn't blank
      const off = document.createElement('canvas');
      off.width = 900; off.height = 1200;
      const ctx = off.getContext('2d');
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, 900, 1200);
      off.naturalWidth = 900; off.naturalHeight = 1200;
      this.img = off;
      this._resize();
      this._uploadTexture();
      this.loaded = true;
      this._render();
    };
    img.src = 'images/hero-left.jpg';
  }

  _uploadTexture() {
    const { gl, tex, img, canvas } = this;
    if (!img) return;
    const w = canvas.width, h = canvas.height;
    if (w === 0 || h === 0) return;
    const off = document.createElement('canvas');
    off.width = w; off.height = h;
    const ctx = off.getContext('2d');
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    const scale = Math.max(w / iw, h / ih);
    const sw = iw * scale, sh = ih * scale;
    const sx = (w - sw) / 2, sy = (h - sh) / 2;
    ctx.drawImage(img, sx, sy, sw, sh);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, off);
  }

  _resize() {
    const { canvas, dpr, gl } = this;
    const w = Math.round(canvas.offsetWidth  * dpr);
    const h = Math.round(canvas.offsetHeight * dpr);
    if (w === 0 || h === 0) return;
    canvas.width  = w;
    canvas.height = h;
    if (gl) gl.viewport(0, 0, w, h);
    if (this.loaded) this._uploadTexture();
  }

  _render() {
    if (!this.loaded || !this.gl) return;
    const { gl, u, canvas, startTime, mouse, wake } = this;    const t = (performance.now() - startTime) / 1000;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(u.time, t);
    gl.uniform1f(u.strength, 0.15 * 2.5);
    gl.uniform1f(u.speed, 0.18);
    gl.uniform1f(u.maskRadius, this.maskRadius);

    const mx = mouse.active ? mouse.x : -10;
    const my = mouse.active ? 1 - mouse.y : -10;
    gl.uniform2f(u.mouse, mx, my);

    const cutoff = performance.now() - 1200;
    this.wake = wake.filter(w => w.t > cutoff).slice(-8);
    const wakeData = new Float32Array(8 * 3);
    this.wake.forEach((w, i) => {
      wakeData[i*3+0] = w.x;
      wakeData[i*3+1] = 1 - w.y;
      wakeData[i*3+2] = (w.t - startTime) / 1000;
    });
    gl.uniform1i(u.wakeCount, this.wake.length);
    gl.uniform3fv(u.wake, wakeData);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    this.animId = requestAnimationFrame(() => this._render());
  }

  _animateMask() {
    let lastHovered = false, from = 0, to = 0, start = null;
    const dur = 650;
    const ease = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
    const step = (ts) => {
      if (this.hovered !== lastHovered) {
        lastHovered = this.hovered;
        from  = this.maskRadius;
        to    = this.hovered ? 1.5 : 0;
        start = ts;
      }
      if (start !== null) {
        const elapsed = Math.min((ts - start) / dur, 1);
        this.maskRadius = from + (to - from) * ease(elapsed);
      }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  _bindEvents() {
    const el = this.canvas.parentElement;
    const onMove = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      let cx = e.touches ? e.touches[0].clientX : e.clientX;
      let cy = e.touches ? e.touches[0].clientY : e.clientY;
      const x = Math.max(0, Math.min(1, (cx - rect.left)  / rect.width));
      const y = Math.max(0, Math.min(1, (cy - rect.top)   / rect.height));
      this.mouse  = { x, y, active: true };
      this.hovered = true;
      this.wake.push({ x, y, t: performance.now() });
    };
    const onLeave = () => { this.mouse = { ...this.mouse, active: false }; this.hovered = false; };
    el.addEventListener('mousemove',  onMove);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('touchmove',  onMove, { passive: true });
    el.addEventListener('touchend',   onLeave);
  }

  _watchResize() {
    const ro = new ResizeObserver(() => this._resize());
    ro.observe(this.canvas.parentElement);
  }
}

// Boot
const heroCanvas = document.getElementById('heroLiquidCanvas');
if (heroCanvas) new HeroLiquid(heroCanvas);
})();

// ============ HERO HEIGHT OFFSET ============
(function() {
  const root = document.documentElement;
  const ticker = document.querySelector('.ticker');
  const nav = document.querySelector('nav');
  if (!nav) return;

  const updateHeroOffset = () => {
    const tickerHeight = ticker ? ticker.getBoundingClientRect().height : 0;
    const navHeight = nav.getBoundingClientRect().height;
    root.style.setProperty('--hero-offset', `${Math.ceil(tickerHeight + navHeight)}px`);
  };

  updateHeroOffset();
  window.addEventListener('resize', updateHeroOffset, { passive: true });
  window.addEventListener('load', updateHeroOffset, { passive: true });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(updateHeroOffset);
  }
})();

// ============ DROP ROW HOVER → STAGGERED UPWARD HERO STRIP ============
(function() {
  const dropItems = document.querySelectorAll('.drop-item[data-img1]');
  const imgStrip = document.getElementById('heroDropImages');
  if (!imgStrip || !dropItems.length) return;

  const cells = Array.from(imgStrip.querySelectorAll('.hero-drop-img-cell')).map(cell => ({
    stage: cell.querySelector('.hero-drop-img-stage'),
    label: cell.querySelector('.hero-drop-img-label'),
    ref: cell.querySelector('.hero-drop-img-ref')
  }));

  let activeKey = '';

  function updateStripForRow(row) {
    const states = [
      { src: row.dataset.img1, label: row.dataset.label1, ref: row.dataset.ref1 },
      { src: row.dataset.img2, label: row.dataset.label2, ref: row.dataset.ref2 },
      { src: row.dataset.img3, label: row.dataset.label3, ref: row.dataset.ref3 },
    ];

    states.forEach((state, index) => {
      const cell = cells[index];
      const stage = cell.stage;
      const currentImg = stage.querySelector('.active-img');

      // Avoid re-animating if it's the same image sequence triggering
      if (currentImg && currentImg.getAttribute('src') === state.src) return;

      // Spawn new image dynamically
      const newImg = document.createElement('img');
      newImg.src = state.src;
      newImg.className = 'hero-drop-img-layer';
      newImg.style.transform = 'translate3d(0, 100%, 0)';
      newImg.style.transition = `transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${index * 80}ms`;
      newImg.style.zIndex = '2';

      stage.appendChild(newImg);

      // Stagger text sync
      setTimeout(() => {
        cell.label.textContent = state.label;
        cell.ref.textContent = state.ref;
      }, index * 80 + 300);

      // Force layout reflow
      void newImg.offsetWidth;

      // Swap and destroy old image
      if (currentImg) {
        currentImg.style.transition = `transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${index * 80}ms`;
        currentImg.style.transform = 'translate3d(0, -100%, 0)';
        currentImg.classList.remove('active-img');
        setTimeout(() => {
            if(currentImg.parentNode) currentImg.remove()
        }, index * 80 + 700);
      }

      newImg.style.transform = 'translate3d(0, 0, 0)';
      newImg.classList.add('active-img');
    });
  }

  dropItems.forEach(row => {
    row.addEventListener('mouseenter', () => {
      const nextKey = [
        row.dataset.img1, row.dataset.img2, row.dataset.img3,
        row.dataset.label1, row.dataset.label2, row.dataset.label3,
        row.dataset.ref1, row.dataset.ref2, row.dataset.ref3,
      ].join('|');

      if (nextKey === activeKey) return;
      activeKey = nextKey;
      updateStripForRow(row);
    });
  });
})();

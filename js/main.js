var t,e;t=this,e=function(){function t(t,e,i){return Math.max(t,Math.min(e,i))}class Animate{advance(e){if(!this.isRunning)return;let i=!1;if(this.lerp)this.value=(s=this.value,o=this.to,n=60*this.lerp,l=e,function(t,e,i){return(1-i)*t+i*e}(s,o,1-Math.exp(-n*l))),Math.round(this.value)===this.to&&(this.value=this.to,i=!0);else{this.currentTime+=e;const s=t(0,this.currentTime/this.duration,1);i=s>=1;const o=i?1:this.easing(s);this.value=this.from+(this.to-this.from)*o}var s,o,n,l;this.onUpdate?.(this.value,i),i&&this.stop()}stop(){this.isRunning=!1}fromTo(t,e,{lerp:i=.1,duration:s=1,easing:o=(t=>t),onStart:n,onUpdate:l}){this.from=this.value=t,this.to=e,this.lerp=i,this.duration=s,this.easing=o,this.currentTime=0,this.isRunning=!0,n?.(),this.onUpdate=l}}class Dimensions{constructor({wrapper:t,content:e,autoResize:i=!0,debounce:s=250}={}){this.wrapper=t,this.content=e,i&&(this.debouncedResize=function(t,e){let i;return function(){let s=arguments,o=this;clearTimeout(i),i=setTimeout((function(){t.apply(o,s)}),e)}}(this.resize,s),this.wrapper===window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),window.removeEventListener("resize",this.debouncedResize,!1)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper===window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper===window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}}class Emitter{constructor(){this.events={}}emit(t,...e){let i=this.events[t]||[];for(let t=0,s=i.length;t<s;t++)i[t](...e)}on(t,e){return this.events[t]?.push(e)||(this.events[t]=[e]),()=>{this.events[t]=this.events[t]?.filter((t=>e!==t))}}off(t,e){this.events[t]=this.events[t]?.filter((t=>e!==t))}destroy(){this.events={}}}const e=100/6;class VirtualScroll{constructor(t,{wheelMultiplier:e=1,touchMultiplier:i=1}){this.element=t,this.wheelMultiplier=e,this.touchMultiplier=i,this.touchStart={x:null,y:null},this.emitter=new Emitter,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,{passive:!1}),this.element.addEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.addEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.addEventListener("touchend",this.onTouchEnd,{passive:!1})}on(t,e){return this.emitter.on(t,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,{passive:!1}),this.element.removeEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.removeEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.removeEventListener("touchend",this.onTouchEnd,{passive:!1})}onTouchStart=t=>{const{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:t})};onTouchMove=t=>{const{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t,s=-(e-this.touchStart.x)*this.touchMultiplier,o=-(i-this.touchStart.y)*this.touchMultiplier;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:s,y:o},this.emitter.emit("scroll",{deltaX:s,deltaY:o,event:t})};onTouchEnd=t=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:t})};onWheel=t=>{let{deltaX:i,deltaY:s,deltaMode:o}=t;i*=1===o?e:2===o?this.windowWidth:1,s*=1===o?e:2===o?this.windowHeight:1,i*=this.wheelMultiplier,s*=this.wheelMultiplier,this.emitter.emit("scroll",{deltaX:i,deltaY:s,event:t})};onWindowResize=()=>{this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight}}return class Lenis{constructor({wrapper:t=window,content:e=document.documentElement,wheelEventsTarget:i=t,eventsTarget:s=i,smoothWheel:o=!0,syncTouch:n=!1,syncTouchLerp:l=.075,touchInertiaMultiplier:r=35,duration:h,easing:a=(t=>Math.min(1,1.001-Math.pow(2,-10*t))),lerp:c=!h&&.1,infinite:d=!1,orientation:p="vertical",gestureOrientation:u="vertical",touchMultiplier:m=1,wheelMultiplier:g=1,autoResize:v=!0,__experimental__naiveDimensions:S=!1}={}){this.__isSmooth=!1,this.__isScrolling=!1,this.__isStopped=!1,this.__isLocked=!1,this.onVirtualScroll=({deltaX:t,deltaY:e,event:i})=>{if(i.ctrlKey)return;const s=i.type.includes("touch"),o=i.type.includes("wheel");if(this.options.syncTouch&&s&&"touchstart"===i.type&&!this.isStopped&&!this.isLocked)return void this.reset();const n=0===t&&0===e,l="vertical"===this.options.gestureOrientation&&0===e||"horizontal"===this.options.gestureOrientation&&0===t;if(n||l)return;let r=i.composedPath();if(r=r.slice(0,r.indexOf(this.rootElement)),r.find((t=>{var e,i,n,l,r;return(null===(e=t.hasAttribute)||void 0===e?void 0:e.call(t,"data-lenis-prevent"))||s&&(null===(i=t.hasAttribute)||void 0===i?void 0:i.call(t,"data-lenis-prevent-touch"))||o&&(null===(n=t.hasAttribute)||void 0===n?void 0:n.call(t,"data-lenis-prevent-wheel"))||(null===(l=t.classList)||void 0===l?void 0:l.contains("lenis"))&&!(null===(r=t.classList)||void 0===r?void 0:r.contains("lenis-stopped"))})))return;if(this.isStopped||this.isLocked)return void i.preventDefault();if(this.isSmooth=this.options.syncTouch&&s||this.options.smoothWheel&&o,!this.isSmooth)return this.isScrolling=!1,void this.animate.stop();i.preventDefault();let h=e;"both"===this.options.gestureOrientation?h=Math.abs(e)>Math.abs(t)?e:t:"horizontal"===this.options.gestureOrientation&&(h=t);const a=s&&this.options.syncTouch,c=s&&"touchend"===i.type&&Math.abs(h)>5;c&&(h=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+h,Object.assign({programmatic:!1},a?{lerp:c?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}))},this.onNativeScroll=()=>{if(!this.__preventNextScrollEvent&&!this.isScrolling){const t=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.direction=Math.sign(this.animatedScroll-t),this.emit()}},window.lenisVersion="1.0.42",t!==document.documentElement&&t!==document.body||(t=window),this.options={wrapper:t,content:e,wheelEventsTarget:i,eventsTarget:s,smoothWheel:o,syncTouch:n,syncTouchLerp:l,touchInertiaMultiplier:r,duration:h,easing:a,lerp:c,infinite:d,gestureOrientation:u,orientation:p,touchMultiplier:m,wheelMultiplier:g,autoResize:v,__experimental__naiveDimensions:S},this.animate=new Animate,this.emitter=new Emitter,this.dimensions=new Dimensions({wrapper:t,content:e,autoResize:v}),this.toggleClassName("lenis",!0),this.velocity=0,this.isLocked=!1,this.isStopped=!1,this.isSmooth=n||o,this.isScrolling=!1,this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.virtualScroll=new VirtualScroll(s,{touchMultiplier:m,wheelMultiplier:g}),this.virtualScroll.on("scroll",this.onVirtualScroll)}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.toggleClassName("lenis",!1),this.toggleClassName("lenis-smooth",!1),this.toggleClassName("lenis-scrolling",!1),this.toggleClassName("lenis-stopped",!1),this.toggleClassName("lenis-locked",!1)}on(t,e){return this.emitter.on(t,e)}off(t,e){return this.emitter.off(t,e)}setScroll(t){this.isHorizontal?this.rootElement.scrollLeft=t:this.rootElement.scrollTop=t}resize(){this.dimensions.resize()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.isStopped=!1,this.reset())}stop(){this.isStopped||(this.isStopped=!0,this.animate.stop(),this.reset())}raf(t){const e=t-(this.time||t);this.time=t,this.animate.advance(.001*e)}scrollTo(e,{offset:i=0,immediate:s=!1,lock:o=!1,duration:n=this.options.duration,easing:l=this.options.easing,lerp:r=!n&&this.options.lerp,onComplete:h,force:a=!1,programmatic:c=!0}={}){if(!this.isStopped&&!this.isLocked||a){if(["top","left","start"].includes(e))e=0;else if(["bottom","right","end"].includes(e))e=this.limit;else{let t;if("string"==typeof e?t=document.querySelector(e):(null==e?void 0:e.nodeType)&&(t=e),t){if(this.options.wrapper!==window){const t=this.options.wrapper.getBoundingClientRect();i-=this.isHorizontal?t.left:t.top}const s=t.getBoundingClientRect();e=(this.isHorizontal?s.left:s.top)+this.animatedScroll}}if("number"==typeof e){if(e+=i,e=Math.round(e),this.options.infinite?c&&(this.targetScroll=this.animatedScroll=this.scroll):e=t(0,e,this.limit),s)return this.animatedScroll=this.targetScroll=e,this.setScroll(this.scroll),this.reset(),void(null==h||h(this));if(!c){if(e===this.targetScroll)return;this.targetScroll=e}this.animate.fromTo(this.animatedScroll,e,{duration:n,easing:l,lerp:r,onStart:()=>{o&&(this.isLocked=!0),this.isScrolling=!0},onUpdate:(t,e)=>{this.isScrolling=!0,this.velocity=t-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=t,this.setScroll(this.scroll),c&&(this.targetScroll=t),e||this.emit(),e&&(this.reset(),this.emit(),null==h||h(this),this.__preventNextScrollEvent=!0,requestAnimationFrame((()=>{delete this.__preventNextScrollEvent})))}})}}}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return"horizontal"===this.options.orientation}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?(t=this.animatedScroll,e=this.limit,(t%e+e)%e):this.animatedScroll;var t,e}get progress(){return 0===this.limit?1:this.scroll/this.limit}get isSmooth(){return this.__isSmooth}set isSmooth(t){this.__isSmooth!==t&&(this.__isSmooth=t,this.toggleClassName("lenis-smooth",t))}get isScrolling(){return this.__isScrolling}set isScrolling(t){this.__isScrolling!==t&&(this.__isScrolling=t,this.toggleClassName("lenis-scrolling",t))}get isStopped(){return this.__isStopped}set isStopped(t){this.__isStopped!==t&&(this.__isStopped=t,this.toggleClassName("lenis-stopped",t))}get isLocked(){return this.__isLocked}set isLocked(t){this.__isLocked!==t&&(this.__isLocked=t,this.toggleClassName("lenis-locked",t))}get className(){let t="lenis";return this.isStopped&&(t+=" lenis-stopped"),this.isLocked&&(t+=" lenis-locked"),this.isScrolling&&(t+=" lenis-scrolling"),this.isSmooth&&(t+=" lenis-smooth"),t}toggleClassName(t,e){this.rootElement.classList.toggle(t,e),this.emitter.emit("className change",this)}}},"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).Lenis=e();

const __IMAGES__ = {
  "hero-1": "#C8855A", "hero-2": "#2C4A3E", "hero-3": "#8B7355", "hero-4": "#1B3A6B",
  "hero-5": "#C9A84C", "hero-6": "#B01020", "hero-7": "#1A4F6E", "hero-8": "#3D2252",
  "vedore-01": "#1A1A1A", "vedore-02": "#2D2D2D", "vedore-03": "#3A2A1A",
  "vedore-04": "#1A1A1A", "vedore-04b": "#2A1A0A", "vedore-05": "#0D2010",
  "vedore-05b": "#0A1A0D", "vedore-06": "#1A1A1A", "vedore-07": "#2A2010",
  "vedore-08": "#1A0A0A", "vedore-09": "#0D1A20", "vedore-10": "#1A1A1A",
  "vedore-11": "#2D2D2D", "vedore-12": "#1A2A1A", "vedore-13": "#2A1A1A",
  "vedore-14": "#1A1A2A", "vedore-15": "#2A2A1A",
  "vedore-brief-01": "#1C1C2E",
  "vedore-cover-b": "#C4A882", "vedore-cover-c": "#E8DDD0", "vedore-cover-main": "#F5F0E8",
  "vedore-result-01": "#062A23", "vedore-result-02": "#F7DCB5", "vedore-result-03": "#111111",
  "vedore-strat-01": "#1A2A1A", "vedore-strat-02": "#2A1A0A",
  "seven-yards-result-01": "#C8D8C0", "seven-yards-result-02": "#D4C9B0", "seven-yards-result-03": "#E8E0D0",
  "seven-yards-cover-main": "#C8D8C0", "seven-yards-cover-b": "#D4C9B0", "seven-yards-cover-c": "#D4C9B0",
  "seven-yards-overview-01": "#C8D8C0", "seven-yards-overview-02": "#E8E0D4",
  "seven-yards-campaign-01": "#2C4A3E", "seven-yards-campaign-02": "#3D5E50", "seven-yards-campaign-03": "#4A7060",
  "seven-yards-web-portrait": "#2C4A3E", "seven-yards-web-landscape": "#D4C9B0",
  "seven-yards-grid-01": "#E8E0D0", "seven-yards-grid-02": "#D4C9B0", "seven-yards-grid-03": "#2C4A3E",
  "seven-yards-email-01": "#F0EDEA", "seven-yards-email-02": "#E8E0D0",
  "seven-yards-content-01": "#2C4A3E", "seven-yards-content-02": "#D4C9B0",
  "lands-cover-main": "#D6CCB8", "lands-cover-b": "#E8E0D0", "lands-cover-c": "#C8D4DC",
  "lands-overview-01": "#D6CCB8", "lands-overview-02": "#E8E0D0",
  "lands-brand-palette": "#E8E0D0", "lands-brand-type": "#F5F1EB",
  "lands-web-01": "#C8D4DC", "lands-web-02": "#E8E0D0", "lands-web-03": "#D6CCB8",
  "lands-content-01": "#E8E0D0", "lands-content-02": "#F5F1EB",
  "lands-social-01": "#D6CCB8", "lands-social-02": "#C8D4DC",
  "lands-result-01": "#D6CCB8", "lands-result-02": "#C8D4DC", "lands-result-03": "#E8E0D0"
};

// Helper: resolve an image key to a CSS background value (colour placeholder)
function __imgBg__(key) {
  const color = __IMAGES__[key];
  return color ? color : '#BBBBBB';
}

// ── GRAIN ────────────────────────────────────────────────────────
(function() {
  const canvas = document.getElementById('grain');
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, f = 0;
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  (function tick() { requestAnimationFrame(tick); if (++f % 3) return; if (!W || !H) return; const img = ctx.createImageData(W,H); const d=img.data; for(let i=0;i<d.length;i+=4){const v=(Math.random()*255)|0;d[i]=d[i+1]=d[i+2]=v;d[i+3]=255;} ctx.putImageData(img,0,0); })();
})();

// ── LENIS SMOOTH SCROLL ─────────────────────────────────────────
const lenis = new Lenis({
  duration: 1.4,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

gsap.registerPlugin(ScrollTrigger);
// Drive Lenis exclusively through GSAP ticker — prevents double-RAF jitter
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
// Keep ScrollTrigger in sync with Lenis scroll position
lenis.on('scroll', ScrollTrigger.update);

// ── HELPERS: word split animation ───────────────────────────────
function splitWords(el) {
  if (!el || el.dataset.split) return;
  el.dataset.split = '1';
  const raw = el.innerHTML;
  el.innerHTML = raw.split(/(<br\s*\/?>)/i).map(chunk => {
    if (/^<br/i.test(chunk)) return chunk;
    // Preserve any chunk that contains HTML tags (e.g. scratch SVGs, spans)
    if (/<[a-z]/i.test(chunk)) return chunk;
    return chunk.split(/\s+/).filter(Boolean).map(w =>
      `<span class="sw"><span class="si">${w}</span></span>`
    ).join(' ');
  }).join('');
}
function animWords(el, trigger, opts = {}) {
  if (!el) return;
  splitWords(el);
  gsap.from(el.querySelectorAll('.si'), {
    y: '110%', opacity: 0,
    duration: opts.dur || 0.9, ease: opts.ease || 'expo.out',
    stagger: opts.stagger || 0.06,
    scrollTrigger: { trigger: trigger || el, start: opts.start || 'top 82%' },
    delay: opts.delay || 0,
  });
}

function splitChars(el) {
  if (!el || el.dataset.splitChars) return;
  el.dataset.splitChars = '1';

  // Walk through all child nodes and split text nodes while preserving elements
  function splitNode(node) {
    if (node.nodeType === 3) { // Text node
      const text = node.textContent;
      const fragment = document.createDocumentFragment();
      text.split('').forEach(c => {
        const span = document.createElement('span');
        span.className = 'sc';
        span.style.cssText = 'display:inline-block; transform:translateY(110%); opacity:0;';
        span.textContent = c === ' ' ? '\u00A0' : c;
        fragment.appendChild(span);
      });
      node.parentNode.replaceChild(fragment, node);
    } else if (node.nodeType === 1) { // Element node
      Array.from(node.childNodes).forEach(splitNode);
    }
  }

  Array.from(el.childNodes).forEach(splitNode);
}

function animChars(el, trigger, opts = {}) {
  if (!el) return;
  splitChars(el);
  gsap.to(el.querySelectorAll('.sc'), {
    y: '0%', opacity: 1,
    duration: opts.dur || 1.1, ease: opts.ease || 'expo.out',
    stagger: opts.stagger || 0.02,
    scrollTrigger: { trigger: trigger || el, start: opts.start || 'top 85%' },
    delay: opts.delay || 0,
  });
}

// ── SHARED HSCROLL STATE ────────────────────────────────────────
// Lifted to script scope so both the hscroll IIFE and the case-study
// IIFE read/write the same values — no implicit globals, no window._.
const CS = { activeHscroll: null, target: 0, current: 0, raf: null };

// ── CURSOR (ROBOT) ──────────────────────────────────────────────
(function() {
  const cursor       = document.getElementById('robot-cursor');
  const shadow       = document.getElementById('robot-shadow');
  const head         = document.getElementById('head');
  const bodyWrapper  = document.getElementById('body-wrapper');
  const faceScreen   = document.getElementById('face-screen');
  const antenna      = document.getElementById('antenna');
  const earL         = document.getElementById('ear-l');
  const earR         = document.getElementById('ear-r');
  const expContainer = document.getElementById('exp-container');
  const bootText     = document.getElementById('boot-text');
  const screenMsg    = document.getElementById('screen-msg');

  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let rigidX = mouseX, rigidY = mouseY;
  let innerX = 0, innerY = 0, velX = 0, velY = 0;
  let lastMoveTime  = Date.now();
  let isOverriding  = false, isBooting = true;
  // screenMode: 'normal' | 'text' | 'pointer' | 'type'
  let screenMode    = 'normal';
  let currentTarget = null;

  const faces = ['face-happy', 'face-neutral', 'face-sleep', 'face-focus'];

  // ── helpers ──────────────────────────────────────────
  function setExpression(faceClass, override = false) {
    if (override) isOverriding = true;
    faces.forEach(f => expContainer.classList.remove(f));
    expContainer.classList.add(faceClass);
  }

  function showEyes() {
    expContainer.classList.remove('hidden');
    faceScreen.classList.remove('mode-pointer', 'mode-type');
    screenMsg.classList.remove('active');
    faceScreen.classList.remove('is-scanning');
    currentTarget = null;
  }

  function enterTextMode(msg, target) {
    screenMode   = 'text';
    currentTarget = target ? target.getBoundingClientRect() : null;
    faceScreen.classList.add('is-scanning');
    faceScreen.classList.remove('mode-pointer', 'mode-type');
    expContainer.classList.add('hidden');
    screenMsg.innerText = msg;
    screenMsg.classList.add('active');
  }

  function exitTextMode() {
    screenMode = 'normal';
    showEyes();
    setExpression('face-neutral');
  }

  function enterPointerMode() {
    if (screenMode === 'text') return;
    screenMode = 'pointer';
    expContainer.classList.add('hidden');
    screenMsg.classList.remove('active');
    faceScreen.classList.remove('mode-type');
    faceScreen.classList.add('mode-pointer');
  }

  function exitPointerMode() {
    if (screenMode !== 'pointer') return;
    screenMode = 'normal';
    showEyes();
    setExpression('face-neutral');
  }

  function enterTypeMode() {
    if (screenMode === 'text') return;
    screenMode = 'type';
    expContainer.classList.add('hidden');
    screenMsg.classList.remove('active');
    faceScreen.classList.remove('mode-pointer');
    faceScreen.classList.add('mode-type');
  }

  function exitTypeMode() {
    if (screenMode !== 'type') return;
    screenMode = 'normal';
    showEyes();
    setExpression('face-neutral');
  }

  // ── specific text-mode hover registrations ────────────
  function addRobotHover(selector, msg) {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (isBooting) return;
        enterTextMode(msg, el);
      });
      el.addEventListener('mouseleave', () => {
        if (isBooting) return;
        exitTextMode();
      });
    });
  }

  // named hovers
  addRobotHover('.work-row[data-slug]', 'VIEW');
  addRobotHover('.cl-box',              'VISIT');
  addRobotHover('.hscroll-img[data-photo]', 'VIEW');
  addRobotHover('.lab-card',            'OPEN');

  // sidebar elements
  addRobotHover('#sb-logo',   'HI!');
  addRobotHover('#sb-resume', 'RÉSUMÉ');
  addRobotHover('#sb-lab',    'LAB');
  addRobotHover('#sb-talk',   'CONTACT');

  // ── pointer mode: general buttons & links ─────────────
  // Selectors that already have dedicated text hovers — skip them
  const skipPointer = '.work-row[data-slug], .cl-box, .hscroll-img[data-photo], .lab-card, #sb-logo, #sb-resume, #sb-lab, #sb-talk';

  document.addEventListener('mouseover', e => {
    if (isBooting) return;
    const el = e.target.closest('button, a[href], [role="button"]');
    if (!el || el.closest('#robot-cursor') || el.closest(skipPointer)) return;
    enterPointerMode();
  });
  document.addEventListener('mouseout', e => {
    if (isBooting) return;
    const el = e.target.closest('button, a[href], [role="button"]');
    if (!el || el.closest('#robot-cursor') || el.closest(skipPointer)) return;
    exitPointerMode();
  });

  // ── type mode: inputs & textareas ─────────────────────
  document.addEventListener('mouseover', e => {
    if (isBooting) return;
    if (e.target.closest('input, textarea')) enterTypeMode();
  });
  document.addEventListener('mouseout', e => {
    if (isBooting) return;
    if (e.target.closest('input, textarea')) exitTypeMode();
  });

  // ── click animation ───────────────────────────────────
  window.addEventListener('mousedown', () => {
    if (isBooting) return;
    faceScreen.classList.add('is-clicked');
    bodyWrapper.style.transform = 'scale(0.88) translateZ(-20px)';
    earL.style.transform = 'translateX(-4px) rotate(-15deg)';
    earR.style.transform = 'translateX(4px) rotate(15deg)';
  });
  window.addEventListener('mouseup', () => {
    faceScreen.classList.remove('is-clicked');
    bodyWrapper.style.transform = '';
    earL.style.transform = '';
    earR.style.transform = '';
  });

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    lastMoveTime = Date.now();
    if (screenMode === 'normal' && !isOverriding && !isBooting) setExpression('face-neutral');
  }, { passive: true });

  // ── main animation loop ───────────────────────────────
  function update() {
    rigidX += (mouseX - rigidX) * 0.16;
    rigidY += (mouseY - rigidY) * 0.16;
    cursor.style.transform = `translate3d(${rigidX}px, ${rigidY}px, 0)`;

    shadow.style.left      = rigidX + 'px';
    shadow.style.top       = (rigidY + 50) + 'px';
    shadow.style.transform = `translate(-50%,-50%) scale(${1 - Math.abs(innerY) / 90})`;

    if (mouseX < 15 || mouseX > window.innerWidth - 15 || mouseY < 15 || mouseY > window.innerHeight - 15) {
      faceScreen.classList.add('glitch-active');
    } else {
      faceScreen.classList.remove('glitch-active');
    }

    const targetX = (mouseX - rigidX) * 0.25;
    const targetY = (mouseY - rigidY) * 0.25;
    velX += (targetX - innerX) * 0.15;
    velY += (targetY - innerY) * 0.15;
    velX *= 0.82; velY *= 0.82;
    innerX += velX; innerY += velY;

    const tiltX = velX * 1.6;
    const tiltY = velY * 1.6;
    head.style.transform    = `translate3d(${innerX}px,${innerY}px,0) rotateX(${-tiltY}deg) rotateY(${tiltX}deg)`;
    antenna.style.transform = `rotateZ(${-tiltX * 1.3}deg) rotateX(${-tiltY}deg)`;

    let lookX = (mouseX - rigidX) * 0.18;
    let lookY = (mouseY - rigidY) * 0.18;

    if (currentTarget) {
      lookX = (currentTarget.left + currentTarget.width  / 2 - rigidX) * 0.28;
      lookY = (currentTarget.top  + currentTarget.height / 2 - rigidY) * 0.28;
      setExpression('face-focus');
    }

    if (Date.now() - lastMoveTime > 3500 && screenMode === 'normal' && !isBooting) {
      const t = Date.now() * 0.001;
      lookX = Math.sin(t) * 14;
      lookY = Math.cos(t * 0.7) * 8;
      if (Date.now() - lastMoveTime > 10000) setExpression('face-sleep');
    }

    expContainer.style.transform = `translate3d(${lookX}px,${lookY}px,0)`;
    requestAnimationFrame(update);
  }

  function blink() {
    if (!isOverriding && !isBooting && screenMode === 'normal' &&
        (expContainer.classList.contains('face-neutral') || expContainer.classList.contains('face-focus'))) {
      expContainer.classList.add('blink');
      setTimeout(() => expContainer.classList.remove('blink'), 120);
    }
    setTimeout(blink, Math.random() * 4500 + 1500);
  }

  function runBootSequence() {
    bootText.style.opacity = 1;
    const lines = ['BOOT_V2.7', 'LAYER_SYNC: OK', 'READY.'];
    let i = 0;
    const interval = setInterval(() => {
      bootText.innerHTML += lines[i] + '<br>';
      i++;
      if (i >= lines.length) {
        clearInterval(interval);
        setTimeout(() => {
          bootText.style.opacity = 0;
          expContainer.classList.remove('hidden');
          isBooting = false;
        }, 400);
      }
    }, 250);
  }

  window.addEventListener('DOMContentLoaded', () => {
    runBootSequence();
    update();
    blink();
  });
})();



// ── PRELOADER ────────────────────────────────────────────────────
const preloader = document.getElementById('preloader');

if (window.innerWidth <= 1024) {
  // ── TABLET/MOBILE: skip grid, just logo fade then slide up ──────
  (function runMobilePreloader() {
    const logo = document.getElementById('pre-masthead-logo');
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // Hide all grid elements immediately
    document.querySelectorAll('.pre-hline,.pre-vline,.pre-cell,#pre-masthead-name,#pre-masthead-tag,#pre-issue,#pre-proceed-wrap').forEach(el => { el.style.display = 'none'; });
    // Show just the logo centred + hint text below
    const masthead = document.getElementById('pre-masthead');
    masthead.style.cssText = 'position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2.5rem;width:100%;height:100%;padding:0 0 8vh 0;';
    const logoW = Math.min(vw * 0.55, 280);
    logo.style.cssText = `width:${logoW}px;height:auto;opacity:0;`;
    const hint = document.createElement('p');
    hint.innerHTML = 'looks way better on desktop.<br>just saying.';
    hint.style.cssText = 'font-family:"JetBrains Mono",monospace;font-size:0.625rem;letter-spacing:.12em;color:rgba(17,17,17,0.7);opacity:0;margin:0;text-align:center;line-height:2;';
    masthead.appendChild(hint);
    const tl = gsap.timeline();
    tl.to(logo, { opacity: 1, duration: 1.1, ease: 'power2.out' }, 0.7);
    tl.to(hint, { opacity: 1, duration: 0.9, ease: 'power2.out' }, 1.5);
    tl.to({}, { duration: 1.4 }, 2.4);
    tl.to(preloader, { y: '-100%', duration: 1.2, ease: 'expo.inOut',
      onComplete: () => {
        preloader.style.display = 'none';
        startMobileReveal();
      }
    }, 3.4);
  })();
} else {
(function runPreloader() {

  const wrap  = document.getElementById('pre-proceed-wrap');
  const btn   = document.getElementById('pre-proceed');
  const logo  = document.getElementById('pre-masthead-logo');
  const allCells = document.querySelectorAll('.pre-cell');

  // ── 1. Set initial states ─────────────────────────────────
  wrap.style.opacity = '0';
  wrap.style.pointerEvents = 'none';
  allCells.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = 'none';
  });

  // ── 2. Grid lines ─────────────────────────────────────────
  setTimeout(() => {
    gsap.to('.pre-hline', { opacity: 1, scaleX: 1, duration: 0.65, ease: 'expo.inOut', stagger: 0.06 });
    gsap.to('.pre-vline', { opacity: 1, scaleY: 1, duration: 0.65, ease: 'expo.inOut', stagger: 0.06 });
  }, 300);

  // ── 3. Cells stagger in ───────────────────────────────────
  setTimeout(() => {
    allCells.forEach((el, i) => {
      setTimeout(() => {
        el.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 55);
    });
  }, 700);

  // ── 4. Enter button fades in ──────────────────────────────
  setTimeout(() => {
    wrap.style.pointerEvents = 'auto';
    btn.style.pointerEvents  = 'auto';
    gsap.to(wrap, { opacity: 1, duration: 0.6, ease: 'power2.out' });
  }, 1600);

  // ── 5. Click → expand to fullscreen → reveal site ─────────
  let fired = false;
  btn.addEventListener('click', () => {
    if (fired) return;
    fired = true;
    btn.style.pointerEvents = 'none';

    const vw   = window.innerWidth;
    const vh   = window.innerHeight;
    const rect = wrap.getBoundingClientRect();

    // Instantly hide ALL text/content — cells, chrome, and button label
    allCells.forEach(el => { el.style.opacity = '0'; el.style.transition = 'none'; });
    gsap.set(['#pre-masthead-name', '#pre-masthead-tag', '#pre-issue', '.pre-hline', '.pre-vline', '#pre-proceed-label', '#pre-proceed-word', '#pre-proceed-arrow'], {
      opacity: 0
    });

    // Snap wrap to fixed, then expand
    wrap.style.position  = 'fixed';
    wrap.style.top       = rect.top  + 'px';
    wrap.style.left      = rect.left + 'px';
    wrap.style.width     = rect.width  + 'px';
    wrap.style.height    = rect.height + 'px';
    wrap.style.zIndex    = '9000';
    wrap.style.opacity   = '1';

    gsap.to(wrap, {
      top: 0, left: 0, width: vw, height: vh,
      duration: 1.1, ease: 'expo.inOut', delay: 0.2
    });

    // Logo drifts to centre
    const lRect = logo.getBoundingClientRect();
    const logoW = Math.min(vw * 0.38, 340);
    logo.style.position = 'fixed';
    logo.style.top      = lRect.top  + 'px';
    logo.style.left     = lRect.left + 'px';
    logo.style.width    = lRect.width + 'px';
    logo.style.zIndex   = '9100';

    gsap.to(logo, {
      top:  vh / 2 - (logoW * 297 / 786) / 2,
      left: vw / 2 - logoW / 2,
      width: logoW,
      duration: 1.0, ease: 'expo.inOut', delay: 0.45
    });

    // Slide everything up → reveal site
    setTimeout(() => {
      gsap.to([wrap, logo], {
        y: -vh, duration: 1.0, ease: 'expo.inOut',
        onComplete: () => {
          preloader.style.display = 'none';
          startHeroReveal();
        }
      });
    }, 2000);
  });

})();
} // end else

function startMobileReveal() {
  const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (noMotion) {
    gsap.set('#mob-nav, #hero, #work, #services, #statement, #testimonials, #contact-wrap', { opacity: 1, y: 0 });
    gsap.set('.hero-line-wrap, .hwi, .hero-eyebrow, .hero-sub, #marquee, .hero-scroller, #hrcRecord, #heroPhotoStack, .hrc-tagline', { opacity: 1, y: 0, x: 0, scaleX: 1 });
    initSite(true);
    return;
  }
  const tl = gsap.timeline({ onComplete: () => initSite(true) });

  // 1. Navbar fades in
  tl.to('#mob-nav', { opacity: 1, duration: 0.45, ease: 'power2.out' }, 0);

  // 2. Hero container visible
  tl.to('#hero', { opacity: 1, duration: 0.01 }, 0.3);

  // 3. Hero lines
  tl.set('.hero-line-wrap', { opacity: 1, scaleX: 0, transformOrigin: 'left center' }, 0.3);
  tl.to('.hero-line-wrap', { scaleX: 1, duration: 0.7, ease: 'expo.inOut', stagger: 0.08 }, 0.3);

  // 4. Hero words rise up — stack animates with the third hwi (0.55 + 2×0.08 = 0.71)
  tl.to('.hwi', { y: 0, opacity: 1, duration: 0.75, ease: 'expo.out', stagger: 0.08 }, 0.55);
  tl.to('#hrcRecord', { y: 0, opacity: 1, duration: 0.75, ease: 'expo.out' }, 0.71);
  tl.to('#heroPhotoStack', { y: 0, opacity: 1, duration: 0.75, ease: 'expo.out' }, 0.65);
  tl.to('.hrc-tagline', { opacity: 1, x: 0, duration: 0.6, ease: 'expo.out' }, 0.82);

  // 5. Eyebrow + sub
  tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.85);
  tl.to('.hero-sub',     { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.95);

  // 6. Marquee ticker slides down
  tl.to('#marquee', { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }, 1.05);

  // 7. Image scroller
  tl.to('.hero-scroller', { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }, 1.15);

  // 8. Work section — starts after hero scroller finishes (~1.75s)
  tl.to('#work',        { opacity: 1, duration: 0.6, ease: 'power2.out' }, 1.85);
  tl.to('#services',    { opacity: 1, duration: 0.6, ease: 'power2.out' }, 2.05);
  tl.to('#statement',   { opacity: 1, duration: 0.6, ease: 'power2.out' }, 2.2);
  tl.to('#testimonials',{ opacity: 1, duration: 0.6, ease: 'power2.out' }, 2.35);
  tl.to('#contact-wrap',{ opacity: 1, duration: 0.6, ease: 'power2.out' }, 2.5);
}

function startHeroReveal() {
  const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (noMotion) {
    // Show everything instantly
    gsap.set('#sidebar', { opacity: 1, visibility: 'visible' });
    gsap.set('#marquee, .hero-scroller, .hero-line-wrap, .hwi, .hero-eyebrow, .hero-sub, #hrcRecord, #heroPhotoStack, .hrc-tagline', { opacity: 1, y: 0, x: 0 });
    initSite(true);
    return;
  }

  const tl = gsap.timeline({ onComplete: () => initSite(true) });

  // Step 1: Lines slide in from left using scaleX
  tl.set('.hero-line-wrap', { opacity: 1, scaleX: 0, transformOrigin: 'left center' });
  tl.to('.hero-line-wrap', {
    scaleX: 1,
    duration: 0.8, ease: 'expo.inOut', stagger: 0.1
  }, 0);

  // Step 2: Text baselines rise up — stack animates with third hwi (0.5 + 2×0.1 = 0.7)
  tl.to('.hwi', {
    y: 0, opacity: 1,
    duration: 0.85, ease: 'expo.out', stagger: 0.1
  }, 0.5);
  tl.to('#hrcRecord', { y: 0, opacity: 1, duration: 0.85, ease: 'expo.out' }, 0.7);
  tl.to('#heroPhotoStack', { y: 0, opacity: 1, duration: 0.85, ease: 'expo.out' }, 0.64);
  tl.to('.hrc-tagline', { opacity: 1, x: 0, duration: 0.65, ease: 'expo.out' }, 0.82);

  // Step 3: Eyebrow + sub fade in
  tl.to('.hero-eyebrow', {
    opacity: 1, y: 0, duration: 0.7, ease: 'power3.out'
  }, 0.9);
  tl.to('.hero-sub', {
    opacity: 1, y: 0, duration: 0.7, ease: 'power3.out'
  }, 1.0);

  // Step 4: Navbar slides down
  tl.to('#sidebar', {
    opacity: 1, visibility: 'visible',
    duration: 0.6, ease: 'power2.out'
  }, 1.0);

  // Step 5: Marquee ticker slides down from top
  tl.to('#marquee', {
    opacity: 1, y: 0,
    duration: 0.7, ease: 'expo.out'
  }, 1.1);

  // Step 6: Image scroller — cards shuffle in like dealing from a deck
  // First make the scroller container visible
  tl.set('.hero-scroller', { opacity: 1, y: 0 }, 1.2);
  // Get only the first set of images (not the duplicates for infinite scroll)
  // Set all cards stacked at center, rotated, scaled down
  tl.set('.hero-scroller-track .hscroll-img', {
    opacity: 0,
    x: 0,
    y: 30,
    rotation: (i) => (i % 2 === 0 ? -8 : 8),
    scale: 0.85,
    transformOrigin: 'bottom center',
  }, 1.2);
  tl.to('.hero-scroller-track .hscroll-img', {
    opacity: 1,
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
    duration: 0.55,
    ease: 'back.out(1.4)',
    stagger: {
      each: 0.06,
      from: 'start',
    }
  }, 1.25);
}

function dismissPre() {
  // Only called for reduced-motion
  document.getElementById('sidebar').style.visibility = 'visible';
  document.getElementById('sidebar').style.opacity = '1';
  preloader.style.display = 'none';
  initSite();
}

// ── ASSET WIRING (hero + selected case-study images) ─────────────
// The HTML provides slots via `data-photo` (hero) and `data-img` (case study).
// Images live in /images/{key}.webp — falls back to colour placeholder if missing.
function wireAssetImages() {
  if (document.body.dataset.assetsWired === '1') return;
  document.body.dataset.assetsWired = '1';

  // Hero scroller — preload image, swap in only when ready so colour never flashes
  document.querySelectorAll('.hscroll-img[data-photo]').forEach(card => {
    const n = parseInt(card.dataset.photo, 10);
    if (!Number.isFinite(n)) return;
    const inner = card.querySelector('.hscroll-img-inner');
    if (!inner) return;
    // Hide colour placeholder until we know if the image exists
    inner.style.background = 'transparent';
    const img = new Image();
    img.src = 'images/hero-' + n + '.webp';
    img.onload = () => {
      inner.style.backgroundImage = 'url(' + img.src + ')';
      inner.style.backgroundSize = 'cover';
      inner.style.backgroundPosition = 'center';
      inner.style.backgroundRepeat = 'no-repeat';
      inner.style.opacity = '0';
      inner.style.transition = 'opacity 0.4s ease';
      requestAnimationFrame(() => { inner.style.opacity = '1'; });
    };
    img.onerror = () => {
      // Image missing — restore colour fallback from the hsi-c CSS class
      inner.style.background = '';
    };
  });
}

// Called for the case-study overlay content after it's cloned.
// Colour fallbacks are inline style="background:..." on each element.
// This swaps in the real image on top when the file loads.
function wireCaseStudyImages(rootEl) {
  if (!rootEl) return;

  // Cover panels
  rootEl.querySelectorAll('.cs-cover-panel-main[data-img], .cs-cover-panel-cell[data-img]').forEach(panel => {
    const name = panel.dataset.img;
    if (!name) return;
    const placeholder = panel.querySelector('.cs-img-placeholder');
    const img = new Image();
    img.src = 'images/' + name + '.webp';
    img.onload = () => {
      panel.style.backgroundImage = 'url(' + img.src + ')';
      panel.style.backgroundSize = 'cover';
      panel.style.backgroundPosition = 'center';
      if (placeholder) placeholder.style.display = 'none';
    };
  });

  // Image blocks
  rootEl.querySelectorAll('.cs-img-block[data-img]').forEach(block => {
    const name = block.dataset.img;
    if (!name) return;
    if (block.querySelector('img')) return;
    const placeholder = block.querySelector('.cs-img-placeholder');
    const img = new Image();
    img.src = 'images/' + name + '.webp';
    img.onload = () => {
      img.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1;';
      block.style.position = 'relative';
      block.appendChild(img);
      if (placeholder) placeholder.style.display = 'none';
    };
  });
}

// ── SITE INIT ────────────────────────────────────────────────────
function initSite(skipHero) {
  wireAssetImages();
  const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Always clear GSAP initial state so elements are visible even without animation

  // Refresh ScrollTrigger now that preloader is gone and all heights are final
  ScrollTrigger.refresh();

  if (noMotion) {
    // Reveal everything immediately — no movement
    gsap.set('.mf-article, .tst-heading, .tst-entry, .cf-big-heading, .cf-2x2-cell, .cf-stat-box', { opacity: 1, y: 0, x: 0 });
    gsap.set('.svc-card, .wcard', { opacity: 1, y: 0, scale: 1 });
    gsap.set('.footer-tagline, .footer-email-big, .footer-phone-big, .footer-avail, .footer-loc, .footer-socials, .footer-copy, .footer-links', { opacity: 1, y: 0 });
    gsap.set('.tw-word', { opacity: 1 });
    gsap.set('.tw-cursor', { opacity: 0 });
    return;
  }

  if (!skipHero) {
    // Hero eyebrow
    gsap.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.05 });
    // Hero words stagger — stack animates with third hwi (0.15 + 2×0.13 = 0.41)
    gsap.to('.hwi', { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.13, delay: 0.15 });
    gsap.to('#hrcRecord', { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', delay: 0.41 });
    gsap.to('#heroPhotoStack', { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', delay: 0.35 });
    gsap.to('.hrc-tagline', { opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.52 });
    // Hero sub
    gsap.to('.hero-sub', { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 1.1 });
  }

  // ── RUBBER-BAND LINES ─────────────────────────────────────────
  const heroEl  = document.getElementById('hero');
  const hlPaths = document.querySelectorAll('.hline-path');
  const lineStates = Array.from(hlPaths).map(() => ({ pulled: false }));

  heroEl.addEventListener('mousemove', e => {
    hlPaths.forEach((path, i) => {
      const svg  = path.closest('svg');
      const rect = svg.getBoundingClientRect();
      const lineY = rect.top + rect.height / 2;
      const dist  = e.clientY - lineY;
      const proximity = 120;
      if (Math.abs(dist) < proximity) {
        const t    = 1 - Math.abs(dist) / proximity;
        const pull = t * 30 * Math.sign(dist);
        const cx   = Math.max(10, Math.min(990, ((e.clientX - rect.left) / rect.width) * 1000));
        lineStates[i].pulled = true;
        gsap.to(path, {
          attr: { d: `M 0,19 Q ${cx.toFixed(1)},${(19 + pull).toFixed(1)} 1000,19` },
          duration: 0.16, overwrite: true,
        });
      } else if (lineStates[i].pulled) {
        lineStates[i].pulled = false;
        gsap.to(path, {
          attr: { d: 'M 0,19 Q 500,19 1000,19' },
          duration: 1.3, ease: 'elastic.out(1, 0.22)', overwrite: true,
        });
      }
    });
  });

  heroEl.addEventListener('mouseleave', () => {
    hlPaths.forEach((path, i) => {
      lineStates[i].pulled = false;
      gsap.to(path, {
        attr: { d: 'M 0,19 Q 500,19 1000,19' },
        duration: 1.5, ease: 'elastic.out(1, 0.2)', overwrite: true,
      });
    });
  });

  // ── WORK GRID: stagger reveal — per-card triggers, row-position delay
  gsap.utils.toArray('.wcard').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0, y: 28, scale: 0.96,
      duration: 0.7, ease: 'expo.out',
      delay: (i % 3) * 0.06,
      immediateRender: false,
      scrollTrigger: { trigger: card, start: 'top 88%' }
    });
  });

  // ── WORK SECTION: scroll animations ──────────────────────────
  // Header: staggered character reveal
  animChars(document.querySelector('.work-header-title'), '#work', { stagger: 0.02 });
  
  gsap.from('.work-header p', {
    y: 24, opacity: 0,
    duration: 0.9, ease: 'expo.out', delay: 0.4,
    immediateRender: false,
    scrollTrigger: { trigger: '#work', start: 'top 85%' }
  });

  // Each work-row name: characters reveal left-to-right as row enters viewport
  // Achieved by clipping the text via a sliding mask (overflow:hidden + translateX)
  gsap.utils.toArray('.work-row').forEach((row, i) => {
    const name = row.querySelector('.work-row-name');
    const tagline = row.querySelector('.work-row-tagline');
    const num = row.querySelector('.work-row-num');
    const cat = row.querySelector('.work-row-cat');
    const arrow = row.querySelector('.work-row-arrow');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: row,
        start: 'top 88%',
      }
    });

    // Number ticks in first
    if (num) tl.from(num, { opacity: 0, x: -16, duration: 0.4, ease: 'power3.out' }, 0);

    // Name wipes in from left — clip via scaleX on a pseudo-overlay
    // Simplest reliable method: clip the name text itself left-to-right
    if (name) {
      // Reveal by sliding from left using x offset + fade, avoids clipPath hover conflict
      gsap.set(name, { x: -30, opacity: 0 });
      tl.to(name, {
        x: 0, opacity: 1,
        duration: 0.7, ease: 'expo.out',
        clearProps: 'x,opacity'
      }, 0.05);
    }

    // Parallax image within the row
    const imgInner = row.querySelector('.work-row-img-inner');
    if (imgInner) {
      gsap.fromTo(imgInner, { y: '-15%' }, {
        y: '15%',
        ease: 'none',
        scrollTrigger: {
          trigger: row,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Tagline fades up after name
    if (tagline) tl.from(tagline, { opacity: 0, y: 8, duration: 0.5, ease: 'power2.out' }, 0.4);

    // Category + arrow fade in from right
    if (cat)   tl.from(cat,   { opacity: 0, x: 20, duration: 0.5, ease: 'power2.out' }, 0.35);
    if (arrow) tl.from(arrow, { opacity: 0, x: 12, duration: 0.4, ease: 'power2.out', clearProps: 'x,opacity' }, 0.45);
  });

  // ── SECTION EYEBROWS: slide in from left ─────────────────────
  document.querySelectorAll('.cl-ey, .cf-brand').forEach(el => {
    gsap.from(el, {
      opacity: 0, x: -24, duration: 0.9, ease: 'expo.out',
      immediateRender: false,
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  // ── SERVICES: card grid stagger — per-card triggers, stagger within rows
  gsap.utils.toArray('.svc-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0, y: 22, scale: 0.97,
      duration: 0.65, ease: 'expo.out',
      delay: (i % 3) * 0.07,
      immediateRender: false,
      scrollTrigger: { trigger: card, start: 'top 90%', invalidateOnRefresh: true }
    });
  });

  // ── TOOLKIT / SERVICES: per-row entrance animations (mirrors work-row pattern) ──
  gsap.utils.toArray('.svc-item').forEach((item, i) => {
    const num   = item.querySelector('.svc-item-num');
    const name  = item.querySelector('.svc-item-name');
    const desc  = item.querySelector('.svc-item-desc');
    const tags  = item.querySelector('.svc-item-tags');
    const thumb = item.querySelector('.svc-item-thumb');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top 88%',
      }
    });

    // Number ticks in from left first
    if (num) tl.from(num, { opacity: 0, x: -16, duration: 0.4, ease: 'power3.out' }, 0);

    // Name wipes in from left — same treatment as work-row-name
    if (name) {
      gsap.set(name, { x: -30, opacity: 0 });
      tl.to(name, {
        x: 0, opacity: 1,
        duration: 0.7, ease: 'expo.out',
        clearProps: 'x,opacity'
      }, 0.05);
    }

    // Description fades up after name
    if (desc) tl.from(desc, { opacity: 0, y: 10, duration: 0.55, ease: 'power2.out' }, 0.35);

    // Tags slide up slightly after description
    if (tags) tl.from(tags, { opacity: 0, y: 8, duration: 0.45, ease: 'power2.out' }, 0.5);

    // Thumbnail fades + scales in from the right — mirrors work-row-cat/arrow
    if (thumb) tl.from(thumb, { opacity: 0, x: 20, scale: 0.92, duration: 0.55, ease: 'expo.out' }, 0.3);
  });

  // Toolkit left-panel heading slides in when section enters view
  gsap.from('.svc-left-title', {
    y: 40, opacity: 0,
    duration: 1.0, ease: 'expo.out',
    immediateRender: false,
    scrollTrigger: { trigger: '#services', start: 'top 85%' }
  });
  gsap.from('.svc-left-note', {
    y: 16, opacity: 0,
    duration: 0.8, ease: 'power2.out', delay: 0.3,
    immediateRender: false,
    scrollTrigger: { trigger: '#services', start: 'top 85%' }
  });



  // ── MANIFESTO ────────────────────────────────────────────────
  gsap.utils.toArray('.mf-row').forEach((row) => {
    const word = row.querySelector('.mf-word');
    const note = row.querySelector('.mf-note');
    if (!word) return;

    // Right-aligned rows slide in from the right; left-aligned from the left
    const fromRight = row.style.justifyContent === 'flex-end';
    const xWord = fromRight ? 80 : -80;
    const xNote = fromRight ? -40 : 40;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: row, start: 'top 88%' }
    });

    tl.from(word, { x: xWord, opacity: 0, duration: 0.9, ease: 'expo.out' }, 0);
    if (note) tl.from(note, { x: xNote, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0.15);
  });

  // Body columns fade up staggered
  gsap.utils.toArray('.mf-body-col').forEach((col, i) => {
    gsap.from(col, {
      y: 24, opacity: 0, duration: 0.8, ease: 'expo.out',
      delay: i * 0.1,
      immediateRender: false,
      scrollTrigger: { trigger: '.mf-body-row', start: 'top 90%' }
    });
  });

  // ── TESTIMONIALS ─────────────────────────────────────────────
  gsap.from('.tst-heading', {
    opacity: 0, y: 40, duration: 1.1, ease: 'expo.out',
    immediateRender: false,
    scrollTrigger: { trigger: '#testimonials', start: 'top 78%' }
  });

  (function() {
    const entries = gsap.utils.toArray('.tst-entry');
    if (!entries.length) return;

    entries.forEach((entry) => {
      const quoteEl = entry.querySelector('.tst-quote');
      const attrEl  = entry.querySelector('.tst-attr');
      if (!quoteEl) return;

      // Split quote text into per-word spans
      const words = quoteEl.textContent.trim().split(/\s+/);
      quoteEl.innerHTML = words.map(w => `<span class="tw-word" style="opacity:0">${w}</span>`).join(' ');
      const wordEls = quoteEl.querySelectorAll('.tw-word');
      if (attrEl) gsap.set(attrEl, { opacity: 0 });

      // Fire once as entry enters — completes in ~0.5s, done well before section ends
      ScrollTrigger.create({
        trigger: entry,
        start: 'top 82%',
        once: true,
        onEnter: () => {
          gsap.to(wordEls, {
            opacity: 1,
            duration: 0.001,
            stagger: { each: 0.03, ease: 'none' },
            ease: 'none',
            onComplete: () => {
              if (attrEl) gsap.to(attrEl, { opacity: 1, duration: 0.25, ease: 'power2.out' });
            }
          });
        }
      });
    });
  })();

  // ── STACKING PANEL ENTRANCE ───────────────────────────────────
  if (window.innerWidth > 1024) {
    const stackPairs = [
      { trigger: '#services',                   target: '#services'            },
      { trigger: '#statement',                  target: '#statement'           },
      { trigger: '#contact-wrap',               target: '#contact-section'     },
    ];
    stackPairs.forEach(({ trigger, target }) => {
      const triggerEl = document.querySelector(trigger);
      const targetEl  = document.querySelector(target);
      if (!triggerEl || !targetEl) return;
      const actualTrigger = triggerEl.closest('.section-scroll') || triggerEl.parentElement.classList.contains('section-scroll')
        ? triggerEl.parentElement
        : triggerEl;
      gsap.fromTo(targetEl,
        { yPercent: 6 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: actualTrigger,
            start: 'top bottom',
            end: 'top top',
            scrub: 1.8,
            invalidateOnRefresh: true,
          }
        }
      );
    });
  }


  // ── EYE TRACKING ─────────────────────────────────────────────────
  (function() {
    const balls = [
      document.getElementById('ball-l'),
      document.getElementById('ball-r'),
    ];
    const wraps = [
      document.getElementById('eye-l'),
      document.getElementById('eye-r'),
    ];
    if (!balls[0]) return;

    document.addEventListener('mousemove', e => {
      balls.forEach((ball, i) => {
        const wrap = wraps[i];
        if (!wrap || !ball) return;
        const r  = wrap.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const maxR = r.width * 0.28;
        const f    = Math.min(dist, maxR * 6) / dist * maxR * 0.85;
        const x    = (dx / dist) * f;
        const y    = (dy / dist) * f;
        ball.style.transform = `translate(calc(-50% + ${x.toFixed(2)}px), calc(-50% + ${y.toFixed(2)}px))`;
        ball.style.transition = 'transform 0.05s linear';
      });
    });
  })();

  // ── SIDEBAR SCROLL INDICATOR ──────────────────────────────────
  const sbDot   = document.getElementById('sb-dot');
  const sbLabel = document.getElementById('sb-label');

  const sections = [
    { el: '#hero',            label: 'INTRO'        },
    { el: '#work',            label: 'WORK'         },
    { el: '#services',        label: 'SERVICES'     },
    { el: '#statement',       label: 'MANIFESTO'    },
    { el: '#testimonials',    label: 'TESTIMONIALS' },
    { el: '#contact-section', label: 'CONTACT'      },
  ].filter(s => document.querySelector(s.el));

  function updateDot(i) {
    const pct = sections.length > 1 ? (i / (sections.length - 1)) * 100 : 0;
    gsap.to(sbDot, { top: pct + '%', duration: 0.4, ease: 'power2.out' });
    sbLabel.textContent = sections[i].label;
  }

  updateDot(0);

  sections.forEach((s, i) => {
    ScrollTrigger.create({
      trigger: s.el,
      start: 'top 50%',
      end:   'bottom 50%',
      invalidateOnRefresh: true,
      onEnter:     () => updateDot(i),
      onEnterBack: () => updateDot(i),
    });
  });

  // ── SERVICE CARD INTERACTIONS ───────────────────────────────
  (function() {
    const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('.svc-card').forEach(card => {
      const svg = card.querySelector('.svc-icon svg');
      if (!svg) return;

      // ── Measure every stroke element so we can drive dashoffset ──
      const elems = [...svg.querySelectorAll('path, circle, rect, line, ellipse')];
      const lens = elems.map(el => {
        const L = (el.getTotalLength ? el.getTotalLength() : 60) + 2;
        gsap.set(el, { strokeDasharray: L, strokeDashoffset: L });
        return L;
      });

      // ── Draw in on hover ─────────────────────────────────────────
      card.addEventListener('mouseenter', () => {
        if (noMotion) return;
        gsap.to(elems, {
          strokeDashoffset: 0,
          duration: 0.5, ease: 'expo.out',
          stagger: { each: 0.07, from: 'start' },
          overwrite: 'auto',
        });
      });

      // ── Wipe off + reset tilt on leave ───────────────────────────
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0, rotateY: 0, transformPerspective: 900,
          duration: 0.7, ease: 'expo.out', overwrite: 'auto',
        });
        if (noMotion) return;
        elems.forEach((el, i) => {
          gsap.to(el, {
            strokeDashoffset: -lens[i],
            duration: 0.35, ease: 'power2.in',
            delay: i * 0.035, overwrite: 'auto',
            onComplete() { gsap.set(el, { strokeDashoffset: lens[i] }); },
          });
        });
      });

      // ── 3-D tilt on mousemove ────────────────────────────────────
      if (!noMotion) {
        card.addEventListener('mousemove', e => {
          const r  = card.getBoundingClientRect();
          const dx = ((e.clientX - r.left)  / r.width  - 0.5) * 2;
          const dy = ((e.clientY - r.top)   / r.height - 0.5) * 2;
          gsap.to(card, {
            rotateY: dx * 8, rotateX: -dy * 8,
            transformPerspective: 900,
            duration: 0.35, ease: 'power2.out', overwrite: 'auto',
          });
        });
      }
    });

    // ── Tags: staggered moss-colour flash on card hover ──────────
    document.querySelectorAll('.svc-card').forEach(card => {
      const tagsEl = card.querySelector('.svc-card-tags');
      if (!tagsEl) return;
      // Wrap each dot-separated item in a span on first hover
      card.addEventListener('mouseenter', () => {
        if (!tagsEl.dataset.split) {
          tagsEl.dataset.split = '1';
          tagsEl.innerHTML = tagsEl.textContent
            .split('·')
            .map(t => `<span class="svc-tag-word">${t.trim()}</span>`)
            .join('<span class="svc-tag-dot"> · </span>');
        }
        if (noMotion) return;
        gsap.fromTo(
          tagsEl.querySelectorAll('.svc-tag-word'),
          { color: 'inherit' },
          { color: 'var(--moss)', duration: 0.22, ease: 'power1.out',
            stagger: { each: 0.08, from: 'start' },
            yoyo: true, repeat: 1, overwrite: 'auto' }
        );
      }, { passive: true });
    });

    // ── Footer CTA: arrow nudge ──────────────────────────────────
    const footerCard = document.querySelector('.svc-card--footer');
    if (footerCard) {
      const cta = footerCard.querySelector('.svc-card-footer-cta');
      if (cta && !noMotion) {
        footerCard.addEventListener('mouseenter', () => {
          gsap.fromTo(cta,
            { x: 0 },
            { x: 7, duration: 0.22, ease: 'power2.out', yoyo: true, repeat: 1 }
          );
        });
      }
    }
  })();


  // ── SCRATCH ANIMATIONS — all .scratch-trigger elements ────────
  (function() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.scratch-trigger').forEach(el => el.classList.add('scratched'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scratched');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('.scratch-trigger').forEach(el => io.observe(el));
  })();

  // ── CONTACT FORM ─────────────────────────────────────────────
  const cfTrigger = { trigger: '#contact-section', start: 'top 90%' };

  // Big heading: lifts up
  gsap.from('.cf-big-heading', {
    opacity: 0, y: 60, duration: 1.2, ease: 'expo.out',
    immediateRender: false,
    scrollTrigger: cfTrigger
  });

  // Sub-copy fades up after heading
  gsap.from('.cf-head-sub', {
    opacity: 0, y: 20, duration: 0.9, ease: 'expo.out', delay: 0.25,
    immediateRender: false,
    scrollTrigger: cfTrigger
  });

  // Quick form slides up from below
  gsap.from('.cf-quick-form', {
    opacity: 0, y: 28, duration: 0.85, ease: 'expo.out', delay: 0.4,
    immediateRender: false,
    scrollTrigger: cfTrigger
  });

  // Social links stagger from left
  gsap.from('.cf-left-foot-label', {
    opacity: 0, x: -16, duration: 0.7, ease: 'power3.out', delay: 0.5,
    immediateRender: false,
    scrollTrigger: cfTrigger
  });
  gsap.utils.toArray('.cf-soc').forEach((soc, i) => {
    gsap.from(soc, {
      opacity: 0, x: -12, duration: 0.6, ease: 'power3.out',
      delay: 0.55 + i * 0.08,
      immediateRender: false,
      scrollTrigger: cfTrigger
    });
  });

  // Right 2×2 cells wipe up in sequence
  gsap.from('.cf-2x2-cell', {
    opacity: 0, y: 32, duration: 0.85, ease: 'expo.out', stagger: 0.1,
    immediateRender: false,
    scrollTrigger: { trigger: '.cf-2x2', start: 'top 90%' }
  });

  // Stat boxes scale up from below
  gsap.from('.cf-stat-box', {
    opacity: 0, y: 20, scale: 0.9, duration: 0.75, ease: 'expo.out', stagger: 0.1,
    transformOrigin: 'bottom center',
    immediateRender: false,
    scrollTrigger: { trigger: '.cf-stat-strip', start: 'top 95%' }
  });

  // Copyright strip fades in
  gsap.from('#copyright-strip', {
    opacity: 0, duration: 0.6, ease: 'power2.out',
    immediateRender: false,
    scrollTrigger: { trigger: '#copyright-strip', start: 'top 100%' }
  });
}



// ── RESUME OVERLAY ───────────────────────────────────────────────
(function() {
  const overlay   = document.getElementById('resume-overlay');
  const resumeBtn = document.getElementById('sb-resume');
  const closeBtn  = document.getElementById('rv-close');
  if (!overlay || !resumeBtn) return;

  function openResume() {
    overlay.classList.add('open');
    resumeBtn.classList.add('resume-open');
    resumeBtn.setAttribute('aria-label', 'Close résumé');
    document.body.style.overflow = 'hidden';
    lenis.stop();
    gsap.from('#rv-left-top',  { y: 40, opacity: 0, duration: 1.0, ease: 'expo.out', delay: 0.3 });
    gsap.from('#rv-meta .co-info-row', { y: 20, opacity: 0, duration: 0.7, ease: 'expo.out', stagger: 0.07, delay: 0.45 });
    gsap.from('.rv-section',   { y: 24, opacity: 0, duration: 0.7, ease: 'expo.out', stagger: 0.09, delay: 0.4 });
    gsap.from('#rv-download',  { y: 16, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.65 });
  }

  function closeResume() {
    overlay.classList.remove('open');
    resumeBtn.classList.remove('resume-open');
    resumeBtn.setAttribute('aria-label', 'View résumé');
    document.body.style.overflow = '';
    lenis.start();
    resumeBtn.focus();
  }

  resumeBtn.addEventListener('click', () => {
    if (overlay.classList.contains('open')) closeResume();
    else openResume();
  });
  if (closeBtn) closeBtn.addEventListener('click', closeResume);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeResume(); });
})();

// ── CONTACT OVERLAY ──────────────────────────────────────────────
(function() {
  const overlay  = document.getElementById('contact-overlay');
  const sidebar  = document.getElementById('sidebar');
  const talkBtn  = document.getElementById('sb-talk');
  if (!overlay || !talkBtn) return;

  function openOverlay() {
    overlay.classList.add('open');
    sidebar.classList.add('overlay-open');
    gsap.to(sidebar, { yPercent: 0, duration: 0.4, ease: 'power2.out' });
    talkBtn.setAttribute('aria-label', 'Close');
    document.body.style.overflow = 'hidden';
    lenis.stop();
    gsap.from('#co-left-top', { y: 40, opacity: 0, duration: 1.0, ease: 'expo.out', delay: 0.3 });
    gsap.from('#co-contact-info .co-info-row', { y: 20, opacity: 0, duration: 0.7, ease: 'expo.out', stagger: 0.07, delay: 0.45 });
    gsap.from('#co-socials', { y: 14, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.65 });
    gsap.from('.co-form-section', { y: 24, opacity: 0, duration: 0.7, ease: 'expo.out', stagger: 0.08, delay: 0.4 });
    gsap.from('#co-submit', { y: 16, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.7 });
    setTimeout(() => { const first = overlay.querySelector('input'); if (first) first.focus(); }, 500);
  }

  function closeOverlay() {
    overlay.classList.remove('open');
    sidebar.classList.remove('overlay-open');
    talkBtn.setAttribute('aria-label', 'Let\'s talk');
    document.body.style.overflow = '';
    lenis.start();
    talkBtn.focus();
  }

  const coCloseTop = document.getElementById('co-close-top');

  talkBtn.addEventListener('click', () => {
    if (overlay.classList.contains('open')) closeOverlay();
    else openOverlay();
  });
  if (coCloseTop) coCloseTop.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeOverlay(); });
})();

window.addEventListener('load', () => {
  // Fonts, images settled — one final refresh so sticky section heights are exact
  ScrollTrigger.refresh();
});


// ── CASE STUDY OVERLAY ──────────────────────────────────────────────
(function() {
  const overlay  = document.getElementById('cs-overlay');
  const closeBtn = document.getElementById('cs-close');
  if (!overlay || !closeBtn) return;

  let currentSlug = null;
  let dotsEl = null;

  // Build the scroll container and dots once
  const scrollEl = document.createElement('div');
  scrollEl.id = 'cs-scroll';
  overlay.insertBefore(scrollEl, overlay.firstChild);

  dotsEl = document.createElement('div');
  dotsEl.className = 'cs-dots';
  overlay.appendChild(dotsEl);

  function buildDots(count) {
    dotsEl.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const d = document.createElement('button');
      d.className = 'cs-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Slide ' + (i + 1));
      d.addEventListener('click', () => {
        const slides = scrollEl.querySelectorAll('.cs-cover, .cs-slide');
        if (slides[i]) slides[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      });
      dotsEl.appendChild(d);
    }
  }

  function updateDots() {
    const slides = Array.from(scrollEl.querySelectorAll('.cs-cover, .cs-slide'));
    if (!slides.length) return;
    const dots = Array.from(dotsEl.querySelectorAll('.cs-dot'));
    const cw = scrollEl.clientWidth;
    let closest = 0, minDist = Infinity;
    slides.forEach((s, i) => {
      const dist = Math.abs(s.getBoundingClientRect().left);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === closest));
  }

  // ── HORIZONTAL SCROLL ANIMATIONS ───────────────────────────
  function updateProjectAnimations() {
    const revealEls = scrollEl.querySelectorAll('[data-reveal]');
    const parallaxEls = scrollEl.querySelectorAll('[data-parallax]');
    const viewportWidth = scrollEl.clientWidth;

    // 1. Staggered Reveals with Exit/Entry animations
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();

      // If element is leaving to the left (exit animation)
      if (rect.left < -100 && el.classList.contains('revealed') && !el.classList.contains('exited')) {
        el.classList.add('exit', 'exited');
      }

      // If element is entering the viewport (mostly visible)
      if (rect.left < viewportWidth * 0.85 && !el.classList.contains('revealed')) {
        el.classList.add('revealed', 'entering');
        const labels = el.querySelectorAll('.cs-slide-label, .cs-slide-sub, .cs-slide-body, .cs-slide-num');
        gsap.to(labels, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          stagger: 0.1
        });
        // Remove entering class after animation completes
        setTimeout(() => el.classList.remove('entering'), 800);
      }
    });

    // 2. Parallax (Subtle image shift)
    parallaxEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      const relativeX = rect.left / viewportWidth; // -1 to 1 range roughly when visible
      
      const images = el.querySelectorAll('.cs-img-block');
      images.forEach((img, i) => {
        const factor = (i + 1) * 20; // Different speeds for depth
        const xPos = -relativeX * factor;
        gsap.set(img, { x: xPos });
      });
    });
  }

  // Attach scroll listeners ONCE — not inside showCase
  scrollEl.addEventListener('scroll', () => {
    const max = scrollEl.scrollWidth - scrollEl.clientWidth;
    const pct = max > 0 ? (scrollEl.scrollLeft / max) * 100 : 0;
    const fill = document.getElementById('cs-progress-fill');
    if (fill) fill.style.width = pct + '%';
    updateProjectAnimations();
  }, { passive: true });
  scrollEl.addEventListener('scroll', updateDots, { passive: true });

  // Translate vertical wheel into smooth horizontal scroll via RAF momentum
  let csTargetX = 0;
  let csRafId = null;

  function csSmoothScroll() {
    const diff = csTargetX - scrollEl.scrollLeft;
    if (Math.abs(diff) < 0.5) {
      scrollEl.scrollLeft = csTargetX;
      updateProjectAnimations();
      csRafId = null;
      return;
    }
    scrollEl.scrollLeft += diff * 0.12;
    updateProjectAnimations();
    csRafId = requestAnimationFrame(csSmoothScroll);
  }

  // Transition slide vertical scroll state
  let tsVertical = 0;
  let tsActive = false;
  let tsDone = false;
  let tsMaxScroll = 0;

  function getTransitionSlide() {
    return scrollEl.querySelector('[data-transition="true"]') || null;
  }

  function isTransitionInView() {
    const slide = getTransitionSlide();
    if (!slide) return false;
    const rect = slide.getBoundingClientRect();
    return Math.abs(rect.left) < window.innerWidth * 0.25;
  }

  function snapToNextSlide(tSlide) {
    const allSlides = Array.from(scrollEl.querySelectorAll('.cs-cover, .cs-slide'));
    const idx = allSlides.indexOf(tSlide);
    const next = allSlides[idx + 1];
    if (next) {
      csTargetX = next.offsetLeft;
      if (!csRafId) csRafId = requestAnimationFrame(csSmoothScroll);
    }
  }

  scrollEl.addEventListener('wheel', (e) => {
    if (!overlay.classList.contains('open')) return;
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    e.preventDefault();

    const inTransition = isTransitionInView();

    if (inTransition && !tsDone) {
      const tSlide = getTransitionSlide();
      const img = tSlide.querySelector('.cs-transition-image img');

      if (!tsActive) {
        // Enter transition: snap horizontal and lock
        tsActive = true;
        tsDone = false;
        csTargetX = tSlide.offsetLeft;
        scrollEl.scrollLeft = csTargetX;
        tsVertical = 0;
        tsMaxScroll = img && img.naturalWidth
          ? Math.max(0, img.naturalHeight * (window.innerWidth / img.naturalWidth) - window.innerHeight)
          : 0;
      }

      const newV = tsVertical + e.deltaY * 1.2;

      if (newV < tsMaxScroll) {
        // Still scrolling vertically
        tsVertical = Math.max(0, newV);
        const container = tSlide.querySelector('.cs-transition-image');
        if (container) container.style.transform = `translateY(-${tsVertical}px)`;
      } else {
        // Vertical scroll complete — auto-advance to next slide
        tsVertical = tsMaxScroll;
        tsActive = false;
        tsDone = true;
        snapToNextSlide(tSlide);
      }
    } else {
      // Normal horizontal scroll — reset state if we've left the transition slide
      if (!inTransition) { tsActive = false; tsDone = false; tsVertical = 0; }
      const max = scrollEl.scrollWidth - scrollEl.clientWidth;
      csTargetX = Math.max(0, Math.min(max, csTargetX + e.deltaY * 1.2));
      if (!csRafId) csRafId = requestAnimationFrame(csSmoothScroll);
    }
  }, { passive: false });

  // ── CASE STUDY CTAs: Next, Brief & Back to Lab ────────────────────────────
  scrollEl.addEventListener('click', (e) => {
    const nextBtn  = e.target.closest('.cs-next-btn');
    const briefBtn = e.target.closest('.cs-brief-btn');
    const backBtn  = e.target.closest('.cs-back-lab');

    if (nextBtn) {
      const nextSlug = nextBtn.dataset.next;
      if (nextSlug) {
        showCase(nextSlug);
      }
    }

    if (briefBtn) {
      closeCase();
      // Delay slightly to allow case study to start closing, then open contact
      setTimeout(() => {
        const talkBtn = document.getElementById('sb-talk');
        if (talkBtn) talkBtn.click();
      }, 400);
    }

    if (backBtn) {
      closeCase();
    }
  });

  // Reset target when user closes overlay
  overlay.addEventListener('click', () => { csTargetX = 0; });

  function showCase(slug) {
    const caseEl = document.getElementById('cs-' + slug);
    if (!caseEl) return;

    // Reset transition slide state
    tsVertical = 0; tsActive = false; tsDone = false;

    // Clear and repopulate scroll container
    scrollEl.innerHTML = '';
    const inner = caseEl.querySelector('.cs-inner');
    if (!inner) return;

    // Clone cover + all slides as direct flex children of #cs-scroll
    const cover = inner.querySelector('.cs-cover');
    const slides = inner.querySelectorAll('.cs-slide');
    if (cover) scrollEl.appendChild(cover.cloneNode(true));
    slides.forEach(s => scrollEl.appendChild(s.cloneNode(true)));
    wireCaseStudyImages(scrollEl);

    const totalSlides = 1 + slides.length;
    buildDots(totalSlides);

    // Reset scroll position and progress
    scrollEl.scrollLeft = 0;
    csTargetX = 0;
    const fill = document.getElementById('cs-progress-fill');
    if (fill) fill.style.width = '0%';

    currentSlug = slug;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('cs-open');
    if (typeof lenis !== 'undefined') lenis.stop();

    // Trigger initial animations
    setTimeout(updateProjectAnimations, 50);

    // Update URL
    try { history.pushState({ slug }, '', '#' + slug); } catch(e) {}
  }

  function closeCase() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    document.body.classList.remove('cs-open');
    gsap.to(sidebar, { yPercent: 0, duration: 0.4, ease: 'power2.out' });
    if (typeof lenis !== 'undefined') lenis.start();
    currentSlug = null;
    scrollEl.innerHTML = '';
    dotsEl.innerHTML = '';
    try { history.pushState({}, '', window.location.pathname); } catch(e) {}
  }

  // ── PASSWORD GATE ──────────────────────────────────────────────
  const PW = 'workwithme<3';
  const pwGate    = document.getElementById('pw-gate');
  const pwInput   = document.getElementById('pw-gate-input');
  const pwSubmit  = document.getElementById('pw-gate-submit');
  const pwError   = document.getElementById('pw-gate-error');
  let   pwPending = null; // slug waiting to open after auth

  function isUnlocked() {
    return sessionStorage.getItem('pw_ok') === '1';
  }

  function openGate(slug) {
    pwPending = slug;
    pwInput.value = '';
    pwError.classList.remove('visible');
    pwGate.classList.add('open');
    setTimeout(() => pwInput.focus(), 50);
  }

  function closeGate() {
    pwGate.classList.remove('open');
    pwPending = null;
  }

  function attemptUnlock() {
    if (pwInput.value === PW) {
      sessionStorage.setItem('pw_ok', '1');
      closeGate();
      if (pwPending) showCase(pwPending);
    } else {
      pwError.classList.add('visible');
      pwInput.value = '';
      pwInput.focus();
    }
  }

  pwSubmit.addEventListener('click', attemptUnlock);
  pwInput.addEventListener('keydown', e => { if (e.key === 'Enter') attemptUnlock(); });
  pwGate.addEventListener('click', e => { if (e.target === pwGate) closeGate(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && pwGate.classList.contains('open')) closeGate(); });

  function requestCase(slug) {
    if (isUnlocked()) showCase(slug);
    else openGate(slug);
  }

  // Wire up work rows and hero photo stack cards
  document.querySelectorAll('.work-row[data-slug], .wcard[data-slug], .hps-card[data-slug]').forEach(card => {
    card.addEventListener('click', () => requestCase(card.dataset.slug));
  });

  closeBtn.addEventListener('click', closeCase);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && currentSlug) closeCase();
  });

  // Handle browser back
  window.addEventListener('popstate', e => {
    if (e.state && e.state.slug) showCase(e.state.slug);
    else if (currentSlug) closeCase();
  });

  // Check URL on load — also gated
  if (window.location.hash) {
    const slug = window.location.hash.slice(1);
    if (document.getElementById('cs-' + slug)) {
      setTimeout(() => requestCase(slug), 800);
    }
  }
})();



// ── HERO PHOTO SCROLLER: lightbox ────────────────────────────────
(function() {
  const lightbox    = document.getElementById('photo-lightbox');
  const closeBtn    = document.getElementById('photo-lightbox-close');
  const placeholder = document.getElementById('photo-lightbox-placeholder');
  if (!lightbox || !closeBtn) return;

  const photoColors = ['#C8855A','#2C4A3E','#8B7355','#1B3A6B','#C9A84C','#B01020','#1A4F6E','#3D2252'];

  function openPhoto(index) {
    const i = parseInt(index, 10);
    const n = Number.isFinite(i) ? i : 1;
    placeholder.style.backgroundColor = __imgBg__('hero-'+n);
    placeholder.style.backgroundImage = 'none';
    placeholder.style.backgroundSize = 'cover';
    placeholder.style.backgroundRepeat = 'no-repeat';
    placeholder.style.backgroundPosition = 'center';
    const img = new Image();
    img.src = 'images/hero-' + n + '.webp';
    img.onload = () => { placeholder.style.backgroundImage = 'url(' + img.src + ')'; };
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lenis.stop();
  }

  function closePhoto() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lenis.start();
  }

  document.querySelectorAll('.hscroll-img[data-photo]').forEach(img => {
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'View photo');
    img.addEventListener('click', () => openPhoto(parseInt(img.dataset.photo)));
    img.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPhoto(parseInt(img.dataset.photo)); } });
  });

  closeBtn.addEventListener('click', closePhoto);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closePhoto(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox.classList.contains('open')) closePhoto(); });
})();

// ── CONTACT: sync footer strip heights ─────────────────────────
(function() {
  function syncCfHeight() {
    const foot = document.querySelector('.cf-left-foot');
    const stat = document.querySelector('.cf-stat-strip');
    if (!foot || !stat) return;
    foot.style.height = '';
    stat.style.height = '';
    const h = Math.max(foot.offsetHeight, stat.offsetHeight);
    foot.style.height = h + 'px';
    stat.style.height = h + 'px';
  }
  syncCfHeight();
  window.addEventListener('resize', syncCfHeight);
})();



// ── SVG CELL PARALLAX ────────────────────────────────────────
(function() {
  document.querySelectorAll('.pre-cell-svg').forEach(cell => {
    const svg = cell.querySelector('svg');
    if (!svg) return;
    const STRENGTH = 12; // max px shift

    cell.addEventListener('mousemove', e => {
      const r = cell.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      svg.style.transform = `translate(${x * STRENGTH}px, ${y * STRENGTH}px)`;
    });
    cell.addEventListener('mouseleave', () => {
      svg.style.transform = '';
    });
  });
})();

// ── LAB OVERLAY ──────────────────────────────────────────────
(function() {
  const overlay  = document.getElementById('lab-overlay');
  const labBtn   = document.getElementById('sb-lab');
  const closeBtn = document.getElementById('lab-close');
  if (!overlay || !labBtn) return;

  function openLab() {
    overlay.classList.add('lab-overlay-open');
    labBtn.classList.add('lab-open');
    document.body.style.overflow = 'hidden';
    if (typeof lenis !== 'undefined') lenis.stop();
    overlay.dispatchEvent(new Event('lab:open'));
    overlay.removeAttribute('aria-hidden');
    const c = overlay.querySelector('#lab-close');
    if (c) c.focus();
  }

  function closeLab() {
    overlay.classList.remove('lab-overlay-open');
    labBtn.classList.remove('lab-open');
    document.body.style.overflow = '';
    if (typeof lenis !== 'undefined') lenis.start();
    overlay.dispatchEvent(new Event('lab:close'));
    overlay.setAttribute('aria-hidden', 'true');
    labBtn.focus();
  }

  overlay.setAttribute('aria-hidden', 'true');

  labBtn.addEventListener('click', () => {
    overlay.classList.contains('lab-overlay-open') ? closeLab() : openLab();
  });
  closeBtn && closeBtn.addEventListener('click', closeLab);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('lab-overlay-open')) closeLab();
  });

})();

// ══════════════════════════════════════
// STORY POSTER — "You, Specifically"
// ══════════════════════════════════════
let haikuPosterInitialized = false;
let _hpStories = [], _hpIndex = 0, _hpRevealing = false, _hpOnFinalSlide = false;

// ── BLOB COLOUR PALETTES ─────────────────────────────────────
const _blobPalettes = [
  ['#F2694A','#F5824A','#F7C46A','#F5A06E','#D4A8D0','#F7D08A'],
  ['#89CFC4','#6BB5CA','#A4D4C4','#5ABACA','#C0D8CC','#82C8D4'],
  ['#C4A0C0','#D4B8CC','#B890C4','#E0C0DC','#C8A8D8','#D8B8EC'],
  ['#D4CC7A','#C8B84A','#E0D890','#C8C460','#DCD490','#BCC048'],
  ['#E88898','#D86878','#F4A8B4','#E090A0','#F0B8C4','#DC7888'],
];
const _blobOpacities = [0.82, 0.70, 0.65, 0.60, 0.45, 0.55];
let _paletteCurrent = 0, _paletteTarget = 0, _paletteT = 1.0;

function _lerpHex(a, b, t) {
  const r1=parseInt(a.slice(1,3),16), g1=parseInt(a.slice(3,5),16), b1=parseInt(a.slice(5,7),16);
  const r2=parseInt(b.slice(1,3),16), g2=parseInt(b.slice(3,5),16), b2=parseInt(b.slice(5,7),16);
  const r=Math.round(r1+(r2-r1)*t), g=Math.round(g1+(g2-g1)*t), bv=Math.round(b1+(b2-b1)*t);
  return `rgba(${r},${g},${bv},`;
}

function changeBlobPalette() {
  _paletteCurrent = _paletteTarget;
  _paletteTarget  = (_paletteCurrent + 1) % _blobPalettes.length;
  _paletteT = 0;
}

function openHaikuPoster() {
  const poster = document.getElementById('haiku-poster');
  if (!poster) return;
  poster.classList.add('hp-open');
  document.body.style.overflow = 'hidden';
  if (typeof lenis !== 'undefined') lenis.stop();
  if (!haikuPosterInitialized) { haikuPosterInitialized = true; initHaikuPoster(); }
  else { resetStoryPoster(); fetchAndRevealStories(); }
}
function closeHaikuPoster() {
  const poster = document.getElementById('haiku-poster');
  if (!poster) return;
  poster.classList.remove('hp-open');
  document.body.style.overflow = '';
  document.body.classList.remove('hp-hover');
  if (typeof lenis !== 'undefined') lenis.start();
}
document.addEventListener('keydown', e => {
  const p = document.getElementById('haiku-poster');
  if (!p || !p.classList.contains('hp-open')) return;
  if (e.key === 'Escape') closeHaikuPoster();
  if (e.key === ' ' || e.key === 'ArrowRight') { e.preventDefault(); advanceStory(); }
});

function initBlobCanvas() {
  const canvas = document.getElementById('hp-blob-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const blobs = [
    { x:0.55, y:0.18, r:0.38, vx:0.00018,  vy:0.00012  },
    { x:0.25, y:0.45, r:0.32, vx:-0.00014, vy:0.00016  },
    { x:0.72, y:0.62, r:0.30, vx:0.00010,  vy:-0.00018 },
    { x:0.42, y:0.72, r:0.36, vx:-0.00016, vy:-0.00010 },
    { x:0.50, y:0.50, r:0.28, vx:0.00008,  vy:0.00014  },
    { x:0.80, y:0.28, r:0.25, vx:-0.00012, vy:0.00008  },
  ];
  let mouseX = 0.5, mouseY = 0.5;
  document.addEventListener('mousemove', e => { mouseX = e.clientX / window.innerWidth; mouseY = e.clientY / window.innerHeight; });
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  let t = 0;
  function draw() {
    if (!document.getElementById('haiku-poster').classList.contains('hp-open')) { requestAnimationFrame(draw); return; }
    t++;
    // Advance palette transition
    if (_paletteT < 1) _paletteT = Math.min(1, _paletteT + 0.006);
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
    const pA = _blobPalettes[_paletteCurrent], pB = _blobPalettes[_paletteTarget];
    blobs.forEach((b, i) => {
      b.x += b.vx * Math.sin(t * 0.003 + i * 1.2);
      b.y += b.vy * Math.cos(t * 0.004 + i * 0.9);
      b.x += (mouseX - b.x) * 0.0003;
      b.y += (mouseY - b.y) * 0.0003;
      if (b.x < 0.05 || b.x > 0.95) b.vx *= -1;
      if (b.y < 0.05 || b.y > 0.95) b.vy *= -1;
      const cx = b.x * W, cy = b.y * H, radius = b.r * Math.min(W, H);
      const op = _blobOpacities[i];
      // Interpolate colour between palettes
      const prefix = _lerpHex(pA[i], pB[i], _paletteT);
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0,   prefix + op + ')');
      grad.addColorStop(0.5, prefix + (op * 0.5) + ')');
      grad.addColorStop(1,   prefix + '0)');
      ctx.globalCompositeOperation = 'multiply';
      ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = grad; ctx.fill();
    });
    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(draw);
  }
  draw();
}

function initGrain() {
  const c = document.getElementById('hgrain'); if (!c) return;
  const ctx = c.getContext('2d');
  function resize() { c.width = window.innerWidth; c.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  let fr = 0;
  (function loop() { if (++fr % 2 === 0) { const img = ctx.createImageData(c.width, c.height); for (let i=0;i<img.data.length;i+=4){ const v=Math.random()*255|0; img.data[i]=img.data[i+1]=img.data[i+2]=v; img.data[i+3]=24; } ctx.putImageData(img,0,0); } requestAnimationFrame(loop); })();
}

function initHaikuCursor() {
  const dot=document.getElementById('h-cur-dot'), ring=document.getElementById('h-cur-ring');
  if (!dot) return;
  let mx=innerWidth/2, my=innerHeight/2, rx=mx, ry=my;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
  (function loop() { rx+=(mx-rx)*.1; ry+=(my-ry)*.1; dot.style.left=mx+'px'; dot.style.top=my+'px'; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(loop); })();
}

function initParallax() {
  const lB=document.getElementById('h-layer-bg'), lP=document.getElementById('h-layer-poem'), lM=document.getElementById('h-layer-meta');
  if (!lP) return;
  let tx=0, ty=0, mx=0, my=0;
  document.addEventListener('mousemove', e => { mx=(e.clientX/innerWidth-.5)*2; my=(e.clientY/innerHeight-.5)*2; });
  (function loop() {
    tx+=(mx-tx)*.05; ty+=(my-ty)*.05;
    if (lB) lB.style.transform=`translate(${tx*10}px,${ty*7}px)`;
    if (lP) lP.style.transform=`translate(${tx*4}px,${ty*3}px)`;
    if (lM) lM.style.transform=`translate(${tx*16}px,${ty*11}px)`;
    requestAnimationFrame(loop);
  })();
}

function showStory(idx) {
  if (_hpRevealing) return;
  _hpRevealing = true;
  const story = _hpStories[idx];
  if (!story) { _hpRevealing = false; return; }
  const wrap = document.getElementById('h-poem-wrap');
  const cont = document.getElementById('hp-continue');
  const brCorner = document.getElementById('hp-c-br');
  wrap.innerHTML = '';
  if (cont) { cont.classList.remove('visible'); cont.classList.add('fading'); }
  if (brCorner) brCorner.textContent = (idx+1) + ' / ' + _hpStories.length;

  // Affirmations are single-line — use the first (and only) line
  const text = Array.isArray(story.lines) ? story.lines[0] : story;
  const span = document.createElement('span');
  span.className = 'story-line';
  span.textContent = text;
  wrap.appendChild(span);

  const base = idx === 0 ? 320 : 150;
  setTimeout(() => { span.classList.add('visible'); }, base);
  setTimeout(() => {
    if (cont) { cont.classList.remove('fading'); cont.classList.add('visible'); }
    _hpRevealing = false;
    // Wire echo interaction once revealed
    span.addEventListener('click', e => {
      e.stopPropagation();
      triggerEcho(e.clientX, e.clientY);
      setTimeout(advanceStory, 600);
    });
    span.onmouseenter = () => document.body.classList.add('hp-hover');
    span.onmouseleave = () => document.body.classList.remove('hp-hover');
  }, base + 1200);
}

function triggerEcho(x, y) {
  // Change blob palette on each interaction
  changeBlobPalette();
  // Ring ripple at click position
  const ring = document.getElementById('affirmation-ring');
  if (ring) {
    ring.style.left = x + 'px';
    ring.style.top  = y + 'px';
    ring.classList.remove('ripple');
    void ring.offsetWidth;
    ring.classList.add('ripple');
  }
}

function advanceStory() {
  if (_hpRevealing || _hpOnFinalSlide) return;
  const p = document.getElementById('haiku-poster');
  if (!p || !p.classList.contains('hp-open')) return;

  _hpRevealing = true;

  // Blur out current text
  const line = document.querySelector('#h-poem-wrap .story-line');
  const cont = document.getElementById('hp-continue');
  if (cont) { cont.classList.remove('visible'); cont.classList.add('fading'); }
  if (line) { line.classList.remove('visible'); line.classList.add('blurring-out'); }

  setTimeout(() => {
    if (_hpIndex < _hpStories.length - 1) {
      _hpIndex++;
      _hpRevealing = false;
      showStory(_hpIndex);
    } else {
      showFinalSlide();
    }
  }, 850);
}

function showFinalSlide() {
  _hpOnFinalSlide = true;
  const wrap = document.getElementById('h-poem-wrap');
  const brCorner = document.getElementById('hp-c-br');
  wrap.innerHTML = '';
  if (brCorner) brCorner.textContent = '';

  const thanks = document.createElement('span');
  thanks.className = 'story-line';
  thanks.textContent = 'thank you for being here.';
  wrap.appendChild(thanks);

  const back = document.createElement('button');
  back.className = 'affirmation-back-btn';
  back.textContent = '← back to lab';
  back.addEventListener('click', e => { e.stopPropagation(); closeHaikuPoster(); });
  wrap.appendChild(back);

  setTimeout(() => thanks.classList.add('visible'), 100);
  setTimeout(() => { back.classList.add('visible'); _hpRevealing = false; }, 900);
}

function initHaikuPoster() {
  initBlobCanvas(); initGrain(); initHaikuCursor(); initParallax();
  const inner = document.getElementById('haiku-poster-inner');
  if (inner) inner.addEventListener('click', e => {
    if (e.target.closest('#hp-back') || e.target.closest('.affirmation-back-btn') || e.target.closest('.story-line')) return;
    if (_hpOnFinalSlide) return;
    triggerEcho(e.clientX, e.clientY);
    setTimeout(advanceStory, 600);
  });
  fetchAndRevealStories();
}

function resetStoryPoster() {
  _hpStories=[]; _hpIndex=0; _hpRevealing=false; _hpOnFinalSlide=false;
  _paletteCurrent=0; _paletteTarget=0; _paletteT=1.0;
  const wrap=document.getElementById('h-poem-wrap'); if(wrap) wrap.innerHTML='';
  const loader=document.getElementById('loader');
  if(loader) { loader.classList.remove('out'); loader.style.opacity='1'; loader.style.pointerEvents=''; }
  document.querySelectorAll('.hp-corner').forEach(el => el.classList.remove('visible'));
  const cont=document.getElementById('hp-continue'); if(cont) cont.classList.remove('visible','fading');
  const brCorner=document.getElementById('hp-c-br'); if(brCorner) brCorner.textContent='';
  const ring=document.getElementById('affirmation-ring'); if(ring) ring.classList.remove('ripple');
}

async function fetchAndRevealStories() {
  const hour = new Date().getHours();

  // early morning (5am–8am)
  const earlyMorning = [
    { lines:["the world hasn't asked anything of you yet. right now, you belong entirely to yourself. that's not nothing — that's everything."] },
    { lines:["you woke up and chose to keep going. not out of obligation. out of something quieter. something that still believes in what's ahead."] },
    { lines:["there's a version of today that only you can make. not perfect, not polished — just yours. and that's what makes it worth showing up for."] },
    { lines:["before the noise starts, notice this: you are already whole. the day gets to have you, not the other way around."] },
  ];

  // morning (8am–12pm)
  const morning = [
    { lines:["you're building something — maybe you can't name it yet, but your hands know. trust them. they've been right before."] },
    { lines:["the things that scare you a little? those are the doors. you don't have to sprint through them. just don't walk away."] },
    { lines:["someone out there is better off because you exist. you probably won't hear about it today. but it's true, and it's not small."] },
    { lines:["you don't need to earn rest, or permission, or space. you just need to take it. the world adjusts — it always does."] },
  ];

  // afternoon (12pm–5pm)
  const afternoon = [
    { lines:["halfway through and still here. that's not endurance — that's choice. you keep choosing this. give yourself credit for that."] },
    { lines:["the part of you that's tired is not the part of you that's weak. it's the part that's been carrying the most. let it breathe."] },
    { lines:["you don't have to finish everything today. some things are better left mid-sentence. you'll know exactly where you stopped."] },
    { lines:["right now, somewhere, something you set in motion is still moving. a word you said. a choice you made. it's still landing."] },
  ];

  // evening (5pm–9pm)
  const evening = [
    { lines:["you survived another one. not just survived — you shaped it. even the messy parts had your fingerprints on them, and that matters."] },
    { lines:["the version of you from this morning would be proud of where you are right now. not because it was easy. because you stayed."] },
    { lines:["let the day settle like dust. what's underneath is still you — unfinished and full of potential. that hasn't changed."] },
    { lines:["you gave more than you think today. the proof isn't always visible. sometimes the most important work leaves no trace."] },
  ];

  // night (9pm–5am)
  const night = [
    { lines:["the dark is not an ending. it's the world giving you permission to stop performing. you can just be here now."] },
    { lines:["tomorrow doesn't need your worry tonight. it needs you rested. it needs you soft. let it wait — it will."] },
    { lines:["you made it through a whole day of being human. that's brave in ways no one talks about. sleep knowing that."] },
    { lines:["the things keeping you up — they're lighter than they feel. you've carried heavier. and here you are, still breathing, still here."] },
  ];

  let stories;
  if (hour >= 5 && hour < 8) stories = earlyMorning;
  else if (hour >= 8 && hour < 12) stories = morning;
  else if (hour >= 12 && hour < 17) stories = afternoon;
  else if (hour >= 17 && hour < 21) stories = evening;
  else stories = night;

  _hpStories = [...stories].sort(() => Math.random()-.5);
  const loader=document.getElementById('loader');
  setTimeout(() => { if(loader) loader.classList.add('out'); }, 200);
  setTimeout(() => {
    _hpIndex=0; showStory(0);
    document.querySelectorAll('.hp-corner').forEach(el => el.classList.add('visible'));
  }, 550);
}

/* ══════════════════════════════════════════════
   VITRIUM OPUS POSTER
══════════════════════════════════════════════ */
function initVitriumCursor() {
  const main = document.getElementById('vp-main');
  if (!main) return;
  const lines = Array.from(main.querySelectorAll('.vp-line'));
  let ticking = false;

  main.addEventListener('mousemove', e => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      lines.forEach(line => {
        const r = line.getBoundingClientRect();
        const cx = r.left + r.width * 0.5;
        const cy = r.top  + r.height * 0.5;
        const d = Math.hypot(e.clientX - cx, e.clientY - cy);
        const blur = Math.min(22, (d / 360) * 22);
        line.style.setProperty('--vp-blur', blur + 'px');
      });
      ticking = false;
    });
  });

  main.addEventListener('mouseleave', () => {
    lines.forEach(l => l.style.removeProperty('--vp-blur'));
  });
}

function openVitriumPoster() {
  const poster = document.getElementById('vitrium-poster');
  if (!poster) return;
  poster.style.display = 'flex';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { poster.classList.add('vp-open'); });
  });
  document.body.style.overflow = 'hidden';
  if (typeof lenis !== 'undefined') lenis.stop();
  initVitriumCursor();
}

function closeVitriumPoster() {
  const poster = document.getElementById('vitrium-poster');
  if (!poster) return;
  poster.classList.remove('vp-open');
  poster.addEventListener('transitionend', () => {
    if (!poster.classList.contains('vp-open')) poster.style.display = 'none';
  }, { once: true });
  document.body.style.overflow = '';
  if (typeof lenis !== 'undefined') lenis.start();
}

document.addEventListener('keydown', e => {
  const p = document.getElementById('vitrium-poster');
  if (!p || !p.classList.contains('vp-open')) return;
  if (e.key === 'Escape') closeVitriumPoster();
});

/* ── NEWSPAPER POSTER ─────────────────────────────── */
function openNpPoster() {
  const poster = document.getElementById('np-poster');
  if (!poster) return;
  poster.style.display = 'flex';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { poster.classList.add('np-open'); });
  });
  document.body.style.overflow = 'hidden';
  if (typeof lenis !== 'undefined') lenis.stop();
  initNpPoster();
}

function closeNpPoster() {
  const poster = document.getElementById('np-poster');
  if (!poster) return;
  poster.classList.remove('np-open');
  setTimeout(() => { poster.style.display = 'none'; }, 900);
  document.body.style.overflow = '';
  if (typeof lenis !== 'undefined') lenis.start();
}

function initNpPoster() {
  animateNpEntry();
  const overlay = document.getElementById('np-overlay-text');
  if (overlay && !overlay.dataset.magneticInited) {
    overlay.dataset.magneticInited = '1';
    initNpLetterMagnetic();
  }
}

function animateNpEntry() {
  const words = document.querySelectorAll('#np-overlay-text .np-word');
  const cols  = document.getElementById('np-columns');
  if (!cols || !words.length) return;

  gsap.set(cols,  { opacity: 0, scale: 1.04 });
  gsap.set(words, { opacity: 0 });

  const tl = gsap.timeline({ delay: 0.5 });
  tl.to(cols, { opacity: 1, scale: 1, duration: 0.65, ease: 'power2.out' });
  tl.fromTo(
    words,
    { opacity: 0, scaleY: 1.28, y: 22, transformOrigin: 'left bottom' },
    { opacity: 1, scaleY: 1,    y: 0,  duration: 0.38, stagger: 0.09, ease: 'power4.out' },
    '-=0.15'
  );
}

function initNpLetterMagnetic() {
  const body    = document.getElementById('np-body');
  const overlay = document.getElementById('np-overlay-text');
  if (!body || !overlay) return;

  const letters = Array.from(overlay.querySelectorAll('.np-letter'));
  const MAG_R   = 200;   // full magnetic pull + tilt
  const TILT_R  = 420;   // tilt-only beyond MAG_R

  // Per-letter 3D perspective so rotateX/Y are visible
  gsap.set(letters, { transformPerspective: 700 });

  // quickTo: pre-built per-frame setters — far cheaper than gsap.to() per frame
  const qs = letters.map(l => ({
    el:  l,
    x:   gsap.quickTo(l, 'x',       { duration: 0.38, ease: 'power3.out' }),
    y:   gsap.quickTo(l, 'y',       { duration: 0.38, ease: 'power3.out' }),
    rX:  gsap.quickTo(l, 'rotateX', { duration: 0.38, ease: 'power3.out' }),
    rY:  gsap.quickTo(l, 'rotateY', { duration: 0.38, ease: 'power3.out' }),
    sc:  gsap.quickTo(l, 'scale',   { duration: 0.38, ease: 'power3.out' }),
  }));

  let ticking = false;

  body.addEventListener('mousemove', e => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      qs.forEach(({ el, x, y, rX, rY, sc }) => {
        const rect = el.getBoundingClientRect();
        const cx   = rect.left + rect.width  * 0.5;
        const cy   = rect.top  + rect.height * 0.5;
        const dx   = e.clientX - cx;
        const dy   = e.clientY - cy;
        const dist = Math.hypot(dx, dy);

        if (dist < MAG_R) {
          // Magnetic zone: pull + 3D tilt + scale
          const t  = 1 - dist / MAG_R;
          const t2 = t * t;            // quadratic falloff — feels physical
          x(dx * t2 * 0.52);
          y(dy * t2 * 0.52);
          rX(-(dy / MAG_R) * 24 * t);
          rY( (dx / MAG_R) * 36 * t);
          sc(1 + t2 * 0.1);
        } else if (dist < TILT_R) {
          // Outer zone: letters tilt to face cursor, no translate
          const t = 1 - (dist - MAG_R) / (TILT_R - MAG_R);
          x(0); y(0); sc(1);
          rX(-(dy / dist) * 9 * t);
          rY( (dx / dist) * 13 * t);
        } else {
          x(0); y(0); rX(0); rY(0); sc(1);
        }
      });
      ticking = false;
    });
  });

  body.addEventListener('mouseleave', () => {
    letters.forEach(l =>
      gsap.to(l, {
        x: 0, y: 0, rotateX: 0, rotateY: 0, scale: 1,
        duration: 0.9, ease: 'elastic.out(1, 0.45)', overwrite: 'auto'
      })
    );
  });
}

document.addEventListener('keydown', e => {
  const p = document.getElementById('np-poster');
  if (!p || !p.classList.contains('np-open')) return;
  if (e.key === 'Escape') closeNpPoster();
});

/* ── SERENE APP ─────────────────────────────── */
function openSerenePoster() {
  const poster  = document.getElementById('serene-poster');
  const frame   = document.getElementById('sp-frame');
  const labOver = document.getElementById('lab-overlay');
  if (!poster) return;
  if (labOver) {
    labOver.classList.remove('lab-overlay-open');
    const labBtn = document.getElementById('sb-lab');
    if (labBtn) labBtn.classList.remove('lab-open');
  }
  if (!frame.src || frame.src === 'about:blank' || frame.src === window.location.href) frame.src = 'serene.html';
  poster.style.display = 'block';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { poster.classList.add('sp-open'); });
  });
  document.body.classList.add('iframe-open');
  document.body.style.overflow = 'hidden';
  if (typeof lenis !== 'undefined') lenis.stop();
}

function closeSerenePoster() {
  const poster = document.getElementById('serene-poster');
  if (!poster) return;
  poster.classList.remove('sp-open');
  poster.addEventListener('transitionend', () => {
    if (!poster.classList.contains('sp-open')) poster.style.display = 'none';
  }, { once: true });
  document.body.classList.remove('iframe-open');
  document.body.style.overflow = '';
  if (typeof lenis !== 'undefined') lenis.start();
}

function openFitnessDashboard() {
  const poster  = document.getElementById('fitness-poster');
  const frame   = document.getElementById('fp-frame');
  const labOver = document.getElementById('lab-overlay');
  if (!poster) return;
  if (labOver) {
    labOver.classList.remove('lab-overlay-open');
    const labBtn = document.getElementById('sb-lab');
    if (labBtn) labBtn.classList.remove('lab-open');
  }
  if (!frame.src || frame.src === 'about:blank' || frame.src === window.location.href) frame.src = 'fitness-dashboard.html';
  poster.style.display = 'block';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { poster.classList.add('fp-open'); });
  });
  document.body.classList.add('iframe-open');
  document.body.style.overflow = 'hidden';
  if (typeof lenis !== 'undefined') lenis.stop();
}

function closeFitnessDashboard() {
  const poster = document.getElementById('fitness-poster');
  if (!poster) return;
  poster.classList.remove('fp-open');
  poster.addEventListener('transitionend', () => {
    if (!poster.classList.contains('fp-open')) poster.style.display = 'none';
  }, { once: true });
  document.body.classList.remove('iframe-open');
  document.body.style.overflow = '';
  if (typeof lenis !== 'undefined') lenis.start();
}

document.addEventListener('keydown', e => {
  const p = document.getElementById('serene-poster');
  if (!p || !p.classList.contains('sp-open')) return;
  if (e.key === 'Escape') closeSerenePoster();
});

/* ── MOBILE NAV ──────────────────────────────── */
(function() {
  const menuBtn   = document.getElementById('mob-nav-menu');
  const overlay   = document.getElementById('mob-menu-overlay');
  const closeBtn  = document.getElementById('mob-menu-close');
  const labBtn      = document.getElementById('mob-lab-btn');
  const projectsBtn = document.getElementById('mob-projects-btn');
  const talkBtn     = document.getElementById('mob-talk-btn');
  const resumeBtn   = document.getElementById('mob-resume-btn');
  if (!menuBtn || !overlay) return;

  function openMenu() {
    overlay.classList.add('mob-menu-open');
    overlay.removeAttribute('aria-hidden');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    overlay.classList.remove('mob-menu-open');
    overlay.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openMenu);
  closeBtn && closeBtn.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('mob-menu-open')) closeMenu();
  });

  labBtn && labBtn.addEventListener('click', () => {
    closeMenu();
    const labBtnSidebar = document.getElementById('sb-lab');
    if (labBtnSidebar) labBtnSidebar.click();
    else if (typeof openLab === 'function') openLab();
  });

  projectsBtn && projectsBtn.addEventListener('click', () => {
    closeMenu();
    const work = document.getElementById('work');
    if (work) work.scrollIntoView({ behavior: 'smooth' });
  });

  talkBtn && talkBtn.addEventListener('click', () => {
    closeMenu();
    const talkBtnSidebar = document.getElementById('sb-talk');
    if (talkBtnSidebar) talkBtnSidebar.click();
  });

  resumeBtn && resumeBtn.addEventListener('click', () => {
    closeMenu();
    const resumeBtnSidebar = document.getElementById('sb-resume');
    if (resumeBtnSidebar) resumeBtnSidebar.click();
  });
})();

// ── HERO PHOTO STACK: internal ticker slideshow ──────────────────────────
(function() {
  const stack = document.getElementById('heroPhotoStack');
  if (!stack) return;

  const ticker  = stack.querySelector('.hps-ticker');
  const N       = stack.querySelectorAll('.hps-slide').length; // 8
  const slideH  = 100 / N; // 12.5% per slide
  let current   = 0;
  let hovered   = false;

  stack.addEventListener('mouseenter', () => { hovered = true; });
  stack.addEventListener('mouseleave', () => { hovered = false; });

  function nextSlide() {
    if (hovered) return;

    current++;

    if (current >= N) {
      // Instant jump back to top, then advance to slide 1
      ticker.style.transition = 'none';
      ticker.style.setProperty('--slide-offset', '0%');
      ticker.offsetHeight; // force reflow
      ticker.style.transition = '';
      current = 1;
    }

    ticker.style.setProperty('--slide-offset', `-${current * slideH}%`);
  }

  setInterval(nextSlide, 2600);
})();

window.formspree = window.formspree || function () { (formspree.q = formspree.q || []).push(arguments); };

    const popup = document.getElementById('contact-success-popup');
    const popupCloseBtn = document.getElementById('popup-close-btn');

    popupCloseBtn.addEventListener('click', () => {
      popup.style.setProperty('display', 'none', 'important');
    });

    formspree('initForm', {
      formElement: '#contact-form',
      formId: 'mbdpqvba',
      onSuccess: () => {
        popup.style.setProperty('display', 'flex', 'important');
        setTimeout(() => {
          popup.style.setProperty('display', 'none', 'important');
          // Reset form
          document.getElementById('contact-form').reset();
        }, 2500);
      }
    });

    formspree('initForm', {
      formElement: '#quick-contact-form',
      formId: 'mbdpqvba',
      onSuccess: () => {
        popup.style.setProperty('display', 'flex', 'important');
        setTimeout(() => {
          popup.style.setProperty('display', 'none', 'important');
          // Reset form
          document.getElementById('quick-contact-form').reset();
        }, 2500);
      }
    });

/* ── Record Player ── */
(function(){
  var record = document.getElementById('hrcRecord');
  var arm    = document.getElementById('hrcArm'); // SVG tonearm
  var btn    = document.getElementById('hrcPlay');
  var icon   = document.getElementById('hrcPlayIcon');
  if(!record || !btn) return;
  var playing = false;
  var PLAY  = '<path d="M8 5v14l11-7z"/>';
  var PAUSE = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';

  /* ── Lofi audio via Web Audio API (no external files needed) ── */
  var ctx, masterGain, lofiInterval;

  function initAudio() {
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.18, ctx.currentTime);
    masterGain.connect(ctx.destination);
  }

  /* Vinyl crackle — low-pass filtered white noise bursts */
  function startCrackle() {
    var bufSize = ctx.sampleRate * 2;
    var buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    var data = buf.getChannelData(0);
    for (var i = 0; i < bufSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (Math.random() < 0.003 ? 0.9 : 0.015);
    }
    var src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    var lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 3200;
    var crackleGain = ctx.createGain();
    crackleGain.gain.value = 0.22;
    src.connect(lp);
    lp.connect(crackleGain);
    crackleGain.connect(masterGain);
    src.start();
    return src;
  }

  /* One lofi chord — stacked detuned sines */
  function playChord(notes, time, dur) {
    notes.forEach(function(freq) {
      var osc = ctx.createOscillator();
      var g   = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq + (Math.random() - 0.5) * 3;
      g.gain.setValueAtTime(0, time);
      g.gain.linearRampToValueAtTime(0.08, time + 0.06);
      g.gain.exponentialRampToValueAtTime(0.001, time + dur);
      osc.connect(g);
      g.connect(masterGain);
      osc.start(time);
      osc.stop(time + dur + 0.05);
    });
  }

  /* Sub-bass pluck */
  function playBass(freq, time, dur) {
    var osc = ctx.createOscillator();
    var g   = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.92, time + dur);
    g.gain.setValueAtTime(0.18, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + dur);
    osc.connect(g);
    g.connect(masterGain);
    osc.start(time);
    osc.stop(time + dur + 0.05);
  }

  /* Soft hi-hat click */
  function playHat(time, accent) {
    var buf = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate);
    var d   = buf.getChannelData(0);
    for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    var src = ctx.createBufferSource();
    src.buffer = buf;
    var hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 8000;
    var g = ctx.createGain();
    g.gain.setValueAtTime(accent ? 0.07 : 0.035, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
    src.connect(hp); hp.connect(g); g.connect(masterGain);
    src.start(time);
  }

  /* Kick thud */
  function playKick(time) {
    var osc = ctx.createOscillator();
    var g   = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, time);
    osc.frequency.exponentialRampToValueAtTime(40, time + 0.15);
    g.gain.setValueAtTime(0.5, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + 0.25);
    osc.connect(g); g.connect(masterGain);
    osc.start(time); osc.stop(time + 0.3);
  }

  /* Snare snap */
  function playSnare(time) {
    var buf = ctx.createBuffer(1, ctx.sampleRate * 0.18, ctx.sampleRate);
    var d   = buf.getChannelData(0);
    for (var i = 0; i < d.length; i++) d[i] = (Math.random()*2-1) * Math.pow(1 - i/d.length, 1.5);
    var src = ctx.createBufferSource();
    src.buffer = buf;
    var g = ctx.createGain();
    g.gain.value = 0.28;
    src.connect(g); g.connect(masterGain);
    src.start(time);
  }

  /* Lofi chord progressions (Cmin jazz flavour) */
  var progressions = [
    [[130.8,196,233.1,311.1], 65.4],   // Cm7
    [[116.5,174.6,207.7,261.6], 58.3],  // Bbmaj7
    [[138.6,185,220,277.2], 69.3],      // Ebmaj7
    [[123.5,185,220,293.7], 61.7]       // Fm7
  ];

  var crackleNode = null;
  var scheduleId  = null;
  var beatIndex   = 0;

  function scheduleBeat() {
    var now   = ctx.currentTime;
    var bpm   = 78;
    var beat  = 60 / bpm;
    var bar   = beat * 4;
    var prog  = progressions[beatIndex % progressions.length];

    // Chord on beat 1
    playChord(prog[0], now, bar * 0.9);
    playBass(prog[1], now, beat * 0.7);

    // Drums across 8 steps
    for (var s = 0; s < 8; s++) {
      var t = now + s * (beat / 2);
      // Kick on 1 & sometimes 3
      if (s === 0) playKick(t);
      if (s === 4 && Math.random() > 0.4) playKick(t);
      // Snare on 2 & 4
      if (s === 2 || s === 6) playSnare(t);
      // Hi-hats on every step, accent on odd
      playHat(t, s % 2 === 0);
    }

    beatIndex++;
    scheduleId = setTimeout(scheduleBeat, bar * 1000 - 40);
  }

  var crackle;

  function startLofi() {
    initAudio();
    if (ctx.state === 'suspended') ctx.resume();
    crackle = startCrackle();
    scheduleBeat();
  }

  function stopLofi() {
    if (scheduleId) { clearTimeout(scheduleId); scheduleId = null; }
    if (crackle) { try { crackle.stop(); } catch(e){} crackle = null; }
    if (ctx) {
      masterGain.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
      setTimeout(function(){
        if (ctx) ctx.suspend();
        masterGain.gain.setValueAtTime(0.18, ctx.currentTime);
      }, 600);
    }
  }

  btn.addEventListener('click', function(){
    playing = !playing;
    if(playing){
      record.classList.add('spinning');
      if(arm) arm.classList.add('playing');
      icon.innerHTML = PAUSE;
      startLofi();
    } else {
      record.classList.remove('spinning');
      if(arm) arm.classList.remove('playing');
      icon.innerHTML = PLAY;
      stopLofi();
    }
  });
})();
document.documentElement.classList.add('js');

/* ---------- image fallback ----------
   While uploading images one by one to GitHub, any image that
   isn't there yet is automatically replaced with a branded
   "Coming soon" placeholder, so the layout never breaks. */
(function(){
  function placeholder(label){
    label = (label || 'Coming soon').replace(/[<>&]/g, '');
    const svg =
      "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>" +
      "<rect width='800' height='600' fill='#F3E8DE'/>" +
      "<circle cx='400' cy='250' r='34' fill='#D6481F'/>" +
      "<text x='400' y='340' fill='#8C7868' font-family='Space Grotesk,sans-serif' font-size='32' font-weight='600' text-anchor='middle'>" + label + "</text>" +
      "<text x='400' y='386' fill='#A8907E' font-family='sans-serif' font-size='22' font-weight='500' text-anchor='middle'>Coming soon</text>" +
      "</svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  function handle(img){
    if(img.dataset.phApplied) return;
    img.dataset.phApplied = '1';
    img.src = placeholder(img.getAttribute('alt'));
  }
  document.querySelectorAll('img').forEach(function(img){
    img.addEventListener('error', function(){ handle(img); }, { once:true });
    if(img.complete && img.naturalWidth === 0) handle(img);
  });
})();

/* ---------- marquee ---------- */
(function(){
  const kw = ['BRAND PLANNING','AI CREATIVE','SHORT-FORM','D2C LAUNCH','WADIZ 411%','890K VIEWS','PROMPT DIRECTION','COST −71%','CONTENT STRATEGY','GLOBAL COMM.'];
  const row = document.getElementById('marquee');
  if(row){
    const make = () => kw.map(k=>`<span class="t">${k}</span>`).join('');
    row.innerHTML = make() + make();
  }
})();

/* ---------- count-up ---------- */
function countUp(el){
  const raw = el.dataset.to;
  const to = parseFloat(raw);
  const decimals = (raw.split('.')[1] || '').length;
  const suf = el.dataset.suffix || '';
  const em = el.querySelector('em');
  const set = (txt) => { if(em) em.textContent = txt; else el.textContent = txt; };
  set('0' + suf);
  const dur = 1500, t0 = performance.now();
  function tick(now){
    const p = Math.min(1, (now - t0) / dur);
    const e = 1 - Math.pow(1 - p, 3);
    const val = decimals ? (to * e).toFixed(decimals) : Math.round(to * e);
    set(val + suf);
    if(p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
/* ---------- scroll-driven reveal + count-up (robust, no IO dependency) ---------- */
function inView(el, ratio){
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  if(r.height === 0) return r.top < vh && r.bottom > 0;
  const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
  return visible > 0 && (visible / Math.min(r.height, vh)) >= (ratio || 0.12);
}
const reveals = Array.from(document.querySelectorAll('.reveal'));
const counters = Array.from(document.querySelectorAll('.cu'));
function checkAnimations(){
  for(let i = reveals.length - 1; i >= 0; i--){
    if(inView(reveals[i], 0.1)){ reveals[i].classList.add('in'); reveals.splice(i,1); }
  }
  for(let i = counters.length - 1; i >= 0; i--){
    if(inView(counters[i], 0.4)){ countUp(counters[i]); counters.splice(i,1); }
  }
}
window.addEventListener('scroll', checkAnimations, { passive: true });
window.addEventListener('resize', checkAnimations, { passive: true });
// initial passes (cover layout/font settle)
checkAnimations();
requestAnimationFrame(checkAnimations);
setTimeout(checkAnimations, 250);
setTimeout(checkAnimations, 700);

/* ---------- nav scrolled state ---------- */
const nav = document.getElementById('nav');
let lastScroll = 0;
window.addEventListener('scroll', ()=>{
  const y = window.scrollY;
  if(nav){ nav.style.boxShadow = y > 12 ? '0 6px 24px -16px rgba(40,22,14,.45)' : 'none'; }
  lastScroll = y;
}, { passive: true });

/* ---------- hero parallax ---------- */
const portrait = document.querySelector('.hero-portrait .ph');
if(portrait && !matchMedia('(prefers-reduced-motion: reduce)').matches){
  window.addEventListener('scroll', ()=>{
    const y = window.scrollY;
    if(y < 900) portrait.style.transform = `translateY(${y * 0.06}px)`;
  }, { passive: true });
}

/* ---------- video lightbox ---------- */
const vData = {
  musinsa: {
    title: 'Musinsa "Mujinjang" AI Campaign',
    desc: 'Reinterpreted Musinsa\u2019s sale message as a short-form ad that Gen Z would want to share. Built a fantasy-commerce story around an orange delivery box arriving in a rural yard, then produced the whole ad with AI image/video generation and editing. (Concept \u00b7 Prompting \u00b7 Shot composition \u00b7 Editing)',
    embed: 'https://www.youtube.com/embed/O58_2dOHyuo?autoplay=1', wide: true
  },
  abib: {
    title: 'Abib Skincare AI Ad',
    desc: 'Visualized the calming, hydrating feel of the Houttuynia toner through a forest, water-drop and natural-light mood. Studied beauty-ad references to set the brand tone, then produced a vertical short-form ad with AI image/video generation and editing. (Mood board \u00b7 Prompting \u00b7 Shot composition \u00b7 Editing)',
    embed: 'https://www.youtube.com/embed/tMi1n0cTZgU?autoplay=1', wide: false
  },
  pado: {
    title: 'Pado Project Brand Film',
    desc: 'A brand mood film tied to the Wadiz funding page. Through women of diverse body types wearing swimwear with confidence, it delivers an Inclusive \u00b7 Confident \u00b7 Comfort message. (Brand message design \u00b7 Film direction \u00b7 Funding-content tie-in)',
    embed: 'https://www.youtube.com/embed/zLakX2Ij8bo?autoplay=1', wide: false
  },
  timerider: {
    title: 'Time Rider — A Trip Through Memories',
    desc: 'A 1-minute emotional AI short built around Gyeongju World\'s Time Rider ride — a man revisits childhood memories with his dad and reaches out to the family beside him today. Entry for the 2026 Gyeongju World Time Rider AI short-form contest. (Concept · prompting · shot composition · editing)',
    embed: 'https://www.youtube.com/embed/N0_SnfqHhPE?autoplay=1', wide: false
  }
};
const lb = document.getElementById('lightbox');
const lbVideo = document.getElementById('lbVideo');
const lbTitle = document.getElementById('lbTitle');
const lbDesc = document.getElementById('lbDesc');

function openLightbox(key){
  const d = vData[key];
  if(!d) return;
  lbVideo.className = 'lb-video' + (d.wide ? ' wide' : '');
  lbVideo.innerHTML = `<iframe title="${d.title}" src="${d.embed}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  lbTitle.textContent = d.title;
  lbDesc.textContent = d.desc;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox(){
  lb.classList.remove('open');
  lbVideo.innerHTML = '';
  document.body.style.overflow = '';
}
document.querySelectorAll('.vid-card').forEach(card=>{
  card.addEventListener('click', ()=>openLightbox(card.dataset.video));
});
document.getElementById('lbClose').addEventListener('click', closeLightbox);
lb.addEventListener('click', (e)=>{ if(e.target === lb) closeLightbox(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeLightbox(); });

/* ---------- mobile nav (hamburger) ---------- */
(function(){
  const burger = document.getElementById('navBurger');
  const mnav = document.getElementById('mnav');
  if(!burger || !mnav) return;
  function close(){ mnav.classList.remove('open'); burger.classList.remove('open'); burger.setAttribute('aria-expanded','false'); }
  burger.addEventListener('click', ()=>{
    const open = mnav.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mnav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => { if(e.key === 'Escape') close(); });
  window.addEventListener('resize', ()=>{ if(window.innerWidth > 760) close(); }, { passive:true });
})();

/* ---------- vid-card keyboard access ---------- */
document.querySelectorAll('.vid-card').forEach(card=>{
  card.addEventListener('keydown', e=>{
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openLightbox(card.dataset.video); }
  });
});

document.documentElement.classList.add('js');

/* ---------- image fallback ----------
   GitHub에 이미지를 하나씩 올리는 동안, 아직 없는 이미지는
   브랜드 톤의 "이미지 준비 중" 자리표시로 자동 대체됩니다. */
(function(){
  function placeholder(label){
    label = (label || '이미지 준비 중').replace(/[<>&]/g, '');
    const svg =
      "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>" +
      "<rect width='800' height='600' fill='#F3E8DE'/>" +
      "<circle cx='400' cy='250' r='34' fill='#D6481F'/>" +
      "<text x='400' y='340' fill='#8C7868' font-family='Pretendard,sans-serif' font-size='34' font-weight='600' text-anchor='middle'>" + label + "</text>" +
      "<text x='400' y='386' fill='#A8907E' font-family='sans-serif' font-size='22' font-weight='500' text-anchor='middle'>이미지 준비 중</text>" +
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
  const kw = ['BRAND PLANNING','AI CREATIVE','SHORT-FORM','D2C LAUNCH','WADIZ 411%','89만 VIEWS','PROMPT DIRECTION','COST −71%','CONTENT STRATEGY','GLOBAL COMM.'];
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
    title: '무신사 무진장 AI 캠페인',
    desc: '무신사 세일 메시지를 Z세대가 공유하고 싶은 숏폼 광고로 재해석했습니다. 시골 마당에 도착한 주황 박스를 중심으로 한 판타지 커머스 스토리를 기획하고, AI 이미지·영상 생성과 편집으로 광고 콘텐츠를 구현했습니다. (콘셉트 기획 · 프롬프트 · 컷 구성 · 편집)',
    embed: 'https://www.youtube.com/embed/O58_2dOHyuo?autoplay=1', wide: true
  },
  abib: {
    title: '아비브 스킨케어 AI 광고',
    desc: '어성초 토너의 진정감과 수분감을 숲·물방울·자연광 무드로 시각화했습니다. 뷰티 광고 레퍼런스를 분석해 브랜드 톤을 설정하고, AI 이미지·영상 생성과 편집을 통해 세로형 숏폼 광고로 제작했습니다. (무드보드 · 프롬프트 · 컷 구성 · 편집)',
    embed: 'https://www.youtube.com/embed/tMi1n0cTZgU?autoplay=1', wide: false
  },
  pado: {
    title: '파도 프로젝트 브랜드 필름',
    desc: '와디즈 펀딩 상세페이지와 연결되는 브랜드 무드 영상입니다. 다양한 체형의 여성이 수영복을 당당하게 입는 모습을 통해 Inclusive · Confident · Comfort 메시지를 전달했습니다. (브랜드 메시지 설계 · 영상 방향 기획 · 펀딩 콘텐츠 연계)',
    embed: 'https://www.youtube.com/embed/zLakX2Ij8bo?autoplay=1', wide: false
  },
  timerider: {
    title: '타임라이더, 추억을 타는 시간여행',
    desc: '경주월드 타임라이더를 매개로, 어린 시절 아빠와의 추억을 다시 마주하고 가족에게 마음을 전하는 1분 감성 숏폼입니다. 2026 경주월드 타임라이더 AI 숏폼 출품작. (콘셉트 기획 · 프롬프트 · 컷 구성 · 편집)',
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

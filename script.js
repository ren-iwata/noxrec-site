const translations = {
  ja: {
    heroKicker: 'AN INDEPENDENT AI-NATIVE BUILDER',
    heroStatement: '未知が、未知ではなくなる瞬間をつくる。',
    discover: 'DISCOVER',
    hojinLead: 'AIエージェントに、日本企業を検証する能力を。',
    hojinCopy: '法人番号・インボイス登録・企業情報・住所・営業日。日本の公的データを、MCPとRESTでエージェントへ接続する検証基盤。',
    loopLead: '思考を、成果が生まれる閉回路へ。',
    loopCopy: 'AIとの会話から、制作・公開・反応まで。変換作業をAIへ渡し、人間の判断を連続的なアウトプットへ変える。',
    thesisStatement: 'AIを既存業務に<br />追加するのではない。<br /><em>AIが動く前提で、</em><br />会社そのものを<br />設計し直す。',
    principle1: 'AIを補助者ではなく、実行主体として扱う。',
    principle2: '作業ではなく、成果を再生産する構造をつくる。',
    principle3: '思想を実装し、市場で検証し、現実へ変える。',
    signalTitle: 'FOLLOW<br />THE SIGNAL.',
    footerLine: 'BECAUSE THE UNKNOWN IS NO LONGER UNKNOWN.'
  },
  en: {
    heroKicker: 'AN INDEPENDENT AI-NATIVE BUILDER',
    heroStatement: 'Turning the unknown into engineered reality.',
    discover: 'DISCOVER',
    hojinLead: 'Give AI agents the ability to verify Japan.',
    hojinCopy: 'Corporate identity, tax registration, profiles, addresses, and business days. Public Japanese data connected to agents through MCP and REST.',
    loopLead: 'Turn thought into a closed loop of outcomes.',
    loopCopy: 'From AI conversation to creation, publication, and response. Transformation work moves to AI; human judgment compounds into continuous output.',
    thesisStatement: 'DO NOT ADD AI<br />TO EXISTING WORK.<br /><em>REDESIGN THE COMPANY</em><br />AROUND AI<br />AS AN ACTOR.',
    principle1: 'Treat AI as an operating actor, not an assistant.',
    principle2: 'Build systems that reproduce outcomes, not isolated tasks.',
    principle3: 'Implement the thesis, test it in the market, make it real.',
    signalTitle: 'FOLLOW<br />THE SIGNAL.',
    footerLine: 'BECAUSE THE UNKNOWN IS NO LONGER UNKNOWN.'
  }
};

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
let language = 'ja';
const langToggle = document.querySelector('#langToggle');

function renderLanguage() {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const value = translations[language][node.dataset.i18n];
    if (value !== undefined) node.innerHTML = value;
  });
  langToggle.textContent = language === 'ja' ? 'EN' : 'JA';
}
langToggle.addEventListener('click', () => {
  language = language === 'ja' ? 'en' : 'ja';
  renderLanguage();
});
renderLanguage();
document.querySelector('#year').textContent = new Date().getFullYear();

// Split hero typography for launch-style reveal.
document.querySelectorAll('[data-split]').forEach((element) => {
  element.innerHTML = [...element.textContent].map((char) => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
});

window.addEventListener('load', () => {
  setTimeout(() => document.querySelector('.boot').classList.add('is-hidden'), 500);
  setTimeout(() => document.querySelectorAll('.hero__line').forEach((el, i) => setTimeout(() => el.classList.add('is-visible'), i * 110)), 650);
});

// Reveal system.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 5, 4) * 70}ms`;
  observer.observe(element);
});

// Header behavior and progress.
const header = document.querySelector('[data-header]');
const progress = document.querySelector('.scroll-progress i');
let lastScroll = 0;
function handleScroll() {
  const current = scrollY;
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? current / max : 0})`;
  header.classList.toggle('is-scrolled', current > 20);
  header.classList.toggle('is-hidden', current > lastScroll && current > 180 && !document.body.classList.contains('menu-open'));
  lastScroll = current;
}
addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// Menu.
const menuButton = document.querySelector('[data-menu-button]');
const menuPanel = document.querySelector('[data-menu-panel]');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuPanel.setAttribute('aria-hidden', 'true');
  menuPanel.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuPanel.setAttribute('aria-hidden', String(open));
  menuPanel.classList.toggle('is-open', !open);
  document.body.classList.toggle('menu-open', !open);
});
menuPanel.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

// Cursor and magnetic controls.
if (!reduceMotion && matchMedia('(pointer:fine)').matches) {
  const cursor = document.querySelector('.cursor');
  let targetX = innerWidth / 2, targetY = innerHeight / 2, cursorX = targetX, cursorY = targetY;
  addEventListener('mousemove', (event) => { targetX = event.clientX; targetY = event.clientY; });
  function cursorFrame() {
    cursorX += (targetX - cursorX) * 0.17;
    cursorY += (targetY - cursorY) * 0.17;
    cursor.style.transform = `translate3d(${cursorX - 23}px,${cursorY - 23}px,0)`;
    requestAnimationFrame(cursorFrame);
  }
  cursorFrame();
  document.querySelectorAll('a,button').forEach((element) => {
    element.addEventListener('mouseenter', () => cursor.classList.add('is-active'));
    element.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
  });
  document.querySelectorAll('.magnetic').forEach((element) => {
    element.addEventListener('mousemove', (event) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      element.style.transform = `translate3d(${x * 0.14}px,${y * 0.14}px,0)`;
    });
    element.addEventListener('mouseleave', () => { element.style.transform = ''; });
  });
}

// Hero spatial field: lightweight canvas, pointer-reactive, no external assets.
const canvas = document.querySelector('#field');
const ctx = canvas.getContext('2d', { alpha: true });
let width = 0, height = 0, dpr = Math.min(devicePixelRatio || 1, 2);
let pointer = { x: 0.68, y: 0.42 };
let particles = [];

function resizeField() {
  width = canvas.clientWidth;
  height = canvas.clientHeight;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const count = Math.max(50, Math.min(150, Math.round((width * height) / 10000)));
  particles = Array.from({ length: count }, (_, index) => ({
    x: Math.random(), y: Math.random(), z: Math.random(),
    speed: 0.00008 + Math.random() * 0.00017,
    size: index % 13 === 0 ? 1.7 : 0.65 + Math.random() * 0.85
  }));
}
addEventListener('resize', resizeField);
addEventListener('pointermove', (event) => {
  pointer.x = event.clientX / innerWidth;
  pointer.y = event.clientY / innerHeight;
}, { passive: true });
resizeField();

function drawField(time = 0) {
  ctx.clearRect(0, 0, width, height);
  const centerX = width * (0.68 + (pointer.x - 0.5) * 0.035);
  const centerY = height * (0.44 + (pointer.y - 0.5) * 0.035);
  particles.forEach((particle) => {
    if (!reduceMotion) particle.z = (particle.z + particle.speed * 16) % 1;
    const depth = 0.2 + particle.z * 1.15;
    const x = centerX + (particle.x - 0.5) * width * depth * 1.7;
    const y = centerY + (particle.y - 0.5) * height * depth * 1.7;
    const alpha = Math.max(0, Math.min(1, particle.z * 1.05));
    ctx.beginPath();
    ctx.fillStyle = `rgba(218,244,255,${0.12 + alpha * 0.72})`;
    ctx.arc(x, y, particle.size * depth, 0, Math.PI * 2);
    ctx.fill();
  });
  // Thin orbital geometry.
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(-0.23 + Math.sin(time * 0.00012) * 0.02);
  ctx.strokeStyle = 'rgba(164,225,255,.09)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.ellipse(0, 0, width * (.17 + i * .08), height * (.05 + i * .027), 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
  requestAnimationFrame(drawField);
}
drawField();

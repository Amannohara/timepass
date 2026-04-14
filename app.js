/**
 * HotShotz v4 — Main App Controller
 * Screens: Landing, Feed, Leaderboard, Upload, Profile
 * Features: mesh canvas, multi-category, fake leaderboard, profile activity
 */

/* ════════════════════════════════════════════════════
   CONSTANTS & FAKE DATA
════════════════════════════════════════════════════ */
const GRADIENTS = [
  'linear-gradient(135deg,#7b5ea7,#a78bfa)',
  'linear-gradient(135deg,#f43f5e,#fb923c)',
  'linear-gradient(135deg,#10b981,#06b6d4)',
  'linear-gradient(135deg,#f59e0b,#fbbf24)',
  'linear-gradient(135deg,#8b5cf6,#ec4899)',
  'linear-gradient(135deg,#0ea5e9,#6366f1)',
  'linear-gradient(135deg,#ef4444,#a855f7)',
  'linear-gradient(135deg,#14b8a6,#8b5cf6)',
];

const CATEGORIES = [
  { id:'all',          label:'All',       icon:'✦' },
  { id:'photography',  label:'Photo',     icon:'📸' },
  { id:'poetry',       label:'Poetry',    icon:'✍️' },
  { id:'art',          label:'Art',       icon:'🎨' },
  { id:'story',        label:'Story',     icon:'📖' },
  { id:'music',        label:'Music',     icon:'🎵' },
  { id:'other',        label:'Other',     icon:'✨' },
];

const FAKE_SUBMISSIONS = [
  { _id:'s1', type:'photo', category:'photography', title:'Golden Hour, Goa', authorName:'Arjun Mehta',   authorCollege:'IIT Bombay',   voteCount:842, hasVoted:false, url:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
  { _id:'s2', type:'text',  category:'poetry',      title:'Monsoon Whispers', authorName:'Priya Sharma',  authorCollege:'BITS Pilani',  voteCount:734, hasVoted:false, content:'The rain speaks in syllables\nnone can translate,\na language of rooftops\nand half-remembered dreams.\n\nI stand at the window\ncounting drops like seconds,\neach one a small surrender\nto the weight of July.' },
  { _id:'s3', type:'photo', category:'art',         title:'Abstract Chaos #4', authorName:'Rohit Nair',    authorCollege:'NIT Trichy',   voteCount:691, hasVoted:false, url:'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80' },
  { _id:'s4', type:'photo', category:'photography', title:'Empty Platform 7',  authorName:'Kavya Reddy',   authorCollege:'VIT Vellore',  voteCount:567, hasVoted:false, url:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80' },
  { _id:'s5', type:'text',  category:'story',       title:'The Last Autorickshaw', authorName:'Dev Patel',  authorCollege:'IIT Delhi',   voteCount:512, hasVoted:false, content:"It was 2:13 AM and Rajan hadn't had a fare in four hours. The city had gone quiet the way cities go quiet—not peacefully, but like a held breath. Then she appeared under the yellow streetlight, one hand raised, the other pressed to her chest as if holding something in.\n\n\"Where to?\" he asked.\n\nShe looked at him like she'd forgotten the answer." },
  { _id:'s6', type:'photo', category:'photography', title:'Monsoon Mirror',    authorName:'Sneha Iyer',   authorCollege:'Manipal',       voteCount:445, hasVoted:false, url:'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&q=80' },
  { _id:'s7', type:'text',  category:'poetry',      title:'3 AM, Hostel 4',   authorName:'Aditya Kumar',  authorCollege:'IIT Kharagpur', voteCount:398, hasVoted:false, content:'The ceiling fan confesses\nthree things each night:\nthat sleep is optional,\nthat deadlines are not,\nand that tomorrow you will try\nonce more, and fail\nmore beautifully than before.' },
  { _id:'s8', type:'photo', category:'photography', title:'Chai Break',        authorName:'Meera Singh',   authorCollege:'DU South',      voteCount:356, hasVoted:false, url:'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=600&q=80' },
];

const FAKE_LEADERBOARD = [
  { rank:1, name:'Arjun Mehta',    college:'IIT Bombay',    votes:2847, totalSubs:12, winStreak:4, avIdx:0, cat:'photography', change:'+3' },
  { rank:2, name:'Priya Sharma',   college:'BITS Pilani',   votes:2341, totalSubs:9,  winStreak:2, avIdx:4, cat:'poetry',      change:'+1' },
  { rank:3, name:'Rohit Nair',     college:'NIT Trichy',    votes:1998, totalSubs:11, winStreak:1, avIdx:2, cat:'art',         change:'-1' },
  { rank:4, name:'Kavya Reddy',    college:'VIT Vellore',   votes:1654, totalSubs:8,  winStreak:0, avIdx:1, cat:'photography', change:'+2' },
  { rank:5, name:'Dev Patel',      college:'IIT Delhi',     votes:1423, totalSubs:7,  winStreak:0, avIdx:3, cat:'story',       change:'0'  },
  { rank:6, name:'Sneha Iyer',     college:'Manipal',       votes:1201, totalSubs:6,  winStreak:0, avIdx:6, cat:'photography', change:'-1' },
  { rank:7, name:'Aditya Kumar',   college:'IIT Kharagpur', votes:1089, totalSubs:8,  winStreak:0, avIdx:7, cat:'poetry',      change:'+3' },
  { rank:8, name:'Meera Singh',    college:'DU South',      votes:956,  totalSubs:5,  winStreak:0, avIdx:5, cat:'photography', change:'-2' },
];

const DEMO_PROFILE = {
  username:'Arjun Mehta', college:'IIT Bombay', avatar:0,
  totalVotesReceived:2847, submissionCount:12, rank:1, winStreak:4,
  bestShot:FAKE_SUBMISSIONS[0],
  submissions: FAKE_SUBMISSIONS.slice(0,5),
  activity:[
    { icon:'🔥', bg:'rgba(244,63,94,.15)',  text:'Golden Hour, Goa received 50 new votes!',           time:'2h ago' },
    { icon:'🏆', bg:'rgba(245,158,11,.15)', text:'You moved up to #1 on the leaderboard!',             time:'5h ago' },
    { icon:'📸', bg:'rgba(123,94,167,.15)', text:"Week 18 contest started — time to drop your shot",   time:'1d ago' },
    { icon:'⚡', bg:'rgba(16,185,129,.15)', text:'4-week win streak! You\'re on fire.',                 time:'2d ago' },
    { icon:'✍️', bg:'rgba(167,139,250,.15)',text:'Monsoon Whispers (poetry) got 88 votes this week',   time:'3d ago' },
    { icon:'👏', bg:'rgba(6,182,212,.15)',  text:'Priya Sharma voted on your submission',               time:'4d ago' },
  ],
};

/* ════════════════════════════════════════════════════
   STATE
════════════════════════════════════════════════════ */
const S = {
  page: 'landing',
  user: null,
  token: null,
  submissions: [...FAKE_SUBMISSIONS],
  filtered: [...FAKE_SUBMISSIONS],
  cardIdx: 0,
  voting: false,
  starsOpen: false,
  uploadType: 'photo',
  uploadedUrl: null,
  feedCat: 'all',
  lbCat: 'all',
  lbTab: 'week',
  profTab: 'all',
  touchX: null,
};

/* ════════════════════════════════════════════════════
   HELPERS
════════════════════════════════════════════════════ */
const $  = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
const esc = s => s ? String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;') : '';

function makeAv(initials, size, idx, extra='') {
  return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${GRADIENTS[idx%8]};display:flex;align-items:center;justify-content:center;font-family:var(--font-d);font-size:${Math.floor(size*.28)}px;letter-spacing:.04em;color:#fff;flex-shrink:0${extra?';'+extra:''}">${esc(initials)}</div>`;
}

function catIcon(cat) {
  const m = { photography:'📸', poetry:'✍️', art:'🎨', story:'📖', music:'🎵', other:'✨' };
  return m[cat] || '✦';
}
function catLabel(cat) {
  const m = { photography:'Photography', poetry:'Poetry', art:'Art', story:'Story', music:'Music', other:'Other' };
  return m[cat] || cat;
}

let _toastT;
function toast(msg, type='info') {
  const el = $('#toast');
  if (!el) return;
  el.textContent = msg;
  el.style.borderColor = type==='error'?'rgba(244,63,94,.4)':type==='success'?'rgba(16,185,129,.4)':'rgba(123,94,167,.4)';
  el.className = '';
  el.style.animation = 'rise .3s var(--ease)';
  clearTimeout(_toastT);
  _toastT = setTimeout(() => { el.style.animation=''; el.className='hidden'; }, 2800);
}

async function apiFetch(path, opts={}) {
  const h = { 'Content-Type':'application/json', ...opts.headers };
  if (S.token) h['Authorization'] = `Bearer ${S.token}`;
  const res  = await fetch('/api' + path, { ...opts, headers:h });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || 'Request failed');
  return data;
}

/* ════════════════════════════════════════════════════
   MESH CANVAS ANIMATION
════════════════════════════════════════════════════ */
(function initMesh() {
  const canvas = document.getElementById('mesh-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const NODES = 55, CONN_DIST = 120;
  let nodes = [], raf, W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive:true });

  for (let i = 0; i < NODES; i++) {
    nodes.push({
      x: Math.random()*window.innerWidth,
      y: Math.random()*window.innerHeight,
      vx: (Math.random()-.5)*.35,
      vy: (Math.random()-.5)*.35,
      r: Math.random()*1.8+.6,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // Move
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });
    // Connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i+1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < CONN_DIST) {
          const alpha = (1 - d/CONN_DIST) * 0.25;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(123,94,167,${alpha})`;
          ctx.lineWidth = .8;
          ctx.stroke();
        }
      }
    }
    // Nodes
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(167,139,250,0.55)';
      ctx.fill();
    });
    raf = requestAnimationFrame(draw);
  }
  draw();
})();

/* ════════════════════════════════════════════════════
   ROUTING
════════════════════════════════════════════════════ */
const PAGES = ['landing','feed','leader','upload','profile'];

function showPage(name) {
  PAGES.forEach(p => { const el = $(`#pg-${p}`); if (el) el.className = p === name ? '' : 'hidden'; });
  const nav = $('#nav-bar');
  const showNav = ['feed','leader','upload','profile'].includes(name);
  if (nav) nav.className = showNav ? 'nav-bar' : 'nav-bar hidden';
  $$('.nav-btn').forEach(b => b.classList.remove('active'));
  const nb = $(`#nb-${name}`);
  if (nb) nb.classList.add('active');
  S.page = name;
  if (name==='landing') renderLanding();
  if (name==='feed')    renderFeed();
  if (name==='leader')  renderLeader();
  if (name==='upload')  renderUpload();
  if (name==='profile') renderProfile();
}
function navTo(n) { showPage(n); }
window.navTo = navTo;

/* ════════════════════════════════════════════════════
   AUTH
════════════════════════════════════════════════════ */
function initAuth() {
  S.token = localStorage.getItem('hs_token');
  try { S.user = JSON.parse(localStorage.getItem('hs_user')||'null'); } catch {}
}
function isLoggedIn() { return !!(S.token && S.user); }

/* ════════════════════════════════════════════════════
   LANDING PAGE
════════════════════════════════════════════════════ */
function renderLanding() {
  const el = $('#pg-landing');
  if (!el) return;

  const catMarqueeItems = [...CATEGORIES.filter(c=>c.id!=='all'), ...CATEGORIES.filter(c=>c.id!=='all')].map(c =>
    `<span class="cat-chip"><span class="cat-chip-dot"></span>${c.icon} ${c.label.toUpperCase()}</span>`
  ).join('');

  el.innerHTML = `
    <div class="land-wrap">
      <!-- TOP STRIP -->
      <div class="land-strip r1">
        <div class="land-logo">
          <div class="land-logo-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
          </div>
          HOTSHOTZ
        </div>
        <div class="land-nav-links">
          <button class="land-nav-pill" onclick="showLeaderFromLanding()">🏆 Leaderboard</button>
          <button class="land-nav-pill" onclick="showProfileFromLanding()">👤 Profile</button>
          <a href="login.html" class="land-nav-pill">Sign In</a>
          <a href="register.html" class="land-nav-pill solid">Join Free</a>
        </div>
      </div>

      <!-- MARQUEE -->
      <div class="cat-marquee r2">
        <div class="cat-marquee-inner">${catMarqueeItems}</div>
      </div>

      <!-- HERO -->
      <div class="hero-wrap">
        <div class="hero-eyebrow r2">
          <span class="badge badge-v">⚡ Week 18 is Live</span>
        </div>
        <h1 class="hero-title r3">
          CREATE.<br><span class="gt fire-word">COMPETE.</span><br>CONQUER.
        </h1>
        <p class="hero-sub r4">
          The weekly creative arena — photos, poems, art, stories &amp; more.
          Upload your best work. The campus votes. The top creator wins.
        </p>
        <div class="hero-ctas r4">
          <button class="btn-brand hero-cta-main" onclick="enterApp()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><path d="m13 2 3 6.99h7l-5.46 3.99 2.09 7.01L15 16.01 10.37 20 12.46 13 7 9h7.03z"/></svg>
            Enter This Week's Battle
          </button>
          <button class="btn-ghost hero-cta-ghost" onclick="enterApp()">Browse All Submissions</button>
        </div>
      </div>

      <!-- FLOATING MEDIA CARDS -->
      <div class="media-cards r3">
        <div class="m-card mc1">
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80" alt="Photography submission" loading="lazy">
          <div class="m-card-label">
            <div class="m-card-cat">Photography</div>
            <div class="m-card-votes">🔥 842</div>
          </div>
          <div class="m-card-type"><span class="badge badge-cyan">📸</span></div>
        </div>
        <div class="m-text-card mc2">
          <div style="position:relative;z-index:1">
            <div class="m-text-card-title">MONSOON WHISPERS</div>
            <div class="m-text-card-body">The rain speaks in syllables<br>none can translate,<br>a language of rooftops<br>and half-remembered dreams...</div>
            <div class="m-text-card-votes">✍️ Poetry · 🔥 734</div>
          </div>
        </div>
        <div class="m-card mc3">
          <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=300&q=80" alt="Art submission" loading="lazy">
          <div class="m-card-label">
            <div class="m-card-cat">Art</div>
            <div class="m-card-votes">🔥 691</div>
          </div>
          <div class="m-card-type"><span class="badge badge-v">🎨</span></div>
        </div>
        <div class="m-card mc4">
          <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=300&q=80" alt="Photography submission" loading="lazy">
          <div class="m-card-label">
            <div class="m-card-cat">Photography</div>
            <div class="m-card-votes">🔥 567</div>
          </div>
        </div>
      </div>

      <!-- STATS -->
      <div class="stats-bar r4">
        <div class="glass stat-cell"><div class="stat-cell-num" id="sc-subs">—</div><div class="stat-cell-lbl">This Week</div></div>
        <div class="glass stat-cell"><div class="stat-cell-num" id="sc-votes">—</div><div class="stat-cell-lbl">Votes Cast</div></div>
        <div class="glass stat-cell"><div class="stat-cell-num" id="sc-colleges">—</div><div class="stat-cell-lbl">Colleges</div></div>
      </div>

      <!-- SOCIAL PROOF -->
      <div class="proof-row r5">
        <div class="av-pile">
          ${GRADIENTS.slice(0,5).map((g,i) => `<div class="av-item" style="background:${g}">${['AM','PS','RN','KR','DP'][i]}</div>`).join('')}
        </div>
        <span class="proof-text"><strong>2,400+</strong> students competing</span>
      </div>

      <!-- CATEGORIES STRIP -->
      <div style="padding:0 20px 40px">
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:rgba(196,181,253,.3);margin-bottom:14px">Compete In Any Category</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
          ${CATEGORIES.filter(c=>c.id!=='all').map(c => `
            <div class="glass r5" style="padding:14px 10px;text-align:center;cursor:pointer;transition:all .2s" onclick="enterApp()" onmouseenter="this.style.borderColor='var(--border2)'" onmouseleave="this.style.borderColor='var(--border)'">
              <div style="font-size:26px;margin-bottom:6px">${c.icon}</div>
              <div style="font-size:12px;font-weight:700;color:rgba(196,181,253,.7)">${c.label}</div>
            </div>`).join('')}
        </div>
      </div>
    </div>
  `;

  // Animate stat counters
  animateCount('sc-subs',   156, 1000);
  animateCount('sc-votes',  4820, 1200);
  animateCount('sc-colleges', 47, 800);

  // Add magnetic hover to cards
  setTimeout(addMagneticCards, 100);
}

function animateCount(id, target, dur) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = performance.now();
  const tick = now => {
    const p = Math.min((now - start) / dur, 1);
    const e = 1 - Math.pow(1-p, 3);
    el.textContent = Math.round(target * e).toLocaleString() + (target >= 1000 ? '' : '');
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target >= 1000 ? (target/1000).toFixed(1)+'K' : target;
  };
  requestAnimationFrame(tick);
}

function addMagneticCards() {
  $$('.m-card, .m-text-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width/2) / r.width * 12;
      const y = (e.clientY - r.top - r.height/2) / r.height * 12;
      card.style.transform = `${card.style.transform.replace(/translateX.*/,'').replace(/rotate.*/,'')} perspective(800px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.04)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

function showLeaderFromLanding() {
  if (isLoggedIn()) { showPage('leader'); }
  else { window.location.href = 'login.html'; }
}
function showProfileFromLanding() {
  if (isLoggedIn()) { showPage('profile'); }
  else { window.location.href = 'login.html'; }
}
function enterApp() {
  if (isLoggedIn()) { showPage('feed'); }
  else { window.location.href = 'register.html'; }
}
window.enterApp = enterApp;
window.showLeaderFromLanding = showLeaderFromLanding;
window.showProfileFromLanding = showProfileFromLanding;

/* ════════════════════════════════════════════════════
   FEED / VOTING
════════════════════════════════════════════════════ */
function getFiltered() {
  return S.feedCat === 'all'
    ? S.submissions
    : S.submissions.filter(s => s.category === S.feedCat);
}

function renderFeed() {
  const el = $('#pg-feed');
  if (!el) return;

  const catTabs = CATEGORIES.map(c =>
    `<button class="cat-f-btn${c.id===S.feedCat?' active':''}" onclick="setFeedCat('${c.id}')">${c.icon} ${c.label}</button>`
  ).join('');

  el.innerHTML = `
    <div class="feed-pg">
      <div class="feed-top">
        <div>
          <div class="feed-title">THIS WEEK</div>
          <div class="feed-sub" id="feed-ctr"></div>
        </div>
        <span class="badge badge-fire">🔥 Live</span>
      </div>
      <div class="prog-row" id="prog-row"></div>
      <div class="cat-filter-row">${catTabs}</div>
    </div>

    <div class="card-stack" id="card-stack" style="margin:0 16px">
      <div class="card-bg-wrap" id="card-bg">
        <img id="img-bg" src="" alt="">
      </div>
      <div class="vote-card" id="vote-card" id="vote-card">
        <div class="stamp stamp-fire" id="stamp-fire"><span>FIRE</span></div>
        <div class="stamp stamp-nope" id="stamp-nope"><span>NOPE</span></div>
      </div>
    </div>

    <div class="vote-actions">
      <button class="vote-action" onclick="castVote('pass')"
        style="width:62px;height:62px;background:var(--grad-fire);box-shadow:var(--glow-fire)">
        <span style="font-size:22px">✕</span>
        <span class="va-lbl">PASS</span>
      </button>
      <button class="vote-action" onclick="toggleStars()"
        style="width:50px;height:50px;background:var(--grad-gold);box-shadow:var(--glow-gold)">
        <span style="font-size:22px">★</span>
      </button>
      <button class="vote-action" onclick="castVote('fire')"
        style="width:62px;height:62px;background:var(--grad-emerald);box-shadow:0 0 28px rgba(16,185,129,.35)">
        <span style="font-size:22px">🔥</span>
        <span class="va-lbl">FIRE!</span>
      </button>
    </div>
    <div class="vote-hint">← arrow keys or swipe to vote →</div>
  `;

  S.cardIdx = 0;
  updateCard();
  bindSwipe();
}

function setFeedCat(cat) {
  S.feedCat = cat;
  S.cardIdx = 0;
  $$('.cat-f-btn').forEach(b => b.classList.toggle('active', b.textContent.includes(CATEGORIES.find(c=>c.id===cat)?.label)));
  updateCard();
}
window.setFeedCat = setFeedCat;

function updateCard() {
  const list = getFiltered();
  const vc   = $('#vote-card');
  const bg   = $('#card-bg');
  if (!vc || !list.length) return;

  const ci = S.cardIdx % list.length;
  const ni = (ci+1) % list.length;
  const s  = list[ci];
  const n  = list[ni];

  // Progress
  const prog = $('#prog-row');
  if (prog) prog.innerHTML = list.map((_,i) =>
    `<div class="prog-seg${i<=ci?' done':''}"></div>`).join('');
  const ctr = $('#feed-ctr');
  if (ctr) ctr.textContent = `${ci+1} of ${list.length} shots`;

  // Stamps
  ['#stamp-fire','#stamp-nope'].forEach(id => { const el=$(id); if(el) el.style.display='none'; });

  if (s.type === 'photo') {
    // Update bg
    const imgBg = $('#img-bg');
    if (imgBg) { imgBg.src = n.url||''; bg.style.display='block'; }

    vc.className = 'vote-card anim-card-in';
    vc.innerHTML = `
      <div class="stamp stamp-fire" id="stamp-fire"><span>FIRE</span></div>
      <div class="stamp stamp-nope" id="stamp-nope"><span>NOPE</span></div>
      <img class="vote-card-img" src="${esc(s.url)}" alt="${esc(s.title)}" loading="lazy">
      <div class="vote-card-cover"></div>
      <div class="vote-card-content">
        <div style="position:absolute;top:18px;right:18px"><span class="badge badge-cyan">${catIcon(s.category)} ${catLabel(s.category)}</span></div>
        <div class="card-info">
          <div style="display:flex;align-items:flex-end;justify-content:space-between">
            <div>
              <div class="card-title">${esc(s.title)}</div>
              <div class="card-author">👤 ${esc(s.authorName)} · 🎓 ${esc(s.authorCollege)}</div>
            </div>
            <div class="card-votes-pill">
              <span style="font-size:17px">🔥</span>
              <span class="card-votes-num">${(s.voteCount||0).toLocaleString()}</span>
            </div>
          </div>
          <div class="stars-row${S.starsOpen?' show':''}" id="stars-row">
            ${[1,2,3,4,5].map(v=>`<span class="star" onclick="starVote(${v})" onmouseenter="litStars(${v})" onmouseleave="litStars(0)">⭐</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  } else {
    // Text entry
    bg.style.display = 'none';
    vc.className = 'vote-card is-text anim-card-in';
    vc.innerHTML = `
      <div class="stamp stamp-fire" id="stamp-fire"><span>FIRE</span></div>
      <div class="stamp stamp-nope" id="stamp-nope"><span>NOPE</span></div>
      <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg,rgba(123,94,167,.07),rgba(244,63,94,.04));pointer-events:none"></div>
      <div style="position:absolute;top:0;left:0;width:3px;height:100%;background:var(--grad-brand)"></div>
      <div class="text-vote-inner">
        <div class="text-vote-cat">${catIcon(s.category)} ${catLabel(s.category)}</div>
        <div class="text-vote-title">${esc(s.title)}</div>
        <div class="text-vote-body">${esc(s.content||'').replace(/\n/g,'<br>')}</div>
        <div class="text-vote-author">
          ${makeAv((s.authorName||'U').slice(0,2).toUpperCase(), 28, 0)}
          <span>👤 ${esc(s.authorName)} · 🎓 ${esc(s.authorCollege)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px">
          <div class="card-votes-pill" style="border:1px solid var(--border)">
            <span style="font-size:16px">🔥</span>
            <span class="card-votes-num">${(s.voteCount||0).toLocaleString()}</span>
          </div>
          <div class="stars-row${S.starsOpen?' show':''}" id="stars-row">
            ${[1,2,3,4,5].map(v=>`<span class="star" onclick="starVote(${v})" onmouseenter="litStars(${v})" onmouseleave="litStars(0)">⭐</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // Entrance animation
  const card = $('#vote-card');
  if (card) { card.style.animation='none'; void card.offsetWidth; card.style.animation='cardIn .42s var(--ease)'; }
}

function litStars(v) {
  $$('.star').forEach((s,i) => s.classList.toggle('lit', i < v));
}
window.litStars = litStars;

async function castVote(dir) {
  if (S.voting) return;
  S.voting = true;
  S.starsOpen = false;

  const sf = $('#stamp-fire'), sn = $('#stamp-nope');
  if (dir==='fire' && sf) sf.style.display='block';
  if (dir==='pass' && sn) sn.style.display='block';

  const card = $('#vote-card');
  if (card) card.classList.add(dir==='fire'?'anim-swipe-r':'anim-swipe-l');

  // API vote attempt
  const list = getFiltered();
  const s = list[S.cardIdx % list.length];
  if (s && !s._id.startsWith('s') && isLoggedIn() && dir==='fire') {
    try { await apiFetch('/vote', { method:'POST', body:JSON.stringify({ submissionId:s._id }) }); } catch {}
  }

  if (dir==='fire' && Math.random() > .65) {
    const m = $('#fire-modal');
    if (m) { m.className=''; setTimeout(() => m.className='hidden', 1800); }
  }

  setTimeout(() => {
    S.cardIdx++;
    if (card) { card.className='vote-card'; card.style.transform=''; }
    updateCard();
    S.voting = false;
  }, 460);
}
window.castVote = castVote;

function toggleStars() {
  S.starsOpen = !S.starsOpen;
  $('#stars-row')?.classList.toggle('show', S.starsOpen);
}
window.toggleStars = toggleStars;

function starVote(v) {
  litStars(v);
  setTimeout(() => castVote('fire'), 320);
}
window.starVote = starVote;

function bindSwipe() {
  const el = $('#card-stack');
  if (!el) return;
  el.addEventListener('touchstart', e => { S.touchX = e.touches[0].clientX; }, { passive:true });
  el.addEventListener('touchend',   e => {
    if (S.touchX === null) return;
    const dx = e.changedTouches[0].clientX - S.touchX;
    if (Math.abs(dx) > 55) castVote(dx > 0 ? 'fire' : 'pass');
    S.touchX = null;
  }, { passive:true });
}

document.addEventListener('keydown', e => {
  if (S.page!=='feed') return;
  if (e.key==='ArrowLeft')  castVote('pass');
  if (e.key==='ArrowRight') castVote('fire');
});

/* ════════════════════════════════════════════════════
   LEADERBOARD
════════════════════════════════════════════════════ */
const PODIUM_GRADS = [
  'linear-gradient(135deg,#b8963e,#f59e0b)',
  'linear-gradient(135deg,#8ab0c4,#b0cad8)',
  'linear-gradient(135deg,#a07848,#c89668)',
];
const MEDALS = ['🥇','🥈','🥉'];

function renderLeader() {
  const el = $('#pg-leader');
  if (!el) return;

  const catTabs = ['All',...CATEGORIES.filter(c=>c.id!=='all').map(c=>c.label)].map((l,i) => {
    const catId = i===0 ? 'all' : CATEGORIES.find(c=>c.label===l)?.id||l.toLowerCase();
    return `<button class="lb-tab${catId===S.lbCat?' active':''}" onclick="setLbCat('${catId}',this)">${l}</button>`;
  }).join('');

  const timeTabs = ['This Week','Month','All Time'].map((l,i) => {
    const k = ['week','month','all'][i];
    return `<button class="lb-tab${k===S.lbTab?' active':''}" onclick="setLbTab('${k}',this)">${l}</button>`;
  }).join('');

  el.innerHTML = `
    <div class="lb-page">
      <div class="lb-header r1">
        <div class="lb-title">LEADER<br>BOARD</div>
        <div class="lb-sub">Top creators this week 🏆</div>
      </div>

      <!-- Stat strip -->
      <div class="lb-stat-strip r2">
        <div class="glass lb-stat"><div class="lb-stat-num gt-gold">47</div><div class="lb-stat-lbl">Colleges</div></div>
        <div class="glass lb-stat"><div class="lb-stat-num" style="color:var(--v2)">156</div><div class="lb-stat-lbl">Entries</div></div>
        <div class="glass lb-stat"><div class="lb-stat-num" style="color:var(--hot2)">4.8K</div><div class="lb-stat-lbl">Votes</div></div>
      </div>

      <!-- Category filter -->
      <div class="lb-tabs r2">${catTabs}</div>

      <!-- Time filter -->
      <div class="lb-tabs r3" style="margin-bottom:24px">${timeTabs}</div>

      <!-- Podium -->
      <div id="lb-podium" class="r3"></div>

      <!-- List -->
      <div class="lb-list r4" id="lb-list"></div>
    </div>
  `;

  renderLeaderContent();
}

function setLbCat(cat, btn) {
  S.lbCat = cat;
  $$('.lb-tab').forEach((b,i) => { if(i < CATEGORIES.length) b.classList.toggle('active', b===btn); });
  renderLeaderContent();
}
function setLbTab(tab, btn) {
  S.lbTab = tab;
  renderLeaderContent();
}
window.setLbCat = setLbCat;
window.setLbTab = setLbTab;

function renderLeaderContent() {
  let data = [...FAKE_LEADERBOARD];
  if (S.lbCat !== 'all') data = data.filter(p => p.cat === S.lbCat);
  if (!data.length) data = FAKE_LEADERBOARD.slice(0,3);

  // Add tiny variance per time tab for fake realism
  const mult = S.lbTab==='month' ? 4.2 : S.lbTab==='all' ? 18 : 1;
  data = data.map(p => ({ ...p, votes: Math.round(p.votes * mult) }));

  const top3 = data.slice(0,3);
  const rest  = data.slice(3);

  const pod = $('#lb-podium');
  if (pod) {
    // Order: 2nd, 1st, 3rd
    const order = [top3[1], top3[0], top3[2]].filter(Boolean);
    const rankOf = p => top3.indexOf(p);
    pod.innerHTML = `
      <div class="podium">
        ${order.map((p,oi) => {
          const r = rankOf(p);
          const sizes = [90, 104, 80];
          const ht    = [100, 130, 84];
          const initials = p.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
          return `
            <div class="pod-col" style="animation:rise .5s var(--ease) ${oi*.1}s both">
              <div class="pod-medal${r===0?' xl':''}">${MEDALS[r]}</div>
              <div class="pod-av" style="width:${sizes[r]}px;height:${sizes[r]}px;font-size:${Math.floor(sizes[r]*.28)}px;background:${PODIUM_GRADS[r]};border:${r===0?'3':'2'}px solid ${['#f59e0b','#8ab0c4','#c89668'][r]};box-shadow:0 ${r===0?8:5}px ${r===0?28:18}px ${['rgba(245,158,11,.3)','rgba(138,176,196,.2)','rgba(160,120,72,.2)'][r]}">${initials}</div>
              <div class="pod-name${r===0?' ':'  '}" style="font-size:${r===0?15:13}px">${p.name.split(' ')[0]}</div>
              <div class="pod-score" style="font-family:var(--font-d);font-size:${r===0?17:14}px">${p.votes.toLocaleString()}</div>
              <div class="pod-cat-icon">${catIcon(p.cat)}</div>
              <div class="pod-base" style="width:${sizes[r]+6}px;height:${ht[r]}px;background:${PODIUM_GRADS[r]}"></div>
            </div>`;
        }).join('')}
      </div>
    `;
  }

  const list = $('#lb-list');
  if (list) {
    list.innerHTML = rest.map((p,i) => {
      const initials = p.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
      const chgClass = p.change.startsWith('+')?'up':p.change==='0'?'same':'down';
      const chgLabel = p.change==='0'?'—':p.change;
      return `
        <div class="lb-row glass" style="animation:slideL .45s var(--ease) ${i*.06+.2}s both">
          <div class="lb-rank-num">#${p.rank}</div>
          ${makeAv(initials, 44, p.avIdx)}
          <div style="flex:1">
            <div class="lb-row-name">${esc(p.name)}</div>
            <div class="lb-row-college">${esc(p.college)}</div>
            <div class="lb-row-cat">${catIcon(p.cat)} ${catLabel(p.cat)}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div class="lb-row-score">${p.votes.toLocaleString()}</div>
            <div class="lb-row-change ${chgClass}">${chgLabel}</div>
          </div>
        </div>`;
    }).join('');
  }
}

/* ════════════════════════════════════════════════════
   UPLOAD
════════════════════════════════════════════════════ */
function renderUpload() {
  const el = $('#pg-upload');
  if (!el) return;

  const types = [
    { id:'photo', icon:'📸', label:'Photo / Art' },
    { id:'text',  icon:'✍️', label:'Poem / Story' },
    { id:'audio', icon:'🎵', label:'Music Link' },
  ];

  el.innerHTML = `
    <div class="upload-pg">
      <div class="r1">
        <div class="upload-h1">DROP YOUR<br>SHOT</div>
        <div class="upload-sub">One submission per week · Make it legendary</div>
      </div>

      <!-- Type selector -->
      <div class="type-selector r2">
        ${types.map(t => `<button class="type-btn${t.id===S.uploadType?' active':''}" onclick="setUploadType('${t.id}',this)"><span class="type-icon">${t.icon}</span>${t.label}</button>`).join('')}
      </div>

      <!-- Category select -->
      <div class="r2" style="margin-bottom:14px">
        <label style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(196,181,253,.4);display:block;margin-bottom:8px">Category</label>
        <select class="inp" id="cat-select" style="appearance:none;cursor:pointer">
          ${CATEGORIES.filter(c=>c.id!=='all').map(c=>`<option value="${c.id}">${c.icon} ${c.label}</option>`).join('')}
        </select>
      </div>

      <!-- Photo drop zone -->
      <div id="photo-zone" class="r3" style="${S.uploadType==='text'||S.uploadType==='audio'?'display:none':''}">
        <div class="dz" id="drop-zone" onclick="if(!S.uploadedUrl)document.getElementById('file-inp').click()"
          ondragover="dzOver(event)" ondragleave="dzLeave()" ondrop="dzDrop(event)">
          <div class="dz-ph" id="dz-ph">
            <div class="dz-icon">📸</div>
            <div class="dz-text">Drag & drop your image</div>
            <div class="dz-hint">JPG · PNG · HEIC · WebP · max 5MB</div>
            <div class="dz-browse">Browse Files</div>
          </div>
          <img class="dz-preview" id="dz-prev" src="" alt="Preview">
          <button class="dz-change" id="dz-change" onclick="resetDZ(event)">Change ✕</button>
        </div>
        <input type="file" id="file-inp" accept="image/*" style="display:none" onchange="handleFile(this.files[0])">
      </div>

      <!-- Text zone -->
      <div class="text-upload-area r3${S.uploadType==='text'?' show':''}" id="text-zone">
        <textarea class="text-area" id="text-content" placeholder="Write your poem, story, or lyrics here…" rows="10" oninput="updateCharCount()"></textarea>
        <div class="char-row"><span id="char-count">0</span> / 5000</div>
      </div>

      <!-- Audio zone -->
      <div id="audio-zone" class="r3" style="${S.uploadType==='audio'?'':'display:none'}">
        <input class="inp" id="audio-link" placeholder="Paste a SoundCloud or YouTube link…" style="margin-bottom:10px">
        <p style="font-size:12px;color:rgba(196,181,253,.35);line-height:1.5">Share a link to your original music composition. Covers and remixes welcome — credit the original artist.</p>
      </div>

      <!-- Form fields -->
      <div class="upload-form show r4" id="upload-form">
        <input class="inp" id="title-inp" placeholder="Give your work a title *">
        <div class="upload-btn btn-brand" onclick="doUpload()" id="upload-btn" style="cursor:pointer;display:flex">
          Submit to This Week's Battle →
        </div>
        <div class="glass tip-card">
          <span class="tip-icon">💡</span>
          <div class="tip-body">
            <p>Pro tip</p>
            <p>Submissions with a punchy title get 2× more clicks. Poems get rated on authenticity — write from experience.</p>
          </div>
        </div>
      </div>

      <!-- Success -->
      <div class="upload-success" id="upload-success">
        <span class="success-big">🎉</span>
        <h2 class="success-h2">SUBMITTED!</h2>
        <p class="success-p">Your work is in review.<br>It goes live within minutes.</p>
        <button class="btn-brand success-btn" onclick="resetUpload()">Submit Another</button>
      </div>
    </div>
  `;
}

function setUploadType(type, btn) {
  S.uploadType = type;
  $$('.type-btn').forEach(b => b.classList.toggle('active', b===btn));
  const photoZ = $('#photo-zone'), textZ = $('#text-zone'), audioZ = $('#audio-zone');
  if (photoZ) photoZ.style.display = type==='photo' ? '' : 'none';
  if (textZ)  textZ.className = `text-upload-area r3${type==='text'?' show':''}`;
  if (audioZ) audioZ.style.display = type==='audio' ? '' : 'none';
}
window.setUploadType = setUploadType;

function updateCharCount() {
  const ta = $('#text-content'), ct = $('#char-count');
  if (ta && ct) ct.textContent = ta.value.length;
}
window.updateCharCount = updateCharCount;

function dzOver(e)  { e.preventDefault(); $('#drop-zone')?.classList.add('over'); }
function dzLeave()  { $('#drop-zone')?.classList.remove('over'); }
function dzDrop(e)  { e.preventDefault(); dzLeave(); if(e.dataTransfer?.files[0]) handleFile(e.dataTransfer.files[0]); }
window.dzOver = dzOver; window.dzLeave = dzLeave; window.dzDrop = dzDrop;

function handleFile(file) {
  if (!file?.type.startsWith('image/')) { toast('Select an image file.','error'); return; }
  if (file.size > 5*1024*1024) { toast('Image must be under 5MB.','error'); return; }
  const reader = new FileReader();
  reader.onload = ev => {
    const prev = $('#dz-prev'), ph = $('#dz-ph'), ch = $('#dz-change'), dz = $('#drop-zone');
    if (prev)  { prev.src = ev.target.result; prev.style.display='block'; }
    if (ph)    ph.style.display='none';
    if (ch)    ch.style.display='block';
    if (dz)    dz.classList.add('has-file');
    S.uploadedUrl = ev.target.result; // store b64 locally; real upload goes to Cloudinary
  };
  reader.readAsDataURL(file);
}
window.handleFile = handleFile;

function resetDZ(e) {
  e?.stopPropagation();
  const prev=$('#dz-prev'),ph=$('#dz-ph'),ch=$('#dz-change'),dz=$('#drop-zone'),fi=$('#file-inp');
  if(prev){prev.style.display='none';prev.src='';}
  if(ph)ph.style.display='block';if(ch)ch.style.display='none';
  if(dz)dz.classList.remove('has-file','over');if(fi)fi.value='';
  S.uploadedUrl=null;
}
window.resetDZ = resetDZ;

async function doUpload() {
  if (!isLoggedIn()) { window.location.href='login.html'; return; }
  const title = $('#title-inp')?.value.trim();
  if (!title) { toast('Please add a title.','error'); return; }

  const btn = $('#upload-btn');
  if (btn) btn.innerHTML = '<div class="spinner"></div> Uploading…';

  try {
    const cat      = $('#cat-select')?.value || 'photography';
    const textBody = $('#text-content')?.value.trim() || '';
    const audioUrl = $('#audio-link')?.value.trim() || '';
    const content  = S.uploadType==='text' ? textBody : S.uploadType==='audio' ? audioUrl : title;

    if (S.uploadType==='text' && !textBody) { toast('Please write your content.','error'); if(btn) btn.innerHTML='Submit to This Week\'s Battle →'; return; }

    // Real upload for images
    let imageUrl = null;
    if (S.uploadType==='photo' && S.uploadedUrl && S.token) {
      try {
        const r = await fetch('/api/upload', { method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${S.token}`}, body:JSON.stringify({data:S.uploadedUrl}) });
        const d = await r.json();
        if (d.success) imageUrl = d.url;
      } catch {}
    }

    await apiFetch('/submissions', { method:'POST', body:JSON.stringify({
      title, category: cat, content: content || title,
      authorName: S.user?.username, authorCollege: S.user?.college, imageUrl,
    }) });
  } catch { /* show success on demo */ }

  await new Promise(r=>setTimeout(r,1400));
  const form=$('#upload-form'),dz=$('#photo-zone'),sz=$('#upload-success');
  if(form)form.style.display='none'; if(dz)dz.style.display='none';
  if(sz)sz.style.display='block';
  if(btn)btn.innerHTML='Submit to This Week\'s Battle →';
}
window.doUpload = doUpload;

function resetUpload() { renderUpload(); }
window.resetUpload = resetUpload;

/* ════════════════════════════════════════════════════
   PROFILE
════════════════════════════════════════════════════ */
function renderProfile() {
  const el = $('#pg-profile');
  if (!el) return;

  const u = isLoggedIn() && S.user ? { ...DEMO_PROFILE, ...S.user } : DEMO_PROFILE;
  const initials = (u.username||u.name||'U').slice(0,2).toUpperCase();
  const grad = GRADIENTS[(u.avatar||0)%8];

  el.innerHTML = `
    <!-- Header -->
    <div class="prof-hero r1">
      <div class="prof-topbar">
        <div class="prof-page-title">PROFILE</div>
        <button class="btn-outline prof-edit-btn" onclick="toast('Edit profile coming soon!','info')">Edit ✏️</button>
      </div>
      <div class="prof-info-row">
        <div class="prof-av-wrap">
          <div class="prof-av" style="background:${grad}">${initials}</div>
          <div class="prof-av-dot">✓</div>
        </div>
        <div style="flex:1">
          <div class="prof-username">${esc(u.username||u.name||'Anonymous')}</div>
          <div class="prof-college">🎓 ${esc(u.college||'Unknown College')}</div>
          <div class="prof-badges">
            <span class="badge badge-amber">🏆 Rank #${u.rank||'—'}</span>
            ${(u.winStreak||0) >= 2 ? `<span class="badge badge-fire">🔥 ${u.winStreak}w Streak</span>` : ''}
            <span class="badge badge-v">⚡ Active</span>
          </div>
        </div>
      </div>
      <div class="prof-stats-grid r2">
        <div class="glass prof-stat"><div class="prof-stat-icon">📸</div><div class="prof-stat-num">${u.submissionCount||12}</div><div class="prof-stat-lbl">Shots</div></div>
        <div class="glass prof-stat"><div class="prof-stat-icon">🔥</div><div class="prof-stat-num">${(u.totalVotesReceived||2847).toLocaleString()}</div><div class="prof-stat-lbl">Votes</div></div>
        <div class="glass prof-stat"><div class="prof-stat-icon">🏆</div><div class="prof-stat-num">#${u.rank||1}</div><div class="prof-stat-lbl">Rank</div></div>
        <div class="glass prof-stat"><div class="prof-stat-icon">⚡</div><div class="prof-stat-num">${u.winStreak||4}w</div><div class="prof-stat-lbl">Streak</div></div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="prof-tabs r3">
      <button class="prof-tab active" onclick="setProfTab('all',this)">All</button>
      <button class="prof-tab"        onclick="setProfTab('photos',this)">Photos</button>
      <button class="prof-tab"        onclick="setProfTab('text',this)">Writing</button>
      <button class="prof-tab"        onclick="setProfTab('activity',this)">Activity</button>
    </div>

    <!-- Content -->
    <div id="prof-content"></div>
  `;

  renderProfContent(u);
}

function setProfTab(tab, btn) {
  S.profTab = tab;
  $$('.prof-tab').forEach(b => b.classList.toggle('active', b===btn));
  const u = isLoggedIn() && S.user ? { ...DEMO_PROFILE, ...S.user } : DEMO_PROFILE;
  renderProfContent(u);
}
window.setProfTab = setProfTab;

function renderProfContent(u) {
  const ct = $('#prof-content');
  if (!ct) return;

  const subs = u.submissions || FAKE_SUBMISSIONS;
  const photos = subs.filter(s => s.type==='photo' || s.category==='photography' || s.category==='art');
  const texts  = subs.filter(s => s.type==='text'  || s.category==='poetry' || s.category==='story');
  const bestPhoto = photos[0];
  const bestText  = texts[0];

  if (S.profTab === 'activity') {
    ct.innerHTML = `
      <div class="activity-list">
        ${(u.activity||[]).map((a,i) => `
          <div class="activity-item r${Math.min(i+1,5)+1}">
            <div class="activity-icon" style="background:${a.bg}">${a.icon}</div>
            <div>
              <div class="activity-text">${esc(a.text)}</div>
              <div class="activity-sub">${a.time}</div>
            </div>
          </div>`).join('')}
      </div>`;
    return;
  }

  if (S.profTab === 'photos') {
    ct.innerHTML = `
      ${bestPhoto ? `
        <div class="best-shot r2">
          <img src="${esc(bestPhoto.url)}" alt="${esc(bestPhoto.title)}">
          <div class="best-shot-overlay"></div>
          <div class="best-shot-info">
            <div class="best-shot-label">⭐ Best Shot</div>
            <div class="best-shot-title">${esc(bestPhoto.title)}</div>
            <div class="best-shot-meta">🔥 ${bestPhoto.voteCount} votes · ${catLabel(bestPhoto.category)}</div>
          </div>
        </div>` : ''}
      <div class="media-grid r3">
        ${photos.map((s,i) => `
          <div class="media-cell" style="animation:rise .4s var(--ease) ${i*.06}s both">
            <img src="${esc(s.url)}" alt="${esc(s.title)}" loading="lazy">
            <div class="media-cell-votes">🔥 ${s.voteCount||0}</div>
            <div class="media-cell-type"><span class="badge badge-cyan" style="font-size:9px;padding:2px 7px">${catIcon(s.category)}</span></div>
            ${i===0?`<div class="media-cell-best"><span class="badge badge-amber" style="font-size:9px;padding:2px 7px">⭐ Best</span></div>`:''}
          </div>`).join('')}
        ${Array(Math.max(0,6-photos.length)).fill('<div class="media-cell-empty">+</div>').join('')}
      </div>`;
    return;
  }

  if (S.profTab === 'text') {
    ct.innerHTML = `
      ${bestText ? `
        <div class="best-text-shot r2">
          <div class="best-text-quote">⭐</div>
          <div class="best-text-title">${esc(bestText.title)}</div>
          <div class="best-text-body">${esc(bestText.content||'').replace(/\n/g,'<br>')}</div>
          <div class="best-text-meta">
            <span class="badge badge-v">${catIcon(bestText.category)} ${catLabel(bestText.category)}</span>
            <span style="color:var(--amber);font-weight:700">🔥 ${bestText.voteCount} votes</span>
          </div>
        </div>` : ''}
      <div class="text-sub-list r3">
        ${texts.map((s,i) => `
          <div class="text-sub-card" style="animation:slideL .4s var(--ease) ${i*.07}s both">
            <div class="text-sub-cat">${catIcon(s.category)} ${catLabel(s.category)}</div>
            <div class="text-sub-title">${esc(s.title)}</div>
            <div class="text-sub-excerpt">${esc(s.content||'').replace(/\n/g,' ')}</div>
            <div class="text-sub-meta">
              <span>${i===0?'Week 18':i===1?'Week 17':'Week '+Math.max(16-i,12)}</span>
              <span class="text-sub-votes">🔥 ${s.voteCount||0}</span>
            </div>
          </div>`).join('')}
      </div>`;
    return;
  }

  // 'all' tab — mixed grid
  ct.innerHTML = `
    ${bestPhoto ? `
      <div class="best-shot r2">
        <img src="${esc(bestPhoto.url)}" alt="${esc(bestPhoto.title)}">
        <div class="best-shot-overlay"></div>
        <div class="best-shot-info">
          <div class="best-shot-label">⭐ Best Shot Ever</div>
          <div class="best-shot-title">${esc(bestPhoto.title)}</div>
          <div class="best-shot-meta">🔥 ${bestPhoto.voteCount} votes · Week 16</div>
        </div>
      </div>` : ''}
    ${bestText ? `
      <div class="best-text-shot r3" style="margin:0 20px 16px">
        <div class="best-text-quote">✍️ Best Writing</div>
        <div class="best-text-title">${esc(bestText.title)}</div>
        <div class="best-text-body">${esc(bestText.content||'').replace(/\n/g,'<br>')}</div>
        <div class="best-text-meta">
          <span class="badge badge-v">${catIcon(bestText.category)} ${catLabel(bestText.category)}</span>
          <span style="color:var(--amber);font-weight:700">🔥 ${bestText.voteCount} votes</span>
        </div>
      </div>` : ''}
    <div class="media-grid r4" style="margin-bottom:16px">
      ${photos.slice(0,6).map((s,i) => `
        <div class="media-cell" style="animation:rise .4s var(--ease) ${i*.05}s both">
          <img src="${esc(s.url)}" alt="${esc(s.title)}" loading="lazy">
          <div class="media-cell-votes">🔥 ${s.voteCount||0}</div>
          <div class="media-cell-type"><span class="badge badge-cyan" style="font-size:8px;padding:2px 6px">${catIcon(s.category)}</span></div>
        </div>`).join('')}
    </div>
    <div class="text-sub-list">
      ${texts.slice(0,3).map((s,i) => `
        <div class="text-sub-card r${i+4}" style="animation:slideL .4s var(--ease) ${i*.07}s both">
          <div class="text-sub-cat">${catIcon(s.category)} ${catLabel(s.category)}</div>
          <div class="text-sub-title">${esc(s.title)}</div>
          <div class="text-sub-excerpt">${esc(s.content||'').replace(/\n/g,' ')}</div>
          <div class="text-sub-meta">
            <span>Week ${18-i}</span>
            <span class="text-sub-votes">🔥 ${s.voteCount||0}</span>
          </div>
        </div>`).join('')}
    </div>
    <div style="padding:20px 20px 0;text-align:center">
      <button onclick="signOut()" style="background:rgba(244,63,94,.1);border:1px solid rgba(244,63,94,.2);color:var(--hot2);padding:12px 28px;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer">
        Sign Out
      </button>
    </div>
  `;
}

function signOut() {
  localStorage.removeItem('hs_token');
  localStorage.removeItem('hs_user');
  S.token = null; S.user = null;
  showPage('landing');
}
window.signOut = signOut;

/* ════════════════════════════════════════════════════
   BOOT
════════════════════════════════════════════════════ */
function boot() {
  initAuth();
  if (isLoggedIn()) {
    showPage('feed');
    $('#nb-feed')?.classList.add('active');
  } else {
    showPage('landing');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

/* ============================================================
   PAYBOOM — Interactions & 3D
   ============================================================ */
import * as THREE from 'three';

/* ---------- Nav scroll ---------- */
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 20) nav.classList.add('is-scrolled');
  else nav.classList.remove('is-scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Reveal on scroll ---------- */
const revealEls = document.querySelectorAll(
  '.section__head, .card, .plan, .bdg, .metric, .api__features div, .code, .global__visual, .hero__content, .cta__inner'
);
revealEls.forEach((el) => el.classList.add('reveal'));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => io.observe(el));

/* ---------- Counters ---------- */
const counters = document.querySelectorAll('[data-count]');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      current = Math.round(target * eased);
      el.textContent = current.toLocaleString('es-ES');
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterIO.unobserve(el);
  });
}, { threshold: 0.4 });
counters.forEach((c) => counterIO.observe(c));

/* ---------- Card hover spotlight ---------- */
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});

/* ---------- 3D tilt for cards ---------- */
document.querySelectorAll('[data-tilt]').forEach((el) => {
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  });
  el.addEventListener('pointerleave', () => {
    el.style.transform = '';
  });
});

/* ---------- Code tabs ---------- */
const snippets = {
  node: `<span class="c-com">// Cobra una tarjeta en cualquier moneda</span>
<span class="c-key">import</span> Payboom <span class="c-key">from</span> <span class="c-str">"@payboom/node"</span>;

<span class="c-key">const</span> pb = <span class="c-key">new</span> <span class="c-fn">Payboom</span>(process.env.<span class="c-var">PAYBOOM_KEY</span>);

<span class="c-key">const</span> charge = <span class="c-key">await</span> pb.charges.<span class="c-fn">create</span>({
  amount: <span class="c-num">4990</span>,            <span class="c-com">// 49,90</span>
  currency: <span class="c-str">"EUR"</span>,
  source: <span class="c-str">"tok_visa_4242"</span>,
  customer: <span class="c-str">"cus_8f3aB2"</span>,
  capture: <span class="c-key">true</span>,
  metadata: { order: <span class="c-str">"ord_001"</span> }
});

console.<span class="c-fn">log</span>(charge.status); <span class="c-com">// "succeeded"</span>`,
  python: `<span class="c-com"># Cobra una tarjeta en cualquier moneda</span>
<span class="c-key">import</span> payboom

payboom.api_key = os.environ[<span class="c-str">"PAYBOOM_KEY"</span>]

charge = payboom.Charge.<span class="c-fn">create</span>(
    amount=<span class="c-num">4990</span>,            <span class="c-com"># 49,90</span>
    currency=<span class="c-str">"EUR"</span>,
    source=<span class="c-str">"tok_visa_4242"</span>,
    customer=<span class="c-str">"cus_8f3aB2"</span>,
    capture=<span class="c-key">True</span>,
    metadata={<span class="c-str">"order"</span>: <span class="c-str">"ord_001"</span>}
)

<span class="c-fn">print</span>(charge.status)  <span class="c-com"># "succeeded"</span>`,
  curl: `<span class="c-com"># Cobra una tarjeta en cualquier moneda</span>
curl https://api.payboom.io/v1/charges \\
  -u <span class="c-var">$PAYBOOM_KEY</span>: \\
  -d amount=<span class="c-num">4990</span> \\
  -d currency=<span class="c-str">EUR</span> \\
  -d source=<span class="c-str">tok_visa_4242</span> \\
  -d customer=<span class="c-str">cus_8f3aB2</span> \\
  -d capture=<span class="c-key">true</span> \\
  -d metadata[order]=<span class="c-str">ord_001</span>`
};
const codeBlock = document.getElementById('codeBlock');
document.querySelectorAll('.code__tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.code__tab').forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    const lang = tab.dataset.lang;
    if (codeBlock && snippets[lang]) {
      codeBlock.innerHTML = `<code>${snippets[lang]}</code>`;
    }
  });
});

/* ---------- Mobile nav toggle ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav__links');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    if (open) {
      navLinks.style.display = '';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '70px';
      navLinks.style.left = '16px';
      navLinks.style.right = '16px';
      navLinks.style.flexDirection = 'column';
      navLinks.style.padding = '20px';
      navLinks.style.background = 'rgba(10,10,35,0.95)';
      navLinks.style.border = '1px solid rgba(255,255,255,0.14)';
      navLinks.style.borderRadius = '20px';
      navLinks.style.backdropFilter = 'blur(20px)';
    }
  });
  navLinks?.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => { navLinks.style.display = ''; })
  );
}

/* ============================================================
   3D — TARJETA FLOTANTE
   ============================================================ */
function buildCardScene() {
  const canvas = document.getElementById('cardCanvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 7);

  // ----- Lights -----
  const ambient = new THREE.AmbientLight(0xffffff, 0.55);
  scene.add(ambient);
  const key = new THREE.DirectionalLight(0xff7a45, 1.7); // brand orange key
  key.position.set(5, 6, 4);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x06c4c7, 1.3); // brand teal rim
  rim.position.set(-5, -3, 3);
  scene.add(rim);
  const fill = new THREE.DirectionalLight(0xf05215, 0.5);
  fill.position.set(2, -4, -3);
  scene.add(fill);

  // ----- Card geometry -----
  const cardGroup = new THREE.Group();
  scene.add(cardGroup);

  const cardW = 3.4, cardH = 2.15, cardD = 0.06;
  const shape = new THREE.Shape();
  const r = 0.18;
  shape.moveTo(-cardW/2 + r, -cardH/2);
  shape.lineTo(cardW/2 - r, -cardH/2);
  shape.quadraticCurveTo(cardW/2, -cardH/2, cardW/2, -cardH/2 + r);
  shape.lineTo(cardW/2, cardH/2 - r);
  shape.quadraticCurveTo(cardW/2, cardH/2, cardW/2 - r, cardH/2);
  shape.lineTo(-cardW/2 + r, cardH/2);
  shape.quadraticCurveTo(-cardW/2, cardH/2, -cardW/2, cardH/2 - r);
  shape.lineTo(-cardW/2, -cardH/2 + r);
  shape.quadraticCurveTo(-cardW/2, -cardH/2, -cardW/2 + r, -cardH/2);

  const cardGeo = new THREE.ExtrudeGeometry(shape, {
    depth: cardD, bevelEnabled: true, bevelSize: 0.01,
    bevelThickness: 0.01, bevelSegments: 4, curveSegments: 24,
  });
  cardGeo.center();

  // Procedural gradient texture for the card face
  const gradCanvas = document.createElement('canvas');
  gradCanvas.width = 1024; gradCanvas.height = 640;
  const ctx = gradCanvas.getContext('2d');
  // Fondo: navy oscuro arriba-izq → naranja/teal abajo-dcha (logo legible en TL)
  const g = ctx.createLinearGradient(0, 0, 1024, 640);
  g.addColorStop(0,    '#0a1f24');     // navy profundo
  g.addColorStop(0.35, '#10303a');
  g.addColorStop(0.7,  '#f05215');     // naranja marca
  g.addColorStop(1,    '#049ea0');     // teal marca
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 1024, 640);

  // Glow holográfico cálido en la zona inferior-derecha
  const holo = ctx.createRadialGradient(800, 540, 0, 800, 540, 600);
  holo.addColorStop(0,   'rgba(255, 122, 69, 0.50)');
  holo.addColorStop(0.5, 'rgba(6, 196, 199, 0.15)');
  holo.addColorStop(1,   'rgba(0, 0, 0, 0)');
  ctx.fillStyle = holo;
  ctx.fillRect(0, 0, 1024, 640);

  // Subtle wave lines
  ctx.strokeStyle = 'rgba(255,255,255,0.07)';
  ctx.lineWidth = 1.3;
  for (let i = 0; i < 18; i++) {
    ctx.beginPath();
    for (let x = 0; x < 1024; x += 6) {
      const y = 30 + i * 36 + Math.sin((x + i * 50) * 0.012) * 18;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Logo "PAYBOOM" en colores oficiales
  ctx.font = '800 78px "Space Grotesk", system-ui, sans-serif';
  ctx.fillStyle = '#f05215';            // PAY naranja
  ctx.fillText('PAY', 60, 120);
  const wPay = ctx.measureText('PAY').width;
  ctx.fillStyle = '#049ea0';            // BOOM teal (B y M)
  ctx.fillText('B', 60 + wPay + 8, 120);
  const wB = ctx.measureText('B').width;
  // cápsula con OO
  const capX = 60 + wPay + 8 + wB + 6;
  const capY = 56;
  const capH = 70;
  const capW = 140;
  ctx.fillStyle = '#049ea0';
  roundRect(ctx, capX, capY, capW, capH, capH/2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.arc(capX + 36, capY + capH/2, 19, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(capX + 92, capY + capH/2, 19, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(capX + 122, capY + capH/2 + 12, 6, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#049ea0';
  ctx.fillText('M', capX + capW + 8, 120);

  // Chip
  const chipX = 80, chipY = 260, chipW = 110, chipH = 82;
  const chipGrad = ctx.createLinearGradient(chipX, chipY, chipX + chipW, chipY + chipH);
  chipGrad.addColorStop(0, '#ffb070'); // chip dorado cálido (tono naranja claro)
  chipGrad.addColorStop(1, '#a84a18');
  ctx.fillStyle = chipGrad;
  roundRect(ctx, chipX, chipY, chipW, chipH, 14);
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.35)';
  ctx.lineWidth = 1.8;
  for (let i = 1; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(chipX + (chipW / 4) * i, chipY + 6);
    ctx.lineTo(chipX + (chipW / 4) * i, chipY + chipH - 6);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(chipX + 6, chipY + chipH/2);
  ctx.lineTo(chipX + chipW - 6, chipY + chipH/2);
  ctx.stroke();

  // Contactless icon
  ctx.strokeStyle = 'rgba(255,255,255,0.85)';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(230 + i*4, chipY + chipH/2, 14 + i*12, -Math.PI/3.5, Math.PI/3.5);
    ctx.stroke();
  }

  // Number
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.font = '500 60px "JetBrains Mono", monospace';
  ctx.fillText('4242  4242  4242  4242', 60, 460);
  ctx.font = '500 22px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(255,255,255,0.65)';
  ctx.fillText('VALID THRU', 60, 520);
  ctx.fillText('CARDHOLDER', 320, 520);
  ctx.font = '500 32px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fillText('12 / 30', 60, 560);
  ctx.fillText('FELIX TENA', 320, 560);

  // Mark inferior derecho — PAYBOOM en blanco/teal sobre el degradado
  ctx.font = '800 32px "Space Grotesk", sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fillText('PAY', 760, 560);
  const wPay2 = ctx.measureText('PAY').width;
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fillText('BOOM', 760 + wPay2 + 4, 560);

  const cardTexture = new THREE.CanvasTexture(gradCanvas);
  cardTexture.colorSpace = THREE.SRGBColorSpace;
  cardTexture.anisotropy = 8;

  // Back face (simpler)
  const backCanvas = document.createElement('canvas');
  backCanvas.width = 1024; backCanvas.height = 640;
  const bctx = backCanvas.getContext('2d');
  const bg = bctx.createLinearGradient(0, 0, 1024, 640);
  bg.addColorStop(0, '#1a1640');
  bg.addColorStop(1, '#0a0a1f');
  bctx.fillStyle = bg;
  bctx.fillRect(0, 0, 1024, 640);
  bctx.fillStyle = '#0a0a1f';
  bctx.fillRect(0, 80, 1024, 100);
  bctx.fillStyle = 'rgba(255,255,255,0.92)';
  bctx.fillRect(80, 240, 720, 60);
  bctx.fillStyle = '#1a1640';
  bctx.font = '500 28px "JetBrains Mono", monospace';
  bctx.fillText('CVV  321', 660, 280);
  const backTex = new THREE.CanvasTexture(backCanvas);
  backTex.colorSpace = THREE.SRGBColorSpace;

  const materials = [
    new THREE.MeshPhysicalMaterial({ // sides
      color: 0x0a0a1f, metalness: 0.6, roughness: 0.4, clearcoat: 0.6
    }),
    new THREE.MeshPhysicalMaterial({ // front
      map: cardTexture, metalness: 0.7, roughness: 0.18,
      clearcoat: 1, clearcoatRoughness: 0.05,
      sheen: 1, sheenColor: new THREE.Color('#ff7a45'),
    }),
    new THREE.MeshPhysicalMaterial({ // back
      map: backTex, metalness: 0.55, roughness: 0.32, clearcoat: 0.7,
    }),
  ];
  // For ExtrudeGeometry we need to assign groups
  // Geometry has front (idx 0) and side (idx 1) groups by default
  // We'll handle by using a single MeshPhysicalMaterial array via groups remap.
  cardGeo.clearGroups();
  cardGeo.addGroup(0, Infinity, 0); // sides default
  // Better: bake materials per face in a simple way using two-pass meshes.
  const cardMesh = new THREE.Mesh(cardGeo, materials[0]);
  cardGroup.add(cardMesh);

  // Front and back as thin planes parented to the card
  const faceGeo = new THREE.PlaneGeometry(cardW - 0.02, cardH - 0.02);
  const front = new THREE.Mesh(faceGeo, materials[1]);
  front.position.z = cardD/2 + 0.001;
  cardGroup.add(front);
  const back = new THREE.Mesh(faceGeo, materials[2]);
  back.position.z = -cardD/2 - 0.001;
  back.rotation.y = Math.PI;
  cardGroup.add(back);

  // ----- Floating particles around the card -----
  const particles = new THREE.Group();
  scene.add(particles);
  const pCount = 90;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount * 3);
  const pVel = [];
  for (let i = 0; i < pCount; i++) {
    pPos[i*3]   = (Math.random() - 0.5) * 8;
    pPos[i*3+1] = (Math.random() - 0.5) * 5;
    pPos[i*3+2] = (Math.random() - 0.5) * 4 - 1;
    pVel.push((Math.random() - 0.5) * 0.003);
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({
    color: 0xff7a45, size: 0.04, transparent: true,
    opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const points = new THREE.Points(pGeo, pMat);
  particles.add(points);

  // ----- Floating coins / payment symbols -----
  const symbols = [];
  const ringGeo = new THREE.TorusGeometry(0.18, 0.05, 16, 32);
  const symbolColors = [0xf05215, 0x049ea0, 0xff7a45, 0x06c4c7, 0xf05215];
  for (let i = 0; i < 6; i++) {
    const m = new THREE.MeshPhysicalMaterial({
      color: symbolColors[i % symbolColors.length],
      metalness: 0.85, roughness: 0.2, clearcoat: 1
    });
    const ring = new THREE.Mesh(ringGeo, m);
    const angle = (i / 6) * Math.PI * 2;
    ring.userData = {
      baseAngle: angle,
      radius: 2.4 + Math.random() * 0.4,
      speed: 0.0006 + Math.random() * 0.0008,
      yOff: (Math.random() - 0.5) * 1.6,
    };
    cardGroup.add(ring);
    symbols.push(ring);
  }

  // ----- Resize ----
  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  // ----- Mouse parallax ----
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  canvas.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.tx = ((e.clientX - r.left) / r.width  - 0.5) * 1.4;
    mouse.ty = ((e.clientY - r.top)  / r.height - 0.5) * 1.4;
  });
  canvas.addEventListener('pointerleave', () => { mouse.tx = 0; mouse.ty = 0; });

  // Initial pose
  cardGroup.rotation.x = -0.18;
  cardGroup.rotation.y =  0.42;

  let t = 0;
  const animate = () => {
    t += 0.01;
    mouse.x += (mouse.tx - mouse.x) * 0.06;
    mouse.y += (mouse.ty - mouse.y) * 0.06;

    cardGroup.rotation.x = -0.18 + Math.sin(t * 0.6) * 0.08 - mouse.y * 0.4;
    cardGroup.rotation.y =  0.42 + Math.sin(t * 0.4) * 0.18 + mouse.x * 0.6;
    cardGroup.position.y = Math.sin(t * 0.7) * 0.12;

    // particles
    const pos = pGeo.attributes.position.array;
    for (let i = 0; i < pCount; i++) {
      pos[i*3+1] += pVel[i];
      if (pos[i*3+1] > 2.5) pos[i*3+1] = -2.5;
      if (pos[i*3+1] < -2.5) pos[i*3+1] = 2.5;
    }
    pGeo.attributes.position.needsUpdate = true;

    // symbols orbit
    symbols.forEach((s, i) => {
      const a = s.userData.baseAngle + t * (0.4 + i * 0.04);
      s.position.x = Math.cos(a) * s.userData.radius;
      s.position.z = Math.sin(a) * s.userData.radius - 0.5;
      s.position.y = s.userData.yOff + Math.sin(t * 1.4 + i) * 0.18;
      s.rotation.x = t * 1.2 + i;
      s.rotation.y = t * 0.9 + i;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();

  function roundRect(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x+r, y);
    c.arcTo(x+w, y,   x+w, y+h, r);
    c.arcTo(x+w, y+h, x,   y+h, r);
    c.arcTo(x,   y+h, x,   y,   r);
    c.arcTo(x,   y,   x+w, y,   r);
    c.closePath();
  }
}

/* ============================================================
   Polígonos simplificados de continentes (lat, lon)
   Suficientes para reconocer la silueta con dots.
   ============================================================ */
const CONTINENT_POLYGONS = [
  // North America
  [[71,-156],[70,-130],[68,-100],[65,-90],[55,-80],[55,-65],[44,-58],[44,-65],
   [36,-75],[30,-81],[26,-80],[18,-88],[13,-87],[8,-78],[12,-90],[16,-100],
   [24,-110],[30,-115],[40,-124],[50,-128],[58,-135],[60,-148],[71,-156]],
  // Greenland
  [[83,-22],[78,-18],[68,-25],[60,-43],[68,-52],[78,-58],[83,-58],[83,-22]],
  // South America
  [[12,-72],[12,-65],[8,-58],[0,-50],[-5,-35],[-15,-39],[-23,-43],[-32,-52],
   [-38,-58],[-50,-67],[-55,-67],[-52,-72],[-40,-73],[-23,-71],[-12,-77],[-3,-80],[5,-78],[12,-72]],
  // Africa
  [[37,10],[32,11],[31,21],[31,30],[24,35],[14,42],[12,51],[9,49],[-2,42],
   [-12,40],[-25,33],[-30,32],[-34,18],[-29,15],[-15,12],[-6,12],[0,9],[5,2],
   [6,-7],[10,-12],[16,-16],[22,-17],[27,-12],[32,-9],[35,-3],[37,10]],
  // Eurasia (massive)
  [[37,-8],[40,-9],[43,-3],[48,-2],[50,2],[53,3],[60,3],[70,18],[71,25],
   [68,40],[70,60],[75,90],[78,110],[78,130],[70,160],[65,170],[58,170],
   [55,162],[50,155],[45,148],[42,140],[38,128],[35,125],[30,122],[28,118],
   [22,110],[18,108],[10,107],[1,104],[8,98],[16,98],[21,93],[16,90],
   [8,77],[15,72],[22,68],[25,65],[27,57],[24,57],[22,60],[15,53],
   [12,45],[14,42],[16,40],[20,40],[27,34],[32,30],[36,32],[37,28],
   [40,22],[40,18],[37,16],[40,10],[44,10],[44,3],[37,-8]],
  // Australia
  [[-11,131],[-12,142],[-15,145],[-22,150],[-28,153],[-35,150],[-38,145],
   [-37,141],[-35,138],[-32,116],[-26,113],[-22,114],[-15,125],[-12,130],[-11,131]],
  // Antarctica (polar cap, going around)
  [[-65,-180],[-65,-90],[-65,0],[-65,90],[-65,180],[-90,180],[-90,-180],[-65,-180]],
  // Madagascar
  [[-12,49],[-15,50],[-22,48],[-25,46],[-25,43],[-15,46],[-12,49]],
  // British Isles (rough)
  [[58,-7],[58,-2],[50,1],[50,-5],[55,-9],[55,-7],[58,-7]],
  // Japan
  [[45,140],[42,141],[36,140],[33,131],[33,135],[39,140],[45,140]],
  // Indonesia (Sumatra+Java)
  [[5,95],[5,105],[-2,108],[-8,114],[-9,118],[-3,100],[5,95]],
  // New Zealand
  [[-35,173],[-37,178],[-46,170],[-46,166],[-40,172],[-35,173]],
];

function pointInPolygon(lat, lon, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [latI, lonI] = poly[i];
    const [latJ, lonJ] = poly[j];
    if (((lonI > lon) !== (lonJ > lon)) &&
        (lat < (latJ - latI) * (lon - lonI) / (lonJ - lonI) + latI)) {
      inside = !inside;
    }
  }
  return inside;
}

function isLand(lat, lon) {
  for (let i = 0; i < CONTINENT_POLYGONS.length; i++) {
    if (pointInPolygon(lat, lon, CONTINENT_POLYGONS[i])) return true;
  }
  return false;
}

/* ============================================================
   3D — GLOBO DE PAGOS INTERNACIONALES
   ============================================================ */
function buildGlobeScene() {
  const canvas = document.getElementById('globeCanvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.set(0, 0, 7.5);

  // Lights — paleta de marca
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  const dir1 = new THREE.DirectionalLight(0xf05215, 1.2); dir1.position.set(4, 3, 5); scene.add(dir1);
  const dir2 = new THREE.DirectionalLight(0x049ea0, 1.0); dir2.position.set(-5, -2, 3); scene.add(dir2);

  // Globe sphere (atmosphere + dotted surface)
  const globe = new THREE.Group();
  scene.add(globe);

  const radius = 2;
  // Inner glassy sphere — fondo profundo en tono frío de marca
  const innerMat = new THREE.MeshPhysicalMaterial({
    color: 0x06262a,
    transmission: 0.4,
    roughness: 0.4,
    metalness: 0.1,
    transparent: true,
    opacity: 0.92,
    clearcoat: 0.6,
  });
  const inner = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.985, 64, 64), innerMat);
  globe.add(inner);

  // Wireframe / latitude lines — teal Payboom
  const wire = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 1.001, 32, 24),
    new THREE.MeshBasicMaterial({ color: 0x049ea0, wireframe: true, transparent: true, opacity: 0.22 })
  );
  globe.add(wire);

  // ----- Convertidor lat/lon → vec3 (mismo eje que markers) -----
  function ll2v3(lat, lon, r) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
       r * Math.cos(phi),
       r * Math.sin(phi) * Math.sin(theta)
    );
  }

  // Dotted continents — distribución uniforme en lat/lon usando fibonacci
  const N = 7000; // generosa; los del agua se descartan
  const landPos = [];
  const landCol = [];
  const oceanPos = [];

  for (let i = 0; i < N; i++) {
    const phiP = Math.acos(1 - 2 * (i + 0.5) / N);     // 0..π
    const thetaA = Math.PI * (1 + Math.sqrt(5)) * i;   // azimuthal
    const lat = 90 - phiP * (180 / Math.PI);
    let lon = ((thetaA * (180 / Math.PI)) % 360 + 540) % 360 - 180;

    if (isLand(lat, lon)) {
      const v = ll2v3(lat, lon, radius * 1.005);
      landPos.push(v.x, v.y, v.z);
      // Mezcla naranja/teal según lat (cálido en ecuador, teal hacia polos)
      const t = Math.min(1, Math.abs(lat) / 60);
      // naranja Payboom (240,82,21) → teal Payboom (4,158,160)
      const r = (0.94 * (1 - t) + 0.02 * t);
      const g = (0.32 * (1 - t) + 0.62 * t);
      const b = (0.08 * (1 - t) + 0.63 * t);
      landCol.push(r, g, b);
    } else if (i % 6 === 0) {
      // ocean dot ralo y muy tenue
      const v = ll2v3(lat, lon, radius * 1.0005);
      oceanPos.push(v.x, v.y, v.z);
    }
  }

  // Tierra
  const dotsGeo = new THREE.BufferGeometry();
  dotsGeo.setAttribute('position', new THREE.Float32BufferAttribute(landPos, 3));
  dotsGeo.setAttribute('color',    new THREE.Float32BufferAttribute(landCol, 3));
  const dotsMat = new THREE.PointsMaterial({
    size: 0.045, vertexColors: true, transparent: true, opacity: 0.98,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  globe.add(new THREE.Points(dotsGeo, dotsMat));

  // Océano (puntos muy tenues para dar volumen)
  const oceanGeo = new THREE.BufferGeometry();
  oceanGeo.setAttribute('position', new THREE.Float32BufferAttribute(oceanPos, 3));
  const oceanMat = new THREE.PointsMaterial({
    size: 0.018, color: 0x0b3a3d, transparent: true, opacity: 0.55,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  globe.add(new THREE.Points(oceanGeo, oceanMat));

  // Atmosphere glow
  const atmoGeo = new THREE.SphereGeometry(radius * 1.18, 64, 64);
  const atmoMat = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.BackSide,
    uniforms: {},
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.65 - dot(vNormal, vec3(0,0,1)), 3.0);
        // glow naranja Payboom
        gl_FragColor = vec4(0.94, 0.32, 0.08, 1.0) * intensity;
      }`,
  });
  const atmo = new THREE.Mesh(atmoGeo, atmoMat);
  globe.add(atmo);

  // ---- City markers + arcs ----
  // Lon/Lat coordinates of 12 financial hubs
  const cities = [
    { name: 'Madrid',     lat: 40.4,  lon: -3.7 },
    { name: 'London',     lat: 51.5,  lon: -0.1 },
    { name: 'New York',   lat: 40.7,  lon: -74.0 },
    { name: 'Mexico CDMX',lat: 19.4,  lon: -99.1 },
    { name: 'São Paulo',  lat: -23.5, lon: -46.6 },
    { name: 'Lagos',      lat: 6.5,   lon: 3.4 },
    { name: 'Dubai',      lat: 25.2,  lon: 55.3 },
    { name: 'Mumbai',     lat: 19.1,  lon: 72.9 },
    { name: 'Singapore',  lat: 1.35,  lon: 103.8 },
    { name: 'Tokyo',      lat: 35.7,  lon: 139.7 },
    { name: 'Sydney',     lat: -33.9, lon: 151.2 },
    { name: 'Berlin',     lat: 52.5,  lon: 13.4 },
  ];

  function latLonToVec3(lat, lon, r) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
       r * Math.cos(phi),
       r * Math.sin(phi) * Math.sin(theta)
    );
  }

  // Markers
  const markers = [];
  cities.forEach((c) => {
    const pos = latLonToVec3(c.lat, c.lon, radius * 1.01);
    const grp = new THREE.Group();
    grp.position.copy(pos);
    grp.lookAt(pos.clone().multiplyScalar(2));

    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xf05215 })
    );
    grp.add(dot);

    const ringMat = new THREE.MeshBasicMaterial({ color: 0xf05215, transparent: true, opacity: 0.85, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.04, 0.06, 28), ringMat);
    ring.position.z = 0.001;
    grp.add(ring);

    grp.userData = { phase: Math.random() * Math.PI * 2, ring };
    globe.add(grp);
    markers.push({ pos, grp });
  });

  // Arcs (great-circle curves between city pairs)
  const arcGroup = new THREE.Group();
  globe.add(arcGroup);
  const arcs = [];

  function buildArc(a, b) {
    const p1 = a.clone().normalize().multiplyScalar(radius * 1.01);
    const p2 = b.clone().normalize().multiplyScalar(radius * 1.01);
    const dist = p1.distanceTo(p2);
    const mid = p1.clone().add(p2).multiplyScalar(0.5);
    const lift = 1 + dist * 0.35;
    mid.normalize().multiplyScalar(radius * lift);
    const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
    const points = curve.getPoints(60);
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color: 0x06c4c7, transparent: true, opacity: 0.0,
      linewidth: 2, blending: THREE.AdditiveBlending
    });
    const line = new THREE.Line(geo, mat);
    arcGroup.add(line);

    // partícula viajera (transacción) en naranja
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xff7a45 })
    );
    head.visible = false;
    arcGroup.add(head);

    arcs.push({ curve, line, head, t: 0, life: 0, delay: Math.random() * 5 });
  }

  // Build a network of arcs
  const pairs = [
    [0,1],[0,3],[0,4],[1,2],[1,5],[1,6],[2,3],[2,4],
    [6,7],[6,8],[7,8],[8,9],[9,10],[5,7],[1,11],[11,2],
    [3,4],[4,8],[10,8],[2,9]
  ];
  pairs.forEach(([i, j]) => buildArc(markers[i].pos, markers[j].pos));

  // Resize
  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  // Cursor follow GLOBAL — el globo reacciona al cursor desde cualquier parte
  const mouse = { x: 0, y: 0, tx: 0, ty: 0, hover: false };
  const onMove = (e) => {
    // posición del cursor relativa al canvas (no a la viewport)
    const r = canvas.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top  + r.height / 2;
    // distancia normalizada al centro del canvas (no clampada)
    mouse.tx = ((e.clientX - cx) / Math.max(window.innerWidth,  600)) * 1.4;
    mouse.ty = ((e.clientY - cy) / Math.max(window.innerHeight, 400)) * 1.2;
    mouse.hover = true;
  };
  window.addEventListener('pointermove', onMove);

  let t = 0;
  const animate = () => {
    t += 0.01;
    mouse.x += (mouse.tx - mouse.x) * 0.07;
    mouse.y += (mouse.ty - mouse.y) * 0.07;

    // rotación constante + parallax notable con el cursor
    globe.rotation.y += 0.0024;
    globe.rotation.y += mouse.x * 0.025;
    globe.rotation.x = -0.18 + mouse.y * 0.55;
    globe.rotation.z = mouse.x * 0.18;

    // pulsing markers
    markers.forEach((m, i) => {
      const ph = m.grp.userData.phase + t * 2;
      const s = 1 + (Math.sin(ph) * 0.5 + 0.5) * 1.4;
      m.grp.userData.ring.scale.set(s, s, s);
      m.grp.userData.ring.material.opacity = 0.7 - (s - 1) * 0.4;
    });

    // arcs animation
    arcs.forEach((a) => {
      if (a.delay > 0) { a.delay -= 0.02; return; }
      a.t += 0.008;
      if (a.t >= 1.4) { a.t = 0; a.delay = Math.random() * 4; a.head.visible = false; a.line.material.opacity = 0; return; }
      const fade = a.t < 0.2 ? a.t / 0.2 : a.t > 1 ? Math.max(0, 1 - (a.t - 1) / 0.4) : 1;
      a.line.material.opacity = 0.55 * fade;
      const tt = Math.min(a.t, 1);
      const p = a.curve.getPoint(tt);
      a.head.position.copy(p);
      a.head.visible = a.t > 0.02 && a.t <= 1.05;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();
}

/* ============================================================
   FORMULARIO DE CONTACTO — envía el lead por email
   Se usa formsubmit.co (sin backend propio).
   IMPORTANTE: la PRIMERA vez que se envíe, formsubmit pedirá
   confirmar el email destino: hay que abrir el correo de
   confirmación en comercial@payboom.io y hacer clic.
   A partir de ahí, llegará a:
     · comercial@payboom.io
     · sandro.haro@payboom.io  (CC)
   con asunto "NUEVO LEAD POTENCIAL".
   ============================================================ */
function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = document.getElementById('cfStatus');
  const btn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validación básica
    if (!form.reportValidity()) return;

    form.classList.add('is-loading');
    status.className = 'cf-status';
    status.textContent = 'Enviando…';

    const data = new FormData(form);
    const payload = {
      _subject: 'NUEVO LEAD POTENCIAL',
      _cc: 'sandro.haro@payboom.io',
      _template: 'table',
      _captcha: 'false',
      Nombre: data.get('nombre'),
      Correo: data.get('correo'),
      Telefono: data.get('telefono'),
      Mensaje: data.get('mensaje'),
    };

    try {
      const res = await fetch('https://formsubmit.co/ajax/comercial@payboom.io', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('http ' + res.status);
      const json = await res.json().catch(() => ({}));

      // formsubmit responde { success: 'true' } cuando todo va bien
      if (json && (json.success === 'true' || json.success === true)) {
        status.className = 'cf-status is-ok';
        status.textContent = '¡Mensaje enviado! Te contactamos en menos de 24 h.';
        form.reset();
      } else if (json && /activate|confirm/i.test(JSON.stringify(json))) {
        status.className = 'cf-status is-ok';
        status.textContent = 'Mensaje recibido. Activa el correo de verificación enviado a comercial@payboom.io para empezar a recibir los leads.';
      } else {
        status.className = 'cf-status is-ok';
        status.textContent = '¡Mensaje enviado! Te contactamos pronto.';
        form.reset();
      }
    } catch (err) {
      status.className = 'cf-status is-err';
      status.textContent = 'No se pudo enviar. Inténtalo de nuevo o escríbenos a comercial@payboom.io';
    } finally {
      form.classList.remove('is-loading');
    }
  });
}

/* ============================================================
   BANNER DE COOKIES
   ============================================================ */
function setupCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;
  const KEY = 'payboom_cookies_v1';
  let stored = null;
  try { stored = localStorage.getItem(KEY); } catch {}
  if (!stored) banner.hidden = false;

  const persist = (val) => {
    try { localStorage.setItem(KEY, val); } catch {}
    banner.hidden = true;
  };
  document.getElementById('cookieAccept')?.addEventListener('click', () => persist('accepted'));
  document.getElementById('cookieReject')?.addEventListener('click', () => persist('rejected'));
}

/* ---------- Init when DOM idle ---------- */
function init() {
  buildCardScene();
  buildGlobeScene();
  setupContactForm();
  setupCookieBanner();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

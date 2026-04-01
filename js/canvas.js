// canvas.js — Ambient background: soft orb glows + particle mesh
// Orbs are soft, contained, teal-only. No full-screen colour bleed.

(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  const PARTICLES = 55;
  const LINE_DIST = 110;
  const MOUSE = { x: -999, y: -999 };
  let particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function rand(a, b) { return Math.random() * (b - a) + a; }

  function initParticles() {
    particles = Array.from({ length: PARTICLES }, () => ({
      x:  rand(0, W), y: rand(0, H),
      vx: rand(-0.14, 0.14), vy: rand(-0.14, 0.14),
      r:  rand(0.8, 1.8),
      alpha: rand(0.25, 0.6),
    }));
  }

  // Three fixed soft orb glows positioned away from centre text
  const ORBS = [
    { xf: 0.82, yf: 0.16, r: 0.26, color: '30,207,170',  a: 0.052 }, // top-right teal
    { xf: 0.10, yf: 0.80, r: 0.20, color: '91,156,246',  a: 0.042 }, // bottom-left blue
    { xf: 0.60, yf: 0.90, r: 0.16, color: '30,207,170',  a: 0.032 }, // bottom-mid teal
  ];

  function drawOrbs(t) {
    ORBS.forEach((o, i) => {
      const breathe = 1 + Math.sin(t * 0.35 + i * 1.9) * 0.055;
      const cx = W * o.xf;
      const cy = H * o.yf;
      const radius = Math.min(W, H) * o.r * breathe;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grd.addColorStop(0,   `rgba(${o.color},${o.a})`);
      grd.addColorStop(0.5, `rgba(${o.color},${(o.a * 0.35).toFixed(3)})`);
      grd.addColorStop(1,   `rgba(${o.color},0)`);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
    });
  }

  function drawGrid() {
    ctx.save();
    ctx.strokeStyle = 'rgba(30,207,170,0.016)';
    ctx.lineWidth = 0.5;
    const s = 80;
    for (let x = -H; x < W + H; x += s) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + H, H); ctx.stroke();
    }
    ctx.restore();
  }

  function drawParticles() {
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(30,207,170,${p.alpha * 0.5})`;
      ctx.fill();
    });
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < LINE_DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(30,207,170,${(1 - d/LINE_DIST) * 0.065})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }
    }
  }

  function updateParticles() {
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -5) p.x = W+5; if (p.x > W+5) p.x = -5;
      if (p.y < -5) p.y = H+5; if (p.y > H+5) p.y = -5;
      const dx = p.x - MOUSE.x, dy = p.y - MOUSE.y;
      const d  = Math.sqrt(dx*dx + dy*dy);
      if (d < 90) { p.x += (dx/d)*0.28; p.y += (dy/d)*0.28; }
    });
  }

  function loop(ts) {
    ctx.clearRect(0, 0, W, H);
    drawOrbs(ts * 0.001);
    drawGrid();
    drawLines();
    drawParticles();
    updateParticles();
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => { resize(); initParticles(); });
  window.addEventListener('mousemove', e => { MOUSE.x = e.clientX; MOUSE.y = e.clientY; });

  resize(); initParticles();
  requestAnimationFrame(loop);
})();
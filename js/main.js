// main.js — Landing page logic

// ---- Modal ----
const overlay    = document.getElementById('modal-overlay');
const openBtns   = [document.getElementById('open-modal-btn'), document.getElementById('hero-signin-btn')];
const closeBtn   = document.getElementById('modal-close');

openBtns.forEach(btn => btn && btn.addEventListener('click', () => overlay.classList.add('open')));
closeBtn && closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
overlay && overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') overlay.classList.remove('open');
});

// ---- Role Selection ----
let currentRole = 'student';
function selectRole(btn, role) {
  document.querySelectorAll('.rtab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentRole = role;
  const placeholders = {
    student: 'e.g. aarav.sharma@school.edu',
    teacher: 'e.g. priya.nair@dps.edu',
    parent:  'e.g. rajan.sharma@gmail.com',
  };
  const emailInput = document.getElementById('login-email');
  if (emailInput) emailInput.placeholder = placeholders[role];
}
window.selectRole = selectRole;

// ---- Login Submit ----
function handleLogin(e) {
  e.preventDefault();
  const btn    = document.getElementById('submit-btn');
  const text   = document.getElementById('btn-text');
  const loader = document.getElementById('btn-loader');

  text.style.display   = 'none';
  loader.style.display = 'inline-block';
  btn.disabled = true;

  setTimeout(() => {
    const routes = {
      student: 'pages/student.html',
      teacher: 'pages/teacher.html',
      parent:  'pages/parent.html',
    };
    window.location.href = routes[currentRole] || 'pages/student.html';
  }, 1100);
}
window.handleLogin = handleLogin;

// ---- Navbar scroll effect ----
const nav = document.getElementById('topnav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.background = 'rgba(6,10,18,0.9)';
  } else {
    nav.style.background = 'rgba(6,10,18,0.6)';
  }
});

// ---- Scroll reveal for feature cards ----
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.style.animationPlayState = 'running'; }),
  { threshold: 0.1 }
);
document.querySelectorAll('.feat-card').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

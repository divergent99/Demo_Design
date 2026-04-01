// dashboard.js — Shared utilities for all dashboard pages

// ---- Section switcher ----
function showSection(id, linkEl) {
  document.querySelectorAll('.dash-section').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('section-' + id);
  if (target) target.classList.add('active');

  if (linkEl) {
    document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
    linkEl.classList.add('active');
  }
}
window.showSection = showSection;

// ---- Toast notification ----
let toastTimer = null;
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  if (toastTimer) clearTimeout(toastTimer);

  const icons = { success: '✓', warning: '⚠', danger: '✕', info: 'i' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type] || '✓'}</span><span>${message}</span>`;
  document.body.appendChild(toast);

  toastTimer = setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
window.showToast = showToast;

// ---- Animate progress bars on load ----
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.prog-fill').forEach(bar => {
      const target = bar.style.width;
      bar.style.width = '0%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { bar.style.width = target; });
      });
    });
  }, 400);
});

// ---- Back to home link ----
document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.sidebar-logo');
  if (logo) {
    logo.style.cursor = 'pointer';
    logo.title = 'Back to home';
    logo.addEventListener('click', () => { window.location.href = '../index.html'; });
  }
});

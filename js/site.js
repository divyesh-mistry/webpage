document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');

function closeMenu({ restoreFocus = false } = {}) {
  if (!menuButton || !menu) return;
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  if (restoreFocus) menuButton.focus();
}

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const open = !menu.classList.contains('open');
    menu.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('open')) closeMenu({ restoreFocus: true });
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-shell') && menu.classList.contains('open')) closeMenu();
  });
  window.matchMedia('(min-width: 701px)').addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });
}

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

const filters = [...document.querySelectorAll('[data-filter]')];
const outputs = [...document.querySelectorAll('[data-category]')];
const groups = [...document.querySelectorAll('[data-output-group]')];
const outputCount = document.getElementById('output-count');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    outputs.forEach((item) => {
      const matches = category === 'all' || item.dataset.category === category
        || (category === 'review' && item.dataset.status === 'review');
      item.hidden = !matches;
    });
    groups.forEach((group) => {
      group.hidden = ![...group.querySelectorAll('[data-category]')].some((item) => !item.hidden);
    });
    if (outputCount) {
      const count = outputs.filter((item) => !item.hidden).length;
      outputCount.textContent = category === 'all'
        ? '2 published articles · 1 manuscript under review · 1 software workflow · 4 conference contributions'
        : `${count} ${count === 1 ? 'output' : 'outputs'} shown · ${button.textContent.trim()}`;
    }
  });
});

document.querySelectorAll('details').forEach((details) => {
  details.addEventListener('toggle', () => {
    if (!details.open) details.querySelectorAll('video').forEach((video) => video.pause());
  });
});

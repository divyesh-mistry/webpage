const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');

function closeMenu() {
  if (!menuButton || !menu) return;
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  const icon = menuButton.querySelector('i');
  if (icon) icon.className = 'fa-solid fa-bars';
}

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const willOpen = !menu.classList.contains('open');
    menu.classList.toggle('open', willOpen);
    menuButton.setAttribute('aria-expanded', String(willOpen));
    menuButton.setAttribute('aria-label', willOpen ? 'Close navigation' : 'Open navigation');
    const icon = menuButton.querySelector('i');
    if (icon) icon.className = willOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 720) closeMenu(); });
}

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

const filters = document.querySelectorAll('[data-filter]');
const publications = document.querySelectorAll('[data-category]');
filters.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    publications.forEach((item) => {
      item.hidden = category !== 'all' && item.dataset.category !== category;
    });
  });
});

document.querySelectorAll('video[autoplay]').forEach((video) => {
  const playbackRate = Number(video.dataset.playbackRate);
  if (playbackRate > 0) video.playbackRate = playbackRate;
  const play = video.play();
  if (play && typeof play.catch === 'function') play.catch(() => {});
});

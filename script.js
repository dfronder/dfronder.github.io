const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const themeToggle = document.getElementById('themeToggle');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const squareCount = 100;
const squareSize = 5;
const squares = [];

for (let i = 0; i < squareCount; i++) {
  squares.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: (Math.random() - 0.5) * 8,
    dy: (Math.random() - 0.5) * 8,
  });
}

function getSquareColor() {
  return getComputedStyle(document.body).getPropertyValue('--square-color').trim();
}

function animate() {
  ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--bg-color');
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = getSquareColor();

  for (const square of squares) {
    square.x += square.dx;
    square.y += square.dy;

    if (square.x < 0 || square.x + squareSize > canvas.width) square.dx *= -1;
    if (square.y < 0 || square.y + squareSize > canvas.height) square.dy *= -1;

    ctx.fillRect(square.x, square.y, squareSize, squareSize);
  }

  requestAnimationFrame(animate);
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

function applyTheme(theme) {
  document.body.classList.toggle('dark', theme === 'dark');
  document.body.classList.toggle('light', theme === 'light');
}

function detectSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const savedTheme = localStorage.getItem('theme');
const currentTheme = savedTheme || detectSystemTheme();
applyTheme(currentTheme);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});
;

function updateFontSize() {
  const aspectRatio = window.innerWidth / window.innerHeight;
  const height = window.innerHeight;
  const pixelRatio = window.devicePixelRatio || 1;

  let fontScale = Math.min(8, Math.max(3, aspectRatio * 5));

  if (height < 800 || pixelRatio < 1.5) {
    fontScale *= 1.2;
  }

  document.documentElement.style.setProperty('--dynamic-font-size', `${fontScale}vw`);
}

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const hamburgerIcon = document.getElementById('hamburgerIcon');
  const backIcon = document.getElementById('backIcon');
  const sideMenu = document.getElementById('sideMenu');
  const splashText = document.getElementById('splashText');
  const footerNote = document.getElementById('footerNote');

  let isMenuOpen = false;

  menuToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    sideMenu.classList.toggle('open', isMenuOpen);
    splashText?.classList.toggle('menu-open', isMenuOpen);
    footerNote?.classList.toggle('menu-open', isMenuOpen);

    if (isMenuOpen) {
      hamburgerIcon.classList.add('hidden');
      setTimeout(() => backIcon.style.display = 'block', 150);
      setTimeout(() => backIcon.classList.remove('hidden'), 160);
    } else {
      backIcon.classList.add('hidden');
      setTimeout(() => backIcon.style.display = 'none', 150);
      setTimeout(() => hamburgerIcon.classList.remove('hidden'), 160);
    }
  });
});

window.addEventListener('resize', updateFontSize);
updateFontSize();

animate();
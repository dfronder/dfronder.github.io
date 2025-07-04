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

  if (!menuToggle) return;

  let isMenuOpen = false;

  menuToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    sideMenu?.classList.toggle('open', isMenuOpen);
    splashText?.classList.toggle('menu-open', isMenuOpen);
    footerNote?.classList.toggle('menu-open', isMenuOpen);

    if (hamburgerIcon && backIcon) {
      if (isMenuOpen) {
        hamburgerIcon.classList.add('hidden');
        setTimeout(() => backIcon.style.display = 'block', 150);
        setTimeout(() => backIcon.classList.remove('hidden'), 160);
      } else {
        backIcon.classList.add('hidden');
        setTimeout(() => backIcon.style.display = 'none', 150);
        setTimeout(() => hamburgerIcon.classList.remove('hidden'), 160);
      }
    }
  });
});

function updateLogo() {
  const logo = document.getElementById("centerText");
  const short = logo.dataset.short;

  if (window.matchMedia("(max-aspect-ratio: 3 / 4)").matches) {
    logo.textContent = short;
  } else {
    logo.textContent = "DFRONDER";
  }
}

window.addEventListener("DOMContentLoaded", updateLogo);
window.addEventListener("resize", updateLogo);
window.addEventListener('resize', updateFontSize);
updateFontSize();
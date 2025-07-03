const menuToggle = document.getElementById('menuToggle');
let menuOpen = false;

const hamburgerIcon = '<svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor"><path d="M40 33H0V28H40V33ZM40 22H0V17H40V22ZM40 11H0V6H40V11Z"/></svg>';
const backIcon = '<svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor"><path d="M15 32H10V27H15V32ZM10 27H5V22H0V17H5V12H10V17H40V22H10V27ZM15 12H10V7H15V12Z"/></svg>';

menuToggle.innerHTML = hamburgerIcon;

menuToggle.addEventListener('click', () => {
  const currentSvg = menuToggle.querySelector('svg');
  currentSvg.classList.add('fade-out');

  setTimeout(() => {
    menuOpen = !menuOpen;
    menuToggle.innerHTML = menuOpen ? backIcon : hamburgerIcon;

    const newSvg = menuToggle.querySelector('svg');
    newSvg.classList.add('fade-out');

    void newSvg.offsetWidth;
    newSvg.classList.remove('fade-out');

    document.getElementById('sideMenu')?.classList.toggle('open', menuOpen);
  }, 300);
});

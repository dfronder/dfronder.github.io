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

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (e.matches) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
});

animate();
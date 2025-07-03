const canvas = document.getElementById('canvas');
const ctx = canvas?.getContext('2d');

function getResponsiveSquareSize() {
  const minDim = Math.min(window.innerWidth, window.innerHeight);
  return Math.max(3, minDim / 150);
}

let squareSize = getResponsiveSquareSize();
const squareCount = 100;
const squares = [];

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  squareSize = getResponsiveSquareSize();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < squareCount; i++) {
  squares.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    dx: (Math.random() - 0.5) * 8,
    dy: (Math.random() - 0.5) * 8,
  });
}

function getSquareColor() {
  return getComputedStyle(document.body).getPropertyValue('--square-color').trim();
}

function animate() {
  if (!ctx || !canvas) return;
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

animate();
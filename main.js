const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function setupCanvas() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, 150, 100);
}

setupCanvas();

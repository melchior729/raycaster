const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const player = {
  x: 100,
  y: 100,
  speed: 1
};

function setupCanvas() {
  const thickness = 50;
  const width = canvas.width;
  const height = canvas.height;
  ctx.fillStyle = 'blue';

  // borders of the screen
  ctx.fillRect(0, 0, width, thickness);
  ctx.fillRect(0, 0, thickness, height);
  ctx.fillRect(0, height - thickness, width, thickness);
  ctx.fillRect(width - thickness, 0, thickness, height);

  document.addEventListener('keydown', e => {
    const validKeys = ['w', 'a', 's', 'd', 'shift'];
    const key = e.key.toLowerCase();

    if (validKeys.includes(key)) {
      switch (key) {
        case 'w':
          break;
        case 'a':
          break;
        case 's':
          break;
        case 'd':
          break;
        case 'Shift':
          break;
      }
    }

    console.log(key);
  });
}

function drawPlayer() {
  const thickness = 25;
  ctx.fillStyle = 'red';
  ctx.fillRect(player.x, player.y, thickness, thickness);
}

setupCanvas();

drawPlayer();

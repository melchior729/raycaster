const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const player = {
  x: 100,
  y: 100,
  speed: 10,
  size: 25,
  angle: 0
};

const margin = 50;
const pressed = new Set();

function cleanScreen() {
  const width = canvas.width;
  const height = canvas.height;

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, width, margin);
  ctx.fillRect(0, 0, margin, height);
  ctx.fillRect(0, height - margin, width, margin);
  ctx.fillRect(width - margin, 0, margin, height);
}

function setup() {
  cleanScreen();

  document.addEventListener("keydown", e => {
    const key = e.key;
    if (['w', 'a', 's', 'd'].includes(key)) {
      pressed.add(key);
    }
  });

  document.addEventListener("keyup", e => {
    const key = e.key;
    pressed.delete(key);
  });
}


function updatePlayer() {
  const speed = player.speed;
  console.log(`X: ${player.x}, Y: ${player.y}`);

  if (pressed.has('w')) {
    player.y -= speed;
    if (player.y < margin) {
      player.y = margin;
    }
  }

  if (pressed.has('a')) {
    player.x -= speed;
    if (player.x < margin) {
      player.x = margin;
    }
  }

  if (pressed.has('s')) {
    player.y += speed;
    if (player.y > canvas.height - margin - player.size) {
      player.y = canvas.height - margin - player.size;
    }
  }

  if (pressed.has('d')) {
    player.x += speed;
    if (player.x > canvas.width - margin - player.size) {
      player.x = canvas.width - margin - player.size;
    }
  }
}

function drawPlayer() {
  ctx.fillStyle = 'red';
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function main() {
  cleanScreen();
  updatePlayer();
  drawPlayer();
  requestAnimationFrame(main);
}

setup();
requestAnimationFrame(main);

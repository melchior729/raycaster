const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const player = {
  x: 100,
  y: 100,
  speed: 10,
  angle: 0
};

const pressed = new Set();

function cleanScreen() {
  const thickness = 50;
  const width = canvas.width;
  const height = canvas.height;

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, width, thickness);
  ctx.fillRect(0, 0, thickness, height);
  ctx.fillRect(0, height - thickness, width, thickness);
  ctx.fillRect(width - thickness, 0, thickness, height);
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
  if (pressed.has('w')) {
    player.y -= speed;
  }

  if (pressed.has('a')) {
    player.x -= speed;
  }

  if (pressed.has('s')) {
    player.y += speed;
  }

  if (pressed.has('d')) {
    player.x += speed;
  }
}

function drawPlayer() {
  const thickness = 25;
  ctx.fillStyle = 'red';
  ctx.fillRect(player.x, player.y, thickness, thickness);
}

function main() {
  cleanScreen();
  updatePlayer();
  drawPlayer();
  requestAnimationFrame(main);
}

setup();
requestAnimationFrame(main);

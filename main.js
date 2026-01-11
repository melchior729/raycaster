import World from './world.js';

const canvas = document.getElementById('canvas');

const player = {
  x: 500,
  y: 500,
  speed: 10,
  size: 25,
  angle: 0
};

class Artist {

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  cleanScreen(world) {
    const width = canvas.width;
    const height = canvas.height;
    const backgroundColor = 'white';
    const wallColor = 'blue';
    const sideLength = world.getSideLength();
    const tileSize = width / sideLength;

    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, width, height);

    this.ctx.fillStyle = wallColor;
    for (let i = 0; i < sideLength; i++) {
      for (let j = 0; j < sideLength; j++) {
        if (world.grid[i][j]) {
          this.ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
        }
      }
    }
    // dependent on the grid!
    // ctx.fillRect(0, 0, width, margin);
    // ctx.fillRect(0, 0, margin, height);
    // ctx.fillRect(0, height - margin, width, margin);
    // ctx.fillRect(width - margin, 0, margin, height);
  }

  drawPlayer(player) {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(player.x, player.y, player.size, player.size);
  }
}

const pressed = new Set();

function setup() {
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


function main() {
  artist.cleanScreen(world);
  updatePlayer();
  artist.drawPlayer(player);
  requestAnimationFrame(main);
}

const artist = new Artist(canvas);
const world = new World(10);
setup();
requestAnimationFrame(main);

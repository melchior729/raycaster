import World from './World.js';
import Artist from './Artist.js';

const canvas = document.getElementById('canvas');

const player = {
  x: 500,
  y: 500,
  speed: 10,
  size: 25,
  angle: 0
};


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

const artist = new Artist(canvas);
const world = new World(10);
setup();
requestAnimationFrame(main);

function main() {
  artist.drawScreen(world);
  updatePlayer();
  artist.drawPlayer(player);
  requestAnimationFrame(main);
}


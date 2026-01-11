import World from './World.js';
import InputController from './InputController.js';
import Artist from './Artist.js';

const canvas = document.getElementById('canvas');
const artist = new Artist(canvas);
const controller = new InputController();
const world = new World(10);

const player = {
  x: 500,
  y: 500,
  speed: 10,
  size: 25,
  angle: 0
};

function main() {
  controller.updatePlayer(player);
  artist.drawScreen(world);
  artist.drawPlayer(player);
  requestAnimationFrame(main);
}

main();

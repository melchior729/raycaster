import Artist from './Artist.js';
import InputController from './InputController.js';
import Player from './Player.js';
import World from './World.js';

const canvas = document.getElementById('canvas');
const artist = new Artist(canvas);
const controller = new InputController();
const world = new World(10);
const player = new Player();

function main() {
  controller.updatePlayer(player);
  artist.drawScreen(world);
  artist.drawPlayer(player);
  requestAnimationFrame(main);
}

main();

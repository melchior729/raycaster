/**
 * @file Contains the instantiation of classes, and the main loop.
 * @author Abhay Manoj
 */

import Artist from './Artist.js';
import InputController from './InputController.js';
import Player from './Player.js';
import World from './World.js';

const canvas = document.getElementById('canvas');
const artist = new Artist(canvas);
const controller = new InputController();
const sideLength = 16;
const world = new World(sideLength);
const player = new Player();
let lastTime = 0;

function main(currentTime) {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  const fixedDeltaTime = Math.min(deltaTime, 0.1);

  controller.movePlayer(player, fixedDeltaTime);
  artist.drawScreen(world);
  artist.drawPlayer(player);
  requestAnimationFrame(main);
}

main(lastTime);

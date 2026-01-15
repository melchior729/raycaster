/**
 * @file Contains the instantiation of classes, and the main loop.
 * @author Abhay Manoj
 */

import Artist from './Artist.js';
import InputController from './InputController.js';
import Player from './Player.js';
import Raycaster from './Raycaster.js';
import World from './World.js';

const canvas = document.getElementById('canvas');
let wallColor = document.querySelector('#picker').value;
const artist = new Artist(canvas, wallColor);
const controller = new InputController();
const sideLength = 16;
const world = new World(sideLength);
const player = new Player();
const caster = new Raycaster(canvas.width);
let lastTime = 0;

document.addEventListener('input', e => {
  console.log('hi');
  wallColor = document.querySelector('#picker').value;
  artist.changeWallColor(wallColor);
});

/**
* Returns the time since the last 'tick'.
* @param {number} currentTime - The current time
* @returns {number} The difference in time from the last time
*/
function getDeltaTime(currentTime) {
  const msPerSecond = 1000;
  const deltaTime = (currentTime - lastTime) / msPerSecond;
  lastTime = currentTime;
  return Math.min(deltaTime, 0.1);
}

/**
* Calculates the difference in time, moves the player, and draws to the screen.
* Ran through 'requestAnimationFrame'.
* @param {number} currentTime - This is handled by requestAnimationFrame.
*/
function main(currentTime) {
  controller.movePlayer(player, getDeltaTime(currentTime));
  caster.shootRays(player, world);
  artist.drawRays(caster.rayLengths);
  artist.drawMap(world);
  artist.drawPlayer(player, world.tileSize);
  requestAnimationFrame(main);
}

main(lastTime);

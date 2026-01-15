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
const backgroundColorPicker = document.querySelector('#bg-picker');
const sideLengthPicker = document.querySelector('#size-changer');
const wallColorPicker = document.querySelector('#fg-picker');
let wallColor = wallColorPicker.value;
const mapPicker = document.querySelector('#maps');
let map = mapPicker.value ?? 'pillars';
const artist = new Artist(canvas, wallColor);
const controller = new InputController();
const sideLength = 32;
const world = new World(map, sideLength);
const player = new Player();
const caster = new Raycaster(canvas.width);
let lastTime = 0;

/**
* Adds event listeners to UI elements for real-time updates.
*/
function addListeners() {
  backgroundColorPicker.addEventListener('input', () => {
    artist.changeBackgroundColor(backgroundColorPicker.value);
  });

  mapPicker.addEventListener('click', () => {
    mapPicker.showPicker();
  });

  mapPicker.addEventListener('change', () => {
    world.setMap(mapPicker.value);
    player.x = 1.5;
    player.y = 1.5;
  });

  wallColorPicker.addEventListener('input', () => {
    artist.changeWallColor(wallColorPicker.value);
  });

  sideLengthPicker.addEventListener('input', () => {
    world.setSideLength(sideLengthPicker.value);
  });
}

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
* @param {number} currentTime - Handled by requestAnimationFrame
*/
function main(currentTime) {
  const oldX = player.x;
  const oldY = player.y;
  controller.movePlayer(player, getDeltaTime(currentTime));

  if (world.isWall(Math.floor(player.x), Math.floor(oldY))) {
    player.x = oldX;
  }

  if (world.isWall(Math.floor(oldX), Math.floor(player.y))) {
    player.y = oldY;
  }

  caster.shootRays(player, world);
  artist.drawRays(caster.rayLengths);
  artist.drawMap(world);
  artist.drawPlayer(player, world.tileSize, world);
  requestAnimationFrame(main);
}

addListeners();
main(lastTime);

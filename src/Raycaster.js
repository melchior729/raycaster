import World from './World.js';
import Player from './Player.js';

export default class Raycaster {

  constructor(width) {
    this.width = width;
    this.rayLengths = [];
  }

  /**
  * Shoots the rays, stores the distance between the wall and the player, column i at index i.
  * @param {Player} - The player that we are looking out as.
  * @param {World} - The game world
  */
  shootRays(player, world) {
    this.rayLengths = [];
    const direction = player.directionVector;

    for (let i = 0; i < this.width; i++) {
      const fovX = (2 * i) / this.width - 1;
      const ray = {
        x: direction.x + plane.x * fovX,
        y: direction.y + plane.y * fovX
      }
      this.rayLengths[i] = this._dda(player, ray, world);
    }
  }

  _dda(player, ray, world) {
    let mapX = Math.floor(player.x / world.tileSize);
    let mapY = Math.floor(player.y / world.tileSize);

    const deltaX = Math.abs(1 / ray.x);
    const deltaY = Math.abs(1 / ray.y);

    let stepX, stepY, sideDistX, sideDistY;

    if (ray.x < 0) {
      stepX = -1;
      sideDistX = deltaX * ();
    } else {
      stepX = 1;
      sideDistX = deltaX * ();
    }
  }
}

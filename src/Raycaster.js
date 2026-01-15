/**
 * @file Handles the casting of rays, and stores the ray lengths.
 * @author Abhay Manoj
 */

export default class Raycaster {

  constructor(width) {
    this.width = width;
    this.rayLengths = new Float32Array(width);
  }

  /**
  * Shoots the rays, stores the distance between the wall and the player, column i at index i.
  * @param {Player} player - The player that we are looking out as.
  * @param {World} world - The game world
  */
  shootRays(player, world) {
    const { x, y, directionVector: dir } = player;
    const fov = 0.9; // 90 degrees
    const plane = { x: -dir.y * fov, y: dir.x * fov }

    for (let i = 0; i < this.width; i++) {
      const fovX = (i * 2) / this.width - 1;
      const ray = {
        x: dir.x + plane.x * fovX,
        y: dir.y + plane.y * fovX
      };
      this.rayLengths[i] = this._dda(x, y, ray, world);
    }
  }

  /**
  * Returns the distance to the nearest gridline, aswell as the step to that point.
  * @param {number} cord - The grid coordinate.
  * @param {number} dir - X or y value of the direction vector.
  * @param {number} i - Index on the grid.
  * @param {number} delta - The length between gridlines.
  */
  _getStepAndDist(cord, dir, i, delta) {
    return dir < 0
      ? [-1, (cord - i) * delta]
      : [1, (i + 1 - cord) * delta];
  }

  /**
  * Returns the length between the player, and the wall at a given angle.
  * @param {number} x - X coordinate of the player.
  * @param {number} y - Y coordinate of the player.
  * @param {[number], [number]} ray - The direction vector to look to.
  * @param {World} world - The world that the player is in.
  */
  _dda(x, y, ray, world) {
    const dx = Math.abs(1 / ray.x);
    const dy = Math.abs(1 / ray.y);

    let currX = Math.floor(x);
    let currY = Math.floor(y);

    let [stepX, distX] = this._getStepAndDist(x, ray.x, currX, dx);
    let [stepY, distY] = this._getStepAndDist(y, ray.y, currY, dy);

    let side = 0; // 0 means horizontal hit, 1 is vertical hit
    let depth = 1000;

    while (!world.isWall(currY, currX) && depth > 0) {
      if (distX < distY) {
        currX += stepX;
        distX += dx;
        side = 0;
      } else {
        currY += stepY;
        distY += dy;
        side = 1;
      }

      depth--;
    }

    return side === 0 ? distX - dx : distY - dy;
  }
}

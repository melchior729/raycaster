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
    const dir = player.directionVector;
    const fov = 0.9; // 90 degrees
    const plane = { x: -dir.y * fov, y: dir.x * fov }

    for (let i = 0; i < this.width; i++) {
      const fovX = (i * 2) / this.width - 1;
      const ray = {
        x: dir.x + plane.x * fovX,
        y: dir.y + plane.y * fovX
      };
      this.rayLengths[i] = this._dda(player, ray, world);
    }
  }

  /**
  * Returns the distance to the nearest gridline, aswell as the step to that point.
  * @param {number} pos - X or y coordinate.
  * @param {number} dir - X or y value of the direction vector.
  * @param {number} i - Index of pos on the grid.
  * @param {number} tileSize - The tilesize of the world.
  * @param {number} delta - The length between gridlines.
  */
  _getStepAndDist(pos, dir, i, tileSize, delta) {
    if (dir < 0) {
      return [-1, delta * (pos / tileSize - i)];
    }
    return [1, delta * (i + 1 - pos / tileSize)];
  }

  /**
  * Returns the length between the player, and the wall at a given angle.
  * @param {Player} player - The player to look from.
  * @param {[number], [number]} ray - The direction vector to look to.
  * @param {World} world - The world that the player is in.
  */
  _dda(player, ray, world) {
    const dx = Math.abs(1 / ray.x);
    const dy = Math.abs(1 / ray.y);

    let currX = Math.floor(player.x / world.tileSize);
    let currY = Math.floor(player.x / world.tileSize);

    let [stepX, distX] = this._getStepAndDist(player.x, ray.x, currX, world.tileSize, dx);
    let [stepY, distY] = this._getStepAndDist(player.y, ray.y, currY, world.tileSize, dy);

    let hit = false;
    let side = 0; // 0 means horizontal hit, 1 is vertical hit
    let depth = world.grid.length ** 2;

    while (!hit && depth > 0) {
      if (distX < distY) {
        currX += stepX;
        distX += dx;
        side = 0;
      } else {
        currY += stepY;
        distY += dy;
        side = 1;
      }

      if (world.isWall(currY, currX)) {
        hit = true;
      }
      depth--;
    }

    return side === 0 ? distX - dx : distY - dy;
  }
}

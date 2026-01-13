export default class Raycaster {

  constructor(width) {
    this.width = width;
    this.rayLengths = [];
  }

  shootRays(player) {
    // loop from 0 to the widht of the screen
    // make a function that scales it properly (-1 -> 1)
    // get the player direction vector
    // get the normal of that vector;
    // scale it by the constant 
    // add it to the player dir vector.
    // add the vector to the pos of the player.
    // shoot the ray and do dda, get back the length
    // store this in rayLengths[i]

    for (let i = 0; i < width; i++) {
      let scalar = Math.abs(i - width / 2);
      scalar = !scalar ? 1 : 1 / scalar;

      const directionVector = player.directionVector;
      const normal = { x: -directionVector.y, y: directionVector.x };
      const scaledNormal = { x: normal.x * scalar, y: normal.y * scalar };
      const rayVector = { x: scaledNormal.x + directionVector.x, y: scaledNormal.y + directionVector.y };

      const length = _dda(rayVector, grid);
      this.rayLengths[i] = length;
    }
  }

  _dda(player, ray, world) {
    let x = player.x;
    let y = player.y;

    let sideDirX = 0;
    let sideDirY = 0;

  }

  clearRays() {
    this.rayLengths = [];
  }
}

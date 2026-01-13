export default class Raycaster {

  constructor(width) {
    this.width = width;
    this.rayLengths = [];
  }

  getRays(player) {
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

    }
  }

  dda(direction, grid) {
    // it will return sidedist x or siddedist 13/01/2026
  }

  clearRays() {
    this.rayLengths = [];
  }
}

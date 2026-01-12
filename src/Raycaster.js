export default class Raycaster {

  constructor(width) {
    this.width = width;
    this.rayLengths = [];
    this.fov = Math.PI / 2;
  }

  fireRays(viewingAngle) {
    // start at left fov wing, shoot out a ray,
    // get that length, store it as an array element
    // move slightly to the next ray fire angle
    // shoot it and store it in the array
    // do this for width times

    let angle = viewingAngle - this.fov / 2;
    const degreesPerPixel = viewingAngle / this.width;

    for (let i = 0; i < this.width; i++) {
      rayLengths[i] = getRayLength(angle);
      angle += degreesPerPixel;
    }
  }

  _getNearestGridLine(x, y) {

  }

  clearRayLengths() {
    this.rayLengths = []
  }
}

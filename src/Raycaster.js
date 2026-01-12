export default class Raycaster {

  constructor(width) {
    this.width = width;
    this.rayLengths = [];
    this.fov = { x: 0, y: 1 };
    this.camera = { x: 1, y: 0 }
  }
}

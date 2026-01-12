export default class Player {

  constructor() {
    this.x = 64;
    this.y = 64;
    this.speed = 10;
    this.size = 25;
    this.rotationDelta = 0.1;
    this.directionVector = { x: 1, y: 0 }
  }

  moveForward() {
    this.x += this.directionVector.x * this.speed;
    this.y += this.directionVector.y * this.speed;
  }

  moveBackward() {
    this.x -= this.directionVector.x * this.speed;
    this.y -= this.directionVector.y * this.speed;
  }

  rotateLeft() {
    this.directionVector.x = this.directionVector.x * Math.cos(this.rotationDelta) + this.directionVector.y * Math.sin(this.rotationDelta);
    this.directionVector.y = this.directionVector.y * Math.cos(this.rotationDelta) - this.directionVector.x * Math.sin(this.rotationDelta);
    this._normalize();
  }

  rotateRight() {
    this.directionVector.x = this.directionVector.x * Math.cos(this.rotationDelta) - this.directionVector.y * Math.sin(this.rotationDelta);
    this.directionVector.y = this.directionVector.x * Math.sin(this.rotationDelta) + this.directionVector.y * Math.cos(this.rotationDelta);
    this._normalize();
  }

  getDirectionVectorLength() {
    return Math.sqrt(this.directionVector.x ** 2 + this.directionVector.y ** 2);
  }

  _normalize() {
    const length = Math.sqrt(this.directionVector.x ** 2 + this.directionVector.y ** 2);
    this.directionVector.x = this.directionVector.x / length;
    this.directionVector.y = this.directionVector.y / length;
  }
}

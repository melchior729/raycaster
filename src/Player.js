export default class Player {

  constructor() {
    this.x = 500;
    this.y = 500;
    this.speed = 10;
    this.size = 25;
    this.angle = 0;
    this.rotationSpeed = 1;
  }

  moveUp() {
    this.y -= this.speed;
  }

  moveDown() {
    this.y += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }

  rotateLeft() {
    this.angle += rotationSpeed;
  }

  rotateRight() {
    this.angle -= rotationSpeed;
  }
}

export default class Player {

  constructor() {
    this.x = 64;
    this.y = 64;
    this.speed = 10;
    this.size = 25;
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
}

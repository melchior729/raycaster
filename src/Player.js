/**
 * @file Contains information about the player, such as the location, speed and direction vector. Also has movement methods.
 * @author Abhay Manoj
 */

export default class Player {

  constructor() {
    this.x = 64;
    this.y = 64;
    this.speed = 10;
    this.size = 25;
    this.rotationDelta = 0.08;
    this.directionVector = { x: 1, y: 0 }
  }

  /**
  * Moves the player forward depending on their direction vector and by their speed.
  */
  moveForward() {
    this.x += this.directionVector.x * this.speed;
    this.y += this.directionVector.y * this.speed;
  }

  /**
  * Moves the player backward depending on their direction vector and by their speed.
  */
  moveBackward() {
    this.x -= this.directionVector.x * this.speed;
    this.y -= this.directionVector.y * this.speed;
  }

  /**
  * Rotates the player left by the rotationDelta.
  */
  rotateLeft() {
    const oldX = this.directionVector.x;
    const oldY = this.directionVector.y;

    this.directionVector.x = oldX * Math.cos(this.rotationDelta) + oldY * Math.sin(this.rotationDelta);
    this.directionVector.y = oldY * Math.cos(this.rotationDelta) - oldX * Math.sin(this.rotationDelta);

    this._normalize();
  }

  /**
  * Rotates the player right by the rotationDelta.
  */
  rotateRight() {
    const oldX = this.directionVector.x;
    const oldY = this.directionVector.y;

    this.directionVector.x = oldX * Math.cos(this.rotationDelta) - oldY * Math.sin(this.rotationDelta);
    this.directionVector.y = oldX * Math.sin(this.rotationDelta) + oldY * Math.cos(this.rotationDelta);

    this._normalize();
  }

  /**
  * Normalizes the length of the directionVector.
  */
  _normalize() {
    const length = Math.sqrt(this.directionVector.x ** 2 + this.directionVector.y ** 2);
    this.directionVector.x = this.directionVector.x / length;
    this.directionVector.y = this.directionVector.y / length;
  }
}

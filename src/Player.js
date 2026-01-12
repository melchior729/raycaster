/**
 * @file Contains information about the player, such as the location, speed and direction vector. Also has movement methods.
 * @author Abhay Manoj
 */

export default class Player {

  constructor() {
    this.x = 64;
    this.y = 64;
    this.speed = 250;
    this.size = 25;
    this.rotationDelta = 0.08;
    this.directionVector = { x: 1, y: 0 }
  }

  /**
  * Moves the player depending on the direction provided.
  * @param {number} deltaTime - The time since the last tick.
  * @param {number} direction - 1 for forward, -1 for backward.
  */
  _move(deltaTime, direction) {
    this.x += this.directionVector.x * this.speed * deltaTime * direction;
    this.y += this.directionVector.y * this.speed * deltaTime * direction;
  }

  /**
  * Moves the player forward.
  * @param {number} deltaTime - The time since the last tick.
  */
  moveForward(deltaTime) {
    this._move(deltaTime, 1);
  }

  /**
  * Moves the player backward.
  * @param {number} deltaTime - The time since the last tick.
  */
  moveBackward(deltaTime) {
    this._move(deltaTime, -1);
  }

  /**
  * Rotates the player depending on the direction provided.
  * @param {number} deltaTime - The time since the last tick.
  * @param {number} direction - 1 for right, -1 for left.
  */
  _rotate(deltaTime, direction) {
    const frameRate = 60;
    const angle = this.rotationDelta * deltaTime * frameRate * direction;
    const { x, y } = this.directionVector;

    this.directionVector.x = x - y * angle;
    this.directionVector.y = y + x * angle;

    this._normalize();
  }

  /**
  * Rotates the player left.
  * @param {number} deltaTime - The time since the last tick.
  */
  rotateLeft(deltaTime) {
    this._rotate(deltaTime, -1);
  }

  /**
  * Rotates the player right.
  * @param {number} deltaTime - The time since the last tick.
  */
  rotateRight(deltaTime) {
    this._rotate(deltaTime, 1);
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

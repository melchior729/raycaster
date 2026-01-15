/**
 * @file Contains information about the player, such as the location, speed and direction vector. Also has movement methods.
 * @author Abhay Manoj
 */

export default class Player {

  constructor() {
    this.x = 1.5;
    this.y = 1.5;
    this.speed = 3;
    this.size = 25;
    this.rotationDelta = 4;
    this.directionVector = { x: 1, y: 0 }
  }

  /**
  * Moves the player depending on the direction provided.
  * @param {number} deltaTime - The time since the last tick.
  * @param {number} direction - 1 for forward, -1 for backward.
  * @param {number} multplier - The speed mulitpler.
  */
  _move(deltaTime, direction, multiplier = 1) {
    const speed = this.speed * multiplier;
    this.x += this.directionVector.x * speed * deltaTime * direction;
    this.y += this.directionVector.y * speed * deltaTime * direction;
  }

  /**
  * Moves the player forward.
  * @param {number} deltaTime - The time since the last tick.
  * @param {number} multplier - The speed mulitpler.
  */
  moveForward(deltaTime, multiplier) {
    this._move(deltaTime, 1, multiplier);
  }

  /**
  * Moves the player backward.
  * @param {number} deltaTime - The time since the last tick.
  * @param {number} multpler - The speed mulitplier.
  */
  moveBackward(deltaTime, multiplier) {
    this._move(deltaTime, -1, multiplier);
  }

  /**
  * Rotates the player depending on the direction provided.
  * @param {number} deltaTime - The time since the last tick.
  * @param {number} direction - 1 for right, -1 for left.
  */
  _rotate(deltaTime, direction) {
    const angle = this.rotationDelta * deltaTime * direction;
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

  /**
  * Resets the player's direction vector to default.
  */
  reset() {
    this.directionVector = { x: 1, y: 0 }
  }
}

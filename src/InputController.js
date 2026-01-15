/**
 * @file Controls keyboard input, and  brings about the result of those inputs.
 * @author Abhay Manoj
 */

export default class InputController {

  constructor() {
    this.pressed = new Set();
    this.validKeys = ['w', 'a', 's', 'd', 'Shift']
    this._setup();
  }

  /**
  * Creates the event listeners for keydown and keyup.
  */
  _setup() {
    document.addEventListener("keydown", e => {
      const key = e.key.toLowerCase();
      if (this.validKeys.includes(key) || key === 'shift') {
        this.pressed.add(key);
      }
    });

    document.addEventListener("keyup", e => {
      const key = e.key.toLowerCase();
      this.pressed.delete(key);
    });
  }

  /**
  * Moves the player according to the key that was pressed.
  * @param {Player} player - The player to move
  * @param {number} deltaTime - The time since the last tick.
  */
  movePlayer(player, deltaTime) {
    const speedMultiplier = this.pressed.has('shift') ? 2 : 1;
    if (this.pressed.has('w')) {
      player.moveForward(deltaTime, speedMultiplier);
    }

    if (this.pressed.has('a')) {
      player.rotateLeft(deltaTime);
    }

    if (this.pressed.has('s')) {
      player.moveBackward(deltaTime, speedMultiplier);
    }

    if (this.pressed.has('d')) {
      player.rotateRight(deltaTime);
    }
  }
}

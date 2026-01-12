/**
 * @file Controls keyboard input, and the brings about the result of those inputs.
 * @author Abhay Manoj
 */

export default class InputController {

  constructor() {
    this.pressed = new Set();
    this._setup();
  }

  /**
  * Creates the event listeners for keydown and keyup.
  */
  _setup() {
    document.addEventListener("keydown", e => {
      const validKeys = ['w', 'a', 's', 'd']
      const key = e.key;
      if (validKeys.includes(key)) {
        this.pressed.add(key);
      }
    });

    document.addEventListener("keyup", e => {
      const key = e.key;
      this.pressed.delete(key);
    });
  }

  /**
  * Moves the player according to the key that was pressed.
  * @param {Player} player - The player to move
  */
  movePlayer(player) {
    if (this.pressed.has('w')) {
      player.moveForward();
    }

    if (this.pressed.has('a')) {
      player.rotateLeft();
    }

    if (this.pressed.has('s')) {
      player.moveBackward();
    }

    if (this.pressed.has('d')) {
      player.rotateRight();
    }
  }
}

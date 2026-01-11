export default class InputController {

  constructor() {
    this.pressed = new Set();
    this._setup();
  }

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

  movePlayer(player) {
    if (this.pressed.has('w')) {
      player.moveUp();
    }

    if (this.pressed.has('a')) {
      player.moveLeft();
    }

    if (this.pressed.has('s')) {
      player.moveDown();
    }

    if (this.pressed.has('d')) {
      player.moveRight();
    }
  }
}

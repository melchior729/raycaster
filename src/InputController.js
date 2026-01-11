export default class InputController {

  constructor() {
    this.pressed = new Set();
    this._setup();
  }

  _setup() {
    document.addEventListener("keydown", e => {
      const key = e.key;
      if (['w', 'a', 's', 'd'].includes(key)) {
        this.pressed.add(key);
      }
    });

    document.addEventListener("keyup", e => {
      const key = e.key;
      this.pressed.delete(key);
    });
  }


  updatePlayer(player) {
    const speed = player.speed;

    if (this.pressed.has('w')) {
      player.y -= speed;
    }

    if (this.pressed.has('a')) {
      player.x -= speed;
    }

    if (this.pressed.has('s')) {
      player.y += speed;
    }

    if (this.pressed.has('d')) {
      player.x += speed;
    }
  }
}

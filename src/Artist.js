/**
 * @file Contains mgthods to draw components onto the screen.
 * @author Abhay Manoj
 */

export default class Artist {

  constructor(canvas, wallColor) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.backgroundColor = 'black';
    this.wallColor = wallColor;
    this.playerColor = 'gold';
  }

  /**
  * Draws the rays onto the screen.
  * @param {number[]} rayLengths - The lengths of each ray to draw
  */
  drawRays(rayLengths) {
    const height = this.canvas.height;
    this._fillBackground();

    for (let i = 0; i < rayLengths.length; i++) {
      const dist = rayLengths[i];
      let lineHeight = height / (dist || 0.1); // if dist = 0
      if (lineHeight > height) {
        lineHeight = height;
      }
      const startY = (height - lineHeight) / 2;

      const darkness = Math.pow(0.92, dist);
      this.ctx.strokeStyle = this.wallColor;

      this.ctx.globalAlpha = darkness;
      this.ctx.beginPath();
      this.ctx.moveTo(i, startY);
      this.ctx.lineTo(i, startY + lineHeight);
      this.ctx.stroke();
    }

    this.ctx.globalAlpha = 1.0;
  }

  /**
  * Draws the map onto the screen.
  * @param {World} world - The world to draw.
  */
  drawMap(world) {
    const sideLength = world.sideLength;
    const tileSize = world.tileSize;
    this.ctx.save();
    this._updateScale(Math.floor(this.canvas.width / 10), world);

    this.ctx.scale(this.scale, this.scale);
    this._fillBackground();

    this.ctx.fillStyle = this.wallColor;
    for (let i = 0; i < sideLength; i++) {
      for (let j = 0; j < sideLength; j++) {
        if (world.grid[i][j]) {
          this.ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
        }
      }
    }

    this.ctx.restore();
  }

  /**
  * Draws the player onto the canvas.
  * @param {Player} player - The player to draw.
  */
  drawPlayer(player, tileSize) {
    this.ctx.save();
    this.ctx.scale(this.scale, this.scale);

    const { x, y } = player.directionVector;
    const px = player.x * tileSize;
    const py = player.y * tileSize;

    this.ctx.setTransform(x * this.scale, y * this.scale, -y * this.scale, x * this.scale, px * this.scale, py * this.scale);
    this.ctx.fillStyle = this.playerColor;
    this.ctx.fillRect(-player.size / 2, -player.size / 2, player.size, player.size);

    this.ctx.restore();
  }

  /**
  * Updates the scaling between the world and the canvas.
  * @param {World} world - The world to compare against.
  */
  _updateScale(width, world) {
    this.scale = width / (world.sideLength * world.tileSize);
  }

  /**
  * Fills the background with the background color.
  */
  _fillBackground() {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
  * Changes the wall color.
  * @param {string} color - The color to change to
  */
  changeWallColor(color) {
    this.wallColor = color;
  }
}

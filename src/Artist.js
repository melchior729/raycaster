/**
 * @file Contains methods to draw components onto the screen.
 * @author Abhay Manoj
 */

export default class Artist {

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  drawRays(rayLengths) {
    const height = this.canvas.height;

    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, height);

    for (let i = 0; i < rayLengths.length; i++) {
      const dist = rayLengths[i];
      let lineHeight = height / (dist || 0.1);
      if (lineHeight > height) {
        lineHeight = height;
      }

      const startY = (height - lineHeight) / 2;
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'blue';
      this.ctx.moveTo(i, startY);
      this.ctx.lineTo(i, startY + lineHeight);
      this.ctx.stroke();
    }
  }

  /**
  * Draws the background and walls onto the screen.
  * @param {World} world - The world to draw.
  */
  drawScreen(world) {
    const width = this.canvas.width;
    const height = this.canvas.height;
    const sideLength = world.sideLength;
    const tileSize = world.tileSize;
    this._updateScale(world);

    this.ctx.save();
    this.ctx.scale(this.scale, this.scale);

    const backgroundColor = 'black';
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, width, height);

    const wallColor = 'purple';
    this.ctx.fillStyle = wallColor;
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
  * Updates the scaling between the world and the canvas.
  * @param {World} world - The world to compare against.
  */
  _updateScale(world) {
    this.scale = this.canvas.width / (world.sideLength * world.tileSize);
  }

  /**
  * Draws the player onto the canvas.
  * @param {Player} player - The player to draw.
  */
  drawPlayer(player) {
    this.ctx.save();
    this.ctx.scale(this.scale, this.scale);

    const { x, y } = player.directionVector;
    const px = player.x + player.size / 2;
    const py = player.y + player.size / 2;

    this.ctx.setTransform(x * this.scale, y * this.scale, -y * this.scale, x * this.scale, px * this.scale, py * this.scale);
    this.ctx.fillStyle = 'gold';
    this.ctx.fillRect(-player.size / 2, -player.size / 2, player.size, player.size);

    this.ctx.restore();
  }
}


export default class Artist {

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  drawScreen(world) {
    const width = this.canvas.width;
    const height = this.canvas.height;
    const sideLength = world.sideLength;
    const tileSize = world.tileSize;
    const worldSize = sideLength * tileSize;
    const scale = width / worldSize;

    this.ctx.save();
    this.ctx.scale(scale, scale);

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

  drawPlayer(player) {
    this.ctx.fillStyle = 'gold';
    this.ctx.fillRect(player.x, player.y, player.size, player.size);
  }
}


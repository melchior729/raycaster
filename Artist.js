export default class Artist {

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  drawScreen(world) {
    const width = canvas.width;
    const height = canvas.height;
    const backgroundColor = 'white';
    const wallColor = 'blue';
    const sideLength = world.getSideLength();
    const tileSize = width / sideLength;

    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, width, height);

    this.ctx.fillStyle = wallColor;
    for (let i = 0; i < sideLength; i++) {
      for (let j = 0; j < sideLength; j++) {
        if (world.grid[i][j]) {
          this.ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
        }
      }
    }
  }

  drawPlayer(player) {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(player.x, player.y, player.size, player.size);
  }
}


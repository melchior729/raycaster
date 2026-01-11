export default class World {

  constructor(sideLength) {
    this.sideLength = sideLength;
    this.grid = this._generateGrid();
  }

  _generateGrid() {
    let grid = []
    for (let i = 0; i < this.sideLength; i++) {
      grid.push([]);
      for (let j = 0; j < this.sideLength; j++) {
        const num = (i === 0 || i === this.sideLength - 1 || j === 0 || j === this.sideLength - 1) ? 1 : 0;
        grid[grid.length - 1].push(num);
      }
    }
    return grid;
  }
}

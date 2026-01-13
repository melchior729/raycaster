/**
 * @file Contains the World class, which contains the grid that the game uses.
 * @author Abhay Manoj
 */

export default class World {

  constructor(sideLength) {
    this.sideLength = sideLength;
    this.grid = this._generateGrid();
    this.tileSize = 64;
  }

  /**
  * Generates a grid depending on the side length, all the border elements are 1 (walls),
  * while the inner elements are zeroes. Has sideLength^2 elements.
  * @returns {number[][]} A 2D array of the World, contains empty spaces and walls.
  */
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

  /**
  * Returns if the space at grid[x][y] is a wall. 0-indexed and not indices, not px values.
  * @param {number} x - X grid coordinate of the space to check
  * @param {number} y - Y grid coordinate of the space to check
  * @returns {bool} True if it is a wall, false otherwise.
  */
  isWall(x, y) {
    return grid[x][y];
  }

  /**
  * Returns the indices that the provided x, y, coordinate would be in the grid.
  * @param {number} x - The x coordinate.
  * @param {number} y - The y coordinate.
  * @returns {[number, number]} The array containing the x and y coordinate.
  */
  getIndices(x, y) {
    return [Math.floor(x / this.tileSize), Math.floor(y / this.tileSize)];
  }
}

/**
 * @file Contains the World class, which contains the grid that the game uses.
 * @author Abhay Manoj
 */

export default class World {

  constructor(sideLength) {
    this.sideLength = sideLength;
    this.grid = this._generateCameraGrid();
    this.tileSize = 64;
  }

  /**
   * Generates a 16x16 grid with a decorative, symmetrical inner wall pattern.
   * Includes a solid outer border and concentric-style wall clusters.
   * @returns {number[][]} A 16x16 2D array representing the game world.
   */
  _generateCameraGrid() {
    const size = 16;
    let grid = Array.from({ length: size }, () => Array(size).fill(0));

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        // Outer Border
        if (i === 0 || i === size - 1 || j === 0 || j === size - 1) {
          grid[i][j] = 1;
        }
        // Symmetry logic for the inner pattern
        const isPattern = (
          ((i === 2 || i === 13) && (j >= 2 && j <= 4 || j >= 11 && j <= 13)) ||
          ((j === 2 || j === 13) && (i >= 2 && i <= 4 || i >= 11 && i <= 13)) ||
          ((i === 4 || i === 11) && (j >= 4 && j <= 6 || j >= 9 && j <= 11)) ||
          ((j === 4 || j === 11) && (i >= 4 && i <= 6 || i >= 9 && i <= 11)) ||
          ((i === 6 || i === 9) && (j >= 6 && j <= 9)) ||
          ((j === 6 || j === 9) && (i >= 6 && i <= 9))
        );

        if (isPattern) grid[i][j] = 1;
      }
    }
    return grid;
  }
  /**
  * Generates a grid depending on the side length, all the border elements are 1 (walls),
  * while the inner elements are zeroes. Has sideLength^2 elements.
  * @returns {number[][]} A 2D array of the World, contains empty spaces and walls.
  */
  _generateBorderWorld() {
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
    return this.grid[x][y];
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

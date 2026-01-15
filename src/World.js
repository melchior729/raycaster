/**
 * @file Contains the World class, which contains the grid that the game uses.
 * @author Abhay Manoj
 */

export default class World {

  constructor(sideLength) {
    this.sideLength = sideLength;
    this.grid = this._generateScaledPatternGrid();
    this.tileSize = 64;
  }

  /**
 * Generates a symmetrical, nested square pattern that scales with the grid size.
 * Creates concentric broken frames toward the center.
 * @returns {number[][]} 2D array with a scaled geometric pattern.
 */
  _generateScaledPatternGrid() {
    const size = this.sideLength;
    const grid = Array.from({ length: size }, () => Array(size).fill(0));

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        // Outer Border
        if (i === 0 || i === size - 1 || j === 0 || j === size - 1) {
          grid[i][j] = 1;
          continue;
        }

        // Scaling factors for positions (2/16, 4/16, 6/16 etc.)
        const p1 = Math.floor(size * 0.125); // ~2 for size 16
        const p2 = Math.floor(size * 0.25);  // ~4
        const p3 = Math.floor(size * 0.375); // ~6

        const invP1 = size - 1 - p1;
        const invP2 = size - 1 - p2;
        const invP3 = size - 1 - p3;

        const isPattern = (
          ((i === p1 || i === invP1) && (j >= p1 && j <= p2 || j >= invP2 && j <= invP1)) ||
          ((j === p1 || j === invP1) && (i >= p1 && i <= p2 || i >= invP2 && i <= invP1)) ||
          ((i === p2 || i === invP2) && (j >= p2 && j <= p3 || j >= invP3 && j <= invP2)) ||
          ((j === p2 || j === invP2) && (i >= p2 && i <= p3 || i >= invP3 && i <= invP2)) ||
          ((i === p3 || i === invP3) && (j >= p3 && j <= invP3)) ||
          ((j === p3 || j === invP3) && (i >= p3 && i <= invP3))
        );

        if (isPattern) grid[i][j] = 1;
      }
    }
    return grid;
  }

  /**
   * Generates a square grid with a solid outer border and internal pillars 
   * placed at every 4th coordinate interval.
   * @returns {number[][]} A 2D array where 1 represents a wall/pillar and 0 is empty space.
   */
  _generatePillarGrid() {
    const grid = [];
    for (let i = 0; i < this.sideLength; i++) {
      grid.push([]);
      for (let j = 0; j < this.sideLength; j++) {
        const isBorder = i === 0 || i === this.sideLength - 1 || j === 0 || j === this.sideLength - 1;
        // Places a wall every 4 units if not on the border
        const isPillar = i % 4 === 0 && j % 4 === 0;

        grid[i].push(isBorder || isPillar ? 1 : 0);
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

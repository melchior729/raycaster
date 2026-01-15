/**
* @file Contains the World class, which contains the grid that the game uses.
* @author Abhay Manoj
*/

export default class World {

  constructor(map, sideLength) {
    this.sideLength = sideLength;
    this.map = map;
    this.grid = this._generatePillarGrid();
    this.tileSize = 64;
  }

  /**
  * Updates the map type and regenerates the grid based on the provided name.
  * @param {string} mapName - The name of the map pattern to generate
  */
  setMap(mapName) {
    this.map = mapName;
    switch (mapName) {
      case 'border':
        this.grid = this._generateBorderWorld();
        break;
      case 'expanding-square':
        this.grid = this._generateScaledPatternGrid();
        break;
      default:
        this.grid = this._generatePillarGrid();
    }
  }

  /**
  * Generates a symmetrical, nested square pattern that scales with the grid size.
  * @returns {number[][]} 2D array with a scaled geometric pattern
  */
  _generateScaledPatternGrid() {
    const size = this.sideLength;
    const grid = Array.from({ length: size }, () => Array(size).fill(0));

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (i === 0 || i === size - 1 || j === 0 || j === size - 1) {
          grid[i][j] = 1;
          continue;
        }

        const p1 = Math.floor(size * 0.125);
        const p2 = Math.floor(size * 0.25);
        const p3 = Math.floor(size * 0.375);

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
  * Generates a square grid with a solid outer border and internal pillars.
  * @returns {number[][]} A 2D array where 1 represents a wall and 0 is empty space
  */
  _generatePillarGrid() {
    const grid = [];
    for (let i = 0; i < this.sideLength; i++) {
      grid.push([]);
      for (let j = 0; j < this.sideLength; j++) {
        const isBorder = i === 0 || i === this.sideLength - 1 || j === 0 || j === this.sideLength - 1;
        const isPillar = i % 4 === 0 && j % 4 === 0;
        grid[i].push(isBorder || isPillar ? 1 : 0);
      }
    }
    return grid;
  }

  /**
  * Generates a grid where only the border elements are walls.
  * @returns {number[][]} A 2D array of the World with a hollow center
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
  * Returns if the space at grid[x][y] is a wall.
  * @param {number} x - X grid coordinate of the space to check
  * @param {number} y - Y grid coordinate of the space to check
  * @returns {boolean} True if it is a wall, false otherwise
  */
  isWall(x, y) {
    if (y < 0 || y >= this.grid.length || x < 0 || x >= this.grid[y].length) {
      return true;
    }
    return this.grid[y][x] !== 0;
  }

  /**
  * Sets the grid dimensions and regenerates the current map.
  * @param {number} length - The new side length for the grid
  */
  setSideLength(length) {
    const min = 16;
    const max = 144;
    if (length < min) length = min;
    if (length > max) length = max;

    this.sideLength = length;
    this.setMap(this.map);
  }
}

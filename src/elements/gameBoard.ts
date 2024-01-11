import { Grid } from "../types";

export class GameBoard implements Grid {
  size: number;
  constructor(public grid: number[][]) {
    this.size = grid.length;
  }

  getElementAt(top: number, left: number) {
    if (top < 0 || left < 0) return null;
    if (top >= this.size || left >= this.size) return null;
    return this.grid[top][left];
  }

  isElementInflammable(top: number, left: number) {
    const element = this.getElementAt(top, left);
    return element === 0 || element === 2;
  }

  stringify() {
    const d = {
      grid: this.grid,
      size: this.size,
    };
    return JSON.stringify(d);
  }
}

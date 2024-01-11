import { Grid } from "../types";

export class GameBoard implements Grid {
  size: number;
  constructor(public grid: number[][]) {
    this.size = grid.length;
  }

  stringify() {
    const d = {
      grid: this.grid,
      size: this.size,
    };
    return JSON.stringify(d);
  }
}

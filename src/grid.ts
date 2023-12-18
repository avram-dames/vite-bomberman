import { Grid } from "./types";

export class GameBoard implements Grid {
  constructor(
    public grid: number[][],
    public size: number,
  ) {}

  stringify() {
    const d = {
      grid: this.grid,
      size: this.size,
    };
    return JSON.stringify(d);
  }
}

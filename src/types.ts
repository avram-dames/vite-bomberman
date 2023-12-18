type Position = [number, number]; // [top, right]

type Direction = "left" | "right" | "up" | "down";

interface Grid {
  grid: number[][];
  size: number;
}

interface GridObject {
  position: Position;
}

export type { Grid, Position, Direction, GridObject };

type Grid = number[][];

type Position = number[];

type Direction = "left" | "right" | "up" | "down";

interface GameState {
  playerPosition: Position;
  grid: Grid;
  gridSize: number;
  bombQueue: undefined;
  validatePlayerPosition: (grid: Grid, position: Position) => number;
  setNewPlayerPosition: (position: Position) => void;
  movePlayer: (direction: Direction) => void;
}

export type { Grid, Position, Direction, GameState };

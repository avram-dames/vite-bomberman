type Grid = number[][];

type Position = [number, number]; // [top, right]

type Direction = "left" | "right" | "up" | "down";

type Bomb = {
  position: Position;
  time: number;
};

type Fire = {
  position: Position;
  spread: number;
  time: number;
};

type FireQueue = Fire[];

interface GameState {
  clock: number;
  playerPosition: Position;
  grid: Grid;
  gridSize: number;
  bombQueue: Bomb[];
  bombTime: number;
  fireTime: number;
  fireQueue: FireQueue;
  fireSpread: number;

  tick: () => void;
  placeBomb: () => boolean;
  detonateBombs: () => void;
  detonateBomb: (bomb: Bomb) => void;
  clearFires: () => void;
  clearFire: (fire: Fire) => void;
}

export type { Grid, Position, Direction, GameState, Bomb, Fire };

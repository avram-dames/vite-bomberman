type Grid = number[][];

type Position = number[];

type Direction = "left" | "right" | "up" | "down";

type Bomb = {
  position: Position;
  detonateTime: number;
};

type Fire = {
  position: Position;
  spread: number;
  clearTime: number;
};

type BombQueue = Bomb[];

type FireQueue = Fire[];

interface GameState {
  clock: number;
  playerPosition: Position;
  grid: Grid;
  gridSize: number;
  bombQueue: BombQueue;
  bombTime: number;
  fireTime: number;
  fireQueue: FireQueue;
  fireSpread: number;
  validatePlayerPosition: (grid: Grid, position: Position) => number;
  setNewPlayerPosition: (position: Position) => void;
  movePlayer: (direction: Direction) => void;
  tick: () => number;
  placeBomb: () => void;
  detonateBomb: (position: Position) => void;
  checkForBombsToExplode: () => void;
  checkForFiresToClear: () => void;
  clearFire: (fire: Fire) => void;
}

export type { Grid, Position, Direction, GameState, Bomb, Fire };

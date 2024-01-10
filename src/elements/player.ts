import { Position, Direction, Grid, Element } from "../types";

export function positionIsValid(position: Position, grid: Grid): boolean {
  const gridSize = grid.grid.length;
  return position[0] >= 0 &&
    position[0] <= gridSize - 1 &&
    position[1] >= 0 &&
    position[1] <= gridSize - 1 &&
    grid.grid[position[0]][position[1]] == 0
    ? true
    : false;
}

export function movePlayer(
  direction: Direction,
  currentPosition: Position,
  grid: Grid,
): [Position, boolean] {
  const nextPosition: Position = [...currentPosition];

  switch (direction) {
    case "up":
      nextPosition[0] -= 1;
      break;
    case "down":
      nextPosition[0] += 1;
      break;
    case "left":
      nextPosition[1] -= 1;
      break;
    case "right":
      nextPosition[1] += 1;
      break;
  }

  if (positionIsValid(nextPosition, grid)) {
    return [nextPosition, true];
  } else {
    return [currentPosition, false];
  }
}

export class Player implements Element {
  constructor(public position: Position) {}

  move(direction: Direction, grid: Grid): void {
    const [newPosition, hasChanged] = movePlayer(
      direction,
      this.position,
      grid,
    );
    if (hasChanged) {
      this.position = [...newPosition];
      window.dispatchEvent(
        new CustomEvent("playerpositionchanged", {
          detail: [...this.position],
        }),
      );
    }
  }

  placeBomb() {
    // trigger place bomb on grid and re-render
    window.dispatchEvent(
      new CustomEvent("bombPlaced", {
        detail: [...this.position],
      }),
    );
  }
}

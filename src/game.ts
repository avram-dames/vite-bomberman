import { GameState, Direction } from "./types";
import { updateUI } from "./ui";

const game: GameState = {
  playerPosition: [0, 0],
  // 0 - empty space
  // 1 - fixed wall
  // 2 - removable obstacle
  grid: [
    [0, 1],
    [0, 2],
  ],
  gridSize: 2,
  bombQueue: [],

  validatePlayerPosition(grid, position) {
    return position[0] >= 0 &&
      position[0] <= this.gridSize - 1 &&
      position[1] >= 0 &&
      position[1] <= this.gridSize - 1 &&
      grid[position[0]][position[1]] == 0
      ? 1
      : 0;
  },

  setNewPlayerPosition(position) {
    const newPositionIsValid = this.validatePlayerPosition(this.grid, position);
    console.log(`validate position: ${position} -> ${newPositionIsValid}`);

    if (newPositionIsValid) {
      game.playerPosition[0] = position[0];
      game.playerPosition[1] = position[1];
      console.log("new position set at:", game.playerPosition);
    }
  },

  movePlayer(direction: Direction) {
    const nextPosition = [...this.playerPosition];

    switch (direction) {
      case "up":
        nextPosition[0] -= 1;
        this.setNewPlayerPosition(nextPosition);
        break;
      case "down":
        nextPosition[0] += 1;
        this.setNewPlayerPosition(nextPosition);
        break;
      case "left":
        nextPosition[1] -= 1;
        this.setNewPlayerPosition(nextPosition);
        break;
      case "right":
        nextPosition[1] += 1;
        this.setNewPlayerPosition(nextPosition);
        break;
      default:
        break;
    }
    updateUI(this.playerPosition);
  },
};

export default game;

import { GameState, Direction, Bomb, Fire } from "./types";
import { updateUI, updateTimer, updateGrid } from "./ui";

const game: GameState = {
  clock: -1,
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
  bombTime: 3,
  fireTime: 1,
  fireQueue: [],
  fireSpread: 1,

  tick() {
    this.clock++;
    updateTimer(this.clock);
    this.checkForBombsToExplode();
    this.checkForFiresToClear();
    return this.clock;
  },

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

  placeBomb() {
    const newBomb: Bomb = {
      position: [...this.playerPosition],
      detonateTime: this.clock + this.bombTime,
    };
    const [x, y] = newBomb.position;
    this.grid[x][y] = 3;
    this.bombQueue.push(newBomb);
    updateGrid(this.grid);
  },

  checkForBombsToExplode() {
    console.log("check bombs");
    if (this.bombQueue.length === 0) return;
    console.log("bombs found");
    const bomb = this.bombQueue.pop();
    console.log("check bomb", bomb);
    if (bomb.detonateTime > this.clock) {
      this.bombQueue.push(bomb);
      return;
    }

    this.detonateBomb(bomb.position);
    this.checkForBombsToExplode();
  },

  checkForFiresToClear() {
    console.log("check for fires", this.fireQueue);

    if (this.fireQueue.length === 0) return;

    const fire = this.fireQueue.pop();
    console.log("fire", fire);

    if (fire.clearTime > this.clock) {
      this.fireQueue.push(fire);
      return;
    }

    this.clearFire(fire);
    this.checkForFiresToClear();
  },

  clearFire(fire) {
    const [x, y] = fire.position;
    this.grid[x][y] = 0;
    for (let index = 1; index < fire.spread + 1; index++) {
      if (this.grid[x - index]) this.grid[x - index][y] = 0;
      if (this.grid[x + index]) this.grid[x + index][y] = 0;
      if (this.grid[x][y - index]) this.grid[x][y - index] = 0;
      if (this.grid[x][y + index]) this.grid[x][y + index] = 0;
    }
    updateGrid(this.grid);
  },

  detonateBomb(position) {
    console.log(`Boom at ${position}`);

    const newFire: Fire = {
      position: [...position],
      spread: this.fireSpread,
      clearTime: this.clock + this.fireTime,
    };

    const [x, y] = [...position];
    this.grid[x][y] = 4;
    for (let index = 1; index < newFire.spread + 1; index++) {
      if (this.grid[x - index]) this.grid[x - index][y] = 4;
      if (this.grid[x + index]) this.grid[x + index][y] = 4;
      if (this.grid[x][y - index]) this.grid[x][y - index] = 4;
      if (this.grid[x][y + index]) this.grid[x][y + index] = 4;
    }
    updateGrid(this.grid);

    this.fireQueue.push(newFire);
  },
};

export default game;

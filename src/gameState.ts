import { GameState, Direction, Bomb, Fire } from "./types";
import { updateTimer, updateGrid } from "./ui";

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
  fireQueue: [],
  fireTime: 1,
  fireSpread: 1,

  tick() {
    this.clock++;
    updateTimer(this.clock);
    this.detonateBombs();
    this.clearFires();
  },

  placeBomb() {
    /**
     * Place a bomb at current player's position
     * and return true if it is allowed. Return false
     * not implemented yet.
     */
    const newBomb: Bomb = {
      position: [...this.playerPosition],
      time: this.clock + this.bombTime,
    };
    const [top, right] = newBomb.position;
    this.grid[top][right] = 3;
    this.bombQueue.push(newBomb);
    return true;
  },

  clearFires() {
    if (this.fireQueue.length) {
      for (const fire of checkForItemsReadyToAction(
        this.fireQueue,
        this.clock,
      )) {
        this.clearFire(fire);
      }
    }
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

  detonateBombs() {
    if (this.bombQueue.length) {
      for (const bomb of checkForItemsReadyToAction(
        this.bombQueue,
        this.clock,
      )) {
        this.detonateBomb(bomb);
      }
    }
  },

  detonateBomb(bomb) {
    const newFire: Fire = {
      position: [...bomb.position],
      spread: this.fireSpread,
      time: this.clock + this.fireTime,
    };

    const [x, y] = [...bomb.position];
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

function isTimeToAction(item: Bomb | Fire, currentTime: number): boolean {
  if (item.time <= currentTime) {
    return true;
  } else {
    return false;
  }
}

function* checkForItemsReadyToAction(
  queue: Bomb[] | Fire[],
  currentTime: number,
): Generator<Bomb | Fire> {
  for (const item of queue) {
    if (isTimeToAction(item, currentTime)) yield item;
  }
}

export { game, isTimeToAction, checkForItemsReadyToAction };

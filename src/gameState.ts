import { Position } from "./types";
import { GameBoard } from "./grid";
import { Player } from "./player";
import { Bomb } from "./bomb";
import { Fire } from "./fire";

interface GameState {
  clock: number;
  player: Player;
  grid: GameBoard;

  // refactor: move to own module
  eventHashTable: {
    [k: number]: (Bomb | Fire)[];
  };
  eventHashIndex: number[];

  // refactor: move to item class
  bombTime: number;
  fireTime: number;
  fireSpread: number;

  tick: () => void;
  updateGrid: (items: (Bomb | Fire)[]) => void;
  createBomb: (position: Position) => Bomb;
  placeBomb: (position: Position) => void;
  detonateBomb: (bomb: Bomb) => void;
  consumeEvents: () => void;
  handleEvent: (item: Bomb | Fire) => void;
  updateEventHashTable: (index: number, item: (Bomb | Fire)[]) => void;
  getDueEventsIndexes: () => number[];
}

const gameBoard = new GameBoard(
  [
    [0, 1],
    [0, 2],
  ],
  2,
);

const player = new Player([0, 0]);

export const game: GameState = {
  clock: -1,
  grid: gameBoard,
  player: player,
  bombTime: 3,
  fireTime: 1,
  fireSpread: 1,
  eventHashTable: {},
  eventHashIndex: [],

  tick() {
    this.clock++;
    this.consumeEvents();
    console.log("tick", this.clock);
  },

  updateEventHashTable(index, items) {
    if (this.eventHashIndex.includes(index)) {
      this.eventHashTable[index].push(...items);
    } else {
      this.eventHashIndex.push(index);
      this.eventHashTable[index] = items;
    }
  },

  consumeEvents() {
    this.getDueEventsIndexes().forEach((index) => {
      this.eventHashTable[index].forEach((item) => {
        this.handleEvent(item);
      });
      this.eventHashTable[index] = [];
      const i = this.eventHashIndex.indexOf(index);
      if (i > -1) {
        this.eventHashIndex.splice(index, 1);
      }
    });
  },

  handleEvent(item) {
    console.log("event handled", item);

    if (item instanceof Bomb) {
      this.detonateBomb(item);
    } else if (item instanceof Fire) {
      // the problem is that we need to handle all events of a type at the same time
      // so we don't update the grid after each item update
    }
  },

  getDueEventsIndexes() {
    return this.eventHashIndex.filter((index) => index <= this.clock);
  },

  updateGrid(items) {
    items.forEach((item) => {
      const [top, right] = item.position;
      this.grid.grid[top][right] = item.id;
    });
    window.dispatchEvent(new Event("gridupdated"));
  },

  createBomb(position) {
    const [top, right] = position;
    const timeToExplode = this.clock + this.bombTime;
    const power = 1; // const for now
    return new Bomb([top, right], timeToExplode, power);
  },

  placeBomb(position) {
    const newBomb = this.createBomb(position);
    this.updateGrid([newBomb]);
    this.updateEventHashTable(newBomb.timeToExplode, [newBomb]);
  },

  detonateBomb(bomb) {
    const spread = 1;
    const timeToClearFire = this.clock + 1;
    const [top, right] = bomb.position;

    const fires = [new Fire([top, right], spread)];

    for (let index = 1; index < spread + 1; index++) {
      if (this.grid.grid[top - index])
        fires.push(new Fire([top - index, right], spread));
      if (this.grid.grid[top + index])
        fires.push(new Fire([top + index, right], spread));
      if (this.grid.grid[top][right - index])
        fires.push(new Fire([top, right - index], spread));
      if (this.grid.grid[top][right + index])
        fires.push(new Fire([top, right + index], spread));
    }
    this.updateGrid(fires);
    this.updateEventHashTable(timeToClearFire, fires);
  },
};

// Event Handlers
function handleBombPlaced(e) {
  game.placeBomb(e.detail);
}

// Event Listeners
window.addEventListener("bombPlaced", handleBombPlaced);

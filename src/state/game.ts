import { Position } from "../types";
import { GameBoard } from "../elements/gameBoard";
import { Player } from "../elements/player";
import { Bomb } from "../elements/bomb";
import { Fire } from "../elements/fire";

interface GameState {
  TICK_RATE: number;

  data: {
    clock: number;
    player: Player;
    grid: GameBoard;

    // TODO: refactor: move event handling to own module
    eventHashTable: {
      [k: number]: (Bomb | Fire)[];
    };
    eventHashIndex: number[];

    // refactor: move to item class
    bombTime: number;
    fireTime: number;
    fireSpread: number;
  };

  tick: () => void;
  updateGrid: (items: (Bomb | Fire)[]) => void;
  createBomb: (position: Position) => Bomb;
  placeBomb: (position: Position) => void;
  clearFire: (fire: Fire) => void;
  detonateBomb: (bomb: Bomb) => void;
  consumeEvents: () => void;
  handleEvent: (item: Bomb | Fire) => void;
  updateEventHashTable: (index: number, item: (Bomb | Fire)[]) => void;
  getDueEventsIndexes: () => number[];
}

// Game State - singleton object
const game: GameState = {
  TICK_RATE: 3000,

  data: {
    clock: -1,
    grid: new GameBoard(
      [
        [0, 1],
        [0, 2],
      ],
      2,
    ),
    player: new Player([0, 0]),
    bombTime: 3,
    fireTime: 1,
    fireSpread: 1,
    eventHashTable: {},
    eventHashIndex: [],
  },

  tick() {
    this.data.clock++;
    this.consumeEvents();
    console.log("tick", this.data.clock);
  },

  updateEventHashTable(index, items) {
    if (this.data.eventHashIndex.includes(index)) {
      this.data.eventHashTable[index].push(...items);
    } else {
      this.data.eventHashIndex.push(index);
      this.data.eventHashTable[index] = items;
    }
  },

  consumeEvents() {
    this.getDueEventsIndexes().forEach((index) => {
      this.data.eventHashTable[index].forEach((item) => {
        this.handleEvent(item);
      });
      this.data.eventHashTable[index] = [];
      const i = this.data.eventHashIndex.indexOf(index);
      if (i > -1) {
        this.data.eventHashIndex.splice(index, 1);
      }
    });
  },

  handleEvent(item) {
    console.log("event handled", item);

    if (item instanceof Bomb) {
      this.detonateBomb(item);
    } else if (item instanceof Fire) {
      this.clearFire(item);
    }
  },

  getDueEventsIndexes() {
    return this.data.eventHashIndex.filter((index) => index <= this.data.clock);
  },

  updateGrid(items) {
    items.forEach((item) => {
      console.log("updateGrid", item);
      const [top, left] = item.position;
      this.data.grid.grid[top][left] = item.id;
    });
    window.dispatchEvent(new Event("gridupdated"));
  },

  createBomb(position) {
    const [top, left] = position;
    const timeToExplode = this.data.clock + this.data.bombTime;
    const power = 1; // const for now
    return new Bomb([top, left], timeToExplode, power);
  },

  placeBomb(position) {
    console.log("placeBomb at", position);
    const newBomb = this.createBomb(position);
    this.updateGrid([newBomb]);
    this.updateEventHashTable(newBomb.timeToExplode, [newBomb]);
  },

  clearFire(fire) {
    console.log("clear fire at", fire.position);
    const [top, left] = fire.position;
    this.data.grid.grid[top][left] = 0;
    window.dispatchEvent(new Event("gridupdated"));
  },

  detonateBomb(bomb) {
    const spread = 1;
    const timeToClearFire = this.data.clock + 1;
    const [top, left] = bomb.position;

    const fires = [new Fire([top, left], spread)];

    for (let index = 1; index < spread + 1; index++) {
      if (this.data.grid.grid[top - index])
        fires.push(new Fire([top - index, left], spread));
      if (this.data.grid.grid[top + index])
        fires.push(new Fire([top + index, left], spread));
      if (this.data.grid.grid[top][left - index])
        fires.push(new Fire([top, left - index], spread));
      if (this.data.grid.grid[top][left + index])
        fires.push(new Fire([top, left + index], spread));
    }
    this.updateGrid(fires);
    this.updateEventHashTable(timeToClearFire, fires);
  },
};

export default Object.freeze(game);

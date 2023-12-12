/**
 * @vitest-environment jsdom
 */

import { expect, test, describe, it, afterEach } from "vitest";
import { Bomb } from "./types";
import { game, checkForItemsReadyToAction, isTimeToAction } from "./gameState";

(game.grid = [
  [0, 1],
  [0, 2],
]),
  (game.gridSize = 2);

const initialPosition = [0, 0];
const bottomLeftPosition = [1, 0];
const topRightPosition = [0, 1];
const bottomRightPosition = [1, 1];

test("Game clock ticks", () => {
  const currentTime = game.clock;
  game.tick();
  expect(game.clock).toBe(currentTime + 1);
});

describe("Validate player position", () => {
  afterEach(() => {
    game.playerPosition = [...initialPosition];
  });
  it("starts on initial position", () => {
    expect(game.playerPosition).toEqual(initialPosition);
  });
  it("handles invalid arrays", () => {
    expect(game.validatePlayerPosition([])).toBe(0);
    expect(game.validatePlayerPosition([1])).toBe(0);
    expect(game.validatePlayerPosition([-1])).toBe(0);
    expect(game.validatePlayerPosition([1, 2, 3])).toBe(0);
  });
  it("handles obstacles", () => {
    expect(game.validatePlayerPosition(initialPosition)).toBe(1);
    expect(game.validatePlayerPosition(topRightPosition)).toBe(0);
    expect(game.validatePlayerPosition(bottomLeftPosition)).toBe(1);
    expect(game.validatePlayerPosition(bottomRightPosition)).toBe(0);
  });
  it("handles outside of grid positions", () => {
    expect(game.validatePlayerPosition([0, 2])).toBe(0);
    expect(game.validatePlayerPosition([0, -1])).toBe(0);
    expect(game.validatePlayerPosition([1, 2])).toBe(0);
    expect(game.validatePlayerPosition([-1, 1])).toBe(0);
  });
});

describe("Set New Player Position", () => {
  afterEach(() => {
    game.playerPosition = [...initialPosition];
  });
  it("starts on the initial position", () => {
    expect(game.playerPosition).toEqual(initialPosition);
  });
  it("stays on the same position", () => {
    game.setNewPlayerPosition(initialPosition);
    expect(game.playerPosition).toEqual(initialPosition);
  });

  it("moves one square down", () => {
    game.setNewPlayerPosition(bottomLeftPosition);
    expect(game.playerPosition).toEqual(bottomLeftPosition);
  });

  it("fails to move one square left", () => {
    game.setNewPlayerPosition([-1, 0]);
    expect(game.playerPosition).toEqual(initialPosition);
  });

  it("fails to move one square right", () => {
    game.setNewPlayerPosition(topRightPosition);
    expect(game.playerPosition).toEqual(initialPosition);
  });

  it("fails to move one square up", () => {
    game.setNewPlayerPosition([-1, 0]);
    expect(game.playerPosition).toEqual(initialPosition);
  });

  it("fails to move to bottom right position", () => {
    game.setNewPlayerPosition(bottomRightPosition);
    expect(game.playerPosition).toEqual(initialPosition);
  });
});

describe("Player moves to new position", () => {
  afterEach(() => {
    game.playerPosition = [...initialPosition];
  });

  it("fails to move one square right", () => {
    game.movePlayer("right");
    expect(game.playerPosition).toEqual(initialPosition);
  });

  it("moves one square down", () => {
    game.movePlayer("down");
    expect(game.playerPosition).toEqual(bottomLeftPosition);
  });

  it("fails to move one square left", () => {
    game.movePlayer("left");
    expect(game.playerPosition).toEqual(initialPosition);
  });
});

describe("Player drops bombs", () => {
  afterEach(() => {
    game.playerPosition = [...initialPosition];
  });

  it("bomb queue is empty", () => {
    expect(game.bombQueue.length).toBe(0);
  });

  it("drops bomb on bottom left corner", () => {
    game.movePlayer("down");
    expect(game.playerPosition).toEqual(bottomLeftPosition);
    game.placeBomb();
    expect(game.grid[1][0]).toBe(3);
  });

  it("bomb queue is not empty", () => {
    expect(game.bombQueue.length).toBe(1);
  });
});

test("isTimeToAction", () => {
  const bomb: Bomb = {
    position: [1, 0],
    time: 1,
  };
  expect(isTimeToAction(bomb, -1000)).toBe(false);
  expect(isTimeToAction(bomb, 0)).toBe(false);
  expect(isTimeToAction(bomb, 1)).toBe(true);
  expect(isTimeToAction(bomb, 2)).toBe(true);
  expect(isTimeToAction(bomb, 1000)).toBe(true);
});

test("checkForItemsReadyToAction", () => {
  const bomb: Bomb = {
    position: [1, 0],
    time: 1,
  };
  expect(Array.from(checkForItemsReadyToAction([bomb], 0)).length).toBe(0);
  expect(Array.from(checkForItemsReadyToAction([bomb], 1)).length).toBe(1);
  expect(Array.from(checkForItemsReadyToAction([], 1)).length).toBe(0);
  expect(Array.from(checkForItemsReadyToAction([bomb, bomb], 1)).length).toBe(
    2,
  );
});

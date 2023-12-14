/**
 * @vitest-environment jsdom
 */

import { expect, test } from "vitest";
import { Bomb } from "./types";
import { game, checkForItemsReadyToAction, isTimeToAction } from "./gameState";

(game.grid = [
  [0, 1],
  [0, 2],
]),
  (game.gridSize = 2);

test("Game clock ticks", () => {
  const currentTime = game.clock;
  game.tick();
  expect(game.clock).toBe(currentTime + 1);
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

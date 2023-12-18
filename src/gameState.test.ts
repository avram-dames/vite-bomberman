/**
 * @vitest-environment jsdom
 */

import { expect, test } from "vitest";
import { game } from "./gameState";

test("Game clock ticks", () => {
  const currentTime = game.clock;
  game.tick();
  expect(game.clock).toBe(currentTime + 1);
});

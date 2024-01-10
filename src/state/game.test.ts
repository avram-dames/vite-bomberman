/**
 * @vitest-environment jsdom
 */

import { expect, test } from "vitest";
import game from "./game";

test("Game clock ticks", () => {
  console.log("game", game);
  const currentTime = game.data.clock;
  game.tick();
  expect(game.data.clock).toBe(currentTime + 1);
});

import { expect, test } from "vitest";
import { Position } from "../types";
import { positionIsValid, movePlayer } from "./player";
import { GameBoard } from "./gameBoard";

const grid = new GameBoard(
  [
    [0, 1],
    [0, 2],
  ],
  2,
);
const initialPosition: Position = [0, 0];
const bottomLeftPosition: Position = [1, 0];
const topRightPosition: Position = [0, 1];
const bottomRightPosition: Position = [1, 1];

test("validate new positions", () => {
  expect(positionIsValid(initialPosition, grid)).toBe(true);
  expect(positionIsValid(bottomLeftPosition, grid)).toBe(true);
  expect(positionIsValid(topRightPosition, grid)).toBe(false);
  expect(positionIsValid(bottomRightPosition, grid)).toBe(false);
  expect(positionIsValid([-1, 0], grid)).toBe(false);
  expect(positionIsValid([2, 0], grid)).toBe(false);
  expect(positionIsValid([0, -1], grid)).toBe(false);
  expect(positionIsValid([0, 2], grid)).toBe(false);
});

test("move player to new position", () => {
  expect(movePlayer("up", initialPosition, grid)).toEqual([
    initialPosition,
    false,
  ]);
  expect(movePlayer("down", initialPosition, grid)).toEqual([
    bottomLeftPosition,
    true,
  ]);
  expect(movePlayer("left", initialPosition, grid)).toEqual([
    initialPosition,
    false,
  ]);
  expect(movePlayer("right", initialPosition, grid)).toEqual([
    initialPosition,
    false,
  ]);
});

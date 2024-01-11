import { describe, expect, it } from "vitest";
import { GameBoard } from "./gameBoard";

const gameBoard = new GameBoard([
  [0, 1],
  [0, 2],
]);

describe("getElementAt", () => {
  it("returns null if outside of grid", () => {
    expect(gameBoard.getElementAt(-1, -1)).toBe(null);
    expect(gameBoard.getElementAt(-1, 0)).toBe(null);
    expect(gameBoard.getElementAt(-1, 1)).toBe(null);
    expect(gameBoard.getElementAt(-1, 2)).toBe(null);
    expect(gameBoard.getElementAt(0, -1)).toBe(null);
    expect(gameBoard.getElementAt(0, 2)).toBe(null);
    expect(gameBoard.getElementAt(1, -1)).toBe(null);
    expect(gameBoard.getElementAt(1, 2)).toBe(null);
    expect(gameBoard.getElementAt(2, -1)).toBe(null);
    expect(gameBoard.getElementAt(2, 0)).toBe(null);
    expect(gameBoard.getElementAt(2, 1)).toBe(null);
    expect(gameBoard.getElementAt(2, 2)).toBe(null);
    expect(gameBoard.getElementAt(100, 0)).toBe(null);
    expect(gameBoard.getElementAt(100, 100)).toBe(null);
    expect(gameBoard.getElementAt(0, 100)).toBe(null);
    expect(gameBoard.getElementAt(-100, 0)).toBe(null);
  });

  it("returns the correct element if inside the grid", () => {
    expect(gameBoard.getElementAt(0, 0)).toBe(0);
    expect(gameBoard.getElementAt(0, 1)).toBe(1);
    expect(gameBoard.getElementAt(1, 0)).toBe(0);
    expect(gameBoard.getElementAt(1, 1)).toBe(2);
  });
});

describe("isElementInflammable", () => {
  it("returns false if outside of grid", () => {
    expect(gameBoard.isElementInflammable(-1, 0)).toBe(false);
    expect(gameBoard.isElementInflammable(0, -1)).toBe(false);
    expect(gameBoard.isElementInflammable(0, 2)).toBe(false);
  });
  it("returns true if element is inflammable", () => {
    expect(gameBoard.isElementInflammable(0, 0)).toBe(true);
    expect(gameBoard.isElementInflammable(0, 1)).toBe(false);
    expect(gameBoard.isElementInflammable(1, 0)).toBe(true);
    expect(gameBoard.isElementInflammable(1, 1)).toBe(true);
  });
});

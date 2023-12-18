import { GridObject, Position } from "./types";

export class Bomb implements GridObject {
  id = 3;

  constructor(
    public position: Position,
    public timeToExplode: number,
    public power: number,
  ) {}

  explodes() {}

  handlePrimaryAction() {
    this.explodes();
  }
}

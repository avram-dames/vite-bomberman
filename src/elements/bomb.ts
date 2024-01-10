import { Element, Position } from "../types";

export class Bomb implements Element {
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

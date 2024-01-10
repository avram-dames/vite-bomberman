import { Element, Position } from "../types";

export class Fire implements Element {
  id = 4;

  constructor(
    public position: Position,
    public spread: number,
  ) {}

  handlePrimaryAction() {}
}

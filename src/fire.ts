import { GridObject, Position } from "./types";

export class Fire implements GridObject {
  id = 4;

  constructor(
    public position: Position,
    public spread: number,
  ) {}

  handlePrimaryAction() {}
}

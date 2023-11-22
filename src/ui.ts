import { Position, Grid } from "./types";

function updateUI(position: Position) {
  const [top, left] = position;
  const playerElement = document.querySelector<HTMLDivElement>(".player")!;
  playerElement.style.top = `${top * 100}px`;
  playerElement.style.left = `${left * 100}px`;
}

function renderGridElements(grid: Grid): string {
  return grid
    .flat()
    .map((item) => {
      switch (item) {
        case 1:
          return '<div class="square wall"></div>';
          break;
        case 2:
          return '<div class="square obstacle"></div>';
          break;
        default:
          return '<div class="square"></div>';
          break;
      }
    })
    .join("");
}

export { updateUI, renderGridElements };

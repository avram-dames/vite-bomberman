import { Position, Grid } from "./types";

function updateUI(position: Position): void {
  const [top, left] = position;
  const playerElement = document.querySelector<HTMLDivElement>(".player")!;
  playerElement.style.top = `${top * 100}px`;
  playerElement.style.left = `${left * 100}px`;
}

function updateTimer(time: number) {
  const timer = document.querySelector<HTMLDivElement>(".timer")!;
  if (timer) timer.innerHTML = `Time: ${time}`;
}

function updateGrid(grid: Grid): void {
  console.log("grid", grid);
  document.querySelector<HTMLDivElement>(".grid")!.innerHTML =
    renderGridElements(grid);
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
        case 3:
          return '<div class="square bomb"></div>';
          break;
        case 4:
          return '<div class="square fire"></div>';
          break;
        default:
          return '<div class="square"></div>';
          break;
      }
    })
    .join("");
}

export { updateUI, updateTimer, updateGrid, renderGridElements };

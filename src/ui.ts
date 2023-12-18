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

export { updateUI, updateTimer };

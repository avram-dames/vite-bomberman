import "./style.css";

const playerPosition: number[] = [0, 0];
const grid: number[][] = [
  [0, 1],
  [0, 0],
];
const gridSize = 2;

function validatePosition(grid: number[][], position: number[]): number {
  console.log("validate position", position);
  return position[0] >= 0 &&
    position[0] <= gridSize - 1 &&
    position[1] >= 0 &&
    position[1] <= gridSize - 1 &&
    grid[position[0]][position[1]] == 0
    ? 1
    : 0;
}

function setNewPosition(newPosition: number[]) {
  if (validatePosition(grid, newPosition)) {
    playerPosition[0] = newPosition[0];
    playerPosition[1] = newPosition[1];
    console.log("set new position", playerPosition);
  }
}

function movePlayer(position: number[], direction: string) {
  const nextPosition = [...position];

  switch (direction) {
    case "top":
      nextPosition[0] -= 1;
      setNewPosition(nextPosition);
      break;
    case "down":
      nextPosition[0] += 1;
      setNewPosition(nextPosition);
      break;
    case "left":
      nextPosition[1] -= 1;
      setNewPosition(nextPosition);
      break;
    case "right":
      nextPosition[1] += 1;
      setNewPosition(nextPosition);
      break;
    default:
      break;
  }
  updateUI();
}

window.addEventListener(
  "keydown",
  (event) => {
    if (event.defaultPrevented) {
      return; // Do nothing if event already handled
    }

    switch (event.code) {
      case "KeyS":
      case "ArrowDown":
        // Handle "back"
        console.log("back");
        movePlayer([...playerPosition], "down");
        break;
      case "KeyW":
      case "ArrowUp":
        // Handle "forward"
        console.log("forward");
        movePlayer([...playerPosition], "top");
        break;
      case "KeyA":
      case "ArrowLeft":
        // Handle "turn left"
        console.log("left");
        movePlayer([...playerPosition], "left");
        break;
      case "KeyD":
      case "ArrowRight":
        // Handle "turn right"
        console.log("right");
        movePlayer([...playerPosition], "right");
        break;
    }

    if (event.code !== "Tab") {
      // Consume the event so it doesn't get handled twice,
      // as long as the user isn't trying to move focus away
      event.preventDefault();
    }
  },
  true,
);

function updateUI() {
  const [top, left] = playerPosition;
  const playerElement = document.querySelector<HTMLDivElement>(".player")!;
  playerElement.style.top = `${top * 100}px`;
  playerElement.style.left = `${left * 100}px`;
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="grid">
    <div class="player" 
      style={top: ${playerPosition[0] * 100}px; left: ${
        playerPosition[1] * 100
      }px;}>
    </div>
    <div class="square"></div>
    <div class="square"></div>
    <div class="square"></div>
    <div class="square"></div>
  </div>
`;

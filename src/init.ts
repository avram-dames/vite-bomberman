import game from "./game";
import { renderGridElements } from "./ui";

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
        game.movePlayer("down");
        break;
      case "KeyW":
      case "ArrowUp":
        // Handle "forward"
        console.log("forward");
        game.movePlayer("up");
        break;
      case "KeyA":
      case "ArrowLeft":
        // Handle "turn left"
        console.log("left");
        game.movePlayer("left");
        break;
      case "KeyD":
      case "ArrowRight":
        // Handle "turn right"
        console.log("right");
        game.movePlayer("right");
        break;
      case "Space":
        // Handle "turn right"
        console.log("space");
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

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="grid">
    <div class="player" 
      style={top: ${game.playerPosition[0] * 100}px; left: ${
        game.playerPosition[1] * 100
      }px;}>
    </div>
    ${renderGridElements(game.grid)}
  </div>
`;

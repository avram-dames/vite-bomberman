import game from "./game";
import { renderGridElements } from "./ui";

window.addEventListener(
  "keydown",
  (event) => {
    if (event.defaultPrevented) {
      return; // Do nothing if event already handled
    }
    console.log(`${event.code} key pressed.`);

    switch (event.code) {
      case "KeyS":
      case "ArrowDown":
        game.movePlayer("down");
        break;
      case "KeyW":
      case "ArrowUp":
        game.movePlayer("up");
        break;
      case "KeyA":
      case "ArrowLeft":
        game.movePlayer("left");
        break;
      case "KeyD":
      case "ArrowRight":
        game.movePlayer("right");
        break;
      case "Space":
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

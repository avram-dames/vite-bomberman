import "./style.css";
import "./init";

import { game } from "./gameState";
import { renderGridElements, updateUI, updateGrid } from "./ui";
import RoboPlayer from "./components/robo-player.ts";

new RoboPlayer();

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
        const bombPlaced = game.placeBomb();
        if (bombPlaced) {
          updateGrid(game.grid);
        }
        break;
    }

    if (event.code !== "Tab") {
      // Consume the event so it doesn't get handled twice,
      // as long as the user isn't trying to move focus away
      event.preventDefault();
    }

    updateUI(game.playerPosition);
  },
  true,
);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <div class="dashboard">
      <robo-player></robo-player>
      <div class="grid">
        ${renderGridElements(game.grid)}
      </div>
    </div>
    <div class="timer"></div>
  `;

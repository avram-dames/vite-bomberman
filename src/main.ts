import "./style.css";
import "./init";
console.log("running main");
import { game } from "./gameState";
import RoboPlayer from "./components/robo-player.ts";
import GameBoard from "./components/game-board.ts";

new RoboPlayer();

customElements.define("game-board", GameBoard);

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
        game.player.move("down", game.grid);
        break;
      case "KeyW":
      case "ArrowUp":
        game.player.move("up", game.grid);
        break;
      case "KeyA":
      case "ArrowLeft":
        game.player.move("left", game.grid);
        break;
      case "KeyD":
      case "ArrowRight":
        game.player.move("right", game.grid);
        break;
      case "Space":
        console.log("space");
        game.player.placeBomb();
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
    <div class="dashboard">
      <robo-player></robo-player>
      <game-board data-grid="${JSON.stringify(game.grid.grid)}"></game-board>
    </div>
    <timer></timer>
  `;

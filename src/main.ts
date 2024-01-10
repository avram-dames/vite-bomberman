import "./main.css";
import { initApp, startGameLoop } from "./helpers.ts";
import { handleKeyStrokes, handleBombPlaced } from "./state/event-handlers.ts";

import RoboPlayer from "./components/robo-player.ts";
import GameBoard from "./components/game-board.ts";

// Register Custom Elements
customElements.define("game-board", GameBoard);
customElements.define("robo-player", RoboPlayer);

// Initialize App
initApp();
startGameLoop();

// Event Listeners
window.addEventListener("keydown", handleKeyStrokes);
window.addEventListener("bombPlaced", handleBombPlaced);

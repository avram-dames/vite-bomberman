import game from "./game.ts";

export function handleKeyStrokes(event: KeyboardEvent) {
  if (event.defaultPrevented) {
    return; // Do nothing if event already handled
  }
  console.log(`${event.code} key pressed.`);

  switch (event.code) {
    case "KeyS":
    case "ArrowDown":
      game.data.player.move("down", game.data.grid);
      break;
    case "KeyW":
    case "ArrowUp":
      game.data.player.move("up", game.data.grid);
      break;
    case "KeyA":
    case "ArrowLeft":
      game.data.player.move("left", game.data.grid);
      break;
    case "KeyD":
    case "ArrowRight":
      game.data.player.move("right", game.data.grid);
      break;
    case "Space":
      console.log("space");
      game.data.player.placeBomb();
      break;
  }

  if (event.code !== "Tab") {
    // Consume the event so it doesn't get handled twice,
    // as long as the user isn't trying to move focus away
    event.preventDefault();
  }
}

export function handleBombPlaced(event: CustomEvent) {
  game.placeBomb(event.detail);
}

import game from "./state/game.ts";

export function initApp() {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
      <div class="container">
        <robo-player></robo-player>
        <game-board></game-board>
      </div>
    `;
}

export function startGameLoop() {
  /**
   * Game Loop
   */
  console.log("Starting game");
  let nextTimeToTick = Date.now();

  function nextAnimationFrame() {
    const now = Date.now();

    if (nextTimeToTick <= now) {
      game.tick();
      nextTimeToTick = now + game.TICK_RATE;
    }

    requestAnimationFrame(nextAnimationFrame);
  }
  requestAnimationFrame(nextAnimationFrame);
}

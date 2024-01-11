import { describe, it, expect, beforeEach, afterEach } from "vitest";
import RoboPlayer from "./robo-player";

describe("Robo Player Component", () => {
  let container: HTMLElement;

  beforeEach(() => {
    // Create a container to hold the component for testing
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Remove the container after testing
    document.body.removeChild(container);
  });

  it.skip("should create a shadow DOM with the correct structure", () => {
    new RoboPlayer();
    // Create an instance of the component
    const player = document.createElement("robo-player");
    container.appendChild(player);

    // Check if the shadow DOM is present
    const shadowRoot = player.shadowRoot;
    expect(shadowRoot).to.exist;

    // // Check if the shadow DOM contains the expected structure
    const templateContent = shadowRoot.querySelector(".player");
    expect(templateContent.textContent).to.equal("");
  });
});

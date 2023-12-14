export default class RoboPlayer extends HTMLElement {
  templateName = "robo-player-template";

  constructor() {
    super();

    // Attach a shadow DOM to the element
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.getElementById(this.templateName);

    if (!template) {
      throw new Error(`Could not find ${this.templateName} template!`);
    }

    const content = template.content.cloneNode(true);

    shadowRoot.appendChild(content);
  }

  connectedCallback() {
    window.addEventListener("playerpositionchanged", () => {
      this.render();
    });
    this.render();
  }

  render() {}
}

customElements.define("robo-player", RoboPlayer);

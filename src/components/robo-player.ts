import styles from "./robo-player.css?inline" assert { type: "css" };

export default class RoboPlayer extends HTMLElement {
  templateName = "robo-player-template";
  root: ShadowRoot;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    this.loadStyles();
    await this.loadTemplate();

    window.addEventListener("playerpositionchanged", () => {
      this.render();
    });
    this.render();
  }

  async loadTemplate(): Promise<void> {
    const content = document.createElement("div");
    const response = await fetch("/src/components/robo-player.html");
    content.innerHTML = await response.text();
    this.root.appendChild(content);
  }

  loadStyles(): void {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(styles);
    this.root.adoptedStyleSheets = [sheet];
  }

  render(): void {}
}

customElements.define("robo-player", RoboPlayer);

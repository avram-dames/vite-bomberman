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

    window.addEventListener("playerpositionchanged", (e) => {
      // expects event of type CustomEvent which has a detail property
      const [top, left] = e.detail as [number, number];
      this.updatePosition(top, left);
    });
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

  updatePosition(top: number, left: number): void {
    const player: HTMLElement = this.root.querySelector(".player")!;
    if (player) {
      player.style.top = `${top * 100}px`;
      player.style.left = `${left * 100}px`;
    }
  }
}

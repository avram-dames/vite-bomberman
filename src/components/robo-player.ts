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

    const content = document.createElement("div");
    content.classList.add("player");
    this.root.appendChild(content);

    window.addEventListener("playerpositionchanged", (e) => {
      // expects event of type CustomEvent which has a detail property
      const [top, left] = e.detail as [number, number];
      this.updatePosition(top, left);
    });
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

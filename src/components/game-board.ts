import styles from "./game-board.css?inline" assert { type: "css" };

export default class GameBoard extends HTMLElement {
  templateName = "game-board-template";
  root: ShadowRoot;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    this.loadStyles();
    await this.loadTemplate();

    window.addEventListener("gridupdated", () => {
      this.render();
    });
    this.render();
  }

  async loadTemplate(): Promise<void> {
    const content = document.createElement("div");
    const response = await fetch("/src/components/game-board.html");
    content.innerHTML = await response.text();
    this.root.appendChild(content);
  }

  loadStyles(): void {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(styles);
    this.root.adoptedStyleSheets = [sheet];
  }

  render(): void {
    if (this.dataset.grid) {
      this.root.querySelector<HTMLDivElement>(".grid")!.innerHTML =
        createGridElements(JSON.parse(this.dataset.grid));
    }
  }
}

function createGridElements(grid: number[][]): string {
  return grid
    .flat()
    .map((item) => {
      switch (item) {
        case 1:
          return '<div class="square wall"></div>';
        case 2:
          return '<div class="square obstacle"></div>';
        case 3:
          return '<div class="square bomb"></div>';
        case 4:
          return '<div class="square fire"></div>';
        default:
          return '<div class="square"></div>';
      }
    })
    .join("");
}

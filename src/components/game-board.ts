import styles from "./game-board.css?inline" assert { type: "css" };
import game from "../state/game.ts";

export default class GameBoard extends HTMLElement {
  templateName = "game-board-template";
  root: ShadowRoot;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.loadStyles();

    const gridEl = document.createElement("div");
    gridEl.classList.add("grid");
    gridEl.style.gridTemplateColumns = `repeat(${game.data.grid.size}, minmax(0, 1fr))`;
    gridEl.style.width = `${game.data.grid.size * 100}px`;
    gridEl.style.height = `${game.data.grid.size * 100}px`;
    this.root.appendChild(gridEl);

    window.addEventListener("gridupdated", () => {
      this.render();
    });
    this.render();
  }

  render(): void {
    this.root.querySelector<HTMLDivElement>(".grid")!.innerHTML =
      createGridElements(game.data.grid.grid);
  }

  loadStyles(): void {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(styles);
    this.root.adoptedStyleSheets = [sheet];
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

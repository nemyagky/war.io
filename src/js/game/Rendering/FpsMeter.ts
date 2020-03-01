import * as Stats from "stats.js";

export const FpsMeter = new (class FpsMeterSingleton {
  private stats: Stats = new Stats();

  constructor() {
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);
  }

  public update() {
    this.stats.update();
  }
})();

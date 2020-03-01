import { FpsMeter } from "./Rendering/FpsMeter";
import { Renderer } from "./Rendering/Renderer";
import { Troops } from "./Troops/Troops";

export const Gameloop = new (class GameloopSingleton {
  constructor() {
    window.addEventListener("load", this.render.bind(this));
    Troops.init();
  }

  private render() {
    requestAnimationFrame(this.render.bind(this));

    Renderer.render();

    FpsMeter.update();
  }
})();

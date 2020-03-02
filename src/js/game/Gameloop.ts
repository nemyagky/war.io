import { FpsMeter } from "./Rendering/FpsMeter";
import { Renderer } from "./Rendering/Renderer";
import { Troops } from "./Troops/Troops";

export const Gameloop = new (class GameloopSingleton {
  constructor() {
    Troops.init();
    this.render();
  }

  private render() {
    requestAnimationFrame(this.render.bind(this));
    Renderer.render();

    FpsMeter.update();
  }
})();

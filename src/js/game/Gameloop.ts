import { Engine } from "./Rendering/Engine";
import { FpsMeter } from "./Rendering/FpsMeter";
import { Scene } from "./Rendering/Scene";
import { Troops } from "./Troops/Troops";

export const Gameloop = new (class GameloopSingleton {
  constructor() {
    Troops.init();
    Engine.runRenderLoop(this.render);

    window.addEventListener("resize", () => {
      Engine.resize();
    });
  }

  private render() {
    Scene.render();
    FpsMeter.update();
  }
})();

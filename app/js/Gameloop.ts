import "./../scss/main.scss";
import { Camera } from "./Camera";
import { canvas, ctx } from "./canvas";
import { Common } from "./Common/Common";

const Gameloop = new class GameloopSingleton {

   constructor() {
      window.addEventListener("load", this.render.bind(this));
   }

   private render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      Camera.move();

      Common.drawFps();

      requestAnimationFrame(this.render.bind(this));
   }

}();

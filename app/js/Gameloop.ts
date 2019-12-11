import "./../scss/main.scss";
import { Camera } from "./Camera";
import { canvas, ctx } from "./canvas";
import { Common } from "./Common/Common";
import { Init } from "./Init";

Init.init();

const Gameloop = new class GameloopSingleton {

   constructor() {
      window.addEventListener("load", this.render.bind(this));
   }

   private render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      Camera.move();
      ctx.save();
      ctx.translate(-Camera.x, -Camera.y);

      Init.drawPlayers();

      ctx.restore();

      Common.drawFps();

      requestAnimationFrame(this.render.bind(this));
   }

}();

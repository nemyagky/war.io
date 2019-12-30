import "../../scss/main.scss";
import { Camera } from "./Camera";
import { canvas, ctx } from "./Shared/Ctx";
import { Functions } from "./Shared/Functions";
import { Troops } from "./Troops/Troops";

const Gameloop = new class GameloopSingleton {

   constructor() {
      window.addEventListener("load", this.render.bind(this));
   }

   private render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      Camera.move();
      ctx.save();
      ctx.translate(-Camera.x, -Camera.y);

      Troops.draw();

      ctx.restore();

      Functions.drawFps();

      requestAnimationFrame(this.render.bind(this));
   }

}();

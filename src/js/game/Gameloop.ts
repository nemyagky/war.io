import "../../scss/main.scss";
import { Network } from "./Network";
import { Camera } from "./Rendering/Camera";
import { canvas, ctx } from "./Shared/Ctx";
import { Functions } from "./Shared/Functions";
import { Troops } from "./Troops/Troops";

const Gameloop = new class GameloopSingleton {

   constructor() {
      Network.init();
      window.addEventListener("load", this.render.bind(this));
   }

   // TODO fix black screen after resize
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

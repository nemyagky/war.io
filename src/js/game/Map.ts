import { ctx } from "./Shared/Ctx";

export const Map = new class MapSingleton {

   private w: number = 1000;
   private h: number = 1000;

   private drawBorder() {
      ctx.beginPath();
      ctx.strokeStyle = "#fff";
      ctx.rect(0, 0, this.w, this.h);
      ctx.stroke();
      ctx.closePath();
   }

}();

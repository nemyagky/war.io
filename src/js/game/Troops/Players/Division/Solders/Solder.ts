import { ctx } from "../../../../Shared/Ctx";
import { Functions } from "../../../../Shared/Functions";

export class Solder {

   public x: number;
   public y: number;
   public w: number = 10;
   public h: number = 10;
   public team: string;
   private rotate: number;
   private moveTo: { x: number, y: number };
   private speed: number = 0;

   constructor(x: number, y: number, team: string) {
      this.x = x;
      this.y = y;
      this.team = team;
   }

   public draw(enemiesSoldersQuadtree, enemiesSoldersLength: number) {
      Functions.setColor(this.team);
      this.move();

      Functions.rotateCanvasCtx(this.x, this.y, this.rotate);
      ctx.fillRect(this.x, this.y, this.w, this.h);
      ctx.restore();
   }

   public setMoveTo(x: number, y: number) {
      this.moveTo = { x, y };

      this.rotate = Functions.toDegrees(Math.atan2(y - this.y, x - this.x));
      this.speed = 3;
   }

   private move() {
      if (!this.speed || !this.moveTo || !this.rotate) { return; }

      this.x += Math.cos(Functions.toRad(this.rotate)) * this.speed;
      this.y += Math.sin(Functions.toRad(this.rotate)) * this.speed;

      // If solder is in necessary point - stop it
      if (Math.abs(this.x - this.moveTo.x) < 3 && Math.abs(this.y - this.moveTo.y) < 3) {
         this.speed = 0;
         this.x = this.moveTo.x;
         this.y = this.moveTo.y;
      }
   }

}
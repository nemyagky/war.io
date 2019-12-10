import { Keyboard } from "./Common/Keyboard";

export const Camera = new class CameraSingleton {

   private x: number = 0;
   private y: number = 0;
   private movingSpeed: number = 10;

   public move() {
      this.changePosition();
      this.checkCollisionWithBorders();
   }

   private changePosition() {
      if (Keyboard.pressed.w || Keyboard.pressed.topArrow) { this.y -= this.movingSpeed; }
      if (Keyboard.pressed.a || Keyboard.pressed.leftArrow) { this.x -= this.movingSpeed; }
      if (Keyboard.pressed.s || Keyboard.pressed.rightArrow) { this.x += this.movingSpeed; }
      if (Keyboard.pressed.d || Keyboard.pressed.bottomArrow) { this.y += this.movingSpeed; }
   }

   private checkCollisionWithBorders() {
      if (this.x < 0) { this.x = 0; }
      if (this.y < 0) { this.y = 0; }
      // if (this.x + canvas.width > Map.w) this.x = Map.w - canvas.width
      // if (this.y + canvas.height > Map.h) this.y = Map.h - canvas.height
   }

}();

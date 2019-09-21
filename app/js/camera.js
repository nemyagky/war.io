import { keyboardPressed, cursor } from "./functions";

export let Camera = new class Camera{

   constructor() {
      this.x = 0
      this.y = 0
      this.movingSpeed = 10
   }

   move() {
    
      let translateCamera = () => {
         if (keyboardPressed.w || keyboardPressed.topArrow) this.y -= this.movingSpeed
         if (keyboardPressed.a || keyboardPressed.leftArrow) this.x -= this.movingSpeed
         if (keyboardPressed.s || keyboardPressed.rightArrow) this.x += this.movingSpeed
         if (keyboardPressed.d || keyboardPressed.bottomArrow) this.y +=this.movingSpeed
      };
      translateCamera();

      let checkBorders = () => {
         if (this.x < 0) this.x = 0
         if (this.y < 0) this.y = 0
         //if (this.x + canvas.width > Map.w) this.x = Map.w - canvas.width
         //if (this.y + canvas.height > Map.h) this.y = Map.h - canvas.height
      }
      checkBorders();

   }

}

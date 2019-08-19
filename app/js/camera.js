import { keyboardPressed, cursor } from "./functions";
import { canvas } from "./init";

export let Camera = new class Camera{

   constructor() {
      this.x = 0
      this.y = 0
      this.movingSpeed = 10
      this.distForMoving = 150
   }

   move() {

      
      
      let translateCamera = () => {
         if (keyboardPressed.w || cursor.y < this.distForMoving) this.y -= this.movingSpeed
         if (keyboardPressed.a || cursor.x < this.distForMoving) this.x -= this.movingSpeed
         if (keyboardPressed.s || cursor.x > canvas.width - this.distForMoving) this.x += this.movingSpeed
         if (keyboardPressed.d || cursor.y > canvas.height - this.distForMoving) this.y +=this.movingSpeed
      };
      //translateCamera();

      let isItPermissible = () => {
         if (this.x < 0) this.x = 0
         if (this.y < 0) this.y = 0
         //if (this.x + canvas.width > Map.w) this.x = Map.w - canvas.width
         //if (this.y + canvas.height > Map.h) this.y = Map.h - canvas.height
      }
      isItPermissible();

   }



   //Вид сверку, перемещение как в доте + на wasd + arrow + клик по мини карте. Тумана войны нет, кроме как в центре

}

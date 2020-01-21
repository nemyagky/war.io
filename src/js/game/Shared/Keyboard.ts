import { KeyboardKeys } from "../../interfaces/KeyboardKeys.interface";

export const Keyboard = new class KeyboardSingleton {

   public pressed: KeyboardKeys = {
      w: false,
      a: false,
      s: false,
      d: false,
      topArrow: false,
      leftArrow: false,
      rightArrow: false,
      bottomArrow: false
   };

   constructor() {
      this.init();
   }

   private init() {
      window.addEventListener("keydown", (e: KeyboardEvent) => {
         if (e.keyCode === 87) { this.pressed.w = true; }
         if (e.keyCode === 65) { this.pressed.a = true; }
         if (e.keyCode === 68) { this.pressed.s = true; }
         if (e.keyCode === 83) { this.pressed.d = true; }
         if (e.keyCode === 38) { this.pressed.topArrow = true; }
         if (e.keyCode === 37) { this.pressed.leftArrow = true; }
         if (e.keyCode === 39) { this.pressed.rightArrow = true; }
         if (e.keyCode === 40) { this.pressed.bottomArrow = true; }
      });

      window.addEventListener("keyup", (e: KeyboardEvent) => {
         if (e.keyCode === 87) { this.pressed.w = false; }
         if (e.keyCode === 65) { this.pressed.a = false; }
         if (e.keyCode === 68) { this.pressed.s = false; }
         if (e.keyCode === 83) { this.pressed.d = false; }
         if (e.keyCode === 38) { this.pressed.topArrow = false; }
         if (e.keyCode === 37) { this.pressed.leftArrow = false; }
         if (e.keyCode === 39) { this.pressed.rightArrow = false; }
         if (e.keyCode === 40) { this.pressed.bottomArrow = false; }
      });
   }

}();

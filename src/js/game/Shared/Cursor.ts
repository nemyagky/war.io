export const Cursor = new class CursorSingleton {

   public x: number;
   public y: number;
   public isPressed: boolean;

   constructor() {
      this.init();
   }

   private init() {
      window.addEventListener("mousemove", (e: MouseEvent) => {
         this.x = e.clientX;
         this.y = e.clientY;
      });
      window.addEventListener("mousedown", () => {
         this.isPressed = true;
      });
      window.addEventListener("mouseup", () => {
         this.isPressed = false;
      });
      window.addEventListener("contextmenu", () => {
         return false;
      });
   }

}();

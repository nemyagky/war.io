export class TransparentDivision {

   constructor(solders) {

      // TODO delete method


      this.solders = solders
      this.create()
   }

   create() {

      this.transparentSolders = []

      let solders = this.solders
      let soldersInLine = 50

      let y = -solders.length/2/soldersInLine*11
      let startX = -soldersInLine/2*11
      let maxX = soldersInLine/2*11
      let x = startX
      for (let i = 0; i < solders.length; i++) {

         this.transparentSolders.push({x: x, y: y, startX: x, startY: y})

         x += 11
         if (x >= maxX) {
            y+=11
            x = startX
         }

      }
      this.rotateTransparentDivision()
      
   }

   rotate() {

   }

   draw() {

   } 

   setMoving() {

   }


}

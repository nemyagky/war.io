import * as d3 from "d3-quadtree";
import { Camera } from "./../../Camera";
import { ctx } from "./../../canvas";
import { Common } from "./../../Common/Common";
import { Cursor } from "./../../Common/Cursor";
import { Division } from "./Division";
import { Solder } from "./Solders/Solder";

/** Estimated - планируемый */
export const EstimatedDivision = new class EstimatedDivisionSingleton {

   private division: Division;
   private estimatedSolders: Array<Array<{ x: number, y: number }>> = [[]];
   private rotate: number;

   public create(division: Division) {
      this.division = division;

      this.createEstimatedSolders();
   }

   public isExist() {
      return this.estimatedSolders[0].length;
   }

   /** When user up the cursor */
   // TODO normal setMovingCordsForSolders function
   public setMovingCordsForSolders() {
      const realSoldersQuadtree = d3.quadtree();
      this.division.solders.forEach((solder: Solder) => {
         realSoldersQuadtree.add([solder.x, solder.y, solder]);
      });

      this.estimatedSolders.forEach((row: Solder[]) => {
         row.forEach((solder: { x: number, y: number }) => {
            const nearestSolderData = realSoldersQuadtree.find(0, 0);
            const nearestSolder: Solder = nearestSolderData[2];

            nearestSolder.setMoveTo(Cursor.x + solder.x + Camera.x, Cursor.y + solder.y + Camera.y);
            realSoldersQuadtree.remove(nearestSolderData);
         });
      });

      this.estimatedSolders = [[]];
   }

   public draw() {
      Common.setColor("rgba(0,0,255,0.5)");

      this.estimatedSolders.forEach((row) => {
         row.forEach((solder: { x: number, y: number }) => {
            ctx.fillRect(solder.x + Cursor.x + Camera.x, solder.y + Cursor.y + Camera.y, 10, 10);
         });
      });
   }

   /**
    * Create matrix of solders. A half of solders will have negative cords,
    * because then estimated division will draw relative to cursor
    * @returns [
    *    [{x: -100, y: -100}, {x: 100, y: -100}],
    *    [{x: -100, y: 100}, {x: 100, y: 100}],
    * ]
    */
   private createEstimatedSolders() {
      const soldersInLine = 34;

      // lastSolderIndex used to limit i in forEach loop (from 0 to soldersInLine)
      let lastSolderIndex = 0;

      this.division.solders.forEach((solder: Solder, i: number) => {
         // (i - lastSolderIndex) will have value from 0 to soldersInLine
         if (i - lastSolderIndex === soldersInLine) {
            this.estimatedSolders.push([]);
            lastSolderIndex = i;
         }
         /** Before refactoring estimatedSolders has startX and startY */
         this.estimatedSolders[this.estimatedSolders.length - 1].push({
            x: (i - lastSolderIndex) * 11,
            y: this.estimatedSolders.length * 11
         });
      });

      // Subtract a half from every solder cords.
      // Than it will be used during rendering estimatedSolders relative to cursor
      this.estimatedSolders.forEach((row) => {
         row.forEach((solder: { x: number, y: number }) => {
            // Last solder in current row
            solder.x -= row[row.length - 1].x / 2;
            // Last solder in last row
            const lastRow = this.estimatedSolders[this.estimatedSolders.length - 1];
            solder.y -= lastRow[lastRow.length - 1].y / 2;
         });
      });
   }

}();

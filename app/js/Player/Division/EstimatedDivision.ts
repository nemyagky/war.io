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
   private estimatedSolders: Array<Array<{ x: number, y: number }>> = [];
   private rotateAngle: number;

   public create(division: Division) {
      this.division = division;

      this.createEstimatedSolders();
   }

   public isExist() {
      return this.estimatedSolders.length;
   }

   /**
    * When user up the cursor
    * The main idea of function is to overlay (наложить) realSolders and estimatedSolders and than for
    * Every estimatedSolders find the nearest realSolder
    */
   public setMovingCordsForSolders() {
      const realSoldersQuadtree = d3.quadtree();

      let realSoldersLeftBorder = Infinity;
      let realSoldersTopBorder = Infinity;

      // Creating realSoldersQuadtree, calculate it's left and top borders (we will use it later)
      this.division.solders.forEach((solder: Solder) => {
         realSoldersQuadtree.add([solder.x, solder.y, solder]);

         if (solder.x < realSoldersLeftBorder) { realSoldersLeftBorder = solder.x; }
         if (solder.y < realSoldersTopBorder) { realSoldersTopBorder = solder.y; }
      });

      // For every estimatedSolders find the nearest realSolder
      this.estimatedSolders.forEach((row) => {
         row.forEach((solder: { x: number, y: number }) => {
            const lastRow = this.estimatedSolders[this.estimatedSolders.length - 1];

            const nearestSolder: Solder = realSoldersQuadtree.find(
               /**
                * We need plus row[row.length - 1].x, because estimatedSolders has negative cords
                * (because estimatedSolders must be drawing relative to cursor)
                * By adding row[row.length - 1].x, we will transform negative cord to cords, starting 0
                * AS EXAMPLE:
                * solder.x = -150 (current solder = -150)
                * row[row.length - 1].x = 150 (last solder in row = 150)
                * result will be equal to 0
                * Than we add realSoldersLeftBorder to overlay realSolders and estimatedSolders
                */
               solder.x + row[row.length - 1].x + realSoldersLeftBorder,
               solder.y + lastRow[lastRow.length - 1].y + realSoldersTopBorder,
            );

            nearestSolder[2].setMoveTo(solder.x + Cursor.x + Camera.x, solder.y + Cursor.y + Camera.y);
            // Remove nearestSolder from realSoldersQuadtree to avoid re-finding the same solder
            realSoldersQuadtree.remove(nearestSolder);
         });
      });

      this.estimatedSolders = [];
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
      const soldersInLine = 35;

      this.division.solders.forEach((solder: Solder, i: number) => {
         // Create new row if current row is filled
         if (i % soldersInLine === 0) { this.estimatedSolders.push([]); }

         this.estimatedSolders[this.estimatedSolders.length - 1].push({
            // (i % soldersInLine) defines x solder cords (it returns value from 0 to soldersInLine)
            x: (i % soldersInLine) * 11,
            y: (this.estimatedSolders.length - 1) * 11
         });
      });

      this.translateRelativeToCursor();
   }

   /**
    * Subtract a half from every estimatedSolder cords.
    * Than it will be used to render estimatedSolders relative to cursor
    */
   private translateRelativeToCursor() {
      const firstRow = this.estimatedSolders[0];
      const lastRow = this.estimatedSolders[this.estimatedSolders.length - 1];
      // Translate will contain a half of estimatedSolders width/height
      const translate = {
         x: firstRow[firstRow.length - 1].x / 2,
         y: lastRow[lastRow.length - 1].y / 2
      };

      this.estimatedSolders.forEach((row) => {
         row.forEach((solder: { x: number, y: number }) => {
            solder.x -= translate.x;
            solder.y -= translate.y;
         });
      });
   }

}();

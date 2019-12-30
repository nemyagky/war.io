import { EstimateSolder } from "../../../../interfaces/EstimateSolder.interface";
import { Camera } from "../../../Camera";
import { ctx } from "../../../Shared/Ctx";
import { Cursor } from "../../../Shared/Cursor";
import { Functions } from "../../../Shared/Functions";
import { Keyboard } from "../../../Shared/Keyboard";
import { Division } from "./Division";

export const EstimatedDivision = new class EstimatedDivisionSingleton {

   private division: Division;
   private estimatedSolders: EstimateSolder[][] = [];
   private soldersInLine: number = 35;
   /**
    * Function, responsible for moving solders, work's worse, if rotateAngle equal 0 or 180.
    * But if it equal to 0.01 - it work correct
    */
   private rotateAngle: number = 0.01;

   public isExist() {
      return this.estimatedSolders.length;
   }

   /**
    * Create an array of solders. In future they will be drawn relative to cursor,
    * So, we need to subtract a half from every solder.
    */
   public create(division: Division) {
      this.division = division;

      // If division.solders.length = 15, soldersInLine = 2, than soldersInWidth = 2, soldersInHeight = roundUp 15/2 = 8
      const soldersInWidth = this.division.solders.length > this.soldersInLine
         ? this.soldersInLine : this.division.solders.length;
      const soldersInHeight: number = Math.floor(this.division.solders.length / this.soldersInLine);

      for (let i = 0; i < this.division.solders.length; i++) {
         // Create new row if current row is filled
         if (i % this.soldersInLine === 0) { this.estimatedSolders.push([]); }

         this.estimatedSolders[this.estimatedSolders.length - 1].push({
            // i % soldersInLine - min 0, max soldersInLine. Than subdivide a half to position relative to cursor
            // 11 - solder width
            x: ((i % this.soldersInLine) * 11) - ((soldersInWidth / 2) * 11),
            startX: ((i % this.soldersInLine) * 11) - ((soldersInWidth / 2) * 11),
            // this.estimatedSolders.length-1 - current solders rows count. Than subdivide a half
            y: ((this.estimatedSolders.length - 1) * 11) - ((soldersInHeight / 2) * 11),
            startY: ((this.estimatedSolders.length - 1) * 11) - ((soldersInHeight / 2) * 11)
         });
      }

      this.rotate();
   }

   /**
    * The main idea of the function is to find nearest solder in realSoldersQuadtree and estimatedSoldersQuadtree
    * And than for every nearestRealSolder set move to nearestEstimatedSolder
    */
   public setMovingCordsForSolders() {
      const realSoldersQuadtree = Functions.toQuadtreeWithBorders(this.division.solders);
      // Transform EstimateSolder[][] into EstimateSolder[]
      const estimatedSoldersQuadtree = Functions.toQuadtreeWithBorders(
         Array.prototype.concat.apply([], this.estimatedSolders)
      );

      this.estimatedSolders.forEach((row) => {
         row.forEach(() => {
            const nearestRealSolder = realSoldersQuadtree.find(
               realSoldersQuadtree.left, realSoldersQuadtree.top
            );
            const nearestEstimatedSolder = estimatedSoldersQuadtree.find(
               estimatedSoldersQuadtree.left, estimatedSoldersQuadtree.top
            );

            nearestRealSolder[2].setMoveTo(
               nearestEstimatedSolder[2].x + Cursor.x + Camera.x,
               nearestEstimatedSolder[2].y + Cursor.y + Camera.y
            );

            // Remove quadtree's items to avoid re-finding the same solder
            realSoldersQuadtree.remove(nearestRealSolder);
            estimatedSoldersQuadtree.remove(nearestEstimatedSolder);
         });
      });

      this.estimatedSolders = [];
   }

   public draw() {
      Functions.setColor("rgba(0,0,255,0.5)");

      if (Keyboard.pressed.w) {
         this.rotateAngle--;
         this.rotate();
      }

      this.estimatedSolders.forEach((row) => {
         row.forEach((solder: EstimateSolder) => {
            ctx.fillRect(solder.x + Cursor.x + Camera.x, solder.y + Cursor.y + Camera.y, 10, 10);
         });
      });
   }

   private rotate() {
      const a = Functions.toRad(this.rotateAngle);

      this.estimatedSolders.forEach((row) => {
         row.forEach((solder: EstimateSolder) => {
            solder.x = solder.startX * Math.cos(a) + solder.startY * Math.sin(a);
            solder.y = solder.startY * Math.cos(a) - solder.startX * Math.sin(a);
         });
      });
   }

}();

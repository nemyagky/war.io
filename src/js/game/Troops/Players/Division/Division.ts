import { Borders } from "../../../../interfaces/Borders.interface";
import { Functions } from "../../../Shared/Functions";
import { Infantryman } from "./Solders/Infantryman";
import { Solder } from "./Solders/Solder";

export class Division {

   public solders: Infantryman[] = [];
   public shoutDist: number = 300;
   private team: string;
   private borders: Borders;

   constructor(team: string) {
      this.team = team;
   }

   public addSolder(solder: Infantryman) {
      solder.team = this.team;
      this.solders.push(solder);
   }

   public draw(enemiesDivisions: Division[]) {
      const enemiesSoldersQuadtree = Functions.toQuadtree(Array.prototype.concat.apply([], enemiesDivisions));
      const enemiesSoldersLength = enemiesSoldersQuadtree.size();

      this.solders.forEach((solder: Solder) => {
         solder.draw(enemiesSoldersQuadtree, enemiesSoldersLength);
      });

   }

   // It call at start of every frame
   public updateBorders() {
      this.borders = {
         left: Infinity,
         top: Infinity,
         right: 0,
         bottom: 0
      };

      this.solders.forEach((solder: Solder) => {
         if (solder.x < this.borders.left) { this.borders.left = solder.x; }
         if (solder.y < this.borders.top) { this.borders.top = solder.y; }
         if (solder.x > this.borders.right) { this.borders.right = solder.x; }
         if (solder.y > this.borders.bottom) { this.borders.bottom = solder.y; }
      });
   }

   private removeFarEnemiesDivision(enemiesDivisions: Division[]) {
      return enemiesDivisions.filter((enemyDivision: Division) => {
         return !(
            this.borders.left > enemyDivision.borders.right ||
            this.borders.right < enemyDivision.borders.left ||
            this.borders.top > enemyDivision.borders.bottom ||
            this.borders.bottom < enemyDivision.borders.top
         );
      });
   }

}

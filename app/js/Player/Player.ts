import { Division } from "./Division/Division";
import { EstimatedDivision } from "./Division/EstimatedDivision";
import { Infantryman } from "./Division/Solders/Infantryman";

export class Player {

   private team: string;
   private isMainPlayer: boolean;
   private chosenDivision: number = 0;
   private divisions: Division[] = [];

   constructor(team: string, isMainPlayer: boolean) {
      this.team = team;
      this.isMainPlayer = isMainPlayer;
      this.addDivision();

      if (this.isMainPlayer) {
         this.initCreatingEstimatedDivisions();
      }
   }

   public drawTroops() {
      this.divisions.forEach((division: Division) => division.draw());

      if (EstimatedDivision.isExist()) {
         EstimatedDivision.draw();
      }
   }

   public addSolder(x: number, y: number, divisionIndex?: number) {
      const currentDivision = divisionIndex || this.divisions.length - 1;
      this.divisions[currentDivision].addSolder(new Infantryman(x, y, this.team));
   }

   private addDivision() {
      this.divisions.push(new Division(this.team));
   }

   /**
    * Add an opportunity to create EstimatedDivisions for chosen division at window.click()
    * Must be available only for main player
    */
   private initCreatingEstimatedDivisions() {
      window.addEventListener("mousedown", () => {
         EstimatedDivision.create(this.divisions[this.chosenDivision]);
      });
      window.addEventListener("mouseup", () => {
         EstimatedDivision.setMovingCordsForSolders();
      });
   }

}

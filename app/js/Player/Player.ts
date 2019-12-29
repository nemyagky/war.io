import { Division } from "./Division/Division";
import { EstimatedDivision } from "./Division/EstimatedDivision";
import { Infantryman } from "./Division/Solders/Infantryman";

export class Player {

   public id: number;
   public divisions: Division[] = [];
   public enemiesDivisions: Division[] = [];
   private team: string;
   private isMainPlayer: boolean;
   private chosenDivision: number = 0;

   constructor(team: string, id: number, isMainPlayer?: boolean) {
      this.team = team;
      this.id = id;
      this.isMainPlayer = isMainPlayer;
      this.addDivision();

      if (this.isMainPlayer) {
         this.initCreatingEstimatedDivisions();
      }
   }

   public draw(enemiesDivisions: Division[]) {
      this.divisions.forEach((division: Division) => {
         // Division use an array of enemiesDivisions
         division.draw(enemiesDivisions);
      });

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

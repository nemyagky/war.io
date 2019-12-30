import { EstimatedDivision } from "./Division/EstimatedDivision";
import { PlayerProto } from "./PlayerProto";

export class MainPlayer extends PlayerProto {

   private chosenDivision: number = 0;

   constructor(settings: { team: string, id: number }) {
      super(settings);

      this.initCreatingEstimatedDivisions();
   }

   private initCreatingEstimatedDivisions() {
      window.addEventListener("mousedown", () => {
         EstimatedDivision.create(this.divisions[this.chosenDivision]);
      });
      window.addEventListener("mouseup", () => {
         EstimatedDivision.setMovingCordsForSolders();
      });
   }

}

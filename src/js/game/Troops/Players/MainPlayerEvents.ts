import { DivisionMoveToData } from "../../../interfaces/DivisionMoveToData.interface";
import { EstimatedDivision } from "./Division/EstimatedDivision";
import { MainPlayerNetwork } from "./MainPlayerNetwork";

export class MainPlayerEvents {

   public static init() {
      this.initCreatingEstimatedDivisions();
   }

   private static initCreatingEstimatedDivisions() {
      window.addEventListener("mousedown", () => {
         EstimatedDivision.create();
      });
      window.addEventListener("mouseup", async () => {
         const divisionMoveToData: DivisionMoveToData = await EstimatedDivision.setMovingCordsForSolders();
         MainPlayerNetwork.updateDivisionMoveTo(divisionMoveToData);
      });
   }

}

import { DivisionServerState } from "../../../interfaces/server/DivisionServerState.interface";
import { Socket } from "../../Shared/Socket";
import { SoldersMoveToCordsArray } from "./../../../interfaces/SoldersMoveToCordsArray.interface";
import { EstimatedDivision } from "./Division/EstimatedDivision";
import { Player } from "./Player";

export class MainPlayer extends Player {

   private chosenDivision: number = 0;

   constructor(id: string, team: string, divisions?: DivisionServerState[]) {
      super(id, team, divisions);

      this.initCreatingEstimatedDivisions();
   }

   private initCreatingEstimatedDivisions() {
      window.addEventListener("mousedown", () => {
         EstimatedDivision.create(this.divisions[this.chosenDivision]);
      });
      window.addEventListener("mouseup", async () => {
         EstimatedDivision.setMovingCordsForSolders().then((soldersMoveToCordsArray: SoldersMoveToCordsArray) => {
            Socket.emit("divisionMove", soldersMoveToCordsArray);
         });
      });
   }

}

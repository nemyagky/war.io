import { DivisionMoveToData } from "../../../interfaces/DivisionMoveToData.interface";
import { Socket } from "../../Shared/Socket";

export class MainPlayerNetwork {

   public static updateDivisionMoveTo(divisionMoveToData: DivisionMoveToData) {
      Socket.emit("updateDivisionMoveTo", divisionMoveToData);
   }

   public static createNewDivision(divisionId: string) {
      Socket.emit("createNewDivision", divisionId);
   }

}

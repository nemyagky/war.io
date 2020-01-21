import { DivisionServerState } from "../../../interfaces/server/DivisionServerState.interface";
import { Functions } from "./../../Shared/Functions";
import { Division } from "./Division/Division";

export class Player {

   public id: string;
   public divisions: Division[] = [];
   private team: string;

   constructor(id: string, team: string, divisions?: DivisionServerState[]) {
      this.id = id;
      this.team = team;

      if (divisions) { this.updateState(divisions); }
   }

   public draw() {
      Functions.setColor(this.team);

      this.divisions.forEach((division: Division) => {
         division.draw();
      });
   }

   public updateState(divisions: DivisionServerState[]) {
      this.divisions = [];

      divisions.forEach((division, index) => {
         this.divisions.push(new Division(index, division.solders));
      });
   }

}

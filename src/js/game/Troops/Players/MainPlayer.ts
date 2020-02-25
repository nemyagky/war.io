import { MainPlayerEvents } from "./MainPlayerEvents";
import { Player } from "./Player";

export class MainPlayer extends Player {

   public chosenDivisionId: string;

   constructor(id: string, team: string) {
      super(id, team);

      MainPlayerEvents.init();
   }

   public getDivisionById(divisionId: string) {
      return this.divisions.find((division) => division.id === divisionId);
   }

}

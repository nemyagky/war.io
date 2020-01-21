import { SolderServerState } from "./../../../../interfaces/server/SolderServerState.interface";
import { Infantryman } from "./Solders/Infantryman";
import { Solder } from "./Solders/Solder";

export class Division {

   public id: number;
   public solders: Infantryman[] = [];

   constructor(id: number, solders?: SolderServerState[]) {
      this.id = id;
      this.updateState(solders);
   }

   public draw() {
      this.solders.forEach((solder: Solder) => {
         solder.draw();
      });
   }

   private updateState(solders: SolderServerState[]) {
      this.solders = [];

      solders.forEach((solder: SolderServerState) => {
         this.solders.push(new Infantryman(solder[0], solder[1], solder[2], solder[3]));
      });
   }
}

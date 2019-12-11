import { Infantryman } from "./Solders/Infantryman";
import { Solder } from "./Solders/Solder";

export class Division {

   public solders: Infantryman[] = [];
   private team: string;

   constructor(team: string) {
      this.team = team;
   }

   public addSolder(solder: Infantryman) {
      solder.team = this.team;
      this.solders.push(solder);
   }

   public draw() {
      this.solders.forEach((solder: Solder) => solder.draw());
   }

}

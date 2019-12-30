import { Division } from "./Division/Division";
import { EstimatedDivision } from "./Division/EstimatedDivision";
import { Infantryman } from "./Division/Solders/Infantryman";

export class PlayerProto {

   public id: number;
   public divisions: Division[] = [];
   private team: string;

   constructor(settings: { team: string, id: number }) {
      this.team = settings.team;
      this.id = settings.id;

      this.divisions.push(new Division(this.team));
   }

   public draw(enemiesDivisions: Division[]) {
      this.divisions.forEach((division: Division) => {
         division.draw(enemiesDivisions);
      });
   }

   public addSolder(x: number, y: number, divisionIndex?: number) {
      this.divisions[divisionIndex || this.divisions.length - 1].addSolder(new Infantryman(x, y, this.team));
   }

}

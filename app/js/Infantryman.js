import { Solder } from "./Solder";

export class Infantryman extends Solder {

   constructor(x, y, team ) {
      super()
      this.w = 10
      this.h = 10
      this.x = x
      this.y = y
      this.team = team
      this.hp = 1000
   }

}

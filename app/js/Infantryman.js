import { Solder } from "./Solder";

export class Infantryman extends Solder {

   constructor(x, y, team, solderIndexes ) {

      super()
      
      this.width = 10
      this.height = 10

      this.hp = 1000
      this.shootBy = 0

      this.x = x
      this.y = y
      this.team = team
      this.speed = 0
      this.rotate = 90

      this.indexes = {
         player: solderIndexes.player,
         division: solderIndexes.division,
         index: solderIndexes.index
      }

   }

}

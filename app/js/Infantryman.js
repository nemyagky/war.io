import { Solder } from "./Solder";

export class Infantryman extends Solder {

   constructor(x, y, team, solerIndexes ) {

      super()
      
      this.width = 10
      this.height = 10

      this.hp = 100000
      this.shootBy = 0

      this.x = x
      this.y = y
      this.team = team

      this.indexes = {
         player: solerIndexes.player,
         division: solerIndexes.division,
         index: solerIndexes.index
      }

   }

}

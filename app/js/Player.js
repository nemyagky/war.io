import { Infantryman } from "./Infantryman"
import { Division } from "./Division"

export class Player {

   constructor(team, id, startSolders, rotate) {

      this.team = team
      this.id = id
      this.divisions = []
      this.addDivision(rotate)
      
      startSolders.forEach((solderCords) => {
         this.addSolder(solderCords.x, solderCords.y)
      })

   }

   addDivision(rotate) {
      this.divisions.push(new Division(this.team, rotate))
   }
   

   // division передавать не обязательно. Передается только в том случае, если мы хотим добавить корабль в уже существующий отряд игрока
   addSolder(x, y, division) {

      let currentDivision = division || this.divisions.length-1

      let solderIndexes = {
         player: this.id,
         division: currentDivision,
         index: this.divisions[currentDivision].solders.length
      }
      this.divisions[currentDivision].addSolder(new Infantryman(x, y, this.team, solderIndexes))

   }

}

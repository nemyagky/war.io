import {toRad, rand} from './functions';
import { Troops } from './Troops';

export class Solder {

   constructor() {

   }


   shoot(soldersQuadtree, soldresDivisionBorders, currentRotate) {
      
      let soldersShoutDist = 200
      
      if (
         !(this.x - soldersShoutDist > soldresDivisionBorders.right ||
            this.x + soldersShoutDist < soldresDivisionBorders.left ||
            this.y - soldersShoutDist > soldresDivisionBorders.bottom ||
            this.y + soldersShoutDist < soldresDivisionBorders.top
            )
         ) 
      {

         let nearestEnemy = soldersQuadtree.find(this.x, this.y, 200);
   
         if (nearestEnemy) {
            let indexes = nearestEnemy[2];


            let nearestEmemyOrig = Troops.players[indexes.player].divisions[indexes.division].solders[indexes.index]

            if (!nearestEmemyOrig) return

            nearestEmemyOrig.hp -= rand(0, 3)

            if ( nearestEmemyOrig.hp <= 0 ) {
               soldersQuadtree.remove(nearestEnemy)
               Troops.players[indexes.player].divisions[indexes.division].solders[indexes.index] = null
            }
         }

      } else {
         this.x += Math.floor(Math.sin(toRad(currentRotate))*1);
         this.y += Math.floor(Math.cos(toRad(currentRotate))*1);
      }

   }

}

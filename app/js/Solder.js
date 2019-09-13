import {toRad, rand} from './functions';
import { Troops } from './Troops';

export class Solder {

   constructor() {

   }


   shoot(solersQuadtree, soldresDivisionBorders) {

      if (!solersQuadtree) return;

      let soldersShoutDist = 20000
      
      if (
         !(this.x - soldersShoutDist > soldresDivisionBorders.right ||
          this.x + soldersShoutDist < soldresDivisionBorders.left ||
          this.y - soldersShoutDist > soldresDivisionBorders.bottom ||
          this.y + soldersShoutDist < soldresDivisionBorders.top
         )
      ) {

         if (this.targetForShooting) {
            this.targetForShooting.hp -= rand(0, 1000)


            if (this.targetForShooting.hp <= 0) {
               this.targetForShooting.y = -1000
               this.targetForShooting = null
            }
         } else {
            let nearestEnemies = solersQuadtree.find(this.x, this.y, 600);
            
            if (nearestEnemies) {
               let indexes = nearestEnemies[2];

               let nearestEmemyOrig = Troops.players[indexes.player].divisions[indexes.division].solders[indexes.index]


               nearestEmemyOrig.shootBy++

               if ( nearestEmemyOrig.shootBy > 5 ) {
                  solersQuadtree.remove(nearestEmemyOrig.x, nearestEmemyOrig.y)
               }

               this.targetForShooting = nearestEmemyOrig
            }

         }

      } else {
         this.x += Math.floor(Math.sin(toRad(this.rotate))*0);
         this.y += Math.floor(Math.cos(toRad(this.rotate))*0);
      }

   }

}

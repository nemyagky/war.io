import {toRad, rand, getDistBetween2dots} from './functions'


export class Solder {

   constructor() {

   }


   shoot(armyMatrix) {

      if (!armyMatrix) return;

      let soldersShoutDist = 200
      
      if (
         !(this.x - soldersShoutDist > armyMatrix.border.right ||
          this.x + soldersShoutDist < armyMatrix.border.left ||
          this.y - soldersShoutDist > armyMatrix.border.bottom ||
          this.y + soldersShoutDist < armyMatrix.border.top
         )
      ) {

         let army = armyMatrix.solders

         let x = this.startPos.x
         let y = this.startPos.y

         while (true) {

            


            alert(1)
         }



      } else {
         this.x += Math.floor(Math.sin(toRad(this.rotate)) * 10);
         this.y += Math.floor(Math.cos(toRad(this.rotate)) * 10);
      }

   }


   getEnemyOnRotateLine() {

      let nearestEnemy;

      army.forEach((enemy, i) => {

         if ( !enemy ) return
         if (enemy.team != this.team) {

            const x1 = enemy.x
            const y1 = enemy.y
            const x2 = enemy.x
            const y2 = enemy.y + enemy.h

            const x3 = this.x
            const y3 = this.y
            const x4 = this.x + Math.sin(toRad(this.rotate));
            const y4 = this.y
            
            const den = (x1-x2) * (y3-y4) - (y1-y2) * (x3-x4);
            if (den == 0) return;

            const t = ((x1-x3) * (y3-y4) - (y1-y3) * (x3-x4)) / den
            const u = -((x1-x2) * (y1-y3) - (y1-y2) * (x1-x3)) / den
            if ( t >= 0 && t <= 1 && u >= 0 ) {
               nearestEnemy = i
            }
         }
      })

      if ( !nearestEnemy ) nearestEnemy = this.getNearestEnemy()

      return nearestEnemy;
   }


   getNearestEnemy() {
      let distToNearestShip = 99999
      let nearestShip;

      army.forEach((enemy, i) => {
         
         if (!enemy) return
         if (enemy.team != this.team) {
            let dist = getDistBetween2dots( [this.x, this.y], [enemy.x, enemy.y] );
            if (dist < 100000 && dist != 0) {
               if (dist < distToNearestShip) {
                  distToNearestShip = dist;
                  nearestShip = i
               };
            }
         }
      })

      return nearestShip

   }

   getNearestXLine(value, a) {

      // stackoverflow.com/questions/30245166/find-the-nearest-closest-value-in-a-sorted-list

      if (value < a[0][0].x) {
         return a[0][0].x;
      }
      if (value > a[a.length-1][0].x) {
         return a[a.length-1][0].x;
      }

      let low = 0;
      let high = a.length - 1;

      while (low <= high) {
         let mid = Math.ceil( (high + low) / 2 );

         if (value < a[mid][0].x) {
            high = mid - 1;
         } else if (value > a[mid][0].x) {
            low = mid + 1;
         } else {
            return a[mid][0].x;
         }
      }

      return (a[low][0].x - value) < (value - a[high][0].x) ? a[low][0].x : a[high][0].x;
     
   }

   getNearestYLine(value, a, xLine) {

      // stackoverflow.com/questions/30245166/find-the-nearest-closest-value-in-a-sorted-list

      if (value < a[0][0].x) {
         return a[0][0].x;
      }
      if (value > a[a.length-1][0].x) {
         return a[a.length-1][0].x;
      }

      let low = 0;
      let high = a.length - 1;

      while (low <= high) {
         let mid = Math.ceil( (high + low) / 2 );

         if (value < a[mid][0].x) {
            high = mid - 1;
         } else if (value > a[mid][0].x) {
            low = mid + 1;
         } else {
            return a[mid][0].x;
         }
      }

      return (a[low][0].x - value) < (value - a[high][0].x) ? a[low][0].x : a[high][0].x;
     
   }


}

import {toRad, rand, setColor, Round10, rotate, getDistBetween2dots} from './functions';
import { Troops } from './Troops';
import { ctx } from './init';

export class Solder {

   constructor() {

   }


   behavior(soldersQuadtree, soldersSize) {

      if (this.moveTo) {

         if (soldersSize != 0) {
            let nearestEnemy = soldersQuadtree.find(this.x, this.y);

            if (getDistBetween2dots([this.x, this.y], [nearestEnemy[0], nearestEnemy[1]]) < this.shootDist) {
               
            } else {
               this.setRotateTo(nearestEnemy[0], nearestEnemy[1])
               this.move()
            }

         } else {
            this.move()
         } 
      }

      // if (soldersSize) {
      //    this.shoot(soldersQuadtree, soldresDivisionBorders)
      // } else {
      //    this.move(soldresDivisionBorders)
      // }
   }


   shoot(soldersQuadtree, soldresDivisionBorders) {
      
      if (
         !(this.x - this.shootDist > soldresDivisionBorders.right ||
            this.x + this.shootDist < soldresDivisionBorders.left ||
            this.y - this.shootDist > soldresDivisionBorders.bottom ||
            this.y + this.shootDist < soldresDivisionBorders.top
          )
      ) {
      
         let nearestEnemy = soldersQuadtree.find(this.x, this.y, this.shootDist);
   
         if (nearestEnemy) {
            let indexes = nearestEnemy[2].indexes;

            let nearestEmemyOrig = Troops.players[indexes.player].divisions[indexes.division].solders[indexes.index]

            if (!nearestEmemyOrig) return

            nearestEmemyOrig.hp -= rand(0, 3)

            if ( nearestEmemyOrig.hp <= 0 ) {
               soldersQuadtree.remove(nearestEnemy)
               Troops.players[indexes.player].divisions[indexes.division].solders[indexes.index] = null
            }
         } else {
            this.move()
         }
      } else {
         this.move()
      }
   }


   // shoot(soldersQuadtree, soldresDivisionBorders) {
      
   //    if (
   //       !(this.x - this.shootDist > soldresDivisionBorders.right ||
   //          this.x + this.shootDist < soldresDivisionBorders.left ||
   //          this.y - this.shootDist > soldresDivisionBorders.bottom ||
   //          this.y + this.shootDist < soldresDivisionBorders.top
   //        )
   //    ) {
      
   //       let nearestEnemy = soldersQuadtree.find(this.x, this.y, this.shootDist);
   
   //       if (nearestEnemy) {
   //          let indexes = nearestEnemy[2].indexes;

   //          let nearestEmemyOrig = Troops.players[indexes.player].divisions[indexes.division].solders[indexes.index]

   //          if (!nearestEmemyOrig) return

   //          nearestEmemyOrig.hp -= rand(0, 3)

   //          if ( nearestEmemyOrig.hp <= 0 ) {
   //             soldersQuadtree.remove(nearestEnemy)
   //             Troops.players[indexes.player].divisions[indexes.division].solders[indexes.index] = null
   //          }
   //       } else {
   //          this.move()
   //       }
   //    } else {
   //       this.move()
   //    }
   // }


   setRotateTo(x, y) {
      this.moveTo = {
         x: x,
         y: y
      }
      this.rotate = 180 / Math.PI * Math.atan2(y - this.y, x - this.x);
      this.speed = 3
   }


   move() {
      if (this.moveTo === undefined || this.rotate === undefined) return

      this.x += Math.cos(toRad(this.rotate))*this.speed;
      this.y += Math.sin(toRad(this.rotate))*this.speed;

      if (Math.abs(this.x-this.moveTo.x) < 3 && Math.abs(this.y-this.moveTo.y) < 3) {
         this.speed = 0;
         this.x = this.moveTo.x
         this.y = this.moveTo.y

         this.moveTo = undefined
      }
   }


   draw() {
      setColor(this.team);

      rotate(this.x, this.y, this.rotate)
      ctx.fillRect(this.x, this.y, 10, 10);
      ctx.restore()
   }

   
}

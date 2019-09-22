import {toRad, rand, setColor, Round10, rotate} from './functions';
import { Troops } from './Troops';
import { ctx } from './init';

export class Solder {

   constructor() {

   }


   behavior(soldersQuadtree, soldersSize, soldresDivisionBorders) {
      
      if (soldersSize) {
         this.shoot(soldersQuadtree)
      } else {
         this.move(soldresDivisionBorders)
      }
      

   }


   shoot(soldersQuadtree, soldresDivisionBorders) {
      let soldersShoutDist = 2000
      
      if (
         !(this.x - soldersShoutDist > soldresDivisionBorders.right ||
            this.x + soldersShoutDist < soldresDivisionBorders.left ||
            this.y - soldersShoutDist > soldresDivisionBorders.bottom ||
            this.y + soldersShoutDist < soldresDivisionBorders.top
            )
         ) 
      {

         let nearestEnemy = soldersQuadtree.find(this.x, this.y, 2000);
   
         if (nearestEnemy) {
            let indexes = nearestEnemy[2];


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

   setRotateTo(x, y) {
      this.moveTo = {
         x: x,
         y: y
      }
      this.rotate = 180 / Math.PI * Math.atan2(y - this.y, x - this.x);
      this.speed = 3
   }

   move() {

      if (!this.moveTo || !this.rotate) return

      this.x += Math.cos(toRad(this.rotate))*this.speed;
      this.y += Math.sin(toRad(this.rotate))*this.speed;

      if (Math.abs(this.x-this.moveTo.x) < 3 && Math.abs(this.y-this.moveTo.y) < 3) {
         this.speed = 0;
         this.x = this.moveTo.x
         this.y = this.moveTo.y
      }
   }

   draw() {
      setColor(this.team);

      rotate(this.x, this.y, this.rotate)
      ctx.fillRect(this.x, this.y, 10, 10);
      ctx.restore()
   }

}

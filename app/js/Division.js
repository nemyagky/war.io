import { ctx } from "./init";
import { Infantryman } from "./Infantryman";
import { setColor, toRad } from "./functions";
import { Troops } from './Troops';
import {Map} from './Map'
import * as d3 from 'd3-quadtree'


export class Division {


   // TODO границы дивизии
   constructor(team, rotate) {
      this.solders = [];
      this.deletedSolders = [];
      this.team = team;
      this.rotate = rotate;
      this.borders = {
         top: Infinity,
         left: Infinity,
         right: 0,
         bottom: 0
      }
   };

   addSolder(solder) {
      this.solders.push(solder)
   }

   
   draw() {
      
      let divisionsNear = this.getNearestDivisions()

      this.borders = {
         top: Infinity,
         left: Infinity,
         right: 0,
         bottom: 0
      }

      if (divisionsNear) {

         let soldersQuadtree = this.toQuadtree(divisionsNear)

         let soldersQuadtreeSize = soldersQuadtree.size()


         this.solders.forEach(solder => {

            if (!solder) {
               return
            }


            if (soldersQuadtreeSize) {
               solder.shoot(soldersQuadtree, this.borders, this.rotate)
            }

            setColor(solder.team);
            ctx.fillRect(solder.x, solder.y, 10, 10);
         });


      } else {

         this.solders.forEach(solder => {
            if (!solder) return
            

            solder.x += Math.sin(toRad(solder.rotate)) * 1;
            solder.y += Math.cos(toRad(solder.rotate)) * 1;
            setColor(solder.team);
            ctx.fillRect(solder.x, solder.y, 10, 10);
         })

      }

   };


   getNearestDivisions() {

      let nearestDivisions = [];

      Troops.getAllEnemiesTroops(this.team).forEach(division => {

         let soldersShoutDist = 200;

         if (
            !(this.left - soldersShoutDist > division.right ||
             this.right + soldersShoutDist < division.left ||
             this.top - soldersShoutDist > division.bottom ||
             this.bottom + soldersShoutDist < division.top
            )
            
         ) {

            nearestDivisions.push(division)
         }
      });

      return nearestDivisions;

   };


   toQuadtree(nearestDivisions) {

      let soldersQuadtree = d3.quadtree()
         .extent([[-1, -1], [Map.w + 1, Map.h + 1]])

      nearestDivisions.forEach((division) => {
         
         division.solders.forEach(solder => {

            if (!solder) {
               return
            }

            if (solder.hp > 0) {
               soldersQuadtree.add([solder.x, solder.y, solder.indexes])
            }
            
            if (solder.x < this.borders.top) this.borders.top = solder.y
            if (solder.x > this.borders.bottom) this.borders.bottom = solder.y
            if (solder.y < this.borders.left) this.borders.left = solder.x
            if (solder.y > this.borders.right) this.borders.right = solder.x

         })
      })

      return soldersQuadtree

   }

};

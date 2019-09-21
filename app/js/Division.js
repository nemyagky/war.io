import { ctx } from "./init";
import { setColor, toRad, cursor } from "./functions";
import { Troops } from './Troops';
import {Map} from './Map'
import * as d3 from 'd3-quadtree'


export class Division {

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

      window.addEventListener('mousedown', () => {
         this.createTransparentDivision(this.solders)
      })
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

            solder.behavior(soldersQuadtree, soldersQuadtreeSize, this.borders, this.rotate)

            solder.draw()
         });


      } else {

         this.solders.forEach(solder => {
            if (!solder) return

            solder.move()
            solder.draw()

         })

      }


      if (cursor.isPressed) {
       //  this.drawTransparentDivision()
      }

   };


   getNearestDivisions() {

      let nearestDivisions = [];

      Troops.getAllEnemiesTroops(this.team).forEach(division => {

         let soldersShoutDist = 2000;

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

   createTransparentDivision(solders) {

      this.transparentDivision = []
      

      for (let i = 0; i < solders.length; i++) {

         if (i % 10 == 0) {
            this.transparentDivision.solders.push([])
         }

         this.transparentDivision.solders[soldersLength-1].push(solders[i])

      }

   }

   // drawTransparentDivision() {
   //    setColor('red')

   //    // Для каждой будущей точки находим ближайшую в текущем массиве, причем начиная перебор с противополой стороны


   //    for (let i = 0; i < this.transparentDivision.soldersLength; i++) {
   //       ctx.fillRect(this.transparentDivision.solders[i][i%10].x, this.transparentDivision.solders[i][i%10].y, 10, 10);
   //       this.transparentDivision.solders[i][i%10].x++
   //    }
   // }

};











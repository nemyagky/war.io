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
         this.createTransparentDivision()
      })

      window.addEventListener('mouseup', () => {
         this.setMoveToForSolders()
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
         this.drawTransparentDivision()
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



   createTransparentDivision() {

      this.transparentDivision = []

      let solders = this.solders
      let soldersInLine = 10

      let y = -solders.length/2/soldersInLine*11
      let startX = -soldersInLine/2*11
      let maxX = soldersInLine/2*11
      let x = startX
      for (let i = 0; i < solders.length; i++) {

         this.transparentDivision.push({x: x, y: y})

         x += 11
         if (x >= maxX) {
            y+=11
            x = startX
         }

      }

   }

   drawTransparentDivision() {

      if (!this.transparentDivision) return

      this.createTransparentDivision()

      setColor('rgba(0,0,255,0.5)')

      this.transparentDivision.forEach((transperentSolder) => {
         ctx.fillRect(transperentSolder.x+cursor.x, transperentSolder.y+cursor.y, 10, 10)
      })
   }

   setMoveToForSolders() {
      if (!this.transparentDivision) return

      let sortedSolders = this.sortByHorisontal()

      sortedSolders.forEach( (solder, i) => {
         solder.setRotateTo(this.transparentDivision[i].x+cursor.x, this.transparentDivision[i].y+cursor.y)
      })
   }

   sortByHorisontal() {

      let sortedObj = {}

      this.solders.forEach(solder => {
         if (!sortedObj[solder.y]) {
            sortedObj[Math.round(solder.y)] = []
            sortedObj[Math.round(solder.y)].push(solder)
         } else {
            sortedObj[Math.round(solder.y)].push(solder)
         }
      })

      let sortedArray = []

      for (let line in sortedObj) {
         sortedObj[line].forEach((solder) => {
            sortedArray.push(solder)
         })
      }
      console.log(sortedObj)

      return sortedArray


   }

};











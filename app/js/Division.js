import { ctx } from "./init";
import { setColor, toRad, cursor, getDistBetween2dots, keyboardPressed } from "./functions";
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
      
      this.transparentDivisionRotate = 0
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
      let soldersInLine = 50

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
      this.rotateTransparentDivision()

   }

   rotateTransparentDivision() {
      let a = toRad(this.transparentDivisionRotate)
      alert(a)
      this.transparentDivision.forEach(solder => {
         
         //alert(solder.x + ' ' + solder.y)
         solder.x = solder.x * Math.cos(a) + solder.y * Math.sin(a)
         solder.y = solder.x * Math.sin(a) - solder.y * Math.cos(a)
         //alert(solder.x + ' ' + solder.y)
      })
   }

   drawTransparentDivision() {

      
      if (!this.transparentDivision) return
      
      
      if (keyboardPressed.w) {
         this.createTransparentDivision()
         this.transparentDivisionRotate += 1
         this.rotateTransparentDivision()
      }

      setColor('rgba(0,0,255,0.5)')

      this.transparentDivision.forEach((transperentSolder) => {
         ctx.fillRect(transperentSolder.x+cursor.x, transperentSolder.y+cursor.y, 10, 10)
      })
   }

   setMoveToForSolders() {
      if (!this.transparentDivision) return

      // Преобразуем оба массива в квадтрисы

      let transparentQuadtree = d3.quadtree()

      this.transparentDivision.forEach( (solder) => {      
         transparentQuadtree.add([solder.x, solder.y, solder])
      })



      let soldersQuadtree = d3.quadtree()
      let soldersBorders = {
         top: Infinity,
         bottom: 0
      }

      this.solders.forEach((solder) => {

         if (solder.y < soldersBorders.top) soldersBorders.top = solder.y
         if (solder.y > soldersBorders.bottom) soldersBorders.bottom = solder.y
      
         soldersQuadtree.add([solder.x, solder.y, solder])
      })

      let soldersHeigth = soldersBorders.bottom - soldersBorders.top

      let startY = soldersBorders.top
      let yNow = startY
      let transparentStart = -transparentQuadtree.find(-1000, -1000)[1]

      
      for (let i = 0; i < this.solders.length; i++) {

         let currentSolder = soldersQuadtree.find(0, yNow)
         let currentPlace = transparentQuadtree.find(-1000, currentSolder[1] - startY - transparentStart)

         let indexes = currentSolder[2].indexes
         Troops.players[indexes.player].divisions[indexes.division].solders[indexes.index].setRotateTo(currentPlace[0]+cursor.x, currentPlace[1]+cursor.y)

         transparentQuadtree.remove(currentPlace)
         soldersQuadtree.remove(currentSolder)

         yNow+=11
         if (yNow >= soldersHeigth+startY+10) yNow=startY
         
      }



   }

   find() {

   }


   // Начинаем перебор с левого верхнего края, постепенно приближаясь к нижнеу правому. Каждого пройденного в цикле солдата
   // Добавляем в массив, который впоследствии возращаем (с учетом индексов, так что придется хранить переменные)

};











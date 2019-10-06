import { ctx } from "./init";
import { setColor, toRad, cursor, keyboardPressed } from "./functions";
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

   // Добавляем солдата в текущую дивизию
   addSolder(solder) {
      this.solders.push(solder)
   }
   
   // Отрисовываем каждую дивизию
   // Преобразуем текущую дивизию в quadtree + для каждого солдата вычисляем, двигаться ему, или стрелять
   draw() {


      let divisionsNear = this.getNearestDivisions()

      this.borders = {
         top: Infinity,
         left: Infinity,
         right: 0,
         bottom: 0
      }

      
      if (divisionsNear) {

         let soldersQuadtree = this.toQuadtreeE(divisionsNear)
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

   // Получаем ближайших к текущей дивизии вражеских дивизиий в зависимости от расстояния 
   // И преобразует в массив солдат для дайнейшего удобного перебора
   getNearestEnemies() {
      let nearestEnemies = [];

      Troops.getAllEnemiesTroops(this.team).forEach(division => {
         let soldersShoutDist = 200*2;

         if (
            !(this.left - soldersShoutDist > division.right ||
             this.right + soldersShoutDist < division.left ||
             this.top - soldersShoutDist > division.bottom ||
             this.bottom + soldersShoutDist < division.top
            )
         ) {
            division.forEach((solder) => {
               if (!solder) return
               nearestEnemies.push(solder)
            })
         }

      });

      return nearestEnemies;
   };


   toQuadtreeE() {

      let nearestEnemies = this.getNearestEnemies()

      let soldersQuadtree = toQuadtree(nearestEnemies)
            
      nearestEnemies.forEach(solder => {
         if (solder.x < this.borders.top) this.borders.top = solder.y
         if (solder.x > this.borders.bottom) this.borders.bottom = solder.y
         if (solder.y < this.borders.left) this.borders.left = solder.x
         if (solder.y > this.borders.right) this.borders.right = solder.x
      })

      return soldersQuadtree

   }


   createTransparentDivision() {

      
   }


   rotateTransparentDivision() {
      let a = toRad(this.transparentDivisionRotate)
      this.transparentDivision.forEach(solder => {
         
         solder.x = solder.startX * Math.cos(a) + solder.startY * Math.sin(a)
         solder.y = solder.startX * Math.sin(a) - solder.startY * Math.cos(a)
      })
   }


   drawTransparentDivision() {

      
      if (!this.transparentDivision) return
      
      
      if (keyboardPressed.w) {
         this.createTransparentDivision()
         this.transparentDivisionRotate += 3
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


      // Вычиляем высотку массива
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

   toQuadtree(array) {

      let quadtree = d3.quadtree()

      array.forEach(elem => {
         if (!elem) return

         quadtree.add(exem.x, elem.y, elem)
      })

      return quadtree
   }


};

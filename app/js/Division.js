import { cursor } from "./functions";
import { Troops } from './Troops';
import * as d3 from 'd3-quadtree'
import { TransparentDivision } from "./TransparentDivision";
import { ctx } from "./init";


export class Division {
   
   constructor(team) {
      this.solders = [];
      this.deletedSolders = [];
      this.team = team;

      this.updateBorders()
      
      window.addEventListener('mousedown', () => {
         this.transparentDivision = new TransparentDivision(this.solders)
      })

      window.addEventListener('mouseup', () => {
         this.transparentDivision.setMoving(this.solders)
      })
   };

   // Добавляем солдата в текущую дивизию
   addSolder(solder) {
      this.solders.push(solder)
   }
   
   // Отрисовываем каждую дивизию
   // Преобразуем текущую дивизию в quadtree + для каждого солдата вычисляем, двигаться ему, или стрелять
   draw() {

      this.updateBorders()

      let nearestEnemies = this.getNearestEnemies()
      
      if (nearestEnemies) {
         let soldersQuadtree = this.toQuadtree(nearestEnemies)
         let soldersQuadtreeSize = soldersQuadtree.size()

         this.solders.forEach(solder => {
            if (!solder) return
            
            // Должен принять quadtree врагов
            solder.behavior(soldersQuadtree, soldersQuadtreeSize, this.borders)
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
         this.transparentDivision.draw()
      }

   };

   // Получаем ближайших к текущей дивизии вражеских дивизиий в зависимости от расстояния 
   // И преобразует в массив солдат для дайнейшего удобного перебора
   getNearestEnemies() {
      let nearestEnemies = [];

      Troops.getAllEnemiesTroops(this.team).forEach(division => {
         if (
            !(this.borders.left > division.borders.right ||
             this.borders.right < division.borders.left ||
             this.borders.top > division.borders.bottom ||
             this.borders.bottom < division.borders.top
            )
         ) {
            division.solders.forEach((solder) => {
               if (!solder) return
               nearestEnemies.push(solder)
            })
         }
      });

      return nearestEnemies;
   };

   
   toQuadtree(array) {
      let quadtree = d3.quadtree()

      array.forEach(elem => {
         if (!elem) return

         quadtree.add([elem.x, elem.y, elem])
      })

      return quadtree
   }


   updateBorders() {
      // borders - границы дивизии + расстояние стрельбы солдат
      this.borders = {
         top: Infinity,
         left: Infinity,
         right: 0,
         bottom: 0
      }

      this.solders.forEach(solder => {
         if (solder.x - solder.shootDist < this.borders.left) this.borders.left = solder.x - solder.shootDist
         if (solder.x + solder.shootDist > this.borders.right) this.borders.right = solder.x + solder.shootDist
         if (solder.y - solder.shootDist < this.borders.top) this.borders.top = solder.y - solder.shootDist
         if (solder.y + solder.shootDist > this.borders.bottom) this.borders.bottom = solder.y + solder.shootDist
      })

      ctx.fillRect(this.borders.left, this.borders.top, this.borders.right-this.borders.left,this.borders.bottom-this.borders.top)
      ctx.stroke()
   }

};

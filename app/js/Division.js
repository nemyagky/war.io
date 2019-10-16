import { ctx } from "./init";
import { setColor, toRad, cursor, keyboardPressed } from "./functions";
import { Troops } from './Troops';
import {Map} from './Map'
import * as d3 from 'd3-quadtree'
import { TransparentDivision } from "./TransparentDivision";


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
         alert(1)
         TransparentDivision.create(this.solders)
      })

      window.addEventListener('mouseup', () => {
         TransparentDivision.setMoving(this.solders)
      })
   };

   // Добавляем солдата в текущую дивизию
   addSolder(solder) {
      this.solders.push(solder)
   }
   
   // Отрисовываем каждую дивизию
   // Преобразуем текущую дивизию в quadtree + для каждого солдата вычисляем, двигаться ему, или стрелять
   draw() {

      
      this.borders = {
         top: Infinity,
         left: Infinity,
         right: 0,
         bottom: 0
      }

      let nearestEnemies = this.getNearestEnemies()
      
      if (nearestEnemies) {

         let soldersQuadtree = this.toQuadtree(nearestEnemies)
         let soldersQuadtreeSize = soldersQuadtree.size()

         nearestEnemies.forEach(solder => {
            if (solder.x < this.borders.top) this.borders.top = solder.y
            if (solder.x > this.borders.bottom) this.borders.bottom = solder.y
            if (solder.y < this.borders.left) this.borders.left = solder.x
            if (solder.y > this.borders.right) this.borders.right = solder.x
         })

         this.solders.forEach(solder => {

            if (!solder) {
               return
            }
            
            // Должен принять quadtree врагов
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
         TransparentDivision.draw()
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


};

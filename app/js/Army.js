import { ctx } from "./init";
import { Infantryman } from "./Infantryman";
import { setColor, toRad } from "./functions";
import {troops} from './Troops'

export class Army {

   constructor() {
      this.solders = [];
   };

   
   create(params) {

      /* params should have this type: {
         team: '',
         rotate: number,
         borders: {
            startX: number, 
            startY: number, 
            endX: number, 
            endY: number
         }
      } */

      this.top = params.borders.startY;
      this.left = params.borders.startX;
      this.right = params.borders.endX;
      this.bottom = params.borders.endY;
      this.team = params.team;

      for (let i = this.left; i < this.right; i+=11) {
         for (let j = this.top; j < this.bottom; j+=11) {
            this.solders.push(new Infantryman(i, j, params.team));
         };
      };
      this.setMoveTo(params.rotate);

   };


   setMoveTo(rotate) {
      this.solders.forEach(solder => {
         solder.rotate = rotate;
      });
      this.rotate = rotate
   };

   
   draw() { 
      

      let armiesNear = this.isArmiesIntersect()

      if (armiesNear.length) {
         armiesNear = this.toMatrix(armiesNear)

         this.solders.forEach(solder => {
            if (!solder) return;

            solder.shoot(armiesNear);
            setColor(solder.team);
            ctx.fillRect(solder.x, solder.y, 10, 10);
         });

      } else {

         this.solders.forEach(solder => {
            solder.x += Math.sin(toRad(solder.rotate)) * 1;
            solder.y += Math.cos(toRad(solder.rotate)) * 1;
            setColor(solder.team);
            ctx.fillRect(solder.x, solder.y, 10, 10);
         })

         this.top += Math.cos(toRad(this.rotate)) * 1;
         this.bottom += Math.cos(toRad(this.rotate)) * 1;
         this.left += Math.sin(toRad(this.rotate)) * 1;
         this.right += Math.sin(toRad(this.rotate)) * 1;

      }

   };


   isArmiesIntersect() {
      let armiesNear = [];

      troops.forEach(army => {
         if (army.team == this.team) return

         let soldersShoutDist = 10

         if (
            !(this.left - soldersShoutDist > army.right ||
             this.right + soldersShoutDist < army.left ||
             this.top - soldersShoutDist > army.bottom ||
             this.bottom + soldersShoutDist < army.top
            )
            
         ) {
            armiesNear = armiesNear.concat(army.solders)

         }
      })
      return armiesNear;

   };


   toMatrix(armyNear) {

      let armyMatrix = {
         border: {
            top: Infinity,
            left: Infinity,
            right: 0,
            bottom: 0
         },
         solders: []
      };



      // На выходе мы должны получить отсортированный массив.
      // Должен быть массив освободившихся id. Как только создается солдат - он получает id из списка освободившихся
      // Завести переменную, отвечающую за то, как много солдат ищет противника в этот кадр

      // 

      let helpObj = {}


      armyNear.forEach( (solder) => {

         let solderX = Math.round(solder.x)
         let solderY = Math.round(solder.y)

         // If 2 enemies in 1 cords
         if ( !helpObj[solderX] ) {
            helpObj[solderX] = {}
            helpObj[solderX][solderY] = [solder]
         } else {
            if (helpObj[solderX][solderY]) {
               helpObj[solderX][solderY].push(solder)
            } else {
               helpObj[solderX][solderY] = [solder]
            }
         }

         if ( solder.x < armyMatrix.border.left ) armyMatrix.border.left = solder.x
         if ( solder.x > armyMatrix.border.right ) armyMatrix.border.right = solder.x
         if ( solder.y < armyMatrix.border.top ) armyMatrix.border.top = solder.y
         if ( solder.y > armyMatrix.border.bottom ) armyMatrix.border.bottom = solder.y

      })


      this.solders.forEach((solder) => {
         let solderX = Math.round(solder.x)
         let solderY = Math.round(solder.y)

         if ( !helpObj[solderX] ) {
            helpObj[solderX] = {}
            helpObj[solderX][solderY] = [solder]
         } else {
            if (helpObj[solderX][solderY]) {
               helpObj[solderX][solderY].push(solder)
            } else {
               helpObj[solderX][solderY] = [solder]
            }
         }
      })


      let team = this.solders[0].team // RED

      let arrayX = 0

      for (let objLine in helpObj) {

         armyMatrix.solders[arrayX] = [];
         let shouldWeIterateX = false
         let shouldWeIterateY = false
         let arrayY = 0

         for (let key in helpObj[objLine]) {

      
            helpObj[objLine][key].forEach((solder) => {

               // Если текущий элемент принадлежит к нашей команде - нам надо найти для него точку отсчета
               if ( solder.team == team ) {
                  solder.startPos = {
                     x: arrayX,
                     y: arrayY
                  }
               } else {
               // Иначе - просто отсортировать массив врагов
                  armyMatrix.solders[arrayX].push( solder )
                  shouldWeIterateX = true
                  shouldWeIterateY = true
               }

            })

            if (shouldWeIterateY) {
               arrayY++
            }
         }
         if (shouldWeIterateX) {
            arrayX++
         }
      }

      return armyMatrix
   }


};

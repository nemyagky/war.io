import {toRad, rand, getDistBetween2dots, Round10} from './functions'


export class Solder {

   constructor() {

   }


   shoot(armyMatrix) {

      // На вход получает массив врагов в виде объекта {
      //   X10: {
      //      Y10: [солдат и его свойства],
      //      Y20: [солдат и его свойства]
      // },
      //   X20: {
      //      Y10: [солдат и его свойства],
      //      Y20: [солдат и его свойства]
      //   }
      // }.
      // Поиск по псевдомассиву осуществляется так: массив.позицияПоX.позицияПоY
      // 1/2 Внедрить проверку, может ли солдат в теории дотрельнуть до массива врагов.left. Если нет - изменить поворот в сторону массива врагов
      // 1 Если может - через каждые пройденные 10пикселей по x или y сделать провеку, есть ли в данной точке враг
      // Если врага нет на "острие" поворота - создать несколько других "остиев", посмотреть, есть ли враг хотя бы на нем. Если все еще нет - 
      // Создать допустимые границы для стрельбы. Пройтись циклом по всей матрице, но уже начиная от позиции игрока.
      // Начинать перебор в зависимости от поворота игрока. Затем пройтись полностью по вему массиву врагов рядом
      // Либо не заморачиваться, и просто постройить 360 градусам, и посмотреть а нет ли кого на острие. Вроде более процесозатратно

      // if ( army[this.nearestEnemy] == null || army[this.nearestEnemy].hp < 0) {
      //    this.nearestEnemy = this.getEnemyOnRotateLine()
      // }
      
      // if ( army[this.nearestEnemy] ) {
      //    army[this.nearestEnemy].hp -= rand(1, 30)
      //    if (army[this.nearestEnemy].hp < 0) {
      //       army[this.nearestEnemy] = null
      //       this.nearestEnemy = this.getEnemyOnRotateLine()
      //    }
      //    return true
      // }

      let soldersShoutDist = 150
      
      if (
         !(this.x - soldersShoutDist > armyMatrix.border.right ||
          this.x + soldersShoutDist < armyMatrix.border.left ||
          this.y - soldersShoutDist > armyMatrix.border.bottom ||
          this.y + soldersShoutDist < armyMatrix.border.top
         )
      ) {

         let i = this.x
         let j = this.y


         for (let iteration = soldersShoutDist; iteration >= 0; iteration-=10) {
            i += Math.sin(toRad(this.rotate)) * 10;
            j += Math.cos(toRad(this.rotate)) * 10;

            if ( !armyMatrix[Round10(i)] ) continue;

            if ( armyMatrix[Round10(i)][Round10(j)] ) {
               armyMatrix[Round10(i)][Round10(j)].hp -= 1001
               if ( armyMatrix[Round10(i)][Round10(j)].hp < 0 ) {
                  armyMatrix[Round10(i)][Round10(j)].x = 0
                  armyMatrix[Round10(i)][Round10(j)].alive = false
               }
               break;
            } 
         }

      } else {

      }


   }


   getEnemyOnRotateLine() {

      let nearestEnemy;

      army.forEach((enemy, i) => {

         if ( !enemy ) return
         if (enemy.team != this.team) {

            const x1 = enemy.x
            const y1 = enemy.y
            const x2 = enemy.x
            const y2 = enemy.y + enemy.h

            const x3 = this.x
            const y3 = this.y
            const x4 = this.x + Math.sin(toRad(this.rotate));
            const y4 = this.y
            
            const den = (x1-x2) * (y3-y4) - (y1-y2) * (x3-x4);
            if (den == 0) return;

            const t = ((x1-x3) * (y3-y4) - (y1-y3) * (x3-x4)) / den
            const u = -((x1-x2) * (y1-y3) - (y1-y2) * (x1-x3)) / den
            if ( t >= 0 && t <= 1 && u >= 0 ) {
               nearestEnemy = i
            }
         }
      })

      if ( !nearestEnemy ) nearestEnemy = this.getNearestEnemy()

      return nearestEnemy;
   }


   getNearestEnemy() {
      let distToNearestShip = 99999
      let nearestShip;

      army.forEach((enemy, i) => {
         
         if (!enemy) return
         if (enemy.team != this.team) {
            let dist = getDistBetween2dots( [this.x, this.y], [enemy.x, enemy.y] );
            if (dist < 100000 && dist != 0) {
               if (dist < distToNearestShip) {
                  distToNearestShip = dist;
                  nearestShip = i
               };
            }
         }
      })

      return nearestShip

   }


}

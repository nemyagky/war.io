import {Army} from './Army'

export let troops = [];


export let Troops = new class Troops {

   constructor() {
      let green = new Army()
      green.create({
         team: 'green',
         rotate: 45,
         borders: {
            startX: 0, 
            startY: 0, 
            endX: 30, 
            endY: 200
         }
      })
      troops.push(green)
      
      let red = new Army()
      red.create({
         team: 'red',
         rotate: 270,
         borders: {
            startX: 11, 
            startY: 0, 
            endX: 50, 
            endY: 200
         }
      })
      troops.push(red)
   }

   draw() {
      troops.forEach(army => {
         army.draw()
      })
   }

}

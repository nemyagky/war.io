import {Army} from './Army'

export let troops = [];


export let Troops = new class Troops {

   constructor() {
      let green = new Army()
      green.create({
         team: 'green',
         rotate: 0,
         borders: {
            startX: 300, 
            startY: 0, 
            endX: 1000, 
            endY: 300
         }
      })
      troops.push(green)
      
      let red = new Army()
      red.create({
         team: 'red',
         rotate: 180,
         borders: {
            startX: 300, 
            startY: 300, 
            endX: 1000, 
            endY: 500
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

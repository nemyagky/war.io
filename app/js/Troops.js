import {Army} from './Army'

export let troops = [];


export let Troops = new class Troops {

   constructor() {
      let green = new Army()
      green.create({
         team: 'green',
         rotate: 90,
         borders: {
            startX: 0, 
            startY: 0, 
            endX: 300, 
            endY: 300
         }
      })
      troops.push(green)
      
      let red = new Army()
      red.create({
         team: 'red',
         rotate: 270,
         borders: {
            startX: 500, 
            startY: 0, 
            endX: 800, 
            endY: 300
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

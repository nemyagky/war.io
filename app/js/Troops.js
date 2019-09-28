import { Player } from "./Player"



export let Troops = new class Troops {

   constructor() {

      this.players = []

      let solders = []
      for (let i = 300; i < 350; i+=11) {
         for (let j = 100; j < 200; j+=11) {
            solders.push({x:i, y:j});
         };
      };
      this.players.push(new Player('blue', this.players.length, solders, 90))


      solders = []
      for (let i = 600; i < 650; i+=11) {
         for (let j = 100; j < 200; j+=11) {
            solders.push({x:i, y:j});
         };
      };
      this.players.push(new Player('red', this.players.length, solders, 90))


   }


   draw() {
      this.players.forEach(player => {
         player.divisions.forEach(division => {
            division.draw()
         })
      })
   }

   getAllEnemiesTroops(team) {

      let enemiesTroops = [];


      this.players.forEach(player => {

         if (team != player.team) {

            player.divisions.forEach(division => {
               enemiesTroops.push(division)
            })
         }
      })
      
      return enemiesTroops
   }

}


// window.addEventListener("click", () => {
//    console.log(Troops)
// })

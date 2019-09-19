import { Player } from "./Player"



export let Troops = new class Troops {

   constructor() {

      this.players = []


      //window.addEventListener('click', () => {
         
      let solders = []
      for (let i = 0; i < 200; i+=11) {
         for (let j = 0; j < 500; j+=11) {
            solders.push({x:i, y:j});
         };
      };
      this.players.push(new Player('blue', this.players.length, solders, 90))


      solders = []
      for (let i = 500; i < 700; i+=11) {
         for (let j = 0; j < 500; j+=11) {
            solders.push({x:i, y:j});
         };
      };
      this.players.push(new Player('red', this.players.length, solders, -90))

      //})

      // solders = []
      // for (let i = 211; i < 400; i+=11) {
      //    for (let j = 0; j < 400; j+=11) {
      //       solders.push({x:i, y:j});
      //    };
      // };
      // this.players.push(new Player('green', this.players.length, solders))


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

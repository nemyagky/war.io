import { Division } from "./Player/Division/Division";
import { Player } from "./Player/Player";

export const Init = new class InitSingleton {

   public players: Player[] = [];

   public init() {
      this.createPlayer("blue", 700, 800, 100, 300, true);
      this.createPlayer("red", 400, 500, 100, 300);
   }

   /**
    * TODO Сделать нормальный класс, отвечающий за создание и отрисовку игроков
    */
   public drawPlayers() {

      this.updateBordersForEveryDivision();

      this.players.forEach((player: Player) => {
         // Player use an array of enemiesDivisions
         player.draw(this.getEnemiesDivisionsForPlayer(player.id));
      });
   }

   private createPlayer(color: string, left: number, right: number, top: number, bottom: number, isMain?: boolean) {
      this.players.push(new Player(color, this.players.length, isMain || undefined));

      const solders = [];
      for (let i = left; i < right; i += 11) {
         for (let j = top; j < bottom; j += 11) {
            solders.push({ x: i, y: j });
         }
      }

      solders.forEach((solder: { x: number, y: number }) => {
         this.players[this.players.length - 1].addSolder(solder.x, solder.y);
      });
   }

   private updateBordersForEveryDivision() {
      this.players.forEach((player: Player) => {
         player.divisions.forEach((division: Division) => {
            division.updateBorders();
         });
      });
   }

   // Return all divisions, which player id is different from playerId
   private getEnemiesDivisionsForPlayer(playerId: number): Division[] {
      const enemiesDivisions: Division[] = [];

      this.players.forEach((enemyPlayer: Player) => {
         if (enemyPlayer.id !== playerId) {
            enemyPlayer.divisions.forEach((division: Division) => {
               enemiesDivisions.push(division);
            });
         }
      });

      return enemiesDivisions;
   }

}();

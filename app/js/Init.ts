import { Player } from "./Player/Player";
export const Init = new class InitSingleton {

   public players: Player[] = [];

   public init() {
      this.createPlayer("blue", 100, 300, 100, 300, true);
      // this.createPlayer("red", 400, 600, 100, 300);
   }

   /**
    * TODO Сделать нормальный класс, отвечающий за создание и отрисовку игроков
    */
   public drawPlayers() {
      this.players.forEach((player: Player) => player.drawTroops());
   }

   private createPlayer(color: string, left: number, right: number, top: number, bottom: number, isMain: boolean) {
      this.players.push(new Player(color, isMain));

      const solders = [];
      for (let i = left; i < right; i += 11) {
         for (let j = top; j < bottom; j += 11) {
            solders.push({ x: i, y: j });
         }
      }
      solders.forEach((solder) => this.players[this.players.length - 1].addSolder(solder.x, solder.y));
   }

}();

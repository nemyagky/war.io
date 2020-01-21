import { TroopsServerState } from "../../interfaces/server/TroopsServerState.interface";
import { PlayerServerState } from "./../../interfaces/server/PlayerServerState.interface";
import { EstimatedDivision } from "./Players/Division/EstimatedDivision";
import { MainPlayer } from "./Players/MainPlayer";
import { Player } from "./Players/Player";

export const Troops = new class TroopsSingleton {

   private mainPlayerId: string;
   private players: Player[] = [];

   public draw() {
      this.players.forEach((player: Player) => {
         player.draw();
      });

      if (EstimatedDivision.isExist()) { EstimatedDivision.draw(); }
   }

   public updateState(troops: TroopsServerState) {
      troops.players.forEach((statePlayer: PlayerServerState) => {
         const currentRealPlayer = this.getPlayerById(statePlayer.id);

         if (currentRealPlayer) {
            currentRealPlayer.updateState(statePlayer.divisions);
         } else {
            if (this.mainPlayerId === statePlayer.id) { return; }
            this.players.push(new Player(statePlayer.id, statePlayer.team, statePlayer.divisions));
         }
      });

      // Удаляем игроков, которые вышли
      this.players = this.players.filter((realPlayer: Player) => {
         return troops.players.find((serverPlayer: PlayerServerState) => {
            return realPlayer.id === serverPlayer.id;
         });
      });
   }

   public createMainPlayer(mainPlayerId: string, mainPlayerTeam: string) {
      this.mainPlayerId = mainPlayerId;

      this.players.push(new MainPlayer(mainPlayerId, mainPlayerTeam));
   }

   private getPlayerById(playerId: string) {
      return this.players.find((player) => {
         return player.id === playerId;
      });
   }

}();

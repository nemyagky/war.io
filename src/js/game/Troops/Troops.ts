import { Borders } from "../../interfaces/Borders.interface";
import { Socket } from "./../Shared/Websocket";
import { Division } from "./Players/Division/Division";
import { EstimatedDivision } from "./Players/Division/EstimatedDivision";
import { EnemyPlayer } from "./Players/EnemyPlayer";
import { MainPlayer } from "./Players/MainPlayer";
import { PlayerProto } from "./Players/PlayerProto";

export const Troops = new class TroopsSingleton {

   private players: PlayerProto[] = [];

   constructor() {
      this.createMainPlayer();
      this.getEnemiesPlayers();
   }

   public draw() {
      this.players.forEach((player: PlayerProto) => {
         player.draw(this.getEnemiesDivisionsForPlayer(player.id));
      });

      if (EstimatedDivision.isExist()) { EstimatedDivision.draw(); }
   }

   private createMainPlayer() {
      this.createPlayer(
         { top: 100, left: 100, right: 300, bottom: 300 },
         { color: "blue", isMain: true }
      );
   }

   private getEnemiesPlayers() {
      Socket.on("newPlayer", () => {
         console.log(1);
      });
   }

   private createPlayer(borders: Borders, settings: { color: string, isMain: boolean }) {
      if (settings.isMain) {
         this.players.push(new MainPlayer({ team: "blue", id: this.players.length - 1 }));
      } else {
         this.players.push(new EnemyPlayer({ team: "red", id: this.players.length - 1 }));
      }

      for (let x = borders.left; x < borders.right; x += 11) {
         for (let y = borders.top; y < borders.bottom; y += 11) {
            this.players[this.players.length - 1].addSolder(x, y);
         }
      }
   }

   // Return all divisions, which player id is different from playerId
   private getEnemiesDivisionsForPlayer(playerId: number): Division[] {
      const enemiesDivisions: Division[] = [];

      this.players.forEach((player) => {
         if (player.id !== playerId) {
            player.divisions.forEach((division: Division) => {
               enemiesDivisions.push(division);
            });
         }
      });

      return enemiesDivisions;
   }

}();

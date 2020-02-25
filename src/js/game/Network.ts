import { ServerState } from "../interfaces/server/ServerState";
import { InitialPlayer } from "./../interfaces/server/InitialPlayer.interface";
import { Socket } from "./Shared/Socket";
import { Troops } from "./Troops/Troops";

export const Network = new class NetworkSingleton {

   public init() {

      // Во время загрузки страницы получаем список уже созданных игроков и добавляем их в Troops
      // TODO доработать функцию
      Socket.on("setInitialState", (players: InitialPlayer[]) => {
         Troops.setPlayersAtPageLoad(players);
      });

      Socket.on("updateState", (state: ServerState) => {
         Troops.updateState(state.troops);
      });

      Socket.on("createMainPlayer", (player: InitialPlayer) => {
         Troops.createMainPlayer(player.id, player.team);
      });

      Socket.on("createPlayer", (player: InitialPlayer) => {
         Troops.createPlayer(player.id, player.team);
      });

      Socket.on("deletePlayer", (data: { id: string }) => {
         Troops.deletePlayer(data.id);
      });

   }

}();

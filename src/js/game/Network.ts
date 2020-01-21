import { ServerState } from "../interfaces/server/ServerState";
import { Socket } from "./Shared/Socket";
import { Troops } from "./Troops/Troops";

export const Network = new class NetworkSingleton {

   public init() {

      Socket.on("mainPlayerData", (data: { id: string, team: string }) => {
         Troops.createMainPlayer(data.id, data.team);
      });

      Socket.on("newState", (state: ServerState) => {
         Troops.updateState(state.troops);
      });
   }

}();

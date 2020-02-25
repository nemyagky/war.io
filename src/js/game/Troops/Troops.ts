import { TroopsServerState } from "../../interfaces/server/TroopsServerState.interface";
import { InitialPlayer } from "./../../interfaces/server/InitialPlayer.interface";
import { EstimatedDivision } from "./Players/Division/EstimatedDivision";
import { MainPlayer } from "./Players/MainPlayer";
import { Player } from "./Players/Player";

export const Troops = new (class TroopsSingleton {
  private players: Player[] = [];

  public draw() {
    this.players.forEach((player: Player) => {
      player.draw();
    });

    if (EstimatedDivision.isExist()) {
      EstimatedDivision.draw();
    }
  }

  public updateState(troops: TroopsServerState) {
    this.players.forEach(player => {
      const similarServerPlayer = troops.players.find(
        serverPlayer => player.id === serverPlayer.id
      );

      player.updateState(similarServerPlayer.divisions);
    });
  }

  // Вызывается при открытии страницы. Просто создает массив игроков, их state будет заполнен позже, при updateState
  public setPlayersAtPageLoad(players: InitialPlayer[]) {
    players.forEach(serverPlayer => {
      this.players.push(new Player(serverPlayer.id, serverPlayer.team));
    });
  }

  public createMainPlayer(mainPlayerId: string, mainPlayerTeam: string) {
    this.players.push(new MainPlayer(mainPlayerId, mainPlayerTeam));
  }

  public createPlayer(playerId: string, playerTeam: string) {
    this.players.push(new Player(playerId, playerTeam));
  }

  public deletePlayer(playerId: string) {
    this.players = this.players.filter(player => player.id !== playerId);
  }

  public getMainPlayer(): any {
    return this.players[0];
  }
})();

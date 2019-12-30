import { PlayerProto } from "./PlayerProto";

export class EnemyPlayer extends PlayerProto {

   constructor(settings: { team: string, id: number }) {
      super(settings);
   }

}

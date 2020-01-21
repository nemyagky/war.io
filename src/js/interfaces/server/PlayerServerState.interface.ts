import { DivisionServerState } from "./DivisionServerState.interface";

export interface PlayerServerState {
   id: string;
   team: string;
   divisions: DivisionServerState[];
}

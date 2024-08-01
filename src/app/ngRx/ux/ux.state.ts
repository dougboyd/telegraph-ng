import { AppState } from "../core.state";
import { Visualisation } from "../models/visualisation";
// import { Customer } from "../models/customer.model";

export interface UxState {
  navVisible: boolean;
  mainContentHeight: number;
  mainContentWidth: number;
  visualisations: Visualisation[];
  activeVisualisation: string;
}

export interface State extends AppState {
  ux: UxState;
}

/*
export const initialCounterState: CounterListState = {
  list: [{ userName: 'Ravi', userId: 1 } as Item],
};
*/

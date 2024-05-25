import { AppState } from "../core.state";
import { Item } from "../models/item.model";

export interface CounterListState {
  list: Array<Item>;
}

export interface State extends AppState {
  counterList: CounterListState;
}

/*
export const initialCounterState: CounterListState = {
  list: [{ userName: 'Ravi', userId: 1 } as Item],
};
*/

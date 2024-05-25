import { AppState } from "../core.state";
// import { Customer } from "../models/customer.model";

export interface UxState {
  navVisible: boolean;
}

export interface State extends AppState {
  ux: UxState;
}

/*
export const initialCounterState: CounterListState = {
  list: [{ userName: 'Ravi', userId: 1 } as Item],
};
*/

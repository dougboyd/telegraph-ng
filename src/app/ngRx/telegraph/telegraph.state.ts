import { AppState } from "../core.state";
import { Person } from "../models/person.model";
// import { Customer } from "../models/customer.model";

export interface TelegraphState {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  persons: Person[];
}

export interface State extends AppState {
  telegraph: TelegraphState;
}

/*
export const initialCounterState: CounterListState = {
  list: [{ userName: 'Ravi', userId: 1 } as Item],
};
*/

import { AppState } from "../core.state";
import { Customer } from "../models/customer.model";

export interface CustomerState {
  customers: Customer[];
  error: boolean;
  loading: boolean;
  total: number;
}

export interface State extends AppState {
  customer: CustomerState;
}

/*
export const initialCounterState: CounterListState = {
  list: [{ userName: 'Ravi', userId: 1 } as Item],
};
*/

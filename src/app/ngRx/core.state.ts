import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import { counterListReducer } from "./counterList/counterList.reducer";
import { CounterListState } from "./counterList/counterList.state";

import { CustomerState } from "./customer/customer.state";
import { customerReducer } from "./customer/customer.reducers";

import { UxState } from "./ux/ux.state";
import { uxReducer } from "./ux/ux.reducers";

import { TelegraphState } from "./telegraph/telegraph.state";
import { telegraphReducer } from "./telegraph/telegraph.reducers";

export const reducers: ActionReducerMap<AppState> = {
  counterList: counterListReducer,
  customer: customerReducer,
  ux: uxReducer,
  telegraph: telegraphReducer,
};

export const selectCounterListState =
  createFeatureSelector<CounterListState>("counterList");
export const selectCustomerState =
  createFeatureSelector<CustomerState>("customer");
export const selectUxState = createFeatureSelector<UxState>("ux");
export const selectTelegraphState =
  createFeatureSelector<TelegraphState>("telegraph");

export interface AppState {
  counterList: CounterListState;
  customer: CustomerState;
  ux: UxState;
  telegraph: TelegraphState;
}

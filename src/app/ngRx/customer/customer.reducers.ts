import {
  loadingCustomers,
  loadCustomersSuccess,
  loadCustomersFailure,
} from "./customer.actions";
import { createReducer, on } from "@ngrx/store";
import { CustomerState } from "./customer.state";

export const thisMightWorkState = 0;

export const initialState: CustomerState = {
  customers: [],
  error: false,
  loading: false,
  total: 0,
};

export const customerReducer = createReducer(
  initialState,
  /*
  on(loadingCustomers, (state, result) => { return {  ...state, loading: true }},
  on(loadCustomersSuccess, (state) => ({
    ...state,
    customers: response.customers,
    loading: true,
  })),
*/
  on(loadingCustomers, (state, result) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(loadCustomersSuccess, (state, result) => {
    console.log("in success");
    console.log(result.response.total);
    return {
      ...state,
      customers: result.response.customers,
      total: result.response.total,
      loading: false,
      error: false,
    };
  }),

  on(loadCustomersFailure, (state, result) => {
    return {
      ...state,
      customers: [],
      total: 0,
      error: true,
      loading: false,
    };
  })
);

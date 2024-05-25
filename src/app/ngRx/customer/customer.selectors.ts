import { createSelector } from "@ngrx/store";
import { AppState } from "../core.state";

export const selectCustomerState = (state: AppState) => state.customer;

export const selectCustomerTotal = createSelector(
  selectCustomerState,
  (state) => state.total
);
export const selectCustomerError = createSelector(
  selectCustomerState,
  (state) => state.error
);
export const selectCustomerLoading = createSelector(
  selectCustomerState,
  (state) => state.loading
);
export const selectAllCustomer = createSelector(
  selectCustomerState,
  (state) => state.customers
);

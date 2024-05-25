import { createSelector } from "@ngrx/store";
import { AppState } from "../core.state";

export const selectCounterState = (state: AppState) => state.counterList;

export const selectCountList = createSelector(
  selectCounterState,
  (state) => state.list
);

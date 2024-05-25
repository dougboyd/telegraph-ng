import { createSelector } from "@ngrx/store";
import { AppState } from "../core.state";

export const selectUxState = (state: AppState) => state.ux;

export const selectNavVisible = createSelector(
  selectUxState,
  (state) => state.navVisible
);

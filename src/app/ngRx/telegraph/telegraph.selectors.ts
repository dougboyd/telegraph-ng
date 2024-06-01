import { createSelector } from "@ngrx/store";
import { AppState } from "../core.state";

export const selectTelegraphState = (state: AppState) => state.telegraph;

export const selectLoading = createSelector(
  selectTelegraphState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectTelegraphState,
  (state) => state.error
);

export const selectErrorMessage = createSelector(
  selectTelegraphState,
  (state) => state.errorMessage
);

export const selectPersons = createSelector(
  selectTelegraphState,
  (state) => state.persons
);

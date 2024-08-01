import { createSelector } from "@ngrx/store";
import { AppState } from "../core.state";

export const selectUxState = (state: AppState) => state.ux;

export const selectNavVisible = createSelector(
  selectUxState,
  (state) => state.navVisible
);

export const selectMainContentWidth = createSelector(
  selectUxState,
  (state) => state.mainContentWidth
);

export const selectMainContentHeight = createSelector(
  selectUxState,
  (state) => state.mainContentHeight
);

export const selectVisualisations = createSelector(
  selectUxState,
  (state) => state.visualisations
);

export const selectActiveVisualisation = createSelector(
  selectUxState,
  (state) => state.activeVisualisation
);

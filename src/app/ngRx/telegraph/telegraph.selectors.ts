import { createSelector } from '@ngrx/store';
import { AppState } from '../core.state';

export const selectTelegraphState = (state: AppState) => state.telegraph;

/*
export const selectRelationshipMapData = createSelector(
  selectTelegraphState,
  (state) => state.relationshipMapData
);

export const selectTestD3Data = createSelector(
  selectTelegraphState,
  (state) => state.testD3Data
);
*/

export const selectLoadingSpriteVisible = createSelector(
  selectTelegraphState,
  (state) => state.loadingSpriteVisible
);

/*
export const selectError = createSelector(
  selectTelegraphState,
  (state) => state.error
);

export const selectErrorMessage = createSelector(
  selectTelegraphState,
  (state) => state.errorMessage
);

export const selectPersonsForSelect = createSelector(
  selectTelegraphState,
  (state) => state.personsForSelect
);

export const selectOpportunitiesForSelect = createSelector(
  selectTelegraphState,
  (state) => state.opportunitiesForSelect
);

export const selectRelationshipTypesForSelect = createSelector(
  selectTelegraphState,
  (state) => state.relationshipTypesForSelect
);

export const selectReloadOpportunitiesAndPersons = createSelector(
  selectTelegraphState,
  (state) => state.reloadOpportunitiesAndPersons
);

export const selectIsAuthenticated = createSelector(
  selectTelegraphState,
  (state) => state.isAuthenticated
);
*/

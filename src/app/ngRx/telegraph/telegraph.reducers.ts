import { createReducer, on } from "@ngrx/store";
import { TelegraphState } from "./telegraph.state";
import {
  createOpportunity,
  createOpportunityFailure,
  createOpportunitySuccess,
  createPerson,
  createPersonFailure,
  createPersonSuccess,
  loadPersons,
  loadPersonsFailure,
  loadPersonsSuccess,
} from "./telegraph.actions";

export const initialState: TelegraphState = {
  loading: false,
  error: false,
  errorMessage: "No Error HERE!",
  persons: [],
};

export const telegraphReducer = createReducer(
  initialState,

  // export const createOpportunity = createAction(
  // export const createOpportunitySuccess = createAction(
  // export const createOpportunityFailure = createAction(

  //
  on(loadPersons, (state) => {
    return {
      ...state,
      loading: true,
      error: false,
      errorMessage: "",
    };
  }),

  //
  on(loadPersonsSuccess, (state, response) => {
    return {
      ...state,
      persons: response.persons,
      loading: false,
      error: false,
      errorMessage: "",
    };
  }),

  //
  on(loadPersonsFailure, (state, response) => {
    return {
      ...state,
      persons: [],
      loading: false,
      error: true,
      errorMessage: response.errorMessage,
    };
  }),

  //
  on(createOpportunity, (state, opportunity) => {
    return {
      ...state,
      loading: true,
      error: false,
      errorMessage: "",
    };
  }),
  //
  on(createOpportunitySuccess, (state, opportunity) => {
    return {
      ...state,
      loading: false,
      error: false,
      errorMessage: "",
    };
  }),
  //
  on(createOpportunityFailure, (state, response) => {
    return {
      ...state,
      loading: false,
      error: true,
      errorMessage: response.errorMessage,
    };
  }),

  //
  on(createPerson, (state, person) => {
    return {
      ...state,
      loading: true,
      error: false,
      errorMessage: "",
    };
  }),
  //
  on(createPersonSuccess, (state, person) => {
    return {
      ...state,
      loading: false,
      error: false,
      errorMessage: "",
    };
  }),
  //
  on(createPersonFailure, (state, response) => {
    return {
      ...state,
      loading: false,
      error: true,
      errorMessage: response.errorMessage,
    };
  })
);

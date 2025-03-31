import { createReducer, on } from '@ngrx/store';
import { TelegraphState } from './telegraph.state';
import {
  createPerson,
  createPersonFailure,
  createPersonSuccess,
} from './telegraph.actions';
// import { Person } from "../models/person.model";
// import { Opportunity } from "../models/opportunity.model";

export const initialState: TelegraphState = {
  // isAuthenticated: false,
  // relationshipMapData: {},
  // testD3Data: {},
  loadingSpriteVisible: false,
  // error: false,
  // errorMessage: "No Error HERE!",
  // personsForSelect: [],
  // opportunitiesForSelect: [],
  // standingData: {},
  // relationshipTypesForSelect: [],
  // reloadOpportunitiesAndPersons: false,
};

export const telegraphReducer = createReducer(
  initialState,

  //
  on(createPerson, (state, person) => {
    return {
      ...state,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  //
  on(createPersonSuccess, (state, person) => {
    return {
      ...state,
      loading: false,
      error: false,
      errorMessage: '',
      reloadOpportunitiesAndPersons: true,
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

  /*
  //
  on(getStandingData, (state) => {
    return {
      ...state,
      standingData: {},
      loading: true,
      error: false,
      errorMessage: "",
    };
  }),

  //
  on(getStandingDataSuccess, (state, data) => {
    return {
      ...state,
      standingData: data.data.standingData,
      relationshipTypesForSelect: data.data.standingData,
      loading: false,
      error: false,
      errorMessage: "",
    };
  }),

  //
  on(getStandingDataFailure, (state, response) => {
    return {
      ...state,
      standingData: {},
      loading: false,
      error: false,
      errorMessage: response.errorMessage,
    };
  }),

  //
  on(getAllNodes, (state) => {
    return {
      ...state,
      personsForSelect: [],
      opportunitiesForSelect: [],
      loading: true,
      error: false,
      errorMessage: "",
    };
  }),

  //
  on(getAllNodesSuccess, (state, data) => {
    return {
      ...state,
      personsForSelect: data.data.nodes.filter((obj) => obj.label === "Person"),
      opportunitiesForSelect: data.data.nodes.filter(
        (obj) => obj.label === "Opportunity"
      ),
      loading: false,
      error: false,
      errorMessage: "",
      reloadOpportunitiesAndPersons: false,
    };
  }),

  //
  on(getAllNodesFailure, (state, response) => {
    return {
      ...state,
      personsForSelect: [],
      opportunitiesForSelect: [],
      loading: false,
      error: false,
      errorMessage: response.errorMessage,
    };
  }),

  //
  on(postRelationshipMapData, (state) => {
    return {
      ...state,
      relationshipMapData: {},
      loading: true,
      error: false,
      errorMessage: "",
    };
  }),

  //
  on(postRelationshipMapDataSuccess, (state, data) => {
    return {
      ...state,
      relationshipMapData: data.data,
      loading: false,
      error: false,
      errorMessage: "",
      reloadOpportunitiesAndPersons: false,
    };
  }),

  //
  on(postRelationshipMapDataFailure, (state, response) => {
    return {
      ...state,
      relationshipMapData: null,
      loading: false,
      error: false,
      errorMessage: response.errorMessage,
    };
  }),

  //
  on(setTestD3Data, (state) => {
    return {
      ...state,
      testD3Data: {},
      loading: true,
      error: false,
      errorMessage: "",
    };
  }),

  //
  on(setTestD3DataSuccess, (state, data) => {
    return {
      ...state,
      testD3Data: data.data,
      loading: false,
      error: false,
      errorMessage: "",
    };
  }),

  //
  on(setTestD3DataFailure, (state, response) => {
    return {
      ...state,
      testD3Data: null,
      loading: false,
      error: false,
      errorMessage: response.errorMessage,
    };
  }),

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
      reloadOpportunitiesAndPersons: true,
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
  on(createRelationship, (state, person) => {
    return {
      ...state,
      loading: true,
      error: false,
      errorMessage: "",
    };
  }),
  //
  on(createRelationshipSuccess, (state, person) => {
    return {
      ...state,
      loading: false,
      error: false,
      errorMessage: "",
      reloadOpportunitiesAndPersons: true,
    };
  }),
  //
  on(createRelationshipFailure, (state, response) => {
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
  */
);

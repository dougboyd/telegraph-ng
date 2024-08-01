import { createAction, props } from "@ngrx/store";
// imporimport { createAction, props } from '@ngrx/store';
// import { CustomerParams } from "../models/customer-params";
// import { CustomerResponse } from "../models/customer-response";
import { Opportunity } from "../models/opportunity.model";
import { Person } from "../models/person.model";

// export const toggleNavBar = createAction("[UX] Toggle Nav Bar");

// Get the standing data
export const getStandingData = createAction("[TELEGRAPH] Get Standing Data");

export const getStandingDataSuccess = createAction(
  "[TELEGRAPH] Get Standing Data Success",
  props<{ data: any }>()
);

export const getStandingDataFailure = createAction(
  "[TELEGRAPH] Get Standing Data Failure",
  props<{ errorMessage: string }>()
);

export const getAllNodes = createAction("[TELEGRAPH] Get All Nodes");

export const getAllNodesSuccess = createAction(
  "[TELEGRAPH] Get All Nodes Success",
  props<{ data: any }>()
);

export const getAllNodesFailure = createAction(
  "[TELEGRAPH] Get All Nodes Failure",
  props<{ errorMessage: string }>()
);

export const postRelationshipMapData = createAction(
  "[TELEGRAPH] Post Relationship Map Data",
  props<{ filter: any }>()
);

export const postRelationshipMapDataSuccess = createAction(
  "[TELEGRAPH] Post Relationship Map Data Success",
  props<{ data: any }>()
);

export const postRelationshipMapDataFailure = createAction(
  "[TELEGRAPH] Post Relationship Map Data Failure",
  props<{ errorMessage: string }>()
);

export const setTestD3Data = createAction(
  "[TELEGRAPH] Set Test D3 Data",
  props<{ filter: any }>()
);

export const setTestD3DataSuccess = createAction(
  "[TELEGRAPH] Set Test D3 Data Success",
  props<{ data: any }>()
);

export const setTestD3DataFailure = createAction(
  "[TELEGRAPH] Set Test D3 Data Failure",
  props<{ errorMessage: string }>()
);

export const createOpportunity = createAction(
  "[TELEGRAPH] Create Opportunity",
  props<{ opportunity: Opportunity }>()
);

export const createOpportunitySuccess = createAction(
  "[TELEGRAPH] Create Opportunity Success",
  props<{ message: string }>()
);

export const createOpportunityFailure = createAction(
  "[TELEGRAPH] Create Opportunity Failure",
  props<{ errorMessage: string }>()
);

export const createRelationship = createAction(
  "[TELEGRAPH] Create Relationship",
  props<{ formData: any }>()
);

export const createRelationshipSuccess = createAction(
  "[TELEGRAPH] Create Relationship Success",
  props<{ message: string }>()
);

export const createRelationshipFailure = createAction(
  "[TELEGRAPH] Create Relationship Failure",
  props<{ errorMessage: string }>()
);

export const createPerson = createAction(
  "[TELEGRAPH] Create Person",
  props<{ person: Person }>()
);

export const createPersonSuccess = createAction(
  "[TELEGRAPH] Create Person Success",
  props<{ message: string }>()
);

export const createPersonFailure = createAction(
  "[TELEGRAPH] Create Person Failure",
  props<{ errorMessage: string }>()
);

export const loadPersons = createAction("[TELEGRAPH] Load Persons");

export const loadPersonsSuccess = createAction(
  "[TELEGRAPH] Load Persons Success",
  props<{ persons: Person[] }>()
);

export const loadPersonsFailure = createAction(
  "[TELEGRAPH] Load Persons Failure",
  props<{ errorMessage: string }>()
);

export const setIsAuthenticated = createAction(
  "[TELEGRAPH] Set Is Authenticated",
  props<{ isAuthenticated: boolean }>()
);

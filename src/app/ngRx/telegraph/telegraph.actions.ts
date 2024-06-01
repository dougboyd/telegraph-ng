import { createAction, props } from "@ngrx/store";
// imporimport { createAction, props } from '@ngrx/store';
// import { CustomerParams } from "../models/customer-params";
// import { CustomerResponse } from "../models/customer-response";
import { Opportunity } from "../models/opportunity.model";
import { Person } from "../models/person.model";

// export const toggleNavBar = createAction("[UX] Toggle Nav Bar");

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

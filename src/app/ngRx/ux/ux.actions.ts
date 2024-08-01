import { createAction, props } from "@ngrx/store";
// imporimport { createAction, props } from '@ngrx/store';
import { CustomerParams } from "../models/customer-params";
import { CustomerResponse } from "../models/customer-response";
import { Visualisation } from "../models/visualisation";

export const toggleNavBar = createAction("[UX] Toggle Nav Bar");

export const setMainContentDimensions = createAction(
  "[UX] Set Main Content Dimensions",
  props<{ height: number; width: number }>()
);

export const setActiveVisualisation = createAction(
  "[UX] Set Active Visualisation",
  props<{ visualisationName: string }>()
);

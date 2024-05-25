import { createAction, props } from "@ngrx/store";
// imporimport { createAction, props } from '@ngrx/store';
import { CustomerParams } from "../models/customer-params";
import { CustomerResponse } from "../models/customer-response";

export const loadingCustomers = createAction(
  "[CUSTOMER] Loading",
  props<{ params: CustomerParams }>()
);

export const loadCustomersSuccess = createAction(
  "[CUSTOMER] Loaded Success",
  props<{ response: CustomerResponse }>()
);

export const loadCustomersFailure = createAction(
  "[CUSTOMER] Loaded Failure",
  props<{ error: any }>()
);

/*
export const changeName = createAction(
  "[CounterList Component] ChangeName",
  props<{ newName: string }>()
);

export const addItem = createAction(
  "[CounterList Component] AddItem",
  props<{ item: Item }>()
);
export const removeItem = createAction(
  "[CounterList Component] RemoveItem",
  props<{ userId: number }>()
);
export const resetItem = createAction("[CounterList Component] ResetItem");
*/

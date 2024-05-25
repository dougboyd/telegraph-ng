import { createAction, props } from "@ngrx/store";
import { Item } from "../models/item.model";
// import { Item } from "../models/Item.model";

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

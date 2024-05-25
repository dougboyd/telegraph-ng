import {
  changeName,
  addItem,
  removeItem,
  resetItem,
} from "./counterList.actions";
import { createReducer, on } from "@ngrx/store";
import { CounterListState } from "./counterList.state";
import { Item } from "../models/item.model";

export const thisMightWorkState = 0;

export const initialState: CounterListState = {
  list: [{ userName: "Ravi", userId: 1 } as Item],
};

export const counterListReducer = createReducer(
  initialState,

  on(addItem, (state, { item }) => {
    const list = [...state.list, item];
    return { ...state, list };
  }),

  on(changeName, (state, { newName }) => {
    console.log("this is in change name");
    const newState: CounterListState = {
      list: [{ userName: "Doug", userId: 1 } as Item],
    };
    return newState;
  }),

  on(removeItem, (state, { userId }) => {
    const list = state.list.filter((item) => item.userId !== userId);
    return { ...state, list };
  }),

  on(resetItem, (state) => ({ ...state, list: [] }))
);

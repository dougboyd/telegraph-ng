import {
  setActiveVisualisation,
  setMainContentDimensions,
  toggleNavBar,
} from "./ux.actions";
import { createReducer, on } from "@ngrx/store";
import { UxState } from "./ux.state";

export const initialState: UxState = {
  navVisible: true,
  mainContentHeight: 10,
  mainContentWidth: 10,
  //
  visualisations: [
    { name: "relationshipMap" },
    { name: "roundView" },
    { name: "forceGraphExample" },
  ],
  activeVisualisation: "relationshipMap",
};

export const uxReducer = createReducer(
  initialState,

  // Toggle the nav bar as visible or not
  on(toggleNavBar, (state) => {
    let navToggle: boolean = false;
    if (state.navVisible) {
      navToggle = false;
    } else {
      navToggle = true;
    }
    return {
      ...state,
      navVisible: navToggle,
    };
  }),

  // Store the main content height and width
  on(setMainContentDimensions, (state, response) => {
    return {
      ...state,
      mainContentHeight: response.height,
      mainContentWidth: response.width,
    };
  }),

  // set the active visualisation
  on(setActiveVisualisation, (state, response) => {
    return {
      ...state,
      activeVisualisation: response.visualisationName,
    };
  })
);

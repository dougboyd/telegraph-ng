import { toggleNavBar } from './ux.actions';
import { createReducer, on } from '@ngrx/store';
import { UxState } from './ux.state';

export const initialState: UxState = {
  navVisible: true,
  //
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
  })
);

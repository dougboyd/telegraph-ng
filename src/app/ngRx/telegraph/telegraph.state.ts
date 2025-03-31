import { AppState } from '../core.state';
// import { Opportunity } from "../models/opportunity.model";
// import { Person } from "../models/person.model";
// import { RelationshipType } from "../models/relationship-type.model";
// import { Customer } from "../models/customer.model";

export interface TelegraphState {
  loadingSpriteVisible: boolean;
  // isAuthenticated: boolean;
  // reloadOpportunitiesAndPersons: boolean;
  // relationshipMapData: any;
  // testD3Data: any;
  // error: boolean;
  // errorMessage: string;
  // personsForSelect: Person[];
  // opportunitiesForSelect: Opportunity[];
  // standingData: any;
  // relationshipTypesForSelect: RelationshipType[];
}

export interface State extends AppState {
  telegraph: TelegraphState;
}

/*
export const initialCounterState: CounterListState = {
  list: [{ userName: 'Ravi', userId: 1 } as Item],
};
*/

import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { switchMap, map, catchError, of, Observable } from "rxjs";
import { TelegraphService } from "./telegraph.service";
import * as telegraphActions from "./telegraph.actions";
import { Opportunity } from "../models/opportunity.model";
import { Person } from "../models/person.model";

@Injectable()
export class TelegraphEffects {
  constructor(private actions$: Actions, private service: TelegraphService) {}

  // Create a person
  public loadPersons = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(telegraphActions.loadPersons),
        switchMap(() => {
          return this.service.loadPersons().pipe(
            map((response: Person[]) =>
              telegraphActions.loadPersonsSuccess({
                persons: response,
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                telegraphActions.loadPersonsFailure({
                  errorMessage: error.message,
                })
              )
            )
          );
        })
      )
  );

  // Create a person
  public createPerson = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(telegraphActions.createPerson),
        switchMap((payload: { person: Person }) => {
          return this.service.createPerson(payload.person).pipe(
            map((response: Person) =>
              telegraphActions.createPersonSuccess({
                message: "Completed",
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                telegraphActions.createPersonFailure({
                  errorMessage: error.message,
                })
              )
            )
          );
        })
      )
  );

  // Create an opportunity
  public createOpportunity = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(telegraphActions.createOpportunity),
        switchMap((payload: { opportunity: Opportunity }) => {
          return this.service.createOpportunity(payload.opportunity).pipe(
            map((response: Opportunity) =>
              telegraphActions.createOpportunitySuccess({
                message: "Completed",
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                telegraphActions.createOpportunityFailure({
                  errorMessage: error.message,
                })
              )
            )
          );
        })
      )
  );
}

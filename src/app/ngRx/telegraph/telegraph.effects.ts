import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { switchMap, map, catchError, of, Observable } from "rxjs";
import { TelegraphService } from "./telegraph.service";
import * as telegraphActions from "./telegraph.actions";
// import { Opportunity } from "../models/opportunity.model";
import { Person } from "../models/person.model";
import { Login } from "../models/login.model";

@Injectable()
export class TelegraphEffects {
  constructor(private actions$: Actions, private service: TelegraphService) {}

  // Log in a user - this is the authenticate
  public login = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(telegraphActions.login),
        switchMap((payload: { login: Login }) => {
          return this.service.login(payload.login).pipe(
            map((response: Login) =>
              telegraphActions.loginSuccess({
                message: "Completed",
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                telegraphActions.loginFailure({
                  errorMessage: error.message,
                })
              )
            )
          );
        })
      )
  );

  /*
  // Get standing data
  public getStandingData = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(telegraphActions.getStandingData),
        switchMap(() => {
          return this.service.getStandingData().pipe(
            map((response: any) =>
              telegraphActions.getStandingDataSuccess({
                data: response,
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                telegraphActions.getStandingDataFailure({
                  errorMessage: error.message,
                })
              )
            )
          );
        })
      )
  );

  // Get all nodes
  public getAllNodes = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(telegraphActions.getAllNodes),
        switchMap(() => {
          return this.service.getAllNodes().pipe(
            map((response: any) =>
              telegraphActions.getAllNodesSuccess({
                data: response,
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                telegraphActions.getAllNodesFailure({
                  errorMessage: error.message,
                })
              )
            )
          );
        })
      )
  );

  // Get relationship map data
  public postRelationshipMapData = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        // ofType(telegraphActions.createPerson),
        // switchMap((payload: { person: Person }) => {
        // return this.service.createPerson(payload.person).pipe(

        ofType(telegraphActions.postRelationshipMapData),
        switchMap((filter: any) => {
          return this.service.postRelationshipMapData(filter).pipe(
            map((response: any) =>
              telegraphActions.postRelationshipMapDataSuccess({
                data: response,
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                telegraphActions.postRelationshipMapDataFailure({
                  errorMessage: error.message,
                })
              )
            )
          );
        })
      )
  );

  // Create test data
  public setTestD3Data = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(telegraphActions.setTestD3Data),
        switchMap(() => {
          return this.service.loadTestD3Data().pipe(
            map((response: any) =>
              telegraphActions.setTestD3DataSuccess({
                data: response,
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                telegraphActions.setTestD3DataFailure({
                  errorMessage: error.message,
                })
              )
            )
          );
        })
      )
  );

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
  public createRelationship = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(telegraphActions.createRelationship),
        switchMap((payload: { formData: any }) => {
          return this.service.createRelationship(payload.formData).pipe(
            map((response: any) =>
              telegraphActions.createRelationshipSuccess({
                message: "Completed",
              })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                telegraphActions.createRelationshipFailure({
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
  */
}

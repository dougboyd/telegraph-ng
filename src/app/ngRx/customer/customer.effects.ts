import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { switchMap, map, catchError, of, Observable } from "rxjs";
import { CustomerParams } from "../models/customer-params";
import { CustomerResponse } from "../models/customer-response";
import { CustomerService } from "./customer.service";
// import {
// loadCustomersFailure,
// loadCustomersSuccess,
// loadingCustomers,
// } from '../actions/customer.actions';
import * as customerActions from "./customer.actions";

@Injectable()
export class CustomerEffects {
  constructor(private actions$: Actions, private service: CustomerService) {}

  public loadingCustomers = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(customerActions.loadingCustomers),
        switchMap((payload: { params: CustomerParams }) => {
          console.log("in effect");
          console.log("in effect");
          console.log("in effect");
          console.log("in effect");
          console.log("in effect");
          return this.service.getCustomers(payload.params).pipe(
            map((response: CustomerResponse) =>
              customerActions.loadCustomersSuccess({ response })
            ),
            catchError((error: HttpErrorResponse) =>
              of(customerActions.loadCustomersFailure({ error }))
            )
          );
        })
      )
  );
}
/*
 */

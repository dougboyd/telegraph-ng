import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { switchMap, map, catchError, of, Observable } from "rxjs";
import { UxService } from "./ux.service";
import * as uxActions from "./ux.actions";

@Injectable()
export class UxEffects {
  // constructor(private actions$: Actions, private service: UxService) {}
  /*
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
  */
}

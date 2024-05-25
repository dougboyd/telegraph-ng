import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { StoreModule, provideState, provideStore } from "@ngrx/store";
import { counterListReducer } from "./ngRx/counterList/counterList.reducer";
import { provideEffects } from "@ngrx/effects";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { CustomerEffects } from "./ngRx/customer/customer.effects";
import { customerReducer } from "./ngRx/customer/customer.reducers";
import { CustomerService } from "./ngRx/customer/customer.service";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { uxReducer } from "./ngRx/ux/ux.reducers";
import { UxEffects } from "./ngRx/ux/ux.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideState({ name: "counterList", reducer: counterListReducer }),
    provideState({ name: "customer", reducer: customerReducer }),
    provideState({ name: "ux", reducer: uxReducer }),
    provideEffects(CustomerEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAnimationsAsync(),
    CustomerService,
    HttpClientModule,
    HttpClient,
    importProvidersFrom(HttpClientModule),
  ],
};

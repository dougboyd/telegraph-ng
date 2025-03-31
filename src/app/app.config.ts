import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { uxReducer } from './ngrx/ux/ux.reducers';
import { telegraphReducer } from './ngrx/telegraph/telegraph.reducers';
import { TelegraphEffects } from './ngrx/telegraph/telegraph.effects';
import { TelegraphService } from './ngrx/telegraph/telegraph.service';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideState({ name: 'ux', reducer: uxReducer }),
    provideState({ name: 'telegraph', reducer: telegraphReducer }),
    provideEffects(TelegraphEffects),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(),
    TelegraphService,
    provideHttpClient(),
  ],
};

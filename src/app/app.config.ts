import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { cartReducer } from './cart/cart.reducer';
import { localStorageMetaReducer } from './store/meta-reducers/local-storage.metareducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes), provideStore({ cart: cartReducer }, { metaReducers: [localStorageMetaReducer] }),
      provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),

  ]
};

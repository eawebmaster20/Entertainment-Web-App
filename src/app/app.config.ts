import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './auth/interceptors/jwt/jwt.interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { boardReducer } from './shared/state/board.reducer';
import { BoardEffects } from './shared/state/board.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    // provideAnimationsAsync(),
    provideAnimations(),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideStore(),
    provideState({
      name: 'movies',
      reducer: boardReducer,
    }),
    provideEffects(BoardEffects),
    provideStoreDevtools({maxAge:25, logOnly: false}),
  ]
};

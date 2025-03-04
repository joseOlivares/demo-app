import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch , withInterceptors } from '@angular/common/http';

import { includeBearerTokenInterceptor } from 'keycloak-angular';
import { provideKeycloakAngular } from './core/keycloack/keycloack.config';


export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloakAngular(), // keycloak config
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient( withFetch(), withInterceptors([includeBearerTokenInterceptor]) )
   ]
};

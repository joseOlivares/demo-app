import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { KEYCLOAK_EVENT_SIGNAL, ReadyArgs, typeEventArgs } from 'keycloak-angular';

export const privateGuard: CanActivateFn = (route, state) => {
  const keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);
  const keycloakEvent = keycloakSignal();
  const isAuthenticated =  typeEventArgs<ReadyArgs>(keycloakEvent.args);

  if (!isAuthenticated) {
    return false;
  }
  return true;
};

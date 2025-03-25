import { Component, effect, inject, signal } from '@angular/core';

import Keycloak from 'keycloak-js';
import {
  HasRolesDirective,
  KEYCLOAK_EVENT_SIGNAL,
  KeycloakEventType,
  typeEventArgs,
  ReadyArgs
} from 'keycloak-angular';
import { ToastComponent } from '../../core/components/toast/toast.component';

@Component({
  selector: 'app-home',
  imports: [ToastComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  authenticated = false;
  keycloakStatus: string | undefined;
  private readonly keycloak = inject(Keycloak);
  private readonly keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);
  showToast=signal(false);//controla si se muestra el toast

  constructor() {
    console.log('HomeComponent constructor');
    
    effect(() => {
      const keycloakEvent = this.keycloakSignal();

      this.keycloakStatus = keycloakEvent.type;

      if (keycloakEvent.type === KeycloakEventType.Ready) {
        this.authenticated = typeEventArgs<ReadyArgs>(keycloakEvent.args);
        console.log('Authenticated: ', this.authenticated);
      }

      if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
        this.authenticated = false;
        console.log('Authenticated: ', this.authenticated);
      }
    });
    
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }

  parseAccessToken() {
    const token = this.keycloak.token;
    if (!token){
      console.log('No token');
    } else {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      console.log('decoded token: ',decoded);
    }
  }

 async getUserProfile() {

  if (this.keycloak?.authenticated) {
    const profile =  await this.keycloak.loadUserProfile();
    console.log('User profile: ', profile); 
  } else {
    console.log('User not authenticated');
  }
 }

 isAuthenticated() {
  console.log('Is authenticated: ', this.keycloak?.authenticated ?? false);
 }

  callToast() {
    this.showToast.set(true);
  }

}
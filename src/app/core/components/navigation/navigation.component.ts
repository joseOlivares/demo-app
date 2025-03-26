import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import Keycloak from 'keycloak-js';
import {
  HasRolesDirective,
  KEYCLOAK_EVENT_SIGNAL,
  KeycloakEventType,
  typeEventArgs,
  ReadyArgs
} from 'keycloak-angular';
import { UserProfile } from '../../../types/user-profile';

import * as bootstrap from 'bootstrap'; //para resolver problema del carga del dropbdown con keycloak

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

  private readonly keycloak = inject(Keycloak);
  private readonly keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);
  isAuthenticated =false;
  keycloakStatus: string | undefined;

  protected userProfile:UserProfile = {id:'',emailVerified:false,username:'Login',email:'',firstName:'',lastName:''};


   constructor() {
    effect(() => {
      const keycloakEvent = this.keycloakSignal();

      this.keycloakStatus = keycloakEvent.type;

      if (keycloakEvent.type === KeycloakEventType.Ready) {
        this.isAuthenticated = typeEventArgs<ReadyArgs>(keycloakEvent.args);
        console.log('Authenticated: ', this.isAuthenticated);
      }

      if (keycloakEvent.type === KeycloakEventType.AuthLogout) {

        this.isAuthenticated = false;
        console.log('Authenticated: ', this.isAuthenticated);
        console.log('Keycloak.authenticated: ', this.keycloak.authenticated);
      }

      this.getUserProfile();
      this.initDropdowns(); // Inicializar dropdowns después de cargar Keycloak
    });
   }


   async getUserProfile() {
    if (this.keycloak?.authenticated) {
      const profile =  await this.keycloak.loadUserProfile();

      this.userProfile.id = profile.id ?? '';
      this.userProfile.emailVerified = profile.emailVerified ?? false;
      this.userProfile.username = profile.username ?? 'Unknown';
      this.userProfile.email = profile.email ?? '';
      this.userProfile.firstName = profile.firstName ?? '';
      this.userProfile.lastName = profile.lastName ?? '';
      console.log('Navigation- User profile: ', profile);
    }
   }

   logout(){
    this.keycloak.logout();
    this.initDropdowns(); // Reinicializar Bootstrap después del logout
   }

   loging(){
    this.keycloak.login();
   }

   ngAfterViewInit() {
    this.initDropdowns(); // Asegurar inicialización en caso de cambios en el DOM
  }

  initDropdowns() {
    setTimeout(() => {
      const dropdowns = document.querySelectorAll('.dropdown-toggle');
      dropdowns.forEach((dropdown) => {
        new bootstrap.Dropdown(dropdown);
      });
    }, 100);
  }
}

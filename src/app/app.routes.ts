import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'create-customer',
    loadComponent: () => import('./pages/create-customer/create-customer.component').then(m => m.CreateCustomerComponent)
  },
  {
    path: 'view-customers',
    loadComponent: () => import('./pages/view-customers/view-customers.component').then(m => m.ViewCustomersComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

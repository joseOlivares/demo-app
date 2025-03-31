import { Routes } from '@angular/router';
import { privateGuard } from './core/guards/private.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'sucursales',
    loadComponent: () => import('./pages/sucursales/sucursales.component').then(m => m.SucursalesComponent)
  },
  {
    path: 'crear-sucursal',
    loadComponent: () => import('./pages/crear-sucursal/crear-sucursal.component').then(m => m.CrearSucursalComponent),
    canActivate: [privateGuard]

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

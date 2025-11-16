import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  {
    path: 'clients',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/clients/clients.routes').then(m => m.CLIENTS_ROUTES),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'clients',
  },
  {
    path: '**',
    redirectTo: 'clients',
  },
];

import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { ClientsListComponent } from './features/clients/pages/clients-list/clients-list.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'clients',
        component: ClientsListComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'clients',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

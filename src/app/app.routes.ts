import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    // Feature chargée à la demande : le bundle initial ne contient que le shell.
    loadChildren: () => import('./users/users.routes').then((m) => m.usersRoutes),
  },
  { path: '', pathMatch: 'full', redirectTo: 'users' },
  { path: '**', redirectTo: 'users' },
];

import { Routes } from '@angular/router';

export const usersRoutes: Routes = [
  {
    path: '',
    title: 'Utilisateurs',
    loadComponent: () =>
      import('./user-list/user-list').then((m) => m.UserList),
  },
  {
    path: ':id',
    title: 'Détails de l\'utilisateur',
    loadComponent: () =>
        import('./user-details/user-details').then((m) => m.UserDetails),
  },
];

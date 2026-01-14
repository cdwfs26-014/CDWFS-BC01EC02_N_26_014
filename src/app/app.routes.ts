import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./_pages/accueil/accueil').then(m => m.Accueil) },

  {
    path: 'boutique',
    loadChildren: () =>
      import('./_pages/boutique/boutique.routes').then(m => m.boutiqueRoutes)
  },

  { path: 'login', loadComponent: () => import('./_pages/login/login').then(m => m.Login) },
  { path: 'logout', loadComponent: () => import('./_pages/logout/logout').then(m => m.Logout) },
  { path: '404', loadComponent: () => import('./_pages/errors/error404/error404').then(m => m.Error404) },
  { path: '**', redirectTo: '/404' }
];


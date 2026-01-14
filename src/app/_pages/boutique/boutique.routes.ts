import { Routes } from '@angular/router'; 

export const boutiqueRoutes: Routes = [
  { path: '', redirectTo: 'catalogue', pathMatch: 'full' },
  { path: 'catalogue', loadComponent: () => import('./catalogue/catalogue').then(m => m.Catalogue) },
  { path: 'produit/:ref', loadComponent: () => import('./produit/produit').then(m => m.Produit) },
  { path: 'panier', loadComponent: () => import('./panier/panier').then(m => m.Panier) },
  { path: 'ma-boite', loadComponent: () => import('./ma-boite/ma-boite').then(m => m.MaBoite) },
];

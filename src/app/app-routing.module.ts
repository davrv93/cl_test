import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'properties',
    loadChildren: () => import('../pages/properties/properties.module').then( m => m.PropertiesModule)
  },
  {
    path: 'property-detail',
    loadChildren: () => import('../pages/property-detail/property-detail.module').then( m => m.PropertyDetailModule)
  },
  {
    path:'checkout-debt',
    loadChildren: () => import('../pages/checkout-debt/checkout-debt.module').then( m => m.CheckoutDebtModule)

  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

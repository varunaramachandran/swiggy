import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './core/guard/login.guard';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('../app/pages/auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'restaurants',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../app/pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'cart',
    canActivate: [AuthGuard],

    loadChildren: () =>
      import('../app/pages/cart/cart.module').then((m) => m.CartModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

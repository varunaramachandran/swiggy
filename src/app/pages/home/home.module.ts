import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantsComponent } from './componenets/restaurants/restaurants.component';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantComponent } from './componenets/restaurant/restaurant.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

const routes: Routes = [
  {
    path: '',
    component: RestaurantsComponent,
  },
  {
    path: ':id',
    component: RestaurantComponent,
  },
];

@NgModule({
  declarations: [RestaurantsComponent, RestaurantComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SweetAlert2Module.forRoot(),
  ],
})
export class HomeModule {}

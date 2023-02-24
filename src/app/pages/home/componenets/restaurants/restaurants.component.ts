import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from 'src/app/common/services/logout.service';
import { Retaurants } from '../../model/restaurants.model';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent {
  restaurants: Retaurants[] = [];
  constructor(
    private retaurantService: RestaurantService,
    private router: Router,
    private logoutService: LogoutService
  ) {}

  ngOnInit() {
    this.getRestaurantData();
  }

  getRestaurantData() {
    this.retaurantService.getRestaurant().subscribe({
      next: (res: Retaurants[]) => {
        this.restaurants = res;
      },
      error: (err) => {},
    });
  }

  restaurantDetail(id: number, foodMenu: any[]) {
    return this.router.navigate(['restaurants/' + id]);
  }

  logout() {
    this.logoutService.logout();
    this.router.navigate(['']);
  }
}

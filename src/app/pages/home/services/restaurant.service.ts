import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//  import { Http } from '@angular/http';
import { Retaurants } from '../model/restaurants.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private http: HttpClient) {}

  getRestaurant() {
    const url = 'http://localhost:3004/restaurants';
    return this.http.get<Retaurants[]>(url);
  }
  getRestaurantById(id: string) {
    const url = `http://localhost:3004/restaurants/${id}`;
    return this.http.get<Retaurants>(url);
  }

  addToCart(data: any) {
    const url = 'http://localhost:3004/cart';
    return this.http.post(url, data);
  }
}

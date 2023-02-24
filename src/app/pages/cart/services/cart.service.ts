import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cart } from '../model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private API_URL = `${environment.api_base_url}`;

  constructor(private http: HttpClient) {}

  getCartData() {
    const url = `${this.API_URL}` + '/cart';
    return this.http.get<Cart[]>(url);
  }

  removeFromCart(id: any) {
    const url = `http://localhost:3004/cart/${id}`;
    return this.http.delete<Cart[]>(url);
  }

  updateCart(data: any, id: any) {
    const url = `http://localhost:3004/cart/${id}`;
    return this.http.put(url, data);
  }
}

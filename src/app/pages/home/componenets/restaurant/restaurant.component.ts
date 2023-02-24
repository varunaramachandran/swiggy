import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { Retaurants } from '../../model/restaurants.model';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/pages/cart/services/cart.service';
import { Cart } from 'src/app/pages/cart/model/cart.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent {
  foodMenuList: any[] = [];
  restaurants: Retaurants[] = [];
  cart: Cart[] = [];
  currentRestaurentId: any = null;

  constructor(
    private router: Router,
    private retaurantService: RestaurantService,
    private toaster: ToastrService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getCartData();
  }
  getRestaurantData(id: any, cartData: any[]) {
    this.retaurantService.getRestaurantById(id).subscribe({
      next: (res: Retaurants) => {
        this.foodMenuList = res?.foodMenu.map((itemmenu) => ({
          ...itemmenu,
          isInCart:
            cartData.find(
              ({ productId }) => productId === itemmenu.productId
            ) !== undefined,
        }));
      },
      error: (err) => {},
    });
  }

  getCartData() {
    this.cartService.getCartData().subscribe({
      next: (res: Cart[]) => {
        console.log('cartData', res);
        if (res.length) {
          this.currentRestaurentId = res[0].resturantId;
        } else {
          this.currentRestaurentId = null;
        }

        this.cart = res;

        this.getRestaurantData(this.router.url.split('/')[2], this.cart);
      },
      error: (err) => {},
    });
  }
  removeFromCarts(item: any) {
    this.removeFromCart(
      this.cart.find(({ productId }) => productId === item.productId)?.id
    );
  }
  addToCart(item: any) {
    if (this.cart.length) {
      if (this.currentRestaurentId == item.resturantId) {
        this.itemAddToCart(item);
      } else {
        this.confirmBox(item);
      }
    } else {
      this.itemAddToCart(item);
    }
  }

  itemAddToCart(item: any) {
    this.retaurantService.addToCart(item).subscribe({
      next: (res) => {
        if (res) this.toaster.success('Item added to cart');
        this.getCartData();
      },
      error: (err) => {
        this.toaster.error('Something went wrong');
      },
    });
  }

  confirmBox(itemData: any) {
    Swal.fire({
      title: 'Items already in cart',
      text: 'Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'YES, START REFRESH!',
      cancelButtonText: 'N0',
    }).then(async (result) => {
      if (result.value) {
        await Promise.all(
          this.cart.map((item) => {
            return this.removeFromCart(item.id, false);
          })
        );
        this.cart = [];
        this.addToCart(itemData);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  removeFromCart(id: any, refetchCartData: boolean = true) {
    this.cartService.removeFromCart(id).subscribe({
      next: (res) => {
        if (refetchCartData) {
          this.getCartData();
        }

        if (res) this.toaster.success('Removed from cart');
      },
      error: (err) => {},
    });
  }
}

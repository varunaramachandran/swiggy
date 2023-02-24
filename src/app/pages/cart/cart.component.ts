import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cart } from './model/cart.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  constructor(
    private cartService: CartService,
    private toaster: ToastrService
  ) {}
  totalPrice: number = 0;
  cart: Cart[] = [];

  ngOnInit() {
    this.getCartData();
    (window as any).paypal
      .Buttons({
        createOrder: function (data: any, actions: any) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: '20.00',
                },
              },
            ],
          });
        },
        onApprove: function (data: any, actions: any) {
          return actions.order.capture().then(function (details: any) {
            window.location.href = 'cart.html';
          });
        },
        onError: function (err: any) {
        },
      })
      .render('#paypal-button-container');
  }
  updateQty(item: any, mode: string) {
    let newQty = item.qty;

    if (mode === 'add') {
      newQty++;
    } else {
      newQty--;
    }
    if (newQty === 0) {
      this.removeFromCart(item.id);
    } else {
      this.cartService.updateCart({ ...item, qty: newQty }, item.id).subscribe({
        next: (res) => {
          this.getCartData();

          if (res)
            this.toaster.success(
              mode === 'add' ? 'Qty Added' : 'Qty subtracted'
            );
        },
        error: (err) => {},
      });
    }
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
  getCartData() {
    this.cartService.getCartData().subscribe({
      next: (res: Cart[]) => {
        this.cart = res;
        this.totalPrice = 0;
        this.cart.forEach(({ qty = 0, price }) => {
          this.totalPrice += qty * parseInt(price);
        });
      },
      error: (err) => {},
    });
  }
}

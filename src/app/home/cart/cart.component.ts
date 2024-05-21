import { Component } from "@angular/core";
import { OrderService } from "../../products/order.service";
import { AppService } from "../../app.service";
import { DataViewModule } from "primeng/dataview";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { AppHelper } from "../../utils/app.helper";
import { Router, RouterModule } from "@angular/router";
import { CardModule } from "primeng/card";
import { FormsModule } from "@angular/forms";
import { LocationService } from "../../location.service";

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: 'cart.component.html',
  imports: [CommonModule, DataViewModule, ButtonModule, CardModule, RouterModule, FormsModule]
})
export class CartComponent {
  // Each coin worth rs1
  public coinsCount = 10;
  public distance = 0;
  public cartTotal = 0;
  public deliveryTotal = 0;
  public classCDelivery = true;
  private classCPresentAlready = false;
  public cartItems: any = [];
  public layout: 'grid' | 'list' = 'list';
  public today = new Date();
  public dateFor15Days = "";
  public dateFor30Days = "";
  public availableSunday = "";
  public orderPlaced = false;
  public orderTotal = 0;
  public totalByCoins = 0;

  public pincode = '';

  constructor(private orderService: OrderService, public appService: AppService,
    private router: Router,
    private locationService: LocationService
  ) {
    this.availableSunday = AppHelper.getNextSundayDate();
    const day15 = new Date(AppHelper.getParticularDateFromTodayByDays(15));
    const day30 = new Date(AppHelper.getParticularDateFromTodayByDays(30));
    this.dateFor15Days = AppHelper.getFormattedDate(day15);
    this.dateFor30Days = AppHelper.getFormattedDate(day30);
    this.getCart();
  }

  public placeOrder(cartItems: any): void {
    const order = {
      customerId: this.appService.user().CustomerId,
      products: [] as any,
      orderDate: AppHelper.getFormattedDate(this.today),
      orderTotal: this.orderTotal,
      Status: 'Placed'
    };
    this.cartItems.forEach((item: any) => {
      order.products = [...order.products, {
        product: item.Product,
        return: item.rentedDays === '15 days' ? this.dateFor15Days : this.dateFor30Days,
        rentedDays: item.rentedDays,
        rentedAmount: item.rentedAmount

      }];
    });

    this.orderService.placeOrder(order).subscribe(() => {
      this.orderPlaced = true;
      this.clearCart();
    });
  }

  public gotoOrders(): void {
    this.router.navigate(['profile', 'orders']);
  }

  public removeFromCart(cartItem: any): void {
    this.orderService.removeFromCart(cartItem._id).subscribe(() => {
      this.getCart();
    });
  }

  public gotoHome(): void {
    this.router.navigate(['']);
  }

  public loadProduct(product: any) {
    this.router.navigate(['productDetails', product.Code]);
  }

  public calculateOnPincode() {
    if (this.pincode.length === 6) {
      this.locationService.getNearestStore(+this.pincode).subscribe((storeRes: any) => {
        const distance = storeRes.shortestDistance;
        console.log('distance => ', distance);
        this.distance = distance;
        AppHelper.saveToLocalStorage('scDistance', { pincode: +this.pincode, distance: this.distance });
        this.calculateDeliveryCharges();
      });
    }
  }

  private getCart(): void {
    if (this.appService.user()) {
      this.cartTotal = 0;
      this.orderTotal = 0;
      this.orderService.getCartByCustomerId().subscribe((res) => {
        if (res) {
          this.distance = this.appService.user().KmDistance;
          this.cartItems = res;
          const cartCount = this.cartItems.length;
          this.appService.cartCount.update(() => cartCount);
          this.calculateTotal();
          this.calculateDeliveryCharges();
          this.calculateRewards();
        }
      });
    } else {
      this.cartItems = AppHelper.getFromLocalStorage('scCart');
      if (this.cartItems.length) {
        this.calculateTotal();
      }
    }
  }

  private clearCart(): void {
    this.appService.cartCount.update(() => 0);
    this.orderService.clearCart().subscribe();
  }

  private calculateTotal() {
    this.cartItems.forEach((element: any) => {
      const product = element.Product;
      let rent = element.rentedAmount;
      this.handleClassCInCart(product);
      this.cartTotal += rent;
    });
    this.orderTotal += this.cartTotal;
  }

  private handleClassCInCart(product: any): void {
    const classCPresent = product.Class === 'C';
    if (classCPresent) {
      if (this.distance > 15) {
        // rent = 0;
        this.classCDelivery = false;
      } else {
        if (this.distance <= 5) {
          this.deliveryTotal += (this.classCPresentAlready ? (120 * 0.5) : 120);
        } else if (this.distance > 5 && this.distance <= 10) {
          this.deliveryTotal += (this.classCPresentAlready ? (150 * 0.5) : 150);
        } else {
          this.deliveryTotal += (this.classCPresentAlready ? (200 * 0.5) : 200);
        }
      }
      this.classCPresentAlready = true;
    }
  }

  private calculateDeliveryCharges() {
    // 0-15 km: Class A, B => 0
    // 0-15 km: Class C => 200
    // Above 15km: Class A, B => 10/km
    console.log('carttotal => ', this.cartTotal);
    if (this.cartTotal < 500) {
      let deliveryCharges = 0;
      if (this.distance <= 5) {
        deliveryCharges += 80;
      } else if (this.distance > 5 && this.distance <= 10) {
        deliveryCharges += 100;
      } else {
        deliveryCharges += 10 * this.distance;
      }
      this.deliveryTotal = this.deliveryTotal === 0 ? deliveryCharges : this.deliveryTotal;
    } else {
      console.log('sdfgh => ', this.distance);
      if (this.distance > 15 && this.distance <= 25) {
        const extraDeliveryDistance = this.distance - 15;
        this.deliveryTotal = this.deliveryTotal + (extraDeliveryDistance * 10);
      }
    }
    console.log('deliveryTotal => ', this.deliveryTotal);
    this.orderTotal += this.deliveryTotal;
  }

  private calculateRewards() {
    this.totalByCoins = this.coinsCount * 1;
    this.orderTotal -= this.totalByCoins;
  }
}

import { Injectable } from "@angular/core";
import { OrderService } from "./products/order.service";
import { AppService } from "./app.service";
import { AppHelper } from "./utils/app.helper";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private orderService: OrderService, private appService: AppService) { }

  public getCartItemsAndSetInLocal() {
    if (this.appService.user()) {
      this.orderService.getCartByCustomerId().subscribe((res) => {
        AppHelper.saveToLocalStorage('scCart', res);
      });
    }
  }

  public checkIfProductInCart(product: any): boolean {
    const cartItems = AppHelper.getFromLocalStorage('scCart');
    if (cartItems?.length) {
      const find = cartItems.find((item: any) => {
        return item.Product.Code === product.Code
      });
      return find;
    } else {
      return false;
    }
  }
}

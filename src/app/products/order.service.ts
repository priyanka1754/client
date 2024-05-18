import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppService } from "../app.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private appService: AppService) { }

  public addToCart(request: any) {
    const url = `/api/cart/addCart`;
    return this.http.post(url, request);
  }

  public getCartByCustomerId() {
    const customerId = this.appService.user().CustomerId;
    const url = `/api/cart/getCart/${customerId}`;
    return this.http.get(url);
  }

  public placeOrder(order: any): Observable<any> {
    order.Status = 'Placed';
    const url = `/api/orders/order`;
    return this.http.post(url, order);
  }

  public removeFromCart(id: string) {
    const customerId = this.appService.user().CustomerId;
    const url = `/api/cart/removecartItem/${customerId}/${id}`;
    return this.http.delete(url);
  }

  public clearCart() {
    const customerId = this.appService.user().CustomerId;
    const url = `/api/cart/clearCart/${customerId}`;
    return this.http.delete(url);
  }

  public getOrders() {
    const customerId = this.appService.user().CustomerId;
    const url = `/api/orders/hold/${customerId}`;
    return this.http.get(url);
  }
}


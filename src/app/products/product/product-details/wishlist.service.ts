import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../../../app.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private http: HttpClient, private appService: AppService) {}

  public getWishlistItems(): Observable<any> {
    const customerId = this.appService.user().CustomerId;
    const url = `/api/wishlist/get/${customerId}`;
    return this.http.get(url);
  }

  public addItemToWishlist(product: any): Observable<any> {
    const url = `/api/wishlist/add`;
    const customerId = this.appService.user().CustomerId;
    const request = {
      customerId: customerId,
      product: product,
    };
    return this.http.post(url, request);
  }

  public removeItemFromWishlist(id: string): Observable<any> {
    const url = `/api/wishlist/remove/${id}`;
    return this.http.delete(url);
  }

  public addNotifyProduct(request: any): Observable<any> {
    const url = `/api/notifyProduct/add`;
    return this.http.post(url, request);
  }
}

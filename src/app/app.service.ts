import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public user: any = signal(null);

  public headerHeight = signal("");

  public isMobileScreen = signal(false);

  public cartCount = signal(0);

  public pushToCart = signal(false);

  constructor() {
    const cart = localStorage.getItem('scCart');
    const parseCartCount = cart ? JSON.parse(cart).length : 0;
    this.cartCount.update(() => parseCartCount);
  }
}

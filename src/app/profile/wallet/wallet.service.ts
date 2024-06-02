import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppService } from "../../app.service";

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  constructor(private http: HttpClient, private appService: AppService) {}

  public addMoney(amount: number) {
    const customerId = this.appService.user().CustomerId;
    const request = {
      amount
    };
    const url = `/api/toyWallet/addAmountFromMoney/${customerId}`;
    return this.http.put(url, request);
  }

  public getWallet() {
    const customerId = this.appService.user().CustomerId;
    const url = `/api/toyWallet/get/${customerId}`;
    return this.http.get(url);
  }
}

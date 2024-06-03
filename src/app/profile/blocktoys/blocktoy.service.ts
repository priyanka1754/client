import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppService } from "../../app.service";

@Injectable({
  providedIn: 'root'
})
export class BlockToyService {
  constructor(private http: HttpClient, private appService: AppService) { }

  public addBlockToy(request: any) {
    const customerId = this.appService.user().CustomerId;
    const url = `/api/blockToy/add/${customerId}`;
    return this.http.post(url, request);
  }

  public getBlockToys() {
    const customerId = this.appService.user().CustomerId;
    const url = `/api/blockToy/get/${customerId}`;
    return this.http.get(url);
  }
}

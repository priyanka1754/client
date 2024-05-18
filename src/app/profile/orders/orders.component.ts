import { Component } from "@angular/core";
import { OrderService } from "../../products/order.service";
import { DataViewModule } from "primeng/dataview";
import { CommonModule } from "@angular/common";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-profile-orders',
  standalone: true,
  templateUrl: 'orders.component.html',
  imports: [DataViewModule, CommonModule, CardModule, ButtonModule, RouterModule]
})
export class OrdersComponent {

  public orders: any = [];
  public layout: 'grid' | 'list' = 'list';

  constructor(private orderService: OrderService) {
    // get orders
    this.getOrders();
  }

  public getOrders() {
    this.orderService.getOrders().subscribe((orders: any) => {
      this.orders = orders;
    });
  }
}

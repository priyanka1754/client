import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MobileProductMenuComponent } from '../mobile-product-menu/mobile-product-menu.component';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  templateUrl: 'mobile-menu.component.html',
  imports: [RouterModule, MobileProductMenuComponent],
})
export class MobileMenuComponent {
  public showDrawer = false;

  constructor(private router: Router, public appService: AppService) {}
  public openProductMenu() {
    console.log('openProductMenu');
    this.showDrawer = !this.showDrawer;
  }

  public openOrders() {
    this.router.navigate(['profile', 'orders']);
  }
}

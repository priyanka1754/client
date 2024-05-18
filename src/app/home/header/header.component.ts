import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { OrderService } from "../../products/order.service";
import { AppService } from "../../app.service";

import { MobileMenuComponent } from "./mobile-menu/mobile-menu.component";
import { MobileUserMenuComponent } from "./mobile-user-menu/user-menu.component";
import { DropdownMenuComponent } from "./dropdown-menu/dropdown-menu.component";
import { ProductMenuComponent } from "./product-menu/product-menu.component";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: 'header.component.html',
  imports: [RouterModule, ButtonModule, MobileMenuComponent, MobileUserMenuComponent, DropdownMenuComponent, ProductMenuComponent],
  styleUrl: 'header.component.scss'
})
export class HeaderComponent implements AfterViewInit {

  public cartCount = "";

  @ViewChild('header', { static: true })
  public headerElement!: ElementRef;
  public headerHeight!: number;


  @HostListener('window:resize')
  onResize() {
    this.calculateHeaderHeight();
    this.appService.isMobileScreen.update(() => window.innerWidth < 768 ? true : false);
  }

  // public user: any = null;
  constructor(public orderService: OrderService, public appService: AppService) {
    this.cartCount = this.appService.cartCount().toString();
  }

  public ngAfterViewInit() {
    this.calculateHeaderHeight();
    this.appService.isMobileScreen.update(() => window.innerWidth < 768 ? true : false);
  }

  calculateHeaderHeight() {
    this.appService.headerHeight.update(() => this.headerElement.nativeElement.offsetHeight.toString());
  }
}

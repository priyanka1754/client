import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MobileProductMenuComponent } from "../mobile-product-menu/mobile-product-menu.component";

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  templateUrl: 'mobile-menu.component.html',
  imports: [RouterModule, MobileProductMenuComponent]
})
export class MobileMenuComponent {

  public showDrawer = false;
  public openProductMenu() {
    console.log('openProductMenu');
    this.showDrawer = !this.showDrawer;
  }
}

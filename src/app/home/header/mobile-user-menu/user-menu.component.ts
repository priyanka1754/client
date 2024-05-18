import { Component } from "@angular/core";
import { UserService } from "../../../login/user.service";
import { AppService } from "../../../app.service";
import { Router, RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'app-mobile-user-menu',
  standalone: true,
  templateUrl: 'user-menu.component.html',
  imports: [RouterModule, ButtonModule]
})
export class MobileUserMenuComponent {
  showDrawer: boolean = false;
  public user: any;
  public dueDay: string = '';

  constructor(public userService: UserService, private appService: AppService, private router: Router) {
    this.user = this.appService.user();
    this.dueDay = this.user.DueDay ? `Due Date: ${this.user.DueDay} (${this.user.PaymentDone} ? 'Paid' : 'To Pay')` : '';
  }

  toggleDrawer() {
    this.showDrawer = !this.showDrawer;
  }

  public logout() {
    this.appService.user.update(() => null);
    localStorage.removeItem('scUser');
    this.router.navigate(['']);
  }
}

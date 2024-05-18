import { Component, ElementRef, HostListener, Input, ViewChild } from "@angular/core";
import { AppService } from "../../../app.service";
import { Router, RouterModule } from "@angular/router";
import { UserService } from "../../../login/user.service";

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  templateUrl: 'dropdown-menu.component.html',
  imports: [RouterModule]
})
export class DropdownMenuComponent {
  @ViewChild('userMenu') public outerDiv!: ElementRef;
  public showMenu = false;
  public user: any;
  public dueDay: string = '';

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    // Check if the clicked target is outside the outer div
    if (!this.outerDiv.nativeElement.contains(event.target)) {
      this.showMenu = false;
    }
  }

  constructor(private appService: AppService, private userService: UserService, private router: Router) {
    this.user = this.appService.user();
    this.dueDay = this.user.DueDay ? `Due Date: ${this.user.DueDay} (${this.user.PaymentDone} ? 'Paid' : 'To Pay')` : '';
  }

  public logout() {
    localStorage.removeItem('scUser');
    window.location.reload();
    this.user = null;
    this.appService.user.update('');
    this.showMenu = false;
  }
}


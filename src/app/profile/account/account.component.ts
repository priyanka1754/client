import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../login/user.service';
import { AppHelper } from '../../utils/app.helper';

@Component({
  selector: 'app-account',
  standalone: true,
  templateUrl: 'account.component.html',
  imports: [FormsModule, ButtonModule],
})
export class AccountComponent {
  public user: any;
  public editAddress: boolean = false;
  public editMapsLocation: boolean = false;
  public isValidLink: boolean = false;
  constructor(private userService: UserService) {
    this.user = AppHelper.getFromLocalStorage('scUser');
  }

  public validateLink() {
    this.isValidLink = AppHelper.validateLink(this.user.Maps_Link);
  }

  public editUser() {
    this.userService.editUser(this.user).subscribe(() => {
      this.editAddress = false;
      this.editMapsLocation = false;
    });
  }
}

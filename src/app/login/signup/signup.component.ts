import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { UserService } from "../user.service";
import { Router, RouterModule } from "@angular/router";
import { AppHelper } from "../../utils/app.helper";

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: 'signup.component.html',
  imports: [FormsModule, ButtonModule, RouterModule]
})
export class SignupComponent {
  public name: string = '';
  public phone!: number;
  public city: string = '';
  public pincode!: number;
  public password: string = '';
  public confirmPassword: string = '';

  public passwordMatch = false;

  public userAdded = false;

  public isValidPassword = false;
  public isValidPhoneNumber = false;
  public isValidPincode = false;

  public specialCharacters = '@#$&';

  public errorMessage = '';

  constructor(private userService: UserService, private router: Router) { }

  public passwordsMatch() {
    return this.password === this.confirmPassword ? this.passwordMatch = true : this.passwordMatch = false;
  }

  public validatePassword() {
    this.isValidPassword = AppHelper.validatePassword(this.password);
  }

  public validatePhoneNumber() {
    this.isValidPhoneNumber = AppHelper.validatePhoneNumber(this.phone);
  }

  public validatePincode() {
    this.isValidPincode = AppHelper.validatePincode(this.pincode);
  }

  public signup() {
    const user = {
      Name: this.name,
      Mobile: this.phone,
      Password: this.password,
      City: this.city,
      Pincode: this.pincode
    };

    this.userService.signup(user).subscribe(() => {
      this.userAdded = true;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }, (err: any) => {
      this.errorMessage = err.error.error;
    });
  }
}

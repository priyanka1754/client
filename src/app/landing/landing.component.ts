import { Component } from "@angular/core";
import { HomeComponent } from "../home/home.component";
import { AppHelper } from "../utils/app.helper";
import { LocationService } from "../location.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-landing',
  templateUrl: 'landing.component.html',
  standalone: true,
  imports: [HomeComponent, FormsModule]
})
export class LandingComponent {

  public loadHome = false;

  public pincode = '';
  public isValidPincode = false;

  public distance = '';

  constructor(private locationService: LocationService) { }

  public proceed(): void {
    this.loadHome = true;
  }

  public validatePincode() {
    this.isValidPincode = AppHelper.validatePincode(+this.pincode);

    if (this.isValidPincode) {
      this.locationService.getDistanceFromPincode(+this.pincode).subscribe((distance: number) => {
        console.log('distance is => ', distance);
        if (distance < 1) {
          this.distance = `${distance * 1000} m`;
        } else {
          this.distance = `${distance} km`
        }
      });
    }
  }
}

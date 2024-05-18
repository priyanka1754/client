import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppHelper } from "../../../utils/app.helper";
import { LocationService } from "../../../location.service";

@Component({
  selector: 'app-locationbar',
  templateUrl: 'locationbar.component.html',
  standalone: true,
  imports: [FormsModule]
})
export class LocationBarComponent {
  public location: any;
  public showLocationDrawer = false;

  public pincode: string = '';
  public city: string = 'Chennai';
  public isValidPincode = false;

  public stores = [{ label: 'Perungudi', value: 'perungudi' }];

  public selectedStore = 'perungudi';

  public distance = '';

  public userLocationDetails: any;

  constructor(private locationService: LocationService) { }

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

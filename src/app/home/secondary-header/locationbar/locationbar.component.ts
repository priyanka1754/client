import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppHelper } from "../../../utils/app.helper";
import { LocationService } from "../../../location.service";
import { PincodePageComponent } from "../../../landing/pincodepage/pincodepage.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-locationbar',
  templateUrl: 'locationbar.component.html',
  standalone: true,
  imports: [FormsModule, PincodePageComponent, CommonModule]
})
export class LocationBarComponent {
  public location: any;
  public showLocationDrawer = false;

  public city: string = 'Chennai';
  public isValidPincode = false;

  public stores: any = [];

  public selectedStore = '';

  public userLocationDetails: any;

  public nearestStore: any;

  public isOutsideDeliveryZone = false;

  public changeStorebyPincode = false;

  public changeStoreAsWish = false;

  constructor(public locationService: LocationService) {
    this.stores = this.locationService.stores;
    if (AppHelper.getFromLocalStorage('scStoreDetails')) {
      this.nearestStore = AppHelper.getFromLocalStorage('scStoreDetails').nearestStore.Name;
    }
  }

  public switchStore() { }

  public updatePincode() { }

  public close() {
    this.showLocationDrawer = false;
    const store = AppHelper.getFromLocalStorage('scStoreDetails');
    this.locationService.selectedStore.update(() => store);
  }
}

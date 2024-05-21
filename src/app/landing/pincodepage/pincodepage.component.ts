import { Component, EventEmitter, Output } from "@angular/core";
import { AppHelper } from "../../utils/app.helper";
import { LocationService } from "../../location.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-pincode-page',
  templateUrl: 'pincodepage.component.html',
  standalone: true,
  imports: [FormsModule]
})
export class PincodePageComponent {
  public pincode = '';
  public isValidPincode = false;

  public distance = '';

  public nearestStore: any;

  public isOutsideDeliveryZone = false;

  @Output()
  public emitOutsideDeliveryZone: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(private locationService: LocationService) { }

  public validatePincode() {
    this.isValidPincode = AppHelper.validatePincode(+this.pincode);

    if (this.isValidPincode) {
      this.getNearestStore();
    } else {
      this.distance = '';
      this.nearestStore = null;
      this.isOutsideDeliveryZone = false;
      this.locationService.selectedStore.update(() => null);
    }
  }

  public getNearestStore() {
    this.locationService.getNearestStore(+this.pincode).subscribe({
      next: (storeRes) => {
        this.setStore(storeRes);
      }, error: () => {
        this.distance = '';
        this.setStore({ nearestStore: this.locationService.defaultStore });
      }
    });
  }

  private setStore(store: any) {
    this.locationService.selectedStore.update(() => store);
    console.log('store res => ', store);
    this.emitOutsideDeliveryZone.emit(store.isAway);
    if (!store.isAway) {
      const distance = store.shortestDistance;
      if (distance) {
        if (distance < 1) {
          this.distance = `${distance * 1000} m`;
        } else {
          this.distance = `${distance} km`
        }
      }
      this.nearestStore = store.nearestStore;
    } else {
      this.isOutsideDeliveryZone = store.isAway;
    }
  }
}

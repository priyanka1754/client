import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Observable, catchError, map, of, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private shopLatitue = 12.9530852;
  private shopLongitude = 80.2421243;

  public stores: any = [];

  public selectedStore = signal(null);

  public defaultStore: any;
  constructor(private http: HttpClient) {
    this.defaultStore = {
      "_id": "664cb23b3909c312378fe9fc",
      "StoreId": "CHNPER1",
      "Name": "Perungudi",
      "Address": "OMR",
      "Owner": "ABC",
      "Manager": "AB",
      "OwnerContact": 7299933974,
      "ManagerContact": 7299933976,
      "MapsLocation": "https://maps.app.goo.gl/CBMZUUVtkGgujoup8",
      "Latitude": "12.9530852",
      "Longitude": "80.2421243",
      "Pincode": "600096"
    };
  }

  public getDistanceFromLocation() {
    // Check if the browser supports Geolocation
    if ("geolocation" in navigator) {
      // Geolocation is available
      navigator.geolocation.getCurrentPosition((position) => {
        // Get the latitude and longitude from the position object
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log("Latitude: ", latitude);
        console.log("Longitude: ", longitude);
        // return { latitude, longitude };
        // const distance = this.getDistanceFromLatLonInKm(latitude, longitude, this.shopLatitue, this.shopLongitude);
        // console.log('distance in km => ', distance);
      }, (error) => {
        // Handle any errors that occur during geolocation
        console.error("Error getting geolocation:", error);
      });
    } else {
      // Geolocation is not supported
      console.error("Geolocation is not supported by this browser.");
    }

  }

  public getPrimaryStoreFromPincode(pincode: number): Observable<any> {
    return new Observable((observer) => {
      this.getLatLongFromPincode(pincode).subscribe((res: any) => {
        const distance = this.getDistanceFromLatLonInKm(res, { latitude: this.shopLatitue, longitude: this.shopLongitude });
        console.log('distance in km => ', distance);
        observer.next({ shorterDistance: distance, nearestStore: this.defaultStore, isAway: !!(distance > 25) });
      });
    });
  }

  private getDistanceFromLatLonInKm(coords1: any, coords2: any): number {
    console.log(coords2);
    const lat1 = coords1.latitude;
    const lat2 = parseFloat(coords2.latitude);
    const lon1 = coords1.longitude;
    const lon2 = parseFloat(coords2.longitude);
    console.log(lat1, lon1, lat2, lon2);
    const earthRadiusKm = 6371; // Radius of the earth in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c; // Distance in km
    return +distance.toFixed(2);
  }

  private deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  public getLatLongFromPincode(pincode: number) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&postalcode=${pincode}&country=India`;

    return this.http.get(url).pipe(map((response: any) => {
      console.log(response);

      if (response.length > 0) {
        const latitude = response[0].lat;
        const longitude = response[0].lon;
        return { latitude, longitude };
      } else {
        throw new Error("No location found for the provided pincode.");
      }
    }, catchError(() => {
      return throwError(() => new Error("No location found for the provided pincode."));
    })));
  }

  public getStores() {
    const url = `/api/stores`;
    return this.http.get(url);
  }

  public getNearestStore(pincode: number) {
    return this.getLatLongFromPincode(pincode).pipe(map((pincodeCoords: any) => {
      console.log(pincodeCoords);
      let nearestStore = null;
      let shortestDistance = Infinity;

      if (this.stores.length > 1) {
        this.stores.forEach((store: any) => {
          console.log(store);
          let storeCoords = { latitude: store.Latitude, longitude: store.Longitude };
          let distance = this.getDistanceFromLatLonInKm(pincodeCoords, storeCoords);
          console.log(distance);
          if (distance < shortestDistance) {
            shortestDistance = distance;
            nearestStore = store;
          }
        });
      } else {
        nearestStore = this.stores[0];
        let storeCoords = { latitude: nearestStore.Latitude, longitude: nearestStore.Longitude };
        shortestDistance = this.getDistanceFromLatLonInKm(pincodeCoords, storeCoords);
      }
      const store = shortestDistance > 25 ? this.defaultStore : nearestStore;
      return { nearestStore: store, shortestDistance, isAway: !!(shortestDistance > 25) };
    }, catchError(() => {
      console.log('fdghjkl')
      return throwError(() => new Error('Failed to get given pincode coordinates'));
    })));
  }

}

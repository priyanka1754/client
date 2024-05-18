import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private shopLatitue = 12.953085248206538;
  private shopLongitude = 80.24212433615371;
  constructor(private http: HttpClient) {
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
        const distance = this.getDistanceFromLatLonInKm(latitude, longitude, this.shopLatitue, this.shopLongitude);
        console.log('distance in km => ', distance);
      }, (error) => {
        // Handle any errors that occur during geolocation
        console.error("Error getting geolocation:", error);
      });
    } else {
      // Geolocation is not supported
      console.error("Geolocation is not supported by this browser.");
    }

  }

  public getDistanceFromPincode(pincode: number): Observable<number> {
    return new Observable((observer) => {
      this.getLatLongFromPincode(pincode).subscribe((res: any) => {
        const { latitude, longitude } = res;
        const distance = this.getDistanceFromLatLonInKm(latitude, longitude, this.shopLatitue, this.shopLongitude);
        console.log('distance in km => ', distance);
        observer.next(distance);
      });
    });
  }

  private getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
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

  private getLatLongFromPincode(pincode: number) {
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
    }));
  }

}

import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AppService } from './app.service';
import { OrderService } from './products/order.service';
import { AppHelper } from './utils/app.helper';
import { LocationService } from './location.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(public appService: AppService, private location: LocationService) {

  }

  public ngOnInit(): void {
    // set user
    this.setUser();

    this.location.getDistanceFromLocation();
    this.location.getDistanceFromPincode(523001);
  }

  private setUser() {
    const user = AppHelper.getFromLocalStorage('scUser');
    console.log('df => ', user);
    if (user) {
      this.appService.user.update(() => user);
    }
  }
}

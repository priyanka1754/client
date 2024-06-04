import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AppService } from './app.service';
import { AppHelper } from './utils/app.helper';
import { LandingComponent } from './landing/landing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, LandingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(public appService: AppService) {

  }

  public ngOnInit(): void {
    // set user
    this.setUser();
  }

  private setUser() {
    const user = AppHelper.getFromLocalStorage('scUser');
    if (user) {
      this.appService.user.update(() => user);
    }
  }
}

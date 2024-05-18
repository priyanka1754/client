import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: 'profile.component.html',
  imports: [RouterModule]
})
export class ProfileComponent {
  constructor() { }
}


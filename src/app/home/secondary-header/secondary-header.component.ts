import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SearchBarComponent } from "./searchbar/searchbar.component";
import { LocationBarComponent } from "./locationbar/locationbar.component";

@Component({
  standalone: true,
  selector: 'app-secondary-header',
  templateUrl: 'secondary-header.component.html',
  imports: [FormsModule, SearchBarComponent, LocationBarComponent]
})
export class SecondaryHeaderComponent {




}

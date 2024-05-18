import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-searchbar',
  templateUrl: 'searchbar.component.html',
  imports: [RouterModule, FormsModule]
})
export class SearchBarComponent {
  public searchKey = '';
}

import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { BlockToyService } from "./blocktoy.service";

@Component({
  selector: 'app-block-toys',
  standalone: true,
  templateUrl: 'blocktoys.component.html',
  imports: [RouterModule]
})
export class BlockToysComponent {
  public blockProducts: any = [];

  constructor(private blockToyService: BlockToyService, private router: Router) {
    this.getBlockedProducts();
  }

  public getBlockedProducts() {
    this.blockToyService.getBlockToys().subscribe((res) => {
      console.log('resss => ', res);
      this.blockProducts = res;
    });
  }

  public loadProductDetails(product: any) {
    this.router.navigate(['productDetails', product.Code]);
  }
}

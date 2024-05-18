import { Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProductsService } from "../../../products/products.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-product-menu',
  standalone: true,
  templateUrl: 'product-menu.component.html',
  imports: [RouterModule, CommonModule]
})
export class ProductMenuComponent {
  @ViewChild('productMenu') public outerDiv!: ElementRef;
  public showMenu = false;
  public firstCategories: any[] = [];
  public secondCategories: any[] = [];
  public thirdCategories: any[] = [];
  public fourthCategories: any[] = [];
  public fifthCategories: any[] = [];

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    // Check if the clicked target is outside the outer div
    if (!this.outerDiv.nativeElement.contains(event.target)) {
      this.showMenu = false;
    }
  }

  constructor(private productService: ProductsService) {
    this.firstCategories = this.productService.getCategories().slice(0, 5);
    this.secondCategories = this.productService.getCategories().slice(5, 10);
    this.thirdCategories = this.productService.getCategories().slice(10, 15);
    this.fourthCategories = this.productService.getCategories().slice(15, 20);
    this.fifthCategories = this.productService.getCategories().slice(20, 25);
  }


}

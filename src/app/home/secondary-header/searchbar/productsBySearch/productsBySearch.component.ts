import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../products/products.service';
import { ProductsComponent } from '../../../../products/products.component';

@Component({
  selector: 'app-products-by-search',
  standalone: true,
  imports: [CommonModule, ButtonModule, ProductsComponent],
  templateUrl: './productsBySearch.component.html'
})
export class ProductsBySearchComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;

  public products: any = [];

  public searchkey: string = '';

  constructor(private productsService: ProductsService, private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchkey = params['searchKey'];
      this.getProductsBySearch();
    });
  }

  private getProductsBySearch(): void {
    this.productsService.getProductBySearchKey(this.searchkey).subscribe((resp) => {
      this.products = resp;
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { ProductsService } from './products.service';
import { ProductComponent } from './product/product.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ButtonModule, DataViewModule, ProductComponent, FormsModule],
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;

  public layout: 'grid' | 'list' = 'list';

  private _products: any = [];

  @Input()
  set products(value: any) {
    this._products = value;
    // if (this._products.length === 0) {
    //   this.copyProducts = this._products;
    // }
  }

  get products() {
    return this._products;
  }

  @Input()
  public filter = 'all';

  public copyProducts: any = [];

  public categories: { name: string, code: string }[] = [];

  public selectedCategory = null;

  public ages: { name: string, code: string }[] = [];

  public selectedAge = null;

  constructor(private productsService: ProductsService) {
    // this.getProducts();
    this.categories = this.productsService.getCategories();
    this.ages = [{
      name: '0-3 Years', code: 'preschool'
    }, {
      name: '3-6 Years', code: 'playschool'
    }, {
      name: '6+ Years', code: 'primaryschool'
    }];
  }

  public ngOnInit(): void {
    // console.log('products => ', this.products);
    // take a copy that can be used to reset filter
    this.copyProducts = this.products;
    console.log('copy => ', this.copyProducts);
  }

  public filterByCategory() {
    // to preserve when switch between categories
    this.products = this.copyProducts;
    this.products = this.products.filter((t: any) => t.Category === this.selectedCategory);
  }

  public filterByAge() {
    this.products = this.copyProducts;
    console.log('selected age => ', this.selectedAge);
    this.products = this.products.filter((t: any) => t.AgeType === this.selectedAge);
  }

  public clearFilter() {
    this.products = this.copyProducts;
    this.selectedAge = null;
    this.selectedCategory = null;
  }
}

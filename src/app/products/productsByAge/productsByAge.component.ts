import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import { ProductsComponent } from '../products.component';
import { AppLoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-products-by-age',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DataViewModule,
    ProductsComponent,
    AppLoaderComponent
  ],
  templateUrl: './productsByAge.component.html',
})
export class ProductsByAgeComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;

  public products: any = [];

  public ageType: string = '';

  public isLoading = true;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.ageType = params['agetype'];
      this.getProductsByAge();
    });
  }

  private getProductsByAge(): void {
    this.productsService.getProductsByAge(this.ageType).subscribe(
      (resp: any) => {
        this.products = resp;
        this.isLoading = false;
        window.scrollTo(0, 0);
      },
      () => {
        this.isLoading = true;
      }
    );
  }
}

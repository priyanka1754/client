import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import { ProductsComponent } from '../products.component';
import { AppLoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-products-by-membershipType',
  standalone: true,
  imports: [CommonModule, ButtonModule, ProductsComponent, AppLoaderComponent],
  templateUrl: 'productsByMembershipType.component.html',
})
export class ProductsByMembershipTypeComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;

  public products: any = [];

  public membershipType: string = '';

  public productsCount = 0;

  public isLoading = true;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.membershipType = params['membershipType'];
      this.getProductsByMembershipType();
    });
  }

  private getProductsByMembershipType(): void {
    this.productsService.getProductsByMembershipType(this.membershipType).subscribe(
      (resp: any) => {
        this.products = resp;
        this.isLoading = false;
      },
      () => {
        this.isLoading = true;
      }
    );
  }
}

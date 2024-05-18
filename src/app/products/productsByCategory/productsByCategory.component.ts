import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import { ProductsComponent } from '../products.component';

@Component({
    selector: 'app-products-by-category',
    standalone: true,
    imports: [CommonModule, ButtonModule, ProductsComponent],
    templateUrl: 'productsByCategory.component.html'
})
export class ProductsByCategoryComponent implements OnInit {
    @ViewChild('content') content!: ElementRef;

    public products: any = [];

    public category: string = '';

    public productsCount = 0;

    constructor(private productsService: ProductsService, private route: ActivatedRoute) {
    }

    public ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.category = params['category'];
            this.getProductsByCategory();
        });
    }

    private getProductsByCategory(): void {
        this.productsService.getProductsByCategory(this.category).subscribe((resp: any) => {
            this.products = resp;
        });
    }
}

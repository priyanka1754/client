import { Component } from '@angular/core';
import { WishlistService } from '../../products/product/product-details/wishlist.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  templateUrl: 'wishlist.component.html',
  imports: [RouterModule],
})
export class WishlistComponent {
  public wishlistItems: any = [];
  constructor(private wishlist: WishlistService, private router: Router) {
    this.getWishlistItems();
  }

  public getWishlistItems() {
    this.wishlist.getWishlistItems().subscribe((res) => {
      console.log('wishlist items => ', res.products);
      this.wishlistItems = res.products;
    });
  }

  public loadProductDetails(product: any) {
    this.router.navigate(['productDetails', product.Code]);
  }

  public removeFromWishlist(id: string) {
    this.wishlist.removeItemFromWishlist(id).subscribe(() => {
      this.getWishlistItems();
    });
  }
}

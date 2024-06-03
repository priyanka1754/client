import { Component, Input, OnInit } from "@angular/core";
import { WalletService } from "../../../../profile/wallet/wallet.service";
import { AppService } from "../../../../app.service";
import { AddMoneyComponent } from "../../../../profile/wallet/addMoney/addMoney.component";
import { CommonModule } from "@angular/common";
import { BlockPricePipe } from "../blockProductPrice.pipe";
import { AppHelper } from "../../../../utils/app.helper";
import { Router } from "@angular/router";
import { BlockToyService } from "../../../../profile/blocktoys/blocktoy.service";

@Component({
  selector: 'app-block-product',
  standalone: true,
  templateUrl: 'blockProduct.component.html',
  imports: [AddMoneyComponent, CommonModule, BlockPricePipe]
})
export class BlockProductComponent implements OnInit {
  public wallet: any;

  @Input()
  public product: any;

  public canBlockToy = true;

  public day7FromToday = '';

  public blockAmount = 0;

  public productBlocked = false;

  constructor(public appService: AppService, private router: Router, private blockToyService: BlockToyService, private walletService: WalletService) {

  }

  public ngOnInit(): void {
    this.day7FromToday = AppHelper.getParticularDateFromTodayByDays(7);
    console.log('userrrr => ', this.appService.user());
    if (this.appService.user()) {
      this.loadWallet();
    } else {
      this.blockAmount = this.getBlockAmount();
    }
  }

  public updateWallet(value: any) {
    console.log('value => ', value);
    this.wallet = value;
    this.canBeBlocked();
  }

  public loadBlockToys() {
    this.router.navigate(['profile', 'blockproduct']);
  }

  public blockProduct(product: any) {
    console.log('product => ', product);
    if (this.appService.user()) {
      const req = {
        product: product,
        storeId: product.StoreId,
        customerId: this.appService.user().CustomerId,
        blockAmount: this.blockAmount,
        blockDate: AppHelper.getFormattedDate(new Date(this.day7FromToday))
      }
      console.log('reee => ', req);
      this.blockToyService.addBlockToy(req).subscribe(() => {
        this.productBlocked = true;
      }, () => {
        this.productBlocked = false;
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  private canBeBlocked() {
    const totalAmount = this.wallet.totalAmount;
    this.blockAmount = this.getBlockAmount();
    if (totalAmount < this.blockAmount) {
      this.canBlockToy = false;
    } else {
      this.canBlockToy = true;
    }
  }

  private getBlockAmount() {
    return Math.round(this.product.rent30 * 0.2);
  }

  private loadWallet() {
    this.walletService.getWallet().subscribe((wallet: any) => {
      this.wallet = wallet;
      this.canBeBlocked();
    });
  }
}

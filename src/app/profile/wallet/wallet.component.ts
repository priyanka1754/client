import { Component, OnInit } from "@angular/core";
import { AddMoneyComponent } from "./addMoney/addMoney.component";
import { WalletService } from "./wallet.service";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-wallet',
  templateUrl: 'wallet.component.html',
  standalone: true,
  imports: [AddMoneyComponent, RouterModule]
})
export class WalletComponent implements OnInit {
  public wallet: any;
  constructor(private walletService: WalletService) { }

  public ngOnInit(): void {
    this.walletService.getWallet().subscribe((wallet: any) => {
      console.log("wallet ===>>> ", wallet);
      this.wallet = wallet;
    });
  }

  public updateWallet(value: any) {
    console.log('value => ', value);
    this.wallet = value;
  }
}

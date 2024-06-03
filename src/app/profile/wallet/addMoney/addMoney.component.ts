import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { WalletService } from "../wallet.service";

@Component({
  selector: 'app-add-money',
  templateUrl: 'addMoney.component.html',
  standalone: true,
  imports: [FormsModule]
})
export class AddMoneyComponent {
  public amount = 0;

  @Output()
  public emitWallet: EventEmitter<any> = new EventEmitter<any>();

  constructor(public walletService: WalletService) { }

  public addMoney() {
    this.walletService.addMoney(this.amount).subscribe((res: any) => {
      console.log('res => ', res);
      this.amount = 0;
      this.emitWallet.emit(res.toyWallet);
    });
  }
}

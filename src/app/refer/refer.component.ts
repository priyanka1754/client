import { Component } from "@angular/core";
import { AppService } from "../app.service";
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-refer',
  templateUrl: 'refer.component.html',
  standalone: true,
  imports: [ClipboardModule]
})
export class ReferComponent {
  public referralCode = '';
  constructor(public appService: AppService, private clipboard: Clipboard) {
    this.referralCode = this.appService.user().referralCode;
  }

  public copyReferralCode() {
    const message = `Hey, I am renting toys from SkipCry Toy Library. My kid is having lots of fun and good learning experience. I recommend you also to try out https://www.skipcry.com Get \u20B9200 discount with my referral Code ${this.referralCode}`;
    this.clipboard.copy(message);
  }

  public share() {
    const message = `Hey, I am renting toys from SkipCry Toy Library. My kid is having lots of fun and good learning experience. I recommend you also to try out https://www.skipcry.com Get \u20B9200 discount with my referral Code ${this.referralCode}`;

    // Generate the WhatsApp sharing link
    const whatsappLink = `https://api.whatsapp.com/send?text=${message}`;
    window.open(whatsappLink);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-giftCardForm',
  templateUrl: 'giftcard_form.component.html',
  standalone: true,
  imports: [CommonModule,FormsModule]
})

export class GiftCardFormComponent {
  giftCard: GiftCard = {
    sender: '',
    receiver: '',
    receiver_mail: '',
    receiver_mobile: '',
    message: '',
    selectAmount: '',
    date: '',
    quantity: 1,
    amount: 0 // Initialize the amount property
  };

  selectAmount(amount: string) {
    this.giftCard.amount = parseInt(amount, 10);
  }

  constructor(private http: HttpClient) { }
  onSubmit() {
    this.http.post('http://localhost:3000/api/giftcard_form', this.giftCard).subscribe((response) => {
      console.log(response);
    }, (error) => {
      console.error(error);
    });
  }
}


// Assuming this is your TypeScript interface or class definition for giftCard
interface GiftCard {
  sender: string;
  receiver: string;
  receiver_mail: string;
  receiver_mobile: string;
  message: string;
  selectAmount: string;
  date: string;
  quantity: number;
  amount: number; // Add this line to include the amount property
}
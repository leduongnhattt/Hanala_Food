import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-payment',
    imports: [RouterLink],
    templateUrl: './payment.component.html',
    styleUrl: './payment.component.css'
})
export class PaymentComponent {
  selectedMethod: string = '';

  selectMethod(method: string) {
    this.selectedMethod = method;
  }
}

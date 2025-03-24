import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-discount',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.css'
})
export class DiscountComponent {
  newCoupon: string = '';
  coupons = [
    { code: 'HAPPYNEWYEAR', discount: 5, expiry: '01/12/2025' },
    { code: 'HAPPYNEWYEAR', discount: 5, expiry: '01/12/2025' },
    { code: 'HAPPYNEWYEAR', discount: 5, expiry: '01/12/2025' },
    { code: 'HAPPYNEWYEAR', discount: 5, expiry: '01/12/2025' },
    { code: 'HAPPYNEWYEAR', discount: 5, expiry: '01/12/2025' },
    { code: 'HAPPYNEWYEAR', discount: 5, expiry: '01/12/2025' },
  ]
  addCoupon() {
    if (this.newCoupon.trim()) {
      this.coupons.push({ code: this.newCoupon, discount: 5, expiry: '01/12/2025' });
      this.newCoupon = '';
    }
  }
  copyCoupon(code: string) {
    navigator.clipboard.writeText(code);
    alert('Copied: ' + code);
  }

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  imports: [CommonModule, RouterLink],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  items = [
    { name: 'Hamburger', price: 3.88, image: 'assets/images/item1.jpg', quantity: 0 },
    { name: 'Toffee’s Cake', price: 4.00, image: 'assets/images/item1.jpg', quantity: 0 },
    { name: 'Pancake', price: 1.99, image: 'assets/images/item1.jpg', quantity: 0 },
    { name: 'Crispy Sandwich', price: 3.00, image: 'assets/images/item1.jpg', quantity: 0 }
  ];

  increaseQuantity(index: number) {
    this.items[index].quantity++;
  }

  decreaseQuantity(index: number) {
    if (this.items[index].quantity > 0) {
      this.items[index].quantity--;
    }
  }
  proceedToPayment() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl("/payment");
    }
    else {
      this.toastr.error("You must be logged in to make a payment!");
    }
  }
}

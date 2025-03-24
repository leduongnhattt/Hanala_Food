import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  imports: [RouterLink, CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  orders = [
    { name: 'Hamburger', status: 'Pending', total: 21.69, quantity: 3, image: 'assets/images/item1.jpg' },
    { name: 'Pitrency', status: 'Pending', total: 100.3, quantity: 3, image: 'assets/images/item1.jpg' },
    { name: 'Fish Fried', status: 'Delivered', total: 11.69, quantity: 1, image: 'assets/images/item1.jpg' },
    { name: 'Tacos', status: 'Delivered', total: 10.44, quantity: 1, image: 'assets/images/item1.jpg' },
    { name: 'Sapaghetti', status: 'Delivered', total: 51.69, quantity: 3, image: 'assets/images/item1.jpg' },
  ]
}

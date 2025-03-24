import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { NavComponent } from "../../layout/nav/nav.component";
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FoodListComponent } from '../food-list/food-list.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, FormsModule, NavComponent, RouterModule, FoodListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isChatboxVisible = false;
  searchText = '';
  constructor(@Inject(PLATFORM_ID) private platformId: object,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,) { }
  messages: { text: string, type: string }[] = [
    { text: "Hey, Congratulations for order", type: "received" },
    { text: "I’m Coming, just wait ...", type: "received" },
    { text: "Are you coming?", type: "sent" },
    { text: "Hey, Where are you now?", type: "sent" },
    { text: "Hurry up, Man", type: "sent" }
  ];
  items = [
    { name: 'Hamburger', location: 'Thanh Khe', price: '$3.88', image: 'assets/images/item1.jpg' },
    { name: 'Toffe\'s Cake', location: 'Cho Con', price: '$4.00', image: 'assets/images/item1.jpg' },
    { name: 'Dancake', location: 'Cam Le', price: '$1.99', image: 'assets/images/item1.jpg' },
    { name: 'Dancoooyoiiake', location: 'Cam Le', price: '$1.99', image: 'assets/images/item1.jpg' },
    { name: 'Pizza', location: 'Hai Chau', price: '$5.99', image: 'assets/images/item1.jpg' },
    { name: 'Hamburger', location: 'Thanh Khe', price: '$3.88', image: 'assets/images/item1.jpg' },
    { name: 'Toffe\'s Cake', location: 'Cho Con', price: '$4.00', image: 'assets/images/item1.jpg' },
    { name: 'Dancake', location: 'Cam Le', price: '$1.99', image: 'assets/images/item1.jpg' },
    { name: 'Dancoooyoiiake', location: 'Cam Le', price: '$1.99', image: 'assets/images/item1.jpg' },
    { name: 'Pizza', location: 'Hai Chau', price: '$5.99', image: 'assets/images/item1.jpg' },
  ];
  isSearching = false;
  currentPosition = 0;
  cardWidth = 0;
  filteredItems = [...this.items];
  ngOnInit(): void {
    this.filteredItems = [...this.items];
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const cardElement = document.querySelector('.cards');
        if (cardElement instanceof HTMLElement) {
          this.cardWidth = cardElement.offsetWidth + 15;
          console.log('Card width:', this.cardWidth);
        }
      }, 100);
    }

    if (!this.authService.checkTokenExpiration() && this.authService.isLoggedIn()) {
      console.log("Token expired, showing toast...");

      if (this.authService.getToken()) {
        setTimeout(() => {
          this.toastr.error('Session expired, please login again', 'Session expired');
          this.cdr.detectChanges();
        }, 3000);
      }

      this.authService.deleteToken();
      this.router.navigateByUrl('/login');
    }
  }

  get transformStyle(): string {
    return `translateX(-${this.currentPosition * this.cardWidth}px)`;
  }

  next(): void {
    const cardsToShow = 5;
    const maxPosition = this.items.length - cardsToShow;
    if (this.currentPosition < maxPosition) {
      this.currentPosition++;
    }
    else {
      this.currentPosition = 0;
    }
    this.cdr.detectChanges();
  }

  prev(): void {
    if (this.currentPosition > 0) {
      this.currentPosition--;
    } else {
      this.currentPosition = this.items.length - 5;
    }
    this.cdr.detectChanges();
  }
  newMessage: string = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ text: this.newMessage, type: "sent" });
      this.newMessage = '';
    }
  }
  toggleChatbox() {
    this.isChatboxVisible = !this.isChatboxVisible;
  }
  onSearchTextChange() {
    if (this.searchText.trim().length === 0) {
      this.isSearching = false;
    }
  }
  searchFood() {
    this.isSearching = true;
    // console.log(this.searchText);
    this.filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
    console.log(this.filteredItems)
  }
}

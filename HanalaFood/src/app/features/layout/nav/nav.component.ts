import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  isChatboxVisible = false;

  messages: { text: string, type: string }[] = [
    { text: "Hey, Congratulations for order", type: "received" },
    { text: "I’m Coming, just wait ...", type: "received" },
    { text: "Are you coming?", type: "sent" },
    { text: "Hey, Where are you now?", type: "sent" },
    { text: "Hurry up, Man", type: "sent" }
  ];
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
  constructor(public authService: AuthService, private router: Router) { }

  logout() {
    this.authService.deleteToken();
    this.router.navigateByUrl('/home');
  }
}

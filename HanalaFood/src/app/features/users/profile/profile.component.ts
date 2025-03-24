import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-profile',
    imports: [ReactiveFormsModule, FormsModule, RouterLink],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileForm!: FormGroup;
  initialFormValue!: any;
  showPassword: boolean = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: ['Cristiano Ronaldo'],
      email: ['ronaldoistheGOAT@gmail.com'],
      address: ['45, Manchester City, England'],
      contactNumber: ['89427389748'],
      city: ['Manchester'],
      state: ['Arabia'],
      password: ['anhbaydeptrai']
    });

    this.initialFormValue = this.profileForm.value;
  }
  isFormChanged(): boolean {
    return JSON.stringify(this.initialFormValue) !== JSON.stringify(this.profileForm.value);
  }

  onSave() {
    if (this.isFormChanged()) {
      console.log('Saving data...', this.profileForm.value);
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}

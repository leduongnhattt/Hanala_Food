import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  isPasswordVisible = false;
  isConfirmPasswordVisible = false;
  isSubmitted: boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  togglePassword(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.isPasswordVisible = !this.isPasswordVisible;
    } else {
      this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
    }
  }
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (!confirmPassword || !password) {
      return null;
    }

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Data:', this.registerForm.value);
      this.authService.registerAccount(this.registerForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.status === "Success") {
            this.registerForm.reset();
            this.isSubmitted = false;
            this.toastr.success('New user created!', 'Registration Successful');
            this.router.navigateByUrl('/login');
          }
        },
        error: err => {
          if (err.status === 409) {
            this.toastr.error('Username or email already exists.', 'Registration Failed');
            this.registerForm.reset();
          } else {
            this.toastr.error('An error occurred.', 'Registration Failed');
          }
          this.registerForm.reset();
          console.log('API Error:', err);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}

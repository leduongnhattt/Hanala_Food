import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isPasswordVisible = false;
  loginForm: FormGroup;
  isSubmitted: boolean = false;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      console.log('Form Data:', this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log('Login success:', res);
          this.toastr.success('Login Successfully!', 'Login success');
          this.authService.saveToken(res.token);
          this.router.navigateByUrl('/home');
        },
        error: err => {
          if (err.status == 400) {
            this.toastr.error('Incorrect username or password', 'Login failed');
            this.loginForm.reset();
            this.isSubmitted = false;
          }
          else {
            console.log('error during login: \n', err)
          }
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}

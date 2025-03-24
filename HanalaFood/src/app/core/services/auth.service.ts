import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { TOKEN_KEY } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  constructor(private router: Router, private http: HttpClient) { }
  registerAccount(formData: any): Observable<any> {
    return this.http.post(environment.apiAuthUrl + '/register', formData);
  }
  login(formData: any): Observable<any> {
    return this.http.post(`${environment.apiAuthUrl}/login`, formData);
  }
  refreshToken(): Observable<any> {
    return this.http.post(`${environment.apiAuthUrl}/refresh`, {}, { withCredentials: true }).pipe(
      tap((response: any) => {
        if (response?.AccessToken) {
          this.saveToken(response.AccessToken);
        }
      }),
      catchError((error) => {
        this.deleteToken();
        this.router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  getToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  }
  saveToken(token: string): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  }
  deleteToken(): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem(TOKEN_KEY);
    }
  }
  checkTokenExpiration(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp >= currentTime;
    } catch (error) {
      console.error('Invalid Token:', error);
      return false;
    }
  }
}

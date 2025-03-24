import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastrService);
  const token = authService.getToken();

  let authReq = req;

  if (token) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  return next(authReq).pipe(
    catchError((error: any) => {
      if (error.status === 401) {
        // Nếu token hết hạn, thử refresh token
        return authService.refreshToken().pipe(
          switchMap((newToken: any) => {
            if (newToken?.AccessToken) {
              authService.saveToken(newToken.AccessToken);
              const clonedRequest = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${newToken.AccessToken}`)
              });
              return next(clonedRequest);
            }
            return throwError(() => error);
          }),
          catchError(() => {
            authService.deleteToken();
            toast.info('Please login again', 'Session Expired!');
            router.navigateByUrl('/login');
            return throwError(() => error);
          })
        );
      } else if (error.status === 403) {
        toast.error('You are not authorized to access this resource', 'Forbidden!');
      }

      return throwError(() => error);
    })
  );
};

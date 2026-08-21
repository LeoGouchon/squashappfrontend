import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';
import { AppRoutes } from '../../AppRoutes';
import { environment } from '../../../environments/environment';

export function error401Interceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const tokenService = inject(TokenService);
    const router = inject(Router);

    return next(req).pipe(
        catchError(error => {
            if (error.status !== 401 || req.url.startsWith(environment.identityIssuer) || req.url.includes('/me')) {
                return throwError(() => error);
            }

            return tokenService.refreshToken().pipe(
                switchMap(({ token }) => next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }))),
                catchError(refreshError => {
                    tokenService.clearToken();
                    void router.navigate([AppRoutes.LOGIN]);
                    return throwError(() => refreshError);
                })
            );
        })
    );
}

import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import { inject } from '@angular/core';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {TokenService} from '../token.service';
import {Router} from '@angular/router';
import {AppRoutes} from '../../AppRoutes';

export function error401Interceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const tokenService = inject(TokenService);
    const router = inject(Router);

    return next(req).pipe(
        catchError(err => {
            if (err.status === 401 && !req.url.includes('/authenticate/')) {
                return tokenService.refreshToken().pipe(
                    switchMap(({ token: newToken }: { token: string }) => {
                        const cloned = req.clone({
                            setHeaders: { Authorization: `Bearer ${newToken}` },
                            withCredentials: true
                        });
                        return next(cloned);
                    }),
                    catchError(refreshErr => {
                        tokenService.clearToken();
                        void router.navigate([AppRoutes.LOGIN]);
                        return throwError(() => refreshErr);
                    })
                );
            }
            return throwError(() => err);
        })
    );
}

import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import { inject } from '@angular/core';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {TokenService} from '../token.service';

export function error401Interceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const tokenService = inject(TokenService);

    return next(req).pipe(
        catchError(err => {
            if (err.status === 401 && !req.url.includes('/refresh-token')) {
                return tokenService.refreshToken().pipe(
                    switchMap(newToken => {
                        tokenService.setAccessToken(newToken);
                        const cloned = req.clone({
                            setHeaders: { Authorization: `Bearer ${newToken}` },
                            withCredentials: true
                        });
                        return next(cloned);
                    }),
                    catchError(refreshErr => {
                        return throwError(() => refreshErr);
                    })
                );
            }
            return throwError(() => err);
        })
    );
}

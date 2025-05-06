import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {filter, Observable, switchMap, take} from 'rxjs';
import {TokenService} from '../token.service';
import {inject} from '@angular/core';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const tokenService = inject(TokenService);
    const token = tokenService.getAccessToken();

    if (req.url.includes('/authenticate/refresh-token')) {
        const modifiedReq = req.clone({
            withCredentials: true
        })
        return next(modifiedReq);
    }

    if (token) {
        const modifiedReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
            withCredentials: true
        });
        return next(modifiedReq);
    }

    return tokenService.tokenReady$.pipe(
        filter(t => !!t), // attend qu'un token non-null soit émis
        take(1),
        switchMap((validToken) => {
            const modifiedReq = req.clone({
                setHeaders: { Authorization: `Bearer ${validToken}` },
                withCredentials: true
            });
            return next(modifiedReq);
        })
    );
}

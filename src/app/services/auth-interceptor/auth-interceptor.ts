import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import {TokenService} from '../token.service';
import {inject} from '@angular/core';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const tokenService = inject(TokenService);
    const token = tokenService.getAccessToken();
    const isAuthEndpoint = req.url.includes('/authenticate/');

    if (isAuthEndpoint) {
        return next(req.clone({
            withCredentials: true
        }));
    }

    if (tokenService.isRefreshingToken()) {
        return tokenService.refreshToken().pipe(
            switchMap(({token: refreshedToken}) => next(req.clone({
                setHeaders: {Authorization: `Bearer ${refreshedToken}`},
                withCredentials: true
            })))
        );
    }

    if (!token) {
        return next(req.clone({
            withCredentials: true
        }));
    }

    return next(req.clone({
        setHeaders: {Authorization: `Bearer ${token}`},
        withCredentials: true
    }));
}

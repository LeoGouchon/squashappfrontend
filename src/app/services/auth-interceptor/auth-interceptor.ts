import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { TokenService } from '../token.service';
import { environment } from '../../../environments/environment';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const tokenService = inject(TokenService);

    if (req.url.startsWith(environment.identityIssuer)) {
        return next(req);
    }

    if (tokenService.isRefreshingToken()) {
        return tokenService.refreshToken().pipe(
            switchMap(({ token }) => next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })))
        );
    }

    const token = tokenService.getAccessToken();
    return next(token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req);
}

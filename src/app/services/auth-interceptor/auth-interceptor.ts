import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from '../token.service';
import {inject} from '@angular/core';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const tokenService = inject(TokenService);

    let modifiedReq = req.clone({ withCredentials: true });
    const token = tokenService.getAccessToken();

    if (token) {
        modifiedReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(modifiedReq);
}

import { Injectable } from '@angular/core';
import { Observable, from, timeout } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiUserInterface } from './api-user.interface';
import { TokenService } from '../token.service';

@Injectable({ providedIn: 'root' })
export class ApiUserService implements ApiUserInterface {
    private readonly apiUrl = environment.apiUrl;
    private readonly timeoutValue = environment.timeoutValue;

    constructor(private readonly http: HttpClient, private readonly tokenService: TokenService) {}

    login(): Observable<void> {
        return from(this.tokenService.login());
    }

    logout(): Observable<void> {
        return from(this.tokenService.logout());
    }

    getCurrentUser() {
        return this.http.get(`${this.apiUrl}/me`).pipe(timeout(this.timeoutValue));
    }
}

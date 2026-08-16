import { Injectable } from '@angular/core';
import { Observable, from, timeout } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiUserInterface } from './api-user.interface';
import { TokenService } from '../token.service';
import { User } from '../../types/user.type';

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

    getCurrentUser(): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/me`).pipe(timeout(this.timeoutValue));
    }
}

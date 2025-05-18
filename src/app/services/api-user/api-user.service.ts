import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, tap, timeout} from 'rxjs';
import {ApiUserInterface} from './api-user.interface';
import {TokenService} from '../token.service';
import {NavigationService} from '../navigation.service';
import {AppRoutes} from '../../AppRoutes';

@Injectable({
    providedIn: 'root'
})
export class ApiUserService implements ApiUserInterface {
    private readonly apiUrl = environment.apiUrl;
    private readonly timeoutValue: number = environment.timeoutValue;

    constructor(private readonly http: HttpClient, private readonly tokenService: TokenService, private readonly navigationService: NavigationService) {
        this.tokenService = tokenService;
        this.navigationService = navigationService;
    }

    login(email: string, password: string) {
        return this.http.post<{ token: string }>(this.apiUrl + '/authenticate/login', {email, password}).pipe(
            timeout(this.timeoutValue),
            tap(response => {
                const accessToken = response.token;
                this.tokenService.setAccessToken(accessToken);
            })
        );
    }

    logout() {
        return this.http.post(this.apiUrl + '/authenticate/logout', {}).pipe(
            timeout(this.timeoutValue),
            tap(_ => {
                this.tokenService.clearToken()
                this.navigationService.navigateTo(AppRoutes.LOGIN)
            })
        );
    }

    signup(email: string, password: string, invitationToken: string) {
        return this.http.post<{ token: string }>(this.apiUrl + '/authenticate/signup' + "?token=" + invitationToken, {email, password}).pipe(
            timeout(this.timeoutValue),
            tap(response => {
                const accessToken = response.token;
                this.tokenService.setAccessToken(accessToken);
            }));
    }

    getCurrentUser(): Observable<any> {
        return this.http.get(this.apiUrl + '/me').pipe(
            timeout(this.timeoutValue),
            tap((response: any) => {return response;})
        );
    }
}

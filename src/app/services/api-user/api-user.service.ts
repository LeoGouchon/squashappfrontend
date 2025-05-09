import {Injectable} from '@angular/core';
import {environment} from '../../../../environment';
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

    signup(email: string, password: string) {
        return this.http.post<{ token: string }>(this.apiUrl + '/authenticate/signup', {email, password}).pipe(
            timeout(this.timeoutValue),
            tap(response => {
                const accessToken = response.token;
                this.tokenService.setAccessToken(accessToken);
            }));
    }

    getCurrentUser(): Observable<any> {
        const token = document.cookie.split(';').find(x => x.trim().startsWith('token='))?.split('=')[1];
        if (token) {
            return this.http.get(this.apiUrl + '/users/token/' + token).pipe(timeout(this.timeoutValue));
        } else {
            return new Observable<any>(observer => {
                observer.error(new Error('No token found'));
            });
        }
    }

    linkPlayer(userId: number, playerId: number): Observable<any> {
        return this.http.put(this.apiUrl + '/users/' + userId, {
            player: {
                id: playerId,
            }
        })
            .pipe(timeout(this.timeoutValue));
    }
}

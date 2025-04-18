import {Injectable} from '@angular/core';
import {environment} from '../../../../environment';
import {HttpClient} from '@angular/common/http';
import {Observable, tap, timeout} from 'rxjs';
import {ApiUserInterface} from './api-user.interface';
import {TokenService} from '../token.service';
import {NavigationService} from '../navigation.service';

@Injectable({
    providedIn: 'root'
})
export class ApiUserService implements ApiUserInterface {
    private apiUrl = environment.apiUrl;
    private timeoutValue: number = environment.timeoutValue;

    constructor(private http: HttpClient, private tokenService: TokenService, private navigationService: NavigationService) {
        this.tokenService = tokenService;
        this.navigationService = navigationService;
    }

    login(email: string, password: string) {
        return this.http.post<{ token: string }>(this.apiUrl + '/authenticate/login', {email, password}).pipe(
            timeout(this.timeoutValue),
            tap(response => {
                document.cookie = `token=${response.token}; path=/;`;
            })
        );
    }

    logout(token: string) {
        console.log("LOGOUT" + token)
        return this.http.post(this.apiUrl + '/authenticate/logout', {token}).pipe(
            timeout(this.timeoutValue),
            tap(_ => {
                this.tokenService.removeToken()
                this.navigationService.navigateTo("/")
            })
        );
    }

    signup(email: string, password: string, playerId?: number) {
        let data: { email: string, password: string, player?: { id: number } } = {email, password};
        if (playerId) {
            data = {...data, player: {id: playerId}};
        }
        return this.http.post<{ token: string }>(this.apiUrl + '/authenticate/signup', data).pipe(
            timeout(this.timeoutValue),
            tap(response => {
                if (response.token != null) {
                    document.cookie = `token=${response.token}; path=/;`;
                }
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

    linkPlayer(userId: number, playerId: number) {
        return this.http.put(this.apiUrl + '/users/' + userId, {
            player: {
                id: playerId
            }
        })
            .pipe(timeout(this.timeoutValue));
    }
}

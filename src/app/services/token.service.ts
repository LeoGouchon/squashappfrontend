import {Injectable} from '@angular/core';
import {BehaviorSubject, firstValueFrom, Observable, timeout} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../types/user.type';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private readonly apiUrl = environment.apiUrl;
    private readonly timeoutValue: number = environment.timeoutValue;

    private readonly accessToken$ = new BehaviorSubject<string | null>(null);
    public tokenReady$ = this.accessToken$.asObservable();

    private isAdmin: boolean = false;
    private accessToken: string | null = null;
    private user: User | null = null;

    constructor(private readonly http: HttpClient) {}

    async initAuth(): Promise<void> {
        try {
            const response = await firstValueFrom(this.refreshToken());
            this.setAccessToken(response.token);
        } catch (error) {
            this.setAccessToken(null);
            console.error(error);
        }
    }

    setAccessToken(token: string | null) {
        this.accessToken = token;
        this.accessToken$.next(token);
    }

    getAccessToken(): string | null {
        return this.accessToken;
    }

    clearToken(): void {
        this.accessToken = null;
    }

    refreshToken(): Observable<any> {
        return this.http.post(this.apiUrl + '/authenticate/refresh-token', {}).pipe();
    }

    getIsAdmin(): boolean {
        return this.isAdmin;
    }

    fetchIsAdmin(): void {
        this.http.get(this.apiUrl + '/me').pipe(timeout(this.timeoutValue)).subscribe(
            (response: any) => {
                this.user = response;
                this.isAdmin = response.admin;
            }
        );
    }

    getUser(): User | null {
        return this.user;
    }
}

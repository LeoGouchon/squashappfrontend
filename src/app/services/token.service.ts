import {Injectable} from '@angular/core';
import {BehaviorSubject, finalize, firstValueFrom, Observable, shareReplay, tap, timeout} from 'rxjs';
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
    private refreshTokenRequest$: Observable<{ token: string }> | null = null;
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

    isRefreshingToken(): boolean {
        return !!this.refreshTokenRequest$;
    }

    clearToken(): void {
        this.accessToken = null;
        this.accessToken$.next(null);
        this.isAdmin = false;
        this.user = null;
    }

    refreshToken(): Observable<{ token: string }> {
        if (this.refreshTokenRequest$) {
            return this.refreshTokenRequest$;
        }

        this.refreshTokenRequest$ = this.http.post<{ token: string }>(
            this.apiUrl + '/authenticate/refresh-token',
            null,
            {withCredentials: true}
        ).pipe(
            tap(response => this.setAccessToken(response.token)),
            finalize(() => this.refreshTokenRequest$ = null),
            shareReplay({bufferSize: 1, refCount: false})
        );

        return this.refreshTokenRequest$;
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

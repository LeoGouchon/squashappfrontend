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
    private readonly accessTokenStorageKey = 'squashapp.accessToken';

    private readonly accessToken$ = new BehaviorSubject<string | null>(this.getStoredAccessToken());
    public tokenReady$ = this.accessToken$.asObservable();

    private isAdmin: boolean = false;
    private refreshTokenRequest$: Observable<{ token: string }> | null = null;
    private user: User | null = null;

    constructor(private readonly http: HttpClient) {}

    async initAuth(): Promise<void> {
        if (this.getAccessToken()) {
            return;
        }

        try {
            await firstValueFrom(this.refreshToken());
        } catch (error) {
            this.clearToken();
            console.error(error);
        }
    }

    setAccessToken(token: string | null) {
        if (token) {
            this.storeAccessToken(token);
        } else {
            this.removeStoredAccessToken();
        }

        this.accessToken$.next(token);
    }

    getAccessToken(): string | null {
        return this.getStoredAccessToken();
    }

    isRefreshingToken(): boolean {
        return !!this.refreshTokenRequest$;
    }

    clearToken(): void {
        this.setAccessToken(null);
        this.isAdmin = false;
        this.user = null;
    }

    private getStoredAccessToken(): string | null {
        try {
            return globalThis.localStorage?.getItem(this.accessTokenStorageKey) ?? null;
        } catch {
            return null;
        }
    }

    private storeAccessToken(token: string): void {
        try {
            globalThis.localStorage?.setItem(this.accessTokenStorageKey, token);
        } catch {
            // Storage can be unavailable in private browsing or restricted mobile contexts.
        }
    }

    private removeStoredAccessToken(): void {
        try {
            globalThis.localStorage?.removeItem(this.accessTokenStorageKey);
        } catch {
            // Storage can be unavailable in private browsing or restricted mobile contexts.
        }
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

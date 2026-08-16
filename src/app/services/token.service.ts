import { Injectable } from '@angular/core';
import { User as OidcUser } from 'oidc-client-ts';
import { Observable, defer, finalize, from, map, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { oauthClient, randomState } from '../auth/config';
import { User as ApplicationUser } from '../types/user.type';

@Injectable({ providedIn: 'root' })
export class TokenService {
    private readonly apiUrl = environment.apiUrl;
    private user: OidcUser | null = null;
    private applicationUser: ApplicationUser | null = null;
    private isAdmin = false;
    private refreshTokenRequest$: Observable<{ token: string }> | null = null;

    constructor(private readonly http: HttpClient) {}

    async initAuth(): Promise<void> {
        const query = new URLSearchParams(globalThis.location.search);

        if (query.has('code')) {
            this.user = (await oauthClient.signinCallback()) ?? null;
            this.cleanCallbackUrl();
        } else if (query.has('state')) {
            try {
                await oauthClient.signoutCallback();
                await oauthClient.removeUser();
            } finally {
                this.cleanCallbackUrl();
            }
        } else {
            this.user = await oauthClient.getUser();
        }

        if (this.user?.expired) {
            try {
                this.user = await oauthClient.signinSilent();
            } catch {
                await this.clearUser();
            }
        }
    }

    async login(returnTo = `${globalThis.location.pathname}${globalThis.location.search}`): Promise<void> {
        await oauthClient.signinRedirect({
            state: { returnTo: this.safeReturnTo(returnTo) },
            nonce: randomState(),
            prompt: 'login',
        });
    }

    async logout(): Promise<void> {
        const currentUser = this.user ?? await oauthClient.getUser();
        try {
            if (currentUser?.refresh_token) {
                await fetch(`${environment.identityIssuer}/oauth2/revoke`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ token: currentUser.refresh_token }),
                });
            }
        } finally {
            await oauthClient.signoutRedirect({
                post_logout_redirect_uri: environment.identityPostLogoutRedirectUri,
                state: randomState(),
                extraQueryParams: { client_id: oauthClient.settings.client_id },
            });
        }
    }

    getAccessToken(): string | null {
        return this.user && !this.user.expired ? this.user.access_token : null;
    }

    getIsAdmin(): boolean {
        return this.isAdmin;
    }

    isRefreshingToken(): boolean {
        return !!this.refreshTokenRequest$;
    }

    refreshToken(): Observable<{ token: string }> {
        if (this.refreshTokenRequest$) {
            return this.refreshTokenRequest$;
        }

        this.refreshTokenRequest$ = defer(() => from(oauthClient.signinSilent())).pipe(
            map(user => {
                if (!user) {
                    throw new Error('La session OIDC est introuvable');
                }
                this.user = user;
                return { token: user.access_token };
            }),
            finalize(() => this.refreshTokenRequest$ = null),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        return this.refreshTokenRequest$;
    }

    clearToken(): void {
        this.user = null;
        this.applicationUser = null;
        this.isAdmin = false;
        void oauthClient.removeUser();
    }

    fetchIsAdmin(): void {
        this.http.get<any>(`${this.apiUrl}/me`).pipe().subscribe({
            next: response => {
                this.applicationUser = response as ApplicationUser;
                this.isAdmin = response.admin === true;
            },
            error: () => this.isAdmin = false,
        });
    }

    getUser(): ApplicationUser | null {
        return this.applicationUser;
    }

    private async clearUser(): Promise<void> {
        this.clearToken();
    }

    private cleanCallbackUrl(): void {
        globalThis.history.replaceState({}, document.title, globalThis.location.pathname);
    }

    private safeReturnTo(value: string): string {
        try {
            const url = new URL(value, globalThis.location.origin);
            return url.origin === globalThis.location.origin
                ? `${url.pathname}${url.search}${url.hash}`
                : '/';
        } catch {
            return '/';
        }
    }
}

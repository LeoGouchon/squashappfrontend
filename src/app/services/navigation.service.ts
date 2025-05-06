import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {TokenService} from './token.service';

export interface NavigationServiceInterface {
    checkTokenAndNavigate(): Promise<void>;
    navigateTo(url: string): void;
    goBack(): void;
}

@Injectable({
    providedIn: 'root'
})
export class NavigationService implements NavigationServiceInterface {

    constructor(
        private readonly router: Router,
        private readonly tokenService: TokenService
    ) {
    }

    async checkTokenAndNavigate(): Promise<void> {
        await this.tokenService.initAuth();
        if (!this.tokenService.getAccessToken()) {
            await this.router.navigate(['/login']);
        }
    }

    navigateTo(url: string) {
        if (!this.tokenService.getAccessToken()) {
            this.router.navigate(['/login']);
        } else {
            this.router.navigate([url]);
        }
    }

    goBack() {
        if (!this.tokenService.getAccessToken()) {
            this.router.navigate(['/login']);
        } else {
            this.router.navigate(['/']);
        }
    }
}

import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {TokenService} from './token.service';

export interface NavigationServiceInterface {
    checkTokenAndNavigate(): void;
    navigateTo(url: string): void;
    goBack(): void;
}

@Injectable({
    providedIn: 'root'
})
export class NavigationService implements NavigationServiceInterface {

    constructor(
        private router: Router,
        private tokenService: TokenService
    ) {
    }

    checkTokenAndNavigate() {
        if (!this.tokenService.isTokenPresent()) {
            this.router.navigate(['/login']);
        }
    }

    navigateTo(url: string) {
        if (!this.tokenService.isTokenPresent()) {
            this.router.navigate(['/login']);
        } else {
            this.router.navigate([url]);
        }
    }

    goBack() {
        if (!this.tokenService.isTokenPresent()) {
            this.router.navigate(['/login']);
        } else {
            this.router.navigate(['/']);
        }
    }
}

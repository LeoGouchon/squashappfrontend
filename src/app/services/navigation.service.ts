import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

export interface NavigationServiceInterface {
    navigateTo(url: string): void;
    goBack(): void;
}

@Injectable({
    providedIn: 'root'
})
export class NavigationService implements NavigationServiceInterface {

    constructor(private router: Router) {
    }

    navigateTo(url: string) {
        this.router.navigate([url]);
    }

    goBack() {
        this.router.navigate(['/']);
    }
}

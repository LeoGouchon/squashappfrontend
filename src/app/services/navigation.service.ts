import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {TokenService} from './token.service';
import {AppRoutes} from '../AppRoutes';
import {MatchService} from './match-service.service';
import {ConfirmationService} from 'primeng/api';
import {EMPTY, from, map, Observable, of, switchMap} from 'rxjs';

export interface NavigationServiceInterface {
    checkTokenAndNavigate(): Observable<void>;

    navigateTo(url: string): void;
}

@Injectable({
    providedIn: 'root'
})
export class NavigationService implements NavigationServiceInterface {

    constructor(
        private readonly router: Router,
        private readonly tokenService: TokenService,
        private readonly matchService: MatchService,
        private readonly confirmationService: ConfirmationService
    ) {
    }

    checkTokenAndNavigate(): Observable<void> {
        return from(this.tokenService.initAuth()).pipe(
            switchMap(() => {
                if (this.router.url.split("?")[0] === `/${AppRoutes.REGISTER}`) {
                    return EMPTY;
                }
                if (!this.tokenService.getAccessToken()) {
                    return from(this.router.navigate([AppRoutes.LOGIN])).pipe(map(() => undefined));
                } else {
                    this.tokenService.fetchIsAdmin();
                    return of(undefined);
                }
            })
        );
    }

    navigateTo(route: AppRoutes) {
        if (!this.tokenService.getAccessToken()) {
            this.router.navigate([AppRoutes.LOGIN]);
        } else if (this.matchService.hasMatchInProgress() && this.router.url !== "/" + AppRoutes.NEW_MATCH) {
            this.confirmationService.confirm({
                message: 'Un match est en cours. Voulez-vous vraiment quitter ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.matchService.endMatch();
                    this.router.navigate([route]);
                }
            });
        } else {
            this.router.navigate([route]);
        }
    }
}

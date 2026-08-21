import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable, catchError, map, of} from 'rxjs';
import {TokenService} from '../token.service';
import {AppRoutes} from '../../AppRoutes';
import {UserRole} from '../../types/user.type';

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {
    constructor(
        private readonly tokenService: TokenService,
        private readonly router: Router
    ) {}

    canActivate(): boolean | Observable<boolean> {
        if (!this.tokenService.getAccessToken()) {
            void this.router.navigate([AppRoutes.LOGIN]);
            return false;
        }

        const currentUser = this.tokenService.getUser();
        if (currentUser) {
            return this.isAdminRole(currentUser.role);
        }

        return this.tokenService.fetchCurrentUser().pipe(
            map(user => this.isAdminRole(user.role)),
            catchError(() => of(false))
        );
    }

    private isAdminRole(role: UserRole): boolean {
        if (role === 'ADMIN' || role === 'MODERATOR') {
            return true;
        }

        void this.router.navigate([AppRoutes.HOME]);
        return false;
    }
}

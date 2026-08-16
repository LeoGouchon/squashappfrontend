import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../token.service';

/** Prevents authenticated users from opening the login page. */
export const LoginGuard: CanActivateFn = async () => {
    const tokenService = inject(TokenService);
    const router = inject(Router);

    await tokenService.initAuth();

    return tokenService.getAccessToken()
        ? router.createUrlTree(['/'])
        : true;
};

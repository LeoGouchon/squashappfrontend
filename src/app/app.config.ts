import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './services/auth-interceptor/auth-interceptor';
import {ConfirmationService} from 'primeng/api';
import {ApiMatchService} from './services/api-match/api-match.service';
import {NavigationService} from './services/navigation.service';

export const appConfig: ApplicationConfig = {
        providers: [
            provideZoneChangeDetection({eventCoalescing: true}),
            provideRouter(routes),
            provideAnimationsAsync(),
            ConfirmationService,
            { provide: 'ApiMatchInterface', useClass: ApiMatchService },
            { provide: 'NavigationServiceInterface', useClass: NavigationService },
            providePrimeNG({
                    theme: {
                        preset: Aura,
                    },
                    ripple: true
                }
            ),
            provideHttpClient(
                withInterceptors([authInterceptor]),
            )
        ],
    }
;

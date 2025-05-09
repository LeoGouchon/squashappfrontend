import { Routes } from '@angular/router';
import {CurrentMatchComponent} from './components/current-match/current-match.component';
import {HistoricComponent} from './components/historic/historic.component';
import {LoginComponent} from './components/login/login.component';
import {ProfileComponent} from './components/profile/profile.component';
import {NewMatchComponent} from './components/new-match/new-match.component';
import {AppRoutes} from './AppRoutes';
import {MatchGuard} from './services/routes-protection/match-guard';

export const routes: Routes = [
    {
        path: AppRoutes.NEW_MATCH,
        component: NewMatchComponent
    },
    {
        path: AppRoutes.CURRENT_MATCH,
        component: CurrentMatchComponent,
        canActivate: [MatchGuard]
    },
    {
        path: AppRoutes.LOGIN,
        component: LoginComponent
    },
    {
        path: AppRoutes.HISTORIC,
        component: HistoricComponent
    },
    {
        path: AppRoutes.PROFILE,
        component: ProfileComponent
    }
];

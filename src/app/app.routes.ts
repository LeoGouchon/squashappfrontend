import { Routes } from '@angular/router';
import {AddMatchComponent} from './components/add-match/add-match.component';
import {HistoricComponent} from './components/historic/historic.component';
import {LoginComponent} from './components/login/login.component';

export const routes: Routes = [
    {
        path: "add-match",
        component: AddMatchComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "historic",
        component: HistoricComponent
    }
];

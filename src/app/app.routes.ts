import { Routes } from '@angular/router';
import {AddMatchComponent} from './components/add-match/add-match.component';
import {HistoricComponent} from './components/historic/historic.component';

export const routes: Routes = [
    {
        path: "add-match",
        component: AddMatchComponent
    },
    {
        path: "historic",
        component: HistoricComponent
    }
];

import {Inject, Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {MatchService} from '../match-service.service';
import {NavigationServiceInterface} from '../navigation.service';
import {AppRoutes} from '../../AppRoutes';

@Injectable({
    providedIn: 'root'
})
export class MatchGuard implements CanActivate {
    constructor(
        private readonly matchService: MatchService,
        @Inject('NavigationServiceInterface') private readonly navigate: NavigationServiceInterface,
        ) {}

    canActivate(): boolean {
        const matchOk = this.matchService.hasMatchInProgress();
        if (!matchOk) {
            this.navigate.navigateTo(AppRoutes.NEW_MATCH); // ou '/new-match'
        }
        return matchOk;
    }
}

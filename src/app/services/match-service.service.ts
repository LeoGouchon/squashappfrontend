import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MatchService {
    matchInProgress = false;

    startMatch() {
        this.matchInProgress = true;
    }

    endMatch() {
        this.matchInProgress = false;
    }

    hasMatchInProgress(): boolean {
        return this.matchInProgress;
    }
}

import {Injectable} from '@angular/core';
import {environment} from '../../../../environment';
import {HttpClient} from '@angular/common/http';
import {Player} from '../../components/choose-player/choose-player.component';
import {ApiMatchInterface} from './api-match.interface';
import {timeout} from 'rxjs';
import {TokenService} from '../token.service';

@Injectable({
    providedIn: 'root'
})
export class ApiMatchService implements ApiMatchInterface {
    private apiUrl = environment.apiUrl;
    private timeoutValue: number = environment.timeoutValue;
    constructor(private http: HttpClient) {
    }

    getMatches() {
        return this.http.get(this.apiUrl + "/matches").pipe(timeout(this.timeoutValue))
    }

    getMatch(id: number) {
        return this.http.get(this.apiUrl + "/matches" + id).pipe(timeout(this.timeoutValue))
    }

    createEmptyMatch(playerAId: number, playerBId: number) {
        return this.http.post(this.apiUrl + "/matches", {playerAId, playerBId}).pipe(timeout(this.timeoutValue))
    }

    createFinishedMatchWithHistory(playerAId: number, playerBId: number, history: string[]) {
        return this.http.post(this.apiUrl + "/matches",
            {
                playerAId,
                playerBId,
                pointsHistory: history.join(";")
            },
            { withCredentials: true }
        ).pipe(timeout(this.timeoutValue))
    }

    createFinishedMatchWithoutHistory(playerAId: number, playerBId: number, finalScoreA: number, finalScoreB: number) {
        return this.http.post(this.apiUrl + "/matches", {playerAId, playerBId, finalScoreA, finalScoreB}).pipe(timeout(this.timeoutValue))
    }

    deleteMatch(id: number) {
        return this.http.delete(this.apiUrl + "/matches" + id).pipe(timeout(this.timeoutValue))
    }

    addServiceMatch(id: number, player: Player, serviceSide: "L" | "R") {
        return this.http.post(this.apiUrl + "/matches/" + id + "/service", {serviceSide, player}).pipe(timeout(this.timeoutValue))
    }
}

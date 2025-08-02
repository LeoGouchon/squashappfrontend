import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiMatchInterface} from './api-match.interface';
import {Observable, timeout} from 'rxjs';
import {PaginatedRequest, PaginatedResponse} from '../../types/pagination.type';
import {MatchPoint} from '../../types/match-point.type';
import {SessionStat} from '../../types/session-stat.type';
import {OverallStats} from '../../types/overall-stats.type';
import {PlayerStats} from '../../types/player-stats.type';

@Injectable({
    providedIn: 'root'
})
export class ApiMatchService implements ApiMatchInterface {
    private readonly apiUrl = environment.apiUrl;
    private readonly timeoutValue: number = environment.timeoutValue;

    constructor(private readonly http: HttpClient) {
    }

    getMatches(params: PaginatedRequest, filter?: {playerIds?: string[], date?: number}): Observable<PaginatedResponse<any>> {
        let paramsStr = new HttpParams()
            .set('size', params.size.toString())
            .set('page', params.page.toString())

        if (filter?.playerIds?.length) {
            paramsStr = paramsStr.set('playerIds', filter.playerIds.join(','));
        }

        if (filter?.date) {
            paramsStr = paramsStr.set('date', filter.date);
        }

        return this.http.get<PaginatedResponse<any>>(this.apiUrl + "/squash/matches", {params: paramsStr}).pipe(timeout(this.timeoutValue))
    }

    getMatch(id: string) {
        return this.http.get(this.apiUrl + "/squash/matches" + id).pipe(timeout(this.timeoutValue))
    }

    createEmptyMatch(playerAId: string, playerBId: string) {
        return this.http.post(this.apiUrl + "/squash/matches", {playerAId, playerBId}).pipe(timeout(this.timeoutValue))
    }

    createFinishedMatchWithHistory(playerAId: string, playerBId: string, history: MatchPoint[], finalScoreA: number, finalScoreB: number) {
        return this.http.post(this.apiUrl + "/squash/matches",
            {
                playerAId,
                playerBId,
                pointsHistory: history,
                finalScoreA: finalScoreA,
                finalScoreB: finalScoreB,
            }
        ).pipe(timeout(this.timeoutValue))
    }

    createFinishedMatchWithoutHistory(playerAId: string, playerBId: string, finalScoreA: number, finalScoreB: number) {
        return this.http.post(this.apiUrl + "/squash/matches", {playerAId, playerBId, finalScoreA, finalScoreB}).pipe(timeout(this.timeoutValue))
    }

    deleteMatch(id: string) {
        return this.http.delete(this.apiUrl + "/squash/matches/" + id).pipe(timeout(this.timeoutValue))
    }

    getSessionStats(params: PaginatedRequest): Observable<PaginatedResponse<SessionStat>> {
        const paramsStr = new HttpParams()
            .set('size', params.size.toString())
            .set('page', params.page.toString())

        return this.http.get<PaginatedResponse<SessionStat>>(this.apiUrl + "/squash/matches/sessions", {params: paramsStr}).pipe(timeout(this.timeoutValue))
    }

    getOverallStats(): Observable<OverallStats> {
        return this.http.get<OverallStats>(this.apiUrl + "/squash/matches/stats").pipe(timeout(this.timeoutValue))
    }

    getPlayerStats(playerId: string): Observable<PlayerStats> {
        return this.http.get<PlayerStats>(this.apiUrl + "/squash/matches/stats/player/" + playerId).pipe(timeout(this.timeoutValue))
    }
}

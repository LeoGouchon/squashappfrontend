import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiMatchInterface} from './api-match.interface';
import {Observable, timeout} from 'rxjs';
import {PaginatedRequest, PaginatedResponse} from '../../types/pagination.type';
import {MatchPoint} from '../../types/match-point.type';

@Injectable({
    providedIn: 'root'
})
export class ApiMatchService implements ApiMatchInterface {
    private readonly apiUrl = environment.apiUrl;
    private readonly timeoutValue: number = environment.timeoutValue;

    constructor(private readonly http: HttpClient) {
    }

    getMatches(params: PaginatedRequest): Observable<PaginatedResponse<any>> {
        const paramsStr = new HttpParams()
            .set('size', params.size.toString())
            .set('page', params.page.toString());
        return this.http.get<PaginatedResponse<any>>(this.apiUrl + "/matches", {params: paramsStr}).pipe(timeout(this.timeoutValue))
    }

    getMatch(id: number) {
        return this.http.get(this.apiUrl + "/matches" + id).pipe(timeout(this.timeoutValue))
    }

    createEmptyMatch(playerAId: number, playerBId: number) {
        return this.http.post(this.apiUrl + "/matches", {playerAId, playerBId}).pipe(timeout(this.timeoutValue))
    }

    createFinishedMatchWithHistory(playerAId: number, playerBId: number, history: MatchPoint[], finalScoreA: number, finalScoreB: number) {
        return this.http.post(this.apiUrl + "/matches",
            {
                playerAId,
                playerBId,
                pointsHistory: history,
                finalScoreA: finalScoreA,
                finalScoreB: finalScoreB,
            }
        ).pipe(timeout(this.timeoutValue))
    }

    createFinishedMatchWithoutHistory(playerAId: number, playerBId: number, finalScoreA: number, finalScoreB: number) {
        return this.http.post(this.apiUrl + "/matches", {playerAId, playerBId, finalScoreA, finalScoreB}).pipe(timeout(this.timeoutValue))
    }

    deleteMatch(id: number) {
        return this.http.delete(this.apiUrl + "/matches" + id).pipe(timeout(this.timeoutValue))
    }
}

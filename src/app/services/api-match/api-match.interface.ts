import {Observable} from 'rxjs';
import {PaginatedRequest, PaginatedResponse} from '../../types/pagination.type';
import {MatchPoint} from '../../types/match-point.type';
import {SessionStat} from '../../types/session-stat.type';

export interface ApiMatchInterface {
    getMatches(params: PaginatedRequest, filter?: {playerIds?: number[], date?: number}): Observable<PaginatedResponse<any>>;
    getMatch(id: number): Observable<any>;
    createEmptyMatch(playerAId: number, playerBId: number): Observable<any>;
    createFinishedMatchWithHistory(playerAId: number, playerBId: number, history: MatchPoint[], finalScoreA: number, finalScoreB: number): Observable<any>;
    createFinishedMatchWithoutHistory(playerAId: number, playerBId: number, finalScoreA: number, finalScoreB: number): Observable<any>;
    deleteMatch(id: number): Observable<any>;
    getSessionStats(params: PaginatedRequest): Observable<PaginatedResponse<SessionStat>>;
}

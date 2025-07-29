import {Observable} from 'rxjs';
import {PaginatedRequest, PaginatedResponse} from '../../types/pagination.type';
import {MatchPoint} from '../../types/match-point.type';
import {SessionStat} from '../../types/session-stat.type';
import {Match} from '../../types/match.type';
import {OverallStats} from '../../types/overall-stats.type';
import {PlayerStats} from '../../types/player-stats.type';

export interface ApiMatchInterface {
    getMatches(params: PaginatedRequest, filter?: {playerIds?: number[], date?: number}): Observable<PaginatedResponse<Match>>;
    getMatch(id: number): Observable<any>;
    createEmptyMatch(playerAId: number, playerBId: number): Observable<any>;
    createFinishedMatchWithHistory(playerAId: number, playerBId: number, history: MatchPoint[], finalScoreA: number, finalScoreB: number): Observable<any>;
    createFinishedMatchWithoutHistory(playerAId: number, playerBId: number, finalScoreA: number, finalScoreB: number): Observable<any>;
    deleteMatch(id: number): Observable<any>;
    getSessionStats(params: PaginatedRequest): Observable<PaginatedResponse<SessionStat>>;
    getOverallStats(): Observable<OverallStats>;
    getPlayerStats(playerId: number): Observable<PlayerStats>;
}

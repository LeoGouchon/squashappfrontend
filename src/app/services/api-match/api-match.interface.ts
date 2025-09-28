import {Observable} from 'rxjs';
import {PaginatedRequest, PaginatedResponse} from '../../types/pagination.type';
import {MatchPoint} from '../../types/match-point.type';
import {SessionStat} from '../../types/session-stat.type';
import {Match} from '../../types/match.type';
import {OverallStats} from '../../types/overall-stats.type';
import {PlayerStats} from '../../types/player-stats.type';

export interface ApiMatchInterface {
    getMatches(params: PaginatedRequest, filter?: {playerIds?: string[], date?: number}): Observable<PaginatedResponse<Match>>;
    getMatch(id: string): Observable<Match>;
    createEmptyMatch(playerAId: string, playerBId: string): Observable<any>;
    createFinishedMatchWithHistory(playerAId: string, playerBId: string, history: MatchPoint[], finalScoreA: number, finalScoreB: number): Observable<any>;
    createFinishedMatchWithoutHistory(playerAId: string, playerBId: string, finalScoreA: number, finalScoreB: number): Observable<any>;
    deleteMatch(id: string): Observable<any>;
    getSessionStats(params: PaginatedRequest): Observable<PaginatedResponse<SessionStat>>;
    getOverallStats(): Observable<OverallStats>;
    getPlayerStats(playerId: string): Observable<PlayerStats>;
}

import {Observable} from 'rxjs';
import {PaginatedRequest, PaginatedResponse} from '../../types/pagination.type';

export interface ApiMatchInterface {
    getMatches(params: PaginatedRequest): Observable<PaginatedResponse<any>>;
    getMatch(id: number): Observable<any>;
    createEmptyMatch(playerAId: number, playerBId: number): Observable<any>;
    createFinishedMatchWithHistory(playerAId: number, playerBId: number, history: string[]): Observable<any>;
    createFinishedMatchWithoutHistory(playerAId: number, playerBId: number, finalScoreA: number, finalScoreB: number): Observable<any>;
    deleteMatch(id: number): Observable<any>;
    addServiceMatch(id: number, player: any, serviceSide: "L" | "R"): Observable<any>;
}

import {Observable} from 'rxjs';

export interface ApiMatchInterface {
    getMatches(): Observable<any>;
    getMatch(id: number): Observable<any>;
    createEmptyMatch(playerAId: number, playerBId: number): Observable<any>;
    createFinishedMatchWithHistory(playerAId: number, playerBId: number, history: string[]): Observable<any>;
    createFinishedMatchWithoutHistory(playerAId: number, playerBId: number, finalScoreA: number, finalScoreB: number): Observable<any>;
    deleteMatch(id: number): Observable<any>;
    addServiceMatch(id: number, player: any, serviceSide: "L" | "R"): Observable<any>;
}

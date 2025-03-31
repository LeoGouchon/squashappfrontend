import {Observable} from 'rxjs';

export interface ApiUserInterface {
    login(email: string, password: string): Observable<{token: string}>;
    logout(token: string): Observable<any>;
    signup(email: string, password: string, playerId?: number): Observable<any>;
    getCurrentUser(userId: number): Observable<any>;
}

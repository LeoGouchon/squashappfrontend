import {Observable} from 'rxjs';

export interface ApiUserInterface {
    login(email: string, password: string): Observable<{token: string}>;
    logout(): Observable<any>;
    signup(email: string, password: string, playerId?: number): Observable<{token: string}>;
    getCurrentUser(): Observable<any>;
}

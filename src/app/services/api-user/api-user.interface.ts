import {Observable} from 'rxjs';

export interface ApiUserInterface {
    login(email: string, password: string): Observable<{token: string}>;
    logout(): Observable<any>;
    signup(email: string, password: string, invitationToken: string): Observable<{token: string}>;
    getCurrentUser(): Observable<any>;
}

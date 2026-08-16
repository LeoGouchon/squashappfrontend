import { Observable } from 'rxjs';

export interface ApiUserInterface {
    login(): Observable<void>;
    logout(): Observable<void>;
    getCurrentUser(): Observable<any>;
}

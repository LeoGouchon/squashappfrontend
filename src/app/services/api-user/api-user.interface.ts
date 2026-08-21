import { Observable } from 'rxjs';
import { User } from '../../types/user.type';

export interface ApiUserInterface {
    login(): Observable<void>;
    logout(): Observable<void>;
    getCurrentUser(): Observable<User>;
}

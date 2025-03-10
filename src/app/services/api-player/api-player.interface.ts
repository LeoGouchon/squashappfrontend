import {Observable} from 'rxjs';

export interface ApiPlayerInterface {
    createPlayer(FirstName: string, LastName: string): Observable<any>;
    getPlayers(): Observable<any>;
    getPlayer(id: number): Observable<any>;
    deletePlayer(id: number): Observable<any>;
}

import {Observable} from 'rxjs';
import {Player} from '../../types/Player.type';
import {PaginatedResponse} from '../../types/pagination.type';

export interface ApiPlayerInterface {
    createPlayer(FirstName: string, LastName: string): Observable<Player>;
    getPlayers(): Observable<PaginatedResponse<Player>>;
    getPlayer(id: number): Observable<Player>;
    deletePlayer(id: number): Observable<any>;
    getUnlinkedPlayers(): Observable<Player[]>;
}

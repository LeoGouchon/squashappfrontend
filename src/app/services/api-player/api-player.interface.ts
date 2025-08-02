import {Observable} from 'rxjs';
import {Player} from '../../types/player.type';
import {PaginatedResponse} from '../../types/pagination.type';

export interface ApiPlayerInterface {
    createPlayer(firstname: string, lastname: string): Observable<Player>;
    getPlayers(): Observable<PaginatedResponse<Player>>;
    getPlayer(id: string): Observable<Player>;
    deletePlayer(id: string): Observable<any>;
    getUnlinkedPlayers(): Observable<Player[]>;
}

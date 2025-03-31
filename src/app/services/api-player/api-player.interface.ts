import {Observable} from 'rxjs';
import {Player} from '../../components/choose-player/choose-player.component';

export interface ApiPlayerInterface {
    createPlayer(FirstName: string, LastName: string): Observable<Player>;
    getPlayers(): Observable<Player[]>;
    getPlayer(id: number): Observable<Player>;
    deletePlayer(id: number): Observable<any>;
    getUnlinkedPlayers(): Observable<Player[]>;
}

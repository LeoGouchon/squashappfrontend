import {Observable} from 'rxjs';
import {Team} from '../../types/team.type';

export interface ApiTeamInterface {
    getTeams(): Observable<Team[]>;
}

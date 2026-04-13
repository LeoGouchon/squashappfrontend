import {Injectable} from '@angular/core';
import {Observable, timeout} from 'rxjs';
import {Team} from '../../types/team.type';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiTeamService {
    private readonly apiUrl = environment.apiUrl;
    private readonly timeoutValue: number = environment.timeoutValue;

    constructor(private readonly http: HttpClient) {
    }

    getTeams(): Observable<Team[]> {
        const parameters = new HttpParams()
            .set('isSquash', true)
            .set('isKicker', false)

        return this.http.get<Team[]>(`${this.apiUrl}/teams`, {params: parameters}).pipe(timeout(this.timeoutValue));
    }
}

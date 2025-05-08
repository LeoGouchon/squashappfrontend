import { Injectable } from '@angular/core';
import {environment} from '../../../../environment';
import {HttpClient} from '@angular/common/http';
import {ApiPlayerInterface} from './api-player.interface';
import {Observable, timeout} from 'rxjs';
import {Player} from '../../types/player.type';
import {PaginatedResponse} from '../../types/pagination.type';

@Injectable({
  providedIn: 'root'
})
export class ApiPlayerService implements ApiPlayerInterface {
    private readonly apiUrl = environment.apiUrl;
    private readonly timeoutValue: number = environment.timeoutValue;

    constructor(private readonly http: HttpClient) {}

    createPlayer(FirstName: string, LastName: string): Observable<Player> {
        return this.http.post<Player>(this.apiUrl + '/players', {FirstName, LastName}).pipe(timeout(this.timeoutValue));
    }

    getPlayers(): Observable<PaginatedResponse<Player>> {
        return this.http.get<PaginatedResponse<Player>>(this.apiUrl + '/players').pipe(timeout(this.timeoutValue));
    }

    getPlayer(id: number): Observable<Player> {
        return this.http.get<Player>(this.apiUrl + '/players/' + id).pipe(timeout(this.timeoutValue));
    }

    deletePlayer(id: number) {
        return this.http.delete(this.apiUrl + '/players/' + id).pipe(timeout(this.timeoutValue));
    }

    getUnlinkedPlayers():Observable<Player[]> {
        return this.http.get<Player[]>(this.apiUrl + '/players/unlinked').pipe(timeout(this.timeoutValue));
    }
}

import { Injectable } from '@angular/core';
import {environment} from '../../../../environment';
import {HttpClient} from '@angular/common/http';
import {ApiPlayerInterface} from './api-player.interface';
import {timeout} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiPlayerService implements ApiPlayerInterface {
    private apiUrl = environment.apiUrl;
    private timeoutValue: number = environment.timeoutValue;

    constructor(private http: HttpClient) {}

    createPlayer(FirstName: string, LastName: string) {
        return this.http.post(this.apiUrl + '/players', {FirstName, LastName}).pipe(timeout(this.timeoutValue));
    }

    getPlayers() {
        return this.http.get(this.apiUrl + '/players').pipe(timeout(this.timeoutValue));
    }

    getPlayer(id: number) {
        return this.http.get(this.apiUrl + '/players/' + id).pipe(timeout(this.timeoutValue));
    }

    deletePlayer(id: number) {
        return this.http.delete(this.apiUrl + '/players/' + id).pipe(timeout(this.timeoutValue));
    }
}

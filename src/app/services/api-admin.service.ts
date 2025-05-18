import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {tap, timeout} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiAdminService {
    private readonly apiUrl = environment.apiUrl;
    private readonly timeoutValue: number = environment.timeoutValue;

    constructor(private readonly http: HttpClient) {
    }

    invitePlayer(playerId: number) {
        return this.http.post<{ token: string }>(this.apiUrl + `/admin/invitation?playerId=${playerId}`, {}).pipe(
            timeout(this.timeoutValue),
            tap(response => response.token))
    }
}

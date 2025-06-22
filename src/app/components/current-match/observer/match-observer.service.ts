import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchObserverService {
    private readonly matchFinishedSubject = new Subject<void>();

    notifyMatchFinished() {
        console.log('[MatchService] emitting matchFinished');
        this.matchFinishedSubject.next();
    }

    getMatchFinishedObservable() {
        return this.matchFinishedSubject.asObservable();
    }
}

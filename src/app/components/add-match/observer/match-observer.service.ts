import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchObserverService {
    private matchFinishedSubject = new Subject<void>();

    notifyMatchFinished() {
        this.matchFinishedSubject.next();
    }

    getMatchFinishedObservable() {
        return this.matchFinishedSubject.asObservable();
    }
}

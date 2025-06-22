import {Inject, Injectable} from '@angular/core';
import {Player} from '../types/player.type';
import {MatchPoint} from '../types/match-point.type';
import {PlayerLetter} from '../types/player-letter.type';
import {ServiceSide} from '../types/service-side.type';
import {ApiMatchInterface} from './api-match/api-match.interface';
import {MatchObserverService} from '../components/current-match/observer/match-observer.service';
import {Observable, Subscription, tap} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MatchService {
    private matchInProgress = false;
    private playerA: Player | undefined;
    private playerB: Player | undefined;
    private playerAScore: number = 0;
    private playerBScore: number = 0;
    private history: MatchPoint[] = [];
    private server: PlayerLetter | undefined;
    private serviceSide: ServiceSide | undefined;

    private gameEnded: boolean = false;
    protected matchSent: boolean | null = null;

    private readonly matchFinishedSubscription?: Subscription;

    constructor(
        @Inject('ApiMatchInterface') private readonly apiMatchService: ApiMatchInterface,
        private readonly matchObserverService: MatchObserverService,
    ) {
        this.matchFinishedSubscription = this.matchObserverService.getMatchFinishedObservable().subscribe(() => {
            console.log('match finished and saved it');
            this.saveFinishedMatch();
        });

        this.restoreFromStorage();
    }

    private updateStorage(): void {
        const state = {
            matchInProgress: this.matchInProgress,
            playerA: this.playerA,
            playerB: this.playerB,
            playerAScore: this.playerAScore,
            playerBScore: this.playerBScore,
            history: this.history,
            server: this.server,
            serviceSide: this.serviceSide,
            gameEnded: this.gameEnded,
            matchSent: this.matchSent,
        };
        localStorage.setItem('currentMatch', JSON.stringify(state));
    }

    private restoreFromStorage(): void {
        const saved = localStorage.getItem('currentMatch');
        if (saved) {
            const match = JSON.parse(saved);
            this.matchInProgress = match.matchInProgress;
            this.playerA = match.playerA;
            this.playerB = match.playerB;
            this.playerAScore = match.playerAScore;
            this.playerBScore = match.playerBScore;
            this.history = match.history;
            this.server = match.server;
            this.serviceSide = match.serviceSide;
            this.gameEnded = match.gameEnded;
            this.matchSent = match.matchSent;
        }
    }

    startMatch({playerA, playerB}: { playerA: Player, playerB: Player }): void {
        this.matchInProgress = true;
        this.playerA = playerA;
        this.playerB = playerB;
        this.gameEnded = false;
        this.matchSent = null;
        this.updateStorage();
    }

    endMatch(): void {
        this.matchInProgress = false;
        this.playerA = undefined;
        this.playerB = undefined;
        this.playerAScore = 0;
        this.playerBScore = 0;
        this.history = [];
        this.server = undefined;
        this.serviceSide = undefined;
        this.gameEnded = false;
        this.matchSent = null;
        this.updateStorage();
    }

    saveFinishedMatch(): void {
        if (this.playerA && this.playerB) {
            this.apiMatchService.createFinishedMatchWithHistory(
                this.playerA.id,
                this.playerB.id,
                this.history,
                this.playerAScore,
                this.playerBScore
            ).subscribe({
                next: () => {
                    this.matchSent = true;
                    this.updateStorage();
                },
                error: error => {
                    console.error("Erreur lors de la sauvegarde du match", error);
                    this.matchSent = false;
                    this.updateStorage();
                }
            });
        }
    }

    saveFinishedMatchWithoutHistory(
        {
            playerA,
            playerB,
            playerAScore,
            playerBScore
        }: {
            playerA: Player,
            playerB: Player,
            playerAScore: number,
            playerBScore: number
        }): Observable<unknown> {
        if (playerA && playerB) {
            return this.apiMatchService.createFinishedMatchWithoutHistory(
                playerA.id,
                playerB.id,
                playerAScore,
                playerBScore
            ).pipe(
                tap({
                    next: () => {
                        this.matchSent = true;
                        this.updateStorage();
                    },
                    error: error => {
                        console.error("Erreur lors de la sauvegarde du match", error);
                        this.matchSent = false;
                        this.updateStorage();
                        throw new Error("Error saving match");
                    }
                })
            );
        } else {
            throw new Error("Player A or Player B is undefined.");
        }
    }

    private computeIsMatchFinished(): boolean {
        return Math.abs(this.playerAScore - this.playerBScore) >= 2 &&
            (this.playerAScore >= 11 || this.playerBScore >= 11);
    }

    public getIsMatchFinished(): boolean {
        return this.computeIsMatchFinished();
    }

    setServerAndSide(server: PlayerLetter, serviceSide: ServiceSide): void {
        this.server = server;
        this.serviceSide = serviceSide;
        this.updateStorage();
    }

    addMatchPoint(matchPoint: MatchPoint): void {
        this.history.push(matchPoint);
        this.updateStorage();
    }

    setWinnerPoint(scorerPlayer: PlayerLetter): void {
        scorerPlayer === "A" ? this.playerAScore++ : this.playerBScore++;
        if (this.computeIsMatchFinished() && !this.gameEnded) {
            this.gameEnded = true;
            this.matchObserverService.notifyMatchFinished();
        }
        this.updateStorage();
    }

    switchServiceSide(): void {
        this.serviceSide = this.serviceSide === 'L' ? 'R' : 'L';
        this.updateStorage();
    }

    undoLastMatchPoint(): void {
        const lastPoint = this.history.pop();
        const lastValidPoint = this.history[this.history.length - 1];
        // Reset point
        if (lastPoint) {
            lastPoint.scorer === 'A' ? this.playerAScore-- : this.playerBScore--;
        }
        // Reset server and server side
        if (lastValidPoint) {
            if (lastValidPoint.server === lastValidPoint.scorer) {
                this.server = lastValidPoint.server;
                this.serviceSide = lastValidPoint.serviceSide === 'L' ? 'R' : 'L';
            } else {
                this.server = lastValidPoint.scorer === 'A' ? 'B' : 'A';
            }
        } else {
            this.endMatch();
        }
        this.updateStorage();
    }

    // --- Getters
    getPlayerA(): Player | undefined {
        return this.playerA;
    }

    getPlayerB(): Player | undefined {
        return this.playerB;
    }

    getPlayerScoreA(): number {
        return this.playerAScore;
    }

    getPlayerScoreB(): number {
        return this.playerBScore;
    }

    getServer(): PlayerLetter | undefined {
        return this.server;
    }

    getServiceSide(): ServiceSide | undefined {
        return this.serviceSide;
    }

    getHistory(): MatchPoint[] {
        return this.history;
    }

    getLastWinnerPoint(): PlayerLetter {
        return this.history[this.history.length - 1]?.scorer;
    }

    isInitialization(): boolean {
        return this.history.length === 0 && !this.server;
    }

    hasMatchInProgress(): boolean {
        return this.matchInProgress;
    }

    getMatchSent(): boolean | null {
        return this.matchSent;
    }
}

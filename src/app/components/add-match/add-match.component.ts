import {Component, Inject, OnDestroy} from '@angular/core';
import {Button} from 'primeng/button';
import {Fieldset} from 'primeng/fieldset';
import {Divider} from 'primeng/divider';
import {Fluid} from 'primeng/fluid';
import {ChoosePlayerComponent} from '../choose-player/choose-player.component';
import {Player} from '../../types/player.type';
import {Tag} from 'primeng/tag';
import {ApiMatchService} from '../../services/api-match/api-match.service';
import {MatchObserverService} from './observer/match-observer.service';
import {ApiMatchInterface} from '../../services/api-match/api-match.interface';
import {NgIf} from '@angular/common';
import {NavigationService, NavigationServiceInterface} from '../../services/navigation.service';
import {ProgressSpinner} from 'primeng/progressspinner';
import {MatchPoint} from '../../types/match-point.type';
import {PlayerLetter} from '../../types/player-letter.type';
import {ServiceSide} from '../../types/service-side.type';
import {Message} from 'primeng/message';
import {MatchService} from '../../services/match-service.service';
import {AppRoutes} from '../../AppRoutes';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-add-match',
    imports: [
        Button,
        Fieldset,
        Divider,
        Fluid,
        ChoosePlayerComponent,
        Tag,
        NgIf,
        ProgressSpinner,
        Message,
    ],
    templateUrl: './add-match.component.html',
    styleUrl: './add-match.component.css',
    providers: [
        {provide: 'ApiMatchInterface', useClass: ApiMatchService},
        {provide: 'NavigationServiceInterface', useClass: NavigationService},
    ]
})
export class AddMatchComponent implements OnDestroy {
    playerA: Player | undefined;
    playerB: Player | undefined;
    playerAScore: number = 0;
    playerBScore: number = 0;
    history: MatchPoint[] = [];
    server: PlayerLetter | undefined;
    serviceSide: ServiceSide | undefined;

    private showScorerChoice: boolean = false;
    private gameEnded: boolean = false;
    protected matchSent: boolean | null = null;

    private matchFinishedSubscription?: Subscription;

    constructor(
        @Inject('ApiMatchInterface') private readonly apiMatchService: ApiMatchInterface,
        @Inject('NavigationServiceInterface') private readonly navigation: NavigationServiceInterface,
        private readonly matchObserverService: MatchObserverService,
        private readonly matchService: MatchService,
    ) {
        this.matchFinishedSubscription = this.matchObserverService.getMatchFinishedObservable().subscribe(() => {
            this.saveFinishedMatch();
        });
        this.matchService = matchService;
    };

    ngOnDestroy(): void {
        this.matchFinishedSubscription?.unsubscribe();
    }

    closeMatch() {
        this.matchService.endMatch();
        this.navigation.navigateTo(AppRoutes.HISTORIC);
    }

    saveFinishedMatch() {
        if (this.playerA !== undefined && this.playerB !== undefined) {
            this.apiMatchService.createFinishedMatchWithHistory(this.playerA.id, this.playerB.id, this.history, this.playerAScore, this.playerBScore).subscribe({
                next: (response: any) => {
                    this.matchSent = true;
                },
                error: (error: any) => {
                    console.error("Erreur lors de la sauvegarde du match", error);
                    this.matchSent = false;
                }
            });
        }
    }

    isMatchFinished(): boolean {
        const condition: boolean = Math.abs(this.playerAScore - this.playerBScore) >= 2 && (this.playerAScore >= 11 || this.playerBScore >= 11)
        if (condition && !this.gameEnded) {
            this.gameEnded = true;
            this.matchObserverService.notifyMatchFinished();
        }
        return condition
    }

    onPlayerSelected($event: [Player, Player]) {
        this.playerA = $event[0];
        this.playerB = $event[1];
    }

    handleOnClickSetServer(server: PlayerLetter, serviceSide: ServiceSide) {
        this.server = server;
        this.serviceSide = serviceSide;
        this.showScorerChoice = true;
    }

    addMatchPoint({server, serviceSide, scorer, scoreA, scoreB}: {
        server: PlayerLetter,
        serviceSide: ServiceSide,
        scorer: PlayerLetter,
        scoreA: number,
        scoreB: number
    }) {
        this.history.push({server, serviceSide, scorer, scoreA, scoreB});
    }

    handleOnClickSetWinnerPoint(scorerPlayer: PlayerLetter) {
        this.addMatchPoint({
            server: this.server!,
            serviceSide: this.serviceSide!,
            scorer: scorerPlayer,
            scoreA: this.playerAScore,
            scoreB: this.playerBScore,
        })
        scorerPlayer === "A" ? this.playerAScore++ : this.playerBScore++;

        // if the server is the scorer, switch the service side
        if (this.server === scorerPlayer) this.serviceSide = this.serviceSide === 'L' ? 'R' : 'L';
    }

    displayedScorerChoice(): boolean {
        const isLastServerWin: boolean = this.history[this.history.length - 1]?.server === this.history[this.history.length - 1]?.scorer || this.history.length === 0;

        if (isLastServerWin) {
            this.showScorerChoice = true;
        }

        if (!isLastServerWin && this.history[this.history.length - 1]?.server === this.server) {
            this.showScorerChoice = false;
        }

        return this.showScorerChoice;
    }

    getValueScoreTag(matchPoint: MatchPoint): string {
        if (matchPoint.server === 'A') {
            return matchPoint.server + matchPoint.scoreA + matchPoint.serviceSide;
        } else {
            return matchPoint.server + matchPoint.scoreB + matchPoint.serviceSide;
        }
    }

    isInitialization(): boolean {
        return this.history.length === 0 && !this.server;
    }

    getLastWinnerPoint(): PlayerLetter {
        return this.history[this.history.length - 1]?.scorer;
    }
}

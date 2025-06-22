import {Component, Inject, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {Fieldset} from 'primeng/fieldset';
import {Divider} from 'primeng/divider';
import {Fluid} from 'primeng/fluid';
import {Player} from '../../types/player.type';
import {Tag} from 'primeng/tag';
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
    selector: 'app-current-match',
    imports: [
        Button,
        Fieldset,
        Divider,
        Fluid,
        Tag,
        ProgressSpinner,
        Message,
    ],
    templateUrl: './current-match.component.html',
    styleUrl: './current-match.component.css',
    providers: [
        {provide: 'NavigationServiceInterface', useClass: NavigationService},
    ]
})
export class CurrentMatchComponent implements OnInit {
    private showScorerChoice: boolean = false;
    protected playerA: Player | undefined;
    protected playerB: Player | undefined;

    constructor(
        @Inject('NavigationServiceInterface') private readonly navigation: NavigationServiceInterface,
        protected readonly matchService: MatchService,
    ) {
        this.matchService = matchService;
    };

    ngOnInit() {
        this.playerA = this.matchService.getPlayerA()!;
        this.playerB = this.matchService.getPlayerB()!;
    }

    saveFinishedMatch() {
        this.matchService.saveFinishedMatch();
    }

    closeMatch() {
        this.matchService.endMatch();
        this.navigation.navigateTo(AppRoutes.HISTORIC)
    }

    handleOnClickSetServer(server: PlayerLetter, serviceSide: ServiceSide) {
        this.matchService.setServerAndSide(server, serviceSide);
        this.showScorerChoice = true;
    }

    addMatchPoint({server, serviceSide, scorer, scoreA, scoreB}: {
        server: PlayerLetter,
        serviceSide: ServiceSide,
        scorer: PlayerLetter,
        scoreA: number,
        scoreB: number
    }) {
        this.matchService.addMatchPoint({server, serviceSide, scorer, scoreA, scoreB});
    }

    handleOnClickSetWinnerPoint(scorerPlayer: PlayerLetter) {
        this.addMatchPoint({
            server: this.matchService.getServer()!,
            serviceSide: this.matchService.getServiceSide()!,
            scorer: scorerPlayer,
            scoreA: this.matchService.getPlayerScoreA(),
            scoreB: this.matchService.getPlayerScoreB(),
        })
        this.matchService.setWinnerPoint(scorerPlayer);

        // if the server is the scorer, switch the service side
        if (this.matchService.getServer() === scorerPlayer) this.matchService.switchServiceSide();
    }

    displayedScorerChoice(): boolean {
        const history = this.matchService.getHistory();
        const lastPoint = history[history.length - 1];
        const isLastServerWin = !lastPoint || lastPoint.server === lastPoint.scorer;

        if (isLastServerWin) {
            this.showScorerChoice = true;
        }

        if (!isLastServerWin && lastPoint?.server === this.matchService.getServer()) {
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

    undoLastPoint(): void {
        this.matchService.undoLastMatchPoint();
    }

    isInitialization(): boolean {
        return this.matchService.isInitialization();
    }

    getLastWinnerPoint(): PlayerLetter {
        return this.matchService.getLastWinnerPoint();
    }
}

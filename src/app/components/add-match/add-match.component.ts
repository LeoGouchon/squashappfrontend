import {Component, Inject} from '@angular/core';
import {Button} from 'primeng/button';
import {Fieldset} from 'primeng/fieldset';
import {Divider} from 'primeng/divider';
import {Fluid} from 'primeng/fluid';
import {ChoosePlayerComponent} from '../choose-player/choose-player.component';
import {Player} from '../../types/Player.type';
import {Tag} from 'primeng/tag';
import {ApiMatchService} from '../../services/api-match/api-match.service';
import {MatchObserverService} from './observer/match-observer.service';
import {ApiMatchInterface} from '../../services/api-match/api-match.interface';
import {NgIf} from '@angular/common';
import {NavigationService, NavigationServiceInterface} from '../../services/navigation.service';
import {ProgressSpinner} from 'primeng/progressspinner';

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
    ],
    templateUrl: './add-match.component.html',
    styleUrl: './add-match.component.css',
    providers: [
        { provide: 'ApiMatchInterface', useClass: ApiMatchService },
        { provide: 'NavigationServiceInterface', useClass: NavigationService },
    ]
})
export class AddMatchComponent {
    playerA: Player | undefined;
    playerB: Player | undefined;
    playerAScore: number = 0;
    playerBScore: number = 0;
    history: string[] = [];
    lastWinnerPoint: "A" | "B" | undefined;
    private gameEnded: boolean = false;
    protected matchSent: boolean | null = null;

    constructor(
        @Inject('ApiMatchInterface') private readonly apiMatchService: ApiMatchInterface,
        @Inject('NavigationServiceInterface') private readonly navigation: NavigationServiceInterface,
        private readonly matchObserverService: MatchObserverService
    ) {
        this.matchObserverService.getMatchFinishedObservable().subscribe(() => {
            this.saveFinishedMatch();
        });
    };

    closeMatch() {
        this.navigation.goBack();
    }

    saveFinishedMatch() {
        if (this.playerA !== undefined && this.playerB !== undefined) {
            this.apiMatchService.createFinishedMatchWithHistory(this.playerA.id, this.playerB.id, this.history).subscribe({
                next: (response: any) => {
                    console.log("Match sauvegardé avec succès", response);
                    this.matchSent = true;
                    this.matchObserverService.getMatchFinishedObservable().subscribe().unsubscribe();
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
            console.log("GAME ENDED: ", this.history.join(";"));
            this.gameEnded = true;
            this.matchObserverService.notifyMatchFinished();
        }
        return condition
    }

    onPlayerSelected($event: [Player, Player]) {
        this.playerA = $event[0];
        this.playerB = $event[1];
    }

    getCurrentPlayerScore(player: "A" | "B"): number {
        const playerPoints = this.history.filter(p => p.includes(player));
        if (playerPoints.length === 0) {
            return 0;
        } else {
            return parseInt(playerPoints.pop()!.match(/\d+/)![0]);
        }
    }

    addService(player: "A" | "B", serviceSide: "L" | "R") {
        if (!this.isMatchFinished()) {
            this.history.length === 0 ? this.history.push(`${player}0${serviceSide}`) :
                this.history.push(`${player}${this.getCurrentPlayerScore(player) + 1}${serviceSide}`);

            this.playerAScore = this.getCurrentPlayerScore("A");
            this.playerBScore = this.getCurrentPlayerScore("B");
        }
    }

    onClickWinnerPoint(player: "A" | "B") {
        this.lastWinnerPoint = player;

        const lastService = this.history[this.history.length - 1];
        if (lastService[0] === player) {
            this.addService(player, lastService[lastService.length - 1] === "L" ? "R" : "L");
        }
    }

    isServerWinPoint(): boolean {
        return this.history[this.history.length - 1][0] === this.lastWinnerPoint;
    }

    getPlayerScore(player: "A" | "B"): number {
        if (!(this.lastWinnerPoint !== player) && !this.isServerWinPoint()) {
            return this.getCurrentPlayerScore(player)+1;
        }
        return this.getCurrentPlayerScore(player);
    }
}

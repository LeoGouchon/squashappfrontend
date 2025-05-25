import {Component, Inject, OnInit} from '@angular/core';
import {Fluid} from 'primeng/fluid';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {ApiPlayerInterface} from '../../services/api-player/api-player.interface';
import {ApiPlayerService} from '../../services/api-player/api-player.service';
import {Player} from '../../types/player.type';
import {MatchService} from '../../services/match-service.service';
import {Select} from 'primeng/select';
import {NavigationService, NavigationServiceInterface} from '../../services/navigation.service';
import {AppRoutes} from '../../AppRoutes';
import {FloatLabelModule} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from 'primeng/accordion';

@Component({
    selector: 'app-new-match',
    imports: [
        Fluid,
        ReactiveFormsModule,
        Button,
        Select,
        FloatLabelModule,
        InputText,
        Accordion,
        AccordionContent,
        AccordionPanel,
        AccordionHeader
    ],
    templateUrl: './new-match.component.html',
    styleUrl: './new-match.component.css',
    providers: [
        {provide: 'ApiPlayerInterface', useClass: ApiPlayerService},
        {provide: 'NavigationServiceInterface', useClass: NavigationService},
    ]
})
export class NewMatchComponent implements OnInit {
    players: Player[] = [];

    formGroup!: FormGroup;

    constructor(
        @Inject('ApiPlayerInterface') private readonly apiPlayerService: ApiPlayerInterface,
        @Inject('NavigationServiceInterface') private readonly navigate: NavigationServiceInterface,
        private readonly matchService: MatchService
    ) {
        this.matchService = matchService;
    }

    ngOnInit() {
        this.apiPlayerService.getPlayers().subscribe(response => this.players = response.content);

        this.formGroup = new FormGroup({
            playerA: new FormControl<Player | null>(null),
            playerB: new FormControl<Player | null>(null),
            playerAScore: new FormControl<number>(0),
            playerBScore: new FormControl<number>(0),
        })
    }

    isError(): boolean {
        return !this.formGroup.get('playerA')?.value || !this.formGroup.get('playerB')?.value;
    }

    isSaveFinalScoreError(): boolean {
        const finalScoreA = this.formGroup.get('playerAScore')?.value;
        const finalScoreB = this.formGroup.get('playerBScore')?.value;
        return this.isError() || !(
            (finalScoreA > 11 && Math.abs(finalScoreA - finalScoreB) === 2)
            || (finalScoreB > 11 && Math.abs(finalScoreA - finalScoreB) === 2)
            || (Math.abs(finalScoreA - finalScoreB) >= 2 && (finalScoreA === 11 || finalScoreB === 11))
        );
    }

    onClickStartRefereeMatch() {
        this.matchService.startMatch({
            playerA: this.formGroup.get('playerA')?.value,
            playerB: this.formGroup.get('playerB')?.value
        });
        this.navigate.navigateTo(AppRoutes.CURRENT_MATCH);
    }

    onClickSaveScore() {
        const playerA = this.formGroup.get('playerA')?.value;
        const playerB = this.formGroup.get('playerB')?.value;
        const playerAScore = this.formGroup.get('playerAScore')?.value;
        const playerBScore = this.formGroup.get('playerBScore')?.value;

        console.log('Player A:', playerA);
        console.log('Player B:', playerB);
        console.log('Player A Score:', playerAScore);
        console.log('Player B Score:', playerBScore);
        this.matchService.saveFinishedMatchWithoutHistory({
            playerA: this.formGroup.get('playerA')?.value,
            playerB: this.formGroup.get('playerB')?.value,
            playerAScore: this.formGroup.get('playerAScore')?.value,
            playerBScore: this.formGroup.get('playerBScore')?.value
        }).subscribe({
            error: error => {
                console.error("Erreur lors de la sauvegarde du match", error);
            },
            complete: () => this.navigate.navigateTo(AppRoutes.HISTORIC)
        });
        this.navigate.navigateTo(AppRoutes.HISTORIC);
    }

    get filteredPlayersForB() {
        const playerAId = this.formGroup.get('playerA')?.value?.id;
        return this.players.filter(p => p.id !== playerAId);
    }

    get filteredPlayersForA() {
        const playerAId = this.formGroup.get('playerB')?.value?.id;
        return this.players.filter(p => p.id !== playerAId);
    }
}

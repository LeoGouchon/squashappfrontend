import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
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

@Component({
    selector: 'app-new-match',
    imports: [
        Fluid,
        ReactiveFormsModule,
        Button,
        Select
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
        @Inject('ApiPlayerInterface') private readonly  apiPlayerService: ApiPlayerInterface,
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
        })
    }

    isError(): boolean {
        return !this.formGroup.get('playerA')?.value || !this.formGroup.get('playerB')?.value;
    }

    onClick() {
        this.playerSelected.emit([this.formGroup.get('playerA')?.value, this.formGroup.get('playerB')?.value]);
        this.navigate.navigateTo(AppRoutes.CURRENT_MATCH);
        this.matchService.startMatch({playerA: this.formGroup.get('playerA')?.value, playerB: this.formGroup.get('playerB')?.value});
    }

    @Output() playerSelected = new EventEmitter<[Player, Player]>();

    get filteredPlayersForB() {
        const playerAId = this.formGroup.get('playerA')?.value?.id;
        return this.players.filter(p => p.id !== playerAId);
    }

    get filteredPlayersForA() {
        const playerAId = this.formGroup.get('playerB')?.value?.id;
        return this.players.filter(p => p.id !== playerAId);
    }
}

import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {Fluid} from 'primeng/fluid';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Listbox} from 'primeng/listbox';
import {Button} from 'primeng/button';
import {ApiPlayerInterface} from '../../services/api-player/api-player.interface';
import {ApiPlayerService} from '../../services/api-player/api-player.service';
import {Player} from '../../types/player.type';
import {MatchService} from '../../services/match-service.service';

@Component({
    selector: 'app-choose-player',
    imports: [
        Fluid,
        ReactiveFormsModule,
        Listbox,
        Button
    ],

    templateUrl: './choose-player.component.html',
    styleUrl: './choose-player.component.css',
    providers: [
        {provide: 'ApiPlayerInterface', useClass: ApiPlayerService}
    ]
})
export class ChoosePlayerComponent implements OnInit {
    players!: Player[];

    formGroup!: FormGroup;

    constructor(
        @Inject('ApiPlayerInterface') private readonly  apiPlayerService: ApiPlayerInterface,
        private readonly matchService: MatchService
    ) {
        this.matchService = matchService;
    }

    ngOnInit() {
        this.apiPlayerService.getPlayers().subscribe(response => this.players = response.content);

        this.formGroup = new FormGroup({
            selectedPlayers: new FormControl<Player[] | null>(null)
        })
    }

    isError(): boolean {
        return this.formGroup.get('selectedPlayers')?.value?.length != 2;
    }

    onPlayerSelected(event: any): void {
        this.formGroup.get('selectedPlayers')?.setValue(event.value);
    }

    onClick() {
        this.playerSelected.emit(this.formGroup.get('selectedPlayers')?.value);
        this.matchService.startMatch();
    }

    @Output() playerSelected = new EventEmitter<[Player, Player]>();

}

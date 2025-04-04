import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {Fluid} from 'primeng/fluid';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Listbox} from 'primeng/listbox';
import {Button} from 'primeng/button';
import {ApiPlayerInterface} from '../../services/api-player/api-player.interface';
import {ApiPlayerService} from '../../services/api-player/api-player.service';

export type Player = {
    id: number;
    firstname: string;
    lastname: string;
}

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
        {provide: 'ApiPlayerInterface', useClass: ApiPlayerService},
    ]
})
export class ChoosePlayerComponent implements OnInit {
    players!: Player[];

    formGroup!: FormGroup;

    constructor(
        @Inject('ApiPlayerInterface') private apiPLayerService: ApiPlayerInterface,
    ) {
    }

    ngOnInit() {
        this.apiPLayerService.getPlayers().subscribe(players => this.players = players);

        this.formGroup = new FormGroup({
            selectedPlayers: new FormControl<Player[] | null>(null)
        })
    }

    isError(): Boolean {
        return this.formGroup.get('selectedPlayers')?.value?.length != 2;
    }

    onPlayerSelected(event: any): void {
        this.formGroup.get('selectedPlayers')?.setValue(event.value);
    }

    onClick() {
        this.playerSelected.emit(this.formGroup.get('selectedPlayers')?.value);
    }

    @Output() playerSelected = new EventEmitter<[Player, Player]>();

}

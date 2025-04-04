import {Component, Inject, Input, OnInit} from '@angular/core';
import {Fluid} from 'primeng/fluid';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from 'primeng/accordion';
import {Listbox} from 'primeng/listbox';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Player} from '../../choose-player/choose-player.component';
import {ApiPlayerService} from '../../../services/api-player/api-player.service';
import {Button} from 'primeng/button';
import {ApiUserService} from '../../../services/api-user/api-user.service';

@Component({
    selector: 'app-link-player',
    imports: [
        Fluid,
        Accordion,
        AccordionContent,
        AccordionHeader,
        AccordionPanel,
        Listbox,
        ReactiveFormsModule,
        Button
    ],
    templateUrl: './link-player.component.html',
    styleUrl: './link-player.component.css',
    providers: [
        {provide: 'ApiPlayerService', useClass: ApiPlayerService},
        {provide: 'ApiUserService', useClass: ApiUserService},
    ]
})
export class LinkPlayerComponent implements OnInit {
    unlinkedPlayers: Player[] = [];
    formGroup!: FormGroup;
    @Input() user!: any;

    constructor(
        @Inject('ApiPlayerService') private apiPlayerService: ApiPlayerService,
        @Inject('ApiUserService') private apiUserService: ApiUserService
    ) {
        this.apiPlayerService = apiPlayerService;
        this.apiUserService = apiUserService;
    }

    ngOnInit() {
        this.apiPlayerService.getUnlinkedPlayers().subscribe((players: Player[]): Player[] => this.unlinkedPlayers = players);
        this.formGroup = new FormGroup({
            selectedPlayer: new FormControl<Player | null>(null,  Validators.required)
        })
    }

    onSubmit() {
        const selectedPlayer = this.formGroup.get('selectedPlayer')?.value;
        if (selectedPlayer != null) {
            this.apiUserService.linkPlayer(this.user.id, selectedPlayer.id).subscribe()
        }
    }
}

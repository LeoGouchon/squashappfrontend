import {Component, Inject, OnInit} from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {Button} from 'primeng/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {ApiPlayerService} from '../../../../services/api-player/api-player.service';
import {ApiPlayerInterface} from '../../../../services/api-player/api-player.interface';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {ApiTeamInterface} from '../../../../services/api-team/api-team.interface';
import {Team} from '../../../../types/team.type';
import {ApiTeamService} from '../../../../services/api-team/api-team.service';
import {Select} from 'primeng/select';
import {NgForOf} from '@angular/common';

@Component({
    selector: 'app-add-player',
    imports: [
        FloatLabel,
        Button,
        InputText,
        ReactiveFormsModule,
        Toast,
        Select
    ],
    templateUrl: './add-player.component.html',
    styleUrl: './add-player.component.css',
    providers: [
        {provide: 'ApiPlayerInterface', useClass: ApiPlayerService},
        {provide: 'ApiTeamInterface', useClass: ApiTeamService}
    ]
})
export class AddPlayerComponent implements OnInit {
    protected teams: Team[] = [];
    protected selectedTeam: Team | undefined = undefined;

    constructor(
        @Inject('ApiPlayerInterface') private readonly apiPlayerService: ApiPlayerInterface,
        @Inject('ApiTeamInterface') private readonly apiTeamService: ApiTeamInterface,
        private readonly messageService: MessageService
    ) {
    }

    formGroup = new FormGroup({
        firstname: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        team: new FormControl(this.selectedTeam, Validators.required)
    });

    ngOnInit() {
        this.apiTeamService.getTeams().subscribe(teams => this.teams = teams);
    }

    onSubmit() {
        if (this.formGroup.valid) {
            this.apiPlayerService.createPlayer(this.formGroup.value.firstname!, this.formGroup.value.lastname!, this.formGroup.value.team!.id!)
                .subscribe({
                    next: () => {
                        this.formGroup.reset();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Création réussie !',
                            detail: 'Le joueur a été créé avec succès'
                        });
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: 'Une erreur est survenue lors de la création du joueur'
                        });
                    }
                });
        }
    }
}

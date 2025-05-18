import {Component, Inject, OnInit} from '@angular/core';
import {Player} from '../../types/player.type';
import {ApiPlayerInterface} from '../../services/api-player/api-player.interface';
import {ApiPlayerService} from '../../services/api-player/api-player.service';
import {Button} from 'primeng/button';
import {Fluid} from 'primeng/fluid';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Select} from 'primeng/select';
import {ApiAdminService} from '../../services/api-admin.service';
import {AppRoutes} from '../../AppRoutes';
import {MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {Divider} from 'primeng/divider';
import {AddPlayerComponent} from './components/add-player/add-player.component';

@Component({
    selector: 'app-admin',
    imports: [
        Button,
        Fluid,
        FormsModule,
        ReactiveFormsModule,
        Select,
        Toast,
        InputTextModule,
        Divider,
        AddPlayerComponent
    ],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css',
    providers: [
        {provide: 'ApiPlayerInterface', useClass: ApiPlayerService},
        MessageService
    ]
})
export class AdminComponent implements OnInit {
    protected players: Player[] = [];
    protected formGroup!: FormGroup;
    protected invitationUrl: string | undefined;

    constructor(
        @Inject('ApiPlayerInterface') private readonly apiPlayerService: ApiPlayerInterface,
        private readonly apiAdminService: ApiAdminService,
        private readonly messageService: MessageService
    ) {
    }

    ngOnInit() {
        this.apiPlayerService.getUnlinkedPlayers().subscribe(response => this.players = response);
        this.formGroup = new FormGroup({
            player: new FormControl<Player | null>(null, Validators.required),
        })
    }

    copyLink() {
        navigator.clipboard.writeText(this.invitationUrl!).then(() => {
            this.messageService.add({
                severity: 'success',
                summary: 'Info',
                detail: 'Lien copié dans le presse-papier'
            })
        })
    }

    onClick() {
        const selectedPlayer = this.formGroup.get('player')?.value;
        if (selectedPlayer != null) {
            this.apiAdminService.invitePlayer(selectedPlayer.id).subscribe(
                (response) => {
                    this.invitationUrl = window.location.origin + '/' + AppRoutes.REGISTER + '?invitation-token=' + response.token;
                    this.copyLink();
                });
        }
    }

    selectText(input: HTMLInputElement) {
        input.select();
    }
}

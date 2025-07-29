import {Component, Inject, OnInit} from '@angular/core';
import {Player} from '../../types/player.type';
import {ApiPlayerInterface} from '../../services/api-player/api-player.interface';
import {NgForOf} from '@angular/common';
import {ApiPlayerService} from '../../services/api-player/api-player.service';
import {Message} from 'primeng/message';
import {NavigationService, NavigationServiceInterface} from '../../services/navigation.service';
import {AppRoutes} from '../../AppRoutes';

@Component({
    selector: 'app-player-selector',
    imports: [
        NgForOf,
        Message
    ],
    providers: [
        {provide: 'ApiPlayerInterface', useClass: ApiPlayerService},
        {provide: 'NavigationServiceInterface', useClass: NavigationService}
    ],
    templateUrl: './player-selector.component.html',
    styleUrl: './player-selector.component.css'
})
export class PlayerSelectorComponent implements OnInit {
    players: Player[] = [];

    constructor(@Inject('ApiPlayerInterface') private readonly apiPlayerService: ApiPlayerInterface,
                @Inject('NavigationServiceInterface') private readonly navigate: NavigationServiceInterface) {
    }

    ngOnInit() {
        this.apiPlayerService.getPlayers().subscribe((response) => {
                this.players = response.content;
            }
        );
    }

    selectPlayer = (player: Player) => this.navigate.navigateTo(AppRoutes.PLAYER + '/' + player.id);
}

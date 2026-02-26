import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PlayerStats} from '../../types/player-stats.type';
import {ApiMatchInterface} from '../../services/api-match/api-match.interface';
import {ApiMatchService} from '../../services/api-match/api-match.service';
import {Message} from 'primeng/message';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {PlayerStatsComponent} from './components/player-stats/player-stats.component';

@Component({
    selector: 'app-player',
    imports: [Message, Tabs, TabList, Tab, TabPanels, TabPanel, PlayerStatsComponent],
    providers: [
        {provide: 'ApiMatchInterface', useClass: ApiMatchService},
    ],
    templateUrl: './player.component.html',
    styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit {
    playedId?: string;
    playerStats?: PlayerStats;
    isLoading = false;

    constructor(private readonly route: ActivatedRoute, @Inject('ApiMatchInterface') private readonly apiMatchService: ApiMatchInterface
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.isLoading = true;
            const id = params['id'];
            if (id) {
                this.playedId = id;
                this.apiMatchService.getPlayerStats(id).subscribe(playerStats => this.playerStats = playerStats);
            }
            this.isLoading = false;
        })
    }
}

import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PlayerStats} from '../../types/player-stats.type';
import {ApiMatchInterface} from '../../services/api-match/api-match.interface';

@Component({
    selector: 'app-player',
    imports: [],
    templateUrl: './player.component.html',
    styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit {
    playedId?: string;
    playerStats?: PlayerStats;

    constructor(private route: ActivatedRoute, @Inject('ApiMatchInterface') private readonly apiMatchService: ApiMatchInterface
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                this.playedId = id;
                this.apiMatchService.getPlayerStats(id).subscribe(playerStats => this.playerStats = playerStats);
            }
        })
    }
}

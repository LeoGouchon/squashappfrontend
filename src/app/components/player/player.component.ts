import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PlayerStats, StatsAgainstOpponent} from '../../types/player-stats.type';
import {ApiMatchInterface} from '../../services/api-match/api-match.interface';
import {ApiMatchService} from '../../services/api-match/api-match.service';
import {Fluid} from 'primeng/fluid';
import {Message} from 'primeng/message';
import {Tag} from "primeng/tag";
import {Badge} from "primeng/badge";
import {Divider} from 'primeng/divider';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from 'primeng/accordion';
import {AccordionHeaderComponent} from '../historic/components/accordion-header/accordion-header.component';
import {MatchListComponent} from '../historic/components/match-list/match-list.component';
import {NgForOf} from '@angular/common';
import {SessionStat} from '../../types/session-stat.type';


@Component({
    selector: 'app-player',
    imports: [Fluid, Message, Tag, Badge, Divider, AccordionContent, AccordionHeader, AccordionHeaderComponent, AccordionPanel, MatchListComponent, NgForOf, Accordion],
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

    protected activeIndexes: number[] = [0];
    protected loadedPanels: Set<number> = new Set([0]);

    constructor(private route: ActivatedRoute, @Inject('ApiMatchInterface') private readonly apiMatchService: ApiMatchInterface
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

    protected trackByPlayer(index: number, stats: StatsAgainstOpponent): StatsAgainstOpponent {
        return stats;
    }

    protected onAccordionChange(indexes: unknown) {
        const openIndexes = Array.isArray(indexes) ? indexes : [indexes];
        openIndexes.forEach(i => this.loadedPanels.add(i));
    }
}

import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OverallStats, PlayerStats, StatsAgainstOpponent, YearlyStats} from '../../types/player-stats.type';
import {ApiMatchInterface} from '../../services/api-match/api-match.interface';
import {ApiMatchService} from '../../services/api-match/api-match.service';
import {Fluid} from 'primeng/fluid';
import {Message} from 'primeng/message';
import {Tag} from "primeng/tag";
import {Badge} from "primeng/badge";
import {Divider} from 'primeng/divider';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from 'primeng/accordion';
import {NgForOf} from '@angular/common';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {PlayerStatsComponent} from './components/player-stats/player-stats.component';

@Component({
    selector: 'app-player',
    imports: [Fluid, Message, Tag, Badge, Divider, AccordionContent, AccordionHeader, AccordionPanel, NgForOf, Accordion, Tabs, TabList, Tab, TabPanels, TabPanel, PlayerStatsComponent],
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

    protected activeIndexes: number[] = [];
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

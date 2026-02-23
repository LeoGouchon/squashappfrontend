import {Component, Input} from '@angular/core';
import {OverallStats, StatsAgainstOpponent, YearlyStats} from '../../../../types/player-stats.type';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from 'primeng/accordion';
import {Badge} from 'primeng/badge';
import {Divider} from 'primeng/divider';
import {Fluid} from 'primeng/fluid';
import {NgForOf, NgIf} from '@angular/common';
import {Tag} from 'primeng/tag';

@Component({
  selector: 'app-player-stats',
    imports: [
        Accordion,
        AccordionContent,
        AccordionHeader,
        AccordionPanel,
        Badge,
        Divider,
        Fluid,
        NgForOf,
        Tag,
        NgIf
    ],
  templateUrl: './player-stats.component.html',
  styleUrl: './player-stats.component.css'
})
export class PlayerStatsComponent {
    @Input() stats!: YearlyStats | OverallStats;

    protected activeIndexes: number[] = [];
    protected loadedPanels: Set<number> = new Set([0]);

    protected hasOpponentStats(stats: YearlyStats | OverallStats): stats is OverallStats {
        return 'statsAgainstOpponents' in stats && Array.isArray(stats.statsAgainstOpponents);
    }

    protected trackByPlayer(index: number, stats: StatsAgainstOpponent): StatsAgainstOpponent {
        return stats;
    }

    protected onAccordionChange(indexes: unknown) {
        const openIndexes = Array.isArray(indexes) ? indexes : [indexes];
        openIndexes.forEach(i => this.loadedPanels.add(i));
    }
}

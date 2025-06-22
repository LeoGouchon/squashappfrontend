import {Component, Inject, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {TableModule} from 'primeng/table';
import {ApiMatchInterface} from '../../services/api-match/api-match.interface';
import {ApiMatchService} from '../../services/api-match/api-match.service';
import {PaginatedRequest} from '../../types/pagination.type';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from 'primeng/accordion';
import {MatchListComponent} from './components/match-list/match-list.component';
import {SessionStat} from '../../types/session-stat.type';
import {AccordionHeaderComponent} from './components/accordion-header/accordion-header.component';

@Component({
    selector: 'app-historic',
    imports: [
        TableModule,
        NgForOf,
        Accordion,
        AccordionPanel,
        AccordionHeader,
        AccordionContent,
        MatchListComponent,
        AccordionHeaderComponent,
    ],
    templateUrl: './historic.component.html',
    styleUrl: './historic.component.css',
    providers: [
        {provide: 'ApiMatchInterface', useClass: ApiMatchService},
    ]
})
export class HistoricComponent implements OnInit {
    protected sessionStats: SessionStat[] = [];
    private readonly pagination: PaginatedRequest = {page: 0, size: 50};
    protected isDateLoading: boolean = false;

    protected activeIndexes: number[] = [0];
    protected loadedPanels: Set<number> = new Set([0]);

    constructor(
        @Inject('ApiMatchInterface') private readonly apiMatchService: ApiMatchInterface,
    ) {
    };

    ngOnInit() {
        this.isDateLoading = true;
        this.apiMatchService.getSessionStats(this.pagination).subscribe(
            session => {
                this.sessionStats = [...session.content];
                this.isDateLoading = false;
            }
        );
    }

    protected trackBySession(index: number, session: SessionStat): SessionStat {
        return session;
    }

    protected onAccordionChange(indexes: unknown) {
        const openIndexes = Array.isArray(indexes) ? indexes : [indexes];
        openIndexes.forEach(i => this.loadedPanels.add(i));
    }
}

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
import {finalize} from 'rxjs';
import {Button} from 'primeng/button';

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
        Button,
    ],
    templateUrl: './historic.component.html',
    styleUrl: './historic.component.css',
    providers: [
        {provide: 'ApiMatchInterface', useClass: ApiMatchService},
    ]
})
export class HistoricComponent implements OnInit {
    protected sessionStats: SessionStat[] = [];
    private readonly pageSize = 10;
    protected isDateLoading: boolean = false;
    protected isLoadingMore: boolean = false;
    protected hasMoreSessions: boolean = true;
    private currentPage = 0;

    protected activeIndexes: number[] = [0];
    protected loadedPanels: Set<number> = new Set([0]);

    constructor(
        @Inject('ApiMatchInterface') private readonly apiMatchService: ApiMatchInterface,
    ) {
    };

    ngOnInit() {
        this.loadSessions();
    }

    protected trackBySession(index: number, session: SessionStat): SessionStat {
        return session;
    }

    protected onAccordionChange(indexes: unknown) {
        const openIndexes = Array.isArray(indexes) ? indexes : [indexes];
        openIndexes.forEach(i => this.loadedPanels.add(i));
    }

    protected loadMoreSessions() {
        if (!this.hasMoreSessions || this.isDateLoading || this.isLoadingMore) {
            return;
        }

        this.loadSessions(true);
    }

    private loadSessions(isLoadMore: boolean = false) {
        if (isLoadMore) {
            this.isLoadingMore = true;
        } else {
            this.isDateLoading = true;
        }

        const pagination: PaginatedRequest = {page: this.currentPage, size: this.pageSize};
        this.apiMatchService.getSessionStats(pagination)
            .pipe(finalize(() => {
                if (isLoadMore) {
                    this.isLoadingMore = false;
                } else {
                    this.isDateLoading = false;
                }
            }))
            .subscribe(session => {
                this.sessionStats = isLoadMore
                    ? [...this.sessionStats, ...session.content]
                    : [...session.content];
                this.hasMoreSessions = this.currentPage + 1 < session.totalPages;
                this.currentPage += 1;
            });
    }
}

import {Component, Inject, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from '@angular/common';
import {PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {Chip} from 'primeng/chip';
import {ApiMatchInterface} from '../../services/api-match/api-match.interface';
import {ApiMatchService} from '../../services/api-match/api-match.service';
import {PaginatedRequest} from '../../types/pagination.type';
import {Match} from '../../types/match.type';
import {Skeleton} from 'primeng/skeleton';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from 'primeng/accordion';
import {MatchListComponent} from './components/match-list/match-list.component';

@Component({
    selector: 'app-historic',
    imports: [
        PrimeTemplate,
        TableModule,
        NgForOf,
        Chip,
        Skeleton,
        Accordion,
        AccordionPanel,
        AccordionHeader,
        AccordionContent,
        DatePipe,
        MatchListComponent,
    ],
    templateUrl: './historic.component.html',
    styleUrl: './historic.component.css',
    providers: [
        { provide: 'ApiMatchInterface', useClass: ApiMatchService },
    ]
})
export class HistoricComponent implements OnInit {
    protected dateSessions: number[] = [];
    private readonly pagination: PaginatedRequest = {page: 0, size: 50};
    protected isDateLoading: boolean = false;

    constructor(
        @Inject('ApiMatchInterface') private readonly apiMatchService: ApiMatchInterface,
    ) {
    };

    ngOnInit() {
        this.isDateLoading = true;
        this.apiMatchService.getSessionDate(this.pagination).subscribe(
            dates => {
                this.dateSessions = [...dates.content];
                this.isDateLoading = false;
            }
        );
    }

    protected trackByDate(index: number, date: number): number {
        return date;
    }
}

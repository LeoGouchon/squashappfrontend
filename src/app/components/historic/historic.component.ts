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
    ],
    templateUrl: './historic.component.html',
    styleUrl: './historic.component.css',
    providers: [
        { provide: 'ApiMatchInterface', useClass: ApiMatchService },
    ]
})
export class HistoricComponent implements OnInit {
    protected matches: Match[] = [];
    private readonly pagination: PaginatedRequest = {page: 0, size: 50};
    protected isMatchesLoading: boolean = true;

    constructor(
        @Inject('ApiMatchInterface') private readonly apiMatchService: ApiMatchInterface,
    ) {
    };

    ngOnInit() {
        this.isMatchesLoading = true;
        this.apiMatchService.getMatches(this.pagination).subscribe(
            matches => {
                this.matches = matches.content;
                this.groupMatchesByDate(this.matches);
                this.isMatchesLoading = false;
            }
        );
    }

    protected trackByDate(index: number, date: number): number {
        return date;
    }

    groupMatchesByDate(matches: Match[]): { date: string, matches: Match[] }[] {
        const groupedMatches: { [key: string]: any } = {};
        matches.forEach((match: any) => {
            const date = new Date(match.startTime ?? match.endTime).toLocaleDateString();
            groupedMatches[date] ??= [];
            groupedMatches[date].push(match);
        });
        return Object.keys(groupedMatches)
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
            .map((date) => {
                const sortedMatches = groupedMatches[date].sort((a: any, b: any) => new Date(b.startTime ?? b.endTime).getTime() - new Date(a.startTime ?? a.endTime).getTime());
                return ({date, matches: sortedMatches});
            });
    }

    protected getAllDates(): number[] {
        const dates = this.matches.reduce((dates, match) => {
            const timestamp = match.startTime ?? match.endTime;
            if (!timestamp) return dates;

            const dt = new Date(timestamp);
            const dayTimestamp = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()).getTime();

            if (!dates.includes(dayTimestamp)) {
                dates.push(dayTimestamp);
            }
            return dates;
        }, [] as number[]);

        return dates.sort((a, b) => b - a);
    }

    protected getMatchesByDate(dateTimestamp: number): Match[] {
        const inputDate = new Date(dateTimestamp);

        return this.matches.filter(match => {
            const matchTimestamp = match.startTime ?? match.endTime;
            if (!matchTimestamp) return false;
            const matchDate = new Date(matchTimestamp);
            return (
                matchDate.getFullYear() === inputDate.getFullYear() &&
                matchDate.getMonth() === inputDate.getMonth() &&
                matchDate.getDate() === inputDate.getDate()
            );
        });
    }

    protected getLastDate(): number {
        const dates = this.getAllDates();
        return dates.length > 0 ? dates[0] : -1;
    }
}

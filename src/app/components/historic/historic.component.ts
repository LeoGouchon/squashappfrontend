import {Component, Inject} from '@angular/core';
import {NgForOf} from '@angular/common';
import {PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {Chip} from 'primeng/chip';
import {ApiMatchInterface} from '../../services/api-match/api-match.interface';
import {ApiMatchService} from '../../services/api-match/api-match.service';
import {NavigationService} from '../../services/navigation.service';
import {PaginatedRequest} from '../../types/pagination.type';

@Component({
    selector: 'app-historic',
    imports: [
        PrimeTemplate,
        TableModule,
        NgForOf,
        Chip,
    ],
    templateUrl: './historic.component.html',
    styleUrl: './historic.component.css',
    providers: [
        { provide: 'ApiMatchInterface', useClass: ApiMatchService },
    ]
})
export class HistoricComponent {
    protected matches: any[] = [];
    private readonly pagination: PaginatedRequest = {page: 0, size: 50};

    constructor(
        @Inject('ApiMatchInterface') private readonly apiMatchService: ApiMatchInterface,
    ) {
    };

    ngOnInit() {
        this.apiMatchService.getMatches(this.pagination).subscribe(matches => this.matches = matches.content);
    }

        groupMatchesByDate(matches: any[]): any[] {
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
}

import {Component, Inject} from '@angular/core';
import {NgForOf} from '@angular/common';
import {PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {Chip} from 'primeng/chip';
import {ApiMatchInterface} from '../../services/api-match/api-match.interface';
import {ApiMatchService} from '../../services/api-match/api-match.service';
import {NavigationService} from '../../services/navigation.service';

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

    constructor(
        @Inject('ApiMatchInterface') private apiMatchService: ApiMatchInterface,
    ) {
    };

    ngOnInit() {
        this.apiMatchService.getMatches().subscribe(matches => this.matches = matches);
    }

        groupMatchesByDate(matches: any[]): any[] {
        const groupedMatches: { [key: string]: any } = {};
        matches.forEach((match: any) => {
            const date = new Date(match.startTime || match.endTime).toLocaleDateString();
            if (!groupedMatches[date]) {
                groupedMatches[date] = [];
            }
            groupedMatches[date].push(match);
        });
        return Object.keys(groupedMatches)
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
            .map((date) => {
                const sortedMatches = groupedMatches[date].sort((a: any, b: any) => new Date(b.startTime || b.endTime).getTime() - new Date(a.startTime || a.endTime).getTime());
                return ({date, matches: sortedMatches});
            });
    }
}

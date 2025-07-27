import {Component, Inject, OnInit} from '@angular/core';
import {ApiMatchInterface} from '../../services/api-match/api-match.interface';
import {OverallStats} from '../../types/overall-stats.type';
import {Tag} from 'primeng/tag';
import {Fluid} from 'primeng/fluid';
import {DatePipe, NgForOf} from '@angular/common';
import {Match} from '../../types/match.type';

@Component({
    selector: 'app-statistics',
    imports: [
        Tag,
        Fluid,
        NgForOf,
        DatePipe
    ],
    templateUrl: './statistics.component.html',
    styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
    protected isDataLoading: boolean = true;
    protected overallStats: OverallStats | undefined;

    constructor(
        @Inject('ApiMatchInterface') private readonly apiMatchService: ApiMatchInterface,
    ) {
    };

    ngOnInit() {
        this.isDataLoading = true;
        this.apiMatchService.getOverallStats().subscribe(
            stats => {
                this.overallStats = {
                    ...stats,
                    closestMatches: stats.closestMatches.sort((a: Match, b: Match) => b.startTime - a.startTime),
                    stompestMatches: stats.stompestMatches.sort((a: Match, b: Match) => b.startTime - a.startTime),
                };
                this.isDataLoading = false;
            }
        );
    }


}

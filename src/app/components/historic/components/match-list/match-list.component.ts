import {Component, Inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Chip} from "primeng/chip";
import {NgForOf} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {Skeleton} from "primeng/skeleton";
import {TableModule} from "primeng/table";
import {Match} from '../../../../types/match.type';
import {PaginatedRequest} from '../../../../types/pagination.type';
import {ApiMatchInterface} from '../../../../services/api-match/api-match.interface';
import {SessionStat} from '../../../../types/session-stat.type';
import {Router} from '@angular/router';
import {AppRoutes} from '../../../../AppRoutes';

@Component({
    selector: 'app-match-list',
    imports: [
        Chip,
        NgForOf,
        PrimeTemplate,
        Skeleton,
        TableModule,
    ],
    templateUrl: './match-list.component.html',
    styleUrl: './match-list.component.css',
    encapsulation: ViewEncapsulation.None
})
export class MatchListComponent implements OnInit {
    @Input() sessionStat!: SessionStat;

    protected matches: Match[] = [];
    protected isMatchesLoading: boolean = true;
    private readonly pagination: PaginatedRequest = {page: 0, size: 50};

    constructor(
        @Inject('ApiMatchInterface') private readonly apiMatchService: ApiMatchInterface,
        private readonly router: Router,
    ) {
    };

    ngOnInit(): void {
        this.isMatchesLoading = true;
        this.apiMatchService.getMatches(this.pagination, {date: this.sessionStat.date}).subscribe(
            matchesResponse => {
                this.matches = matchesResponse.content.sort((a: Match, b: Match) => b.startTime - a.startTime);
                this.isMatchesLoading = false;
            }
        )
    }

    onMatchClick(match: Match) {
        if (match.pointsHistory) void this.router.navigate([AppRoutes.MATCH, match.id]);
    }
}

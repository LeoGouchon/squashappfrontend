import {Component, Inject, Input, OnInit} from '@angular/core';
import {Chip} from "primeng/chip";
import {NgForOf} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {Skeleton} from "primeng/skeleton";
import {TableModule} from "primeng/table";
import {Match} from '../../../../types/match.type';
import {PaginatedRequest} from '../../../../types/pagination.type';
import {ApiMatchInterface} from '../../../../services/api-match/api-match.interface';
import {SessionStat} from '../../../../types/session-stat.type';

@Component({
  selector: 'app-match-list',
    imports: [
        Chip,
        NgForOf,
        PrimeTemplate,
        Skeleton,
        TableModule
    ],
  templateUrl: './match-list.component.html',
  styleUrl: './match-list.component.css'
})
export class MatchListComponent implements OnInit {
    @Input() sessionStat!: SessionStat;

    protected matches: Match[] = [];
    protected isMatchesLoading: boolean = true;
    private readonly pagination: PaginatedRequest = {page: 0, size: 50};

    constructor(
        @Inject('ApiMatchInterface') private readonly apiMatchService: ApiMatchInterface,
    ) {
    };

    ngOnInit(): void {
        this.isMatchesLoading = true;
        this.apiMatchService.getMatches(this.pagination, {date: this.sessionStat.date}).subscribe(
            matches => {
                this.matches = matches.content;
                this.isMatchesLoading = false;
            }
        )
    }
}

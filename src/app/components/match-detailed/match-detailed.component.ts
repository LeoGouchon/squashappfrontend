import {Component, Inject, OnInit} from '@angular/core';
import {Match} from '../../types/match.type';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiMatchInterface} from '../../services/api-match/api-match.interface';
import {ApiMatchService} from '../../services/api-match/api-match.service';
import {Fluid} from 'primeng/fluid';
import {Button} from 'primeng/button';
import {Timeline} from 'primeng/timeline';
import {JsonPipe, NgIf} from '@angular/common';
import {Player} from '../../types/player.type';
import {MatchPoint} from '../../types/match-point.type';
import {Chip} from 'primeng/chip';
import {Badge} from 'primeng/badge';
import {Tag} from 'primeng/tag';

@Component({
    selector: 'app-match-detailed',
    imports: [
        Fluid,
        Button,
        Timeline,
        NgIf,
        Badge,
        Tag
    ],
    providers: [
        {provide: 'ApiMatchInterface', useClass: ApiMatchService},
    ],
    templateUrl: './match-detailed.component.html',
    styleUrl: './match-detailed.component.css'
})
export class MatchDetailedComponent implements OnInit {
    matchId?: string;
    matchDetailed?: Match;
    pointsHistory?: any[];
    isLoading = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        @Inject('ApiMatchInterface') private readonly apiMatchService: ApiMatchInterface
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.isLoading = true;
            const id = params['id'];
            if (id) {
                this.matchId = id;
                this.apiMatchService.getMatch(id).subscribe({
                    next: (match: Match) => {
                        console.log('Match reçu :', match);
                        this.matchDetailed = match
                        if (this.matchDetailed.pointsHistory) {
                            this.formatPointHistory()
                        }
                    },
                    error: () => {
                        this.isLoading = false;
                    },
                    complete: () => {
                        this.isLoading = false;
                    }
                });
            } else {
                this.isLoading = false;
            }
        });
    }

    formatPointHistory() {
        const playerA: Player = this.matchDetailed?.playerA!;
        const playerB: Player = this.matchDetailed?.playerB!;

        this.pointsHistory = this.matchDetailed!.pointsHistory!.map((point: MatchPoint) => ({
            server: point.server === 'A' ? playerA.firstname : playerB.firstname,
            serviceSide: point.serviceSide,
            scorer: point.scorer,
            scoreA: point.scoreA,
            scoreB: point.scoreB
        }))

        this.pointsHistory.push(
            {
                scoreA: this.matchDetailed?.finalScoreA,
                scoreB: this.matchDetailed?.finalScoreB,
            }
        );
    }

    onBack() {
        void this.router.navigate(['/historic']);
    }
}

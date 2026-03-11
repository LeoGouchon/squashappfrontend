import {Component, Inject, OnInit} from '@angular/core';
import {Match} from '../../types/match.type';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiMatchInterface} from '../../services/api-match/api-match.interface';
import {ApiMatchService} from '../../services/api-match/api-match.service';
import {Fluid} from 'primeng/fluid';
import {Button} from 'primeng/button';
import {Timeline} from 'primeng/timeline';
import {NgClass, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {Player} from '../../types/player.type';
import {MatchPoint} from '../../types/match-point.type';
import {Chip} from 'primeng/chip';
import {Badge} from 'primeng/badge';
import {Tag} from 'primeng/tag';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {TableModule} from 'primeng/table';
import {ConfirmationService} from 'primeng/api';
import {StyleClass} from 'primeng/styleclass';

@Component({
    selector: 'app-match-detailed',
    imports: [
        Fluid,
        Button,
        Timeline,
        NgIf,
        NgClass,
        Badge,
        Tag,
        ConfirmDialog,
        TableModule,
        NgSwitchCase,
        NgSwitch,
        NgSwitchDefault,
        StyleClass
    ],
    providers: [
        {provide: 'ApiMatchInterface', useClass: ApiMatchService},
        ConfirmationService,
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
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly confirmationService: ConfirmationService,
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
        const startTime = this.matchDetailed!.pointsHistory?.at(0)?.createdAt;

        this.pointsHistory = this.matchDetailed!.pointsHistory!.map((point: MatchPoint) => ({
            server: point.server,
            serviceSide: point.serviceSide,
            scorer: point.scorer,
            scoreA: point.scoreA,
            scoreB: point.scoreB,
            time: this.getElapsedTime(startTime, point.createdAt),
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

    onDeleteMatch() {
        this.confirmationService.confirm({
            message: 'Cette action est irréversible.',
            header: 'Supprimer le match ? ',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.apiMatchService.deleteMatch(this.matchId!).subscribe(
                    () => {
                        this.onBack()
                    }
                )
            }
        });
    }

    private getElapsedTime(startTimestamp?: string | number | Date, endTimestamp?: string | number | Date): string | undefined {
        if (!startTimestamp || !endTimestamp) {
            return undefined;
        }

        const startTime = new Date(startTimestamp).getTime();
        const endTime = new Date(endTimestamp).getTime();

        if (Number.isNaN(startTime) || Number.isNaN(endTime)) {
            return undefined;
        }

        const diffInSeconds = Math.max(0, Math.floor((endTime - startTime) / 1000));
        const minutes = Math.floor(diffInSeconds / 60);
        const seconds = diffInSeconds % 60;

        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    protected readonly Date = Date;
}

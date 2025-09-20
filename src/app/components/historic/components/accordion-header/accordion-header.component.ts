import {Component, Input, OnInit} from '@angular/core';
import {RankSessionStat, SessionStat} from '../../../../types/session-stat.type';
import {DatePipe} from '@angular/common';
import {Tag} from 'primeng/tag';
import {Fluid} from 'primeng/fluid';

@Component({
  selector: 'app-accordion-header',
    imports: [
        DatePipe,
        Tag,
        Fluid,
    ],
  templateUrl: './accordion-header.component.html',
  styleUrl: './accordion-header.component.css'
})
export class AccordionHeaderComponent implements OnInit {
    @Input() sessionStat!: SessionStat;
    protected sortedRank: RankSessionStat[] = [];

    ngOnInit(): void {
        this.sortedRank = [...this.sessionStat.rank].sort((a, b) => b.wins - a.wins || b.totalPointsScored - a.totalPointsScored);
    }
}

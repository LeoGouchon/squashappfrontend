import {Component, Input, OnInit} from '@angular/core';
import {Match} from '../../types/match.type';

@Component({
  selector: 'app-match-detailed',
  imports: [],
  templateUrl: './match-detailed.component.html',
  styleUrl: './match-detailed.component.css'
})
export class MatchDetailedComponent {
    @Input() matchDetailed?: Match;
}

import { Component } from '@angular/core';
import {Fluid} from 'primeng/fluid';
import {TokenService} from '../../services/token.service';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {Panel} from 'primeng/panel';
import {PrimeTemplate} from 'primeng/api';

@Component({
  selector: 'app-home',
    imports: [
        Fluid,
        Button,
        Card,
        Panel,
        PrimeTemplate
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    constructor(protected readonly tokenService: TokenService) {
        this.tokenService = tokenService;
    }
}

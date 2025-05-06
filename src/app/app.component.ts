import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PrimeNG} from 'primeng/config';
import {DockModule} from 'primeng/dock';
import {NavigationComponent} from './components/navigation/navigation.component';
import {Panel} from 'primeng/panel';
import {NavigationService} from './services/navigation.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, DockModule, NavigationComponent, Panel],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    title = 'Squash';

    constructor(
        private readonly primeng: PrimeNG,
        private readonly navigationService: NavigationService
    ) {
    }

    ngOnInit() {
        this.primeng.ripple.set(true);
        this.navigationService.checkTokenAndNavigate().catch(error => {
            console.error('Erreur lors de la vérification du token :', error);
        });
    }
}

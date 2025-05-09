import {Component, HostListener, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PrimeNG} from 'primeng/config';
import {DockModule} from 'primeng/dock';
import {NavigationComponent} from './components/navigation/navigation.component';
import {Panel} from 'primeng/panel';
import {NavigationService} from './services/navigation.service';
import {Image} from 'primeng/image';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, DockModule, NavigationComponent, Panel, Image],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    title = 'Squash';
    protected isMobile: boolean = false;

    constructor(
        private readonly primeng: PrimeNG,
        private readonly navigationService: NavigationService
    ) {
    }

    ngOnInit() {
        this.primeng.ripple.set(true);
        this.checkDevice();
        this.navigationService.checkTokenAndNavigate().catch(error => {
            console.error('Erreur lors de la vérification du token :', error);
        });
    }

    @HostListener('window:resize')
    onResize() {
        this.checkDevice();
    }

    checkDevice() {
        const isMobileUA = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isSmallScreen = window.innerWidth < 768;

        this.isMobile = isMobileUA && isTouch && isSmallScreen;
    }
}

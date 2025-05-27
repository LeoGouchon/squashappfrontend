import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PrimeNG} from 'primeng/config';
import {DockModule} from 'primeng/dock';
import {NavigationComponent} from './components/navigation/navigation.component';
import {Panel} from 'primeng/panel';
import {NavigationService} from './services/navigation.service';
import {Image} from 'primeng/image';
import {catchError, of, retry, timeout, timer} from 'rxjs';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, DockModule, NavigationComponent, Panel, Image, ProgressSpinner],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Squash';
    protected isMobile: boolean = false;
    protected isBackendLoading: boolean = true;
    protected isBackendError: boolean = false;

    constructor(
        private readonly primeng: PrimeNG,
        private readonly navigationService: NavigationService
    ) {
    }

    messages: string[] = [
        'Chargement du serveur...',
        'Cela peut prendre 1 à 2 minutes...',
        'Connexion au serveur...',
        'Désolé pour l\'attente...',
        'Promis le serveur va démarrer...',
        'Il faut l\'encourager...',
        'Allez petit serveur, tu peux le faire !',
        'J\'ai mis que 2 minutes de timeout...',
        'Sinon ça va toi ?',
        'Pas trop fatigué ?',
        'Bientôt 2 minutes...',
        'Ça passe vite en fait non ?'
    ];

    currentLoadingMessage: string = '';
    private messageIndex = 0;
    private intervalId: any;

    ngOnInit() {
        this.primeng.ripple.set(true);
        this.checkDevice();
        this.isBackendLoading = true;
        this.currentLoadingMessage = this.messages[0];
        this.intervalId = setInterval(() => {
            this.messageIndex = (this.messageIndex + 1) % this.messages.length;
            this.currentLoadingMessage = this.messages[this.messageIndex];
        }, 5000);
        this.navigationService.checkTokenAndNavigate().pipe(
            timeout(10000),
            retry({
                count: 5,
                delay: (error, retryCount) => {
                    if (error.name === 'TimeoutError') {
                        console.warn(`⏳ Timeout (tentative ${retryCount}/5), retry dans 3s...`);
                        return timer(3000);
                    }
                    throw error;
                }
            }),
            catchError(error => {
                console.error('Erreur lors du chargement du serveur :', error);
                this.isBackendError = true;
                return of(undefined);
            })
        ).subscribe(() => this.isBackendLoading = false);
    }

    ngOnDestroy(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
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

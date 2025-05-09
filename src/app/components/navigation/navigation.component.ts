import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {NavigationService, NavigationServiceInterface} from '../../services/navigation.service';
import {TokenService} from '../../services/token.service';
import {Toast} from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {AppRoutes} from '../../AppRoutes';
import {PanelMenu} from 'primeng/panelmenu';
import {Fluid} from 'primeng/fluid';
import {Divider} from 'primeng/divider';
import {Drawer} from 'primeng/drawer';


@Component({
    selector: 'app-navigation',
    imports: [
        ReactiveFormsModule,
        Toast,
        ConfirmDialogModule,
        PanelMenu,
        Fluid,
        Divider,
        Drawer
    ],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.css',
    providers: [
        {provide: 'NavigationServiceInterface', useClass: NavigationService},
        MessageService,
        ConfirmationService
    ]
})
export class NavigationComponent implements OnInit {
    protected isMobile = false;
    protected displaySidebar = false;

    constructor(
        @Inject('NavigationServiceInterface') protected readonly navigation: NavigationServiceInterface,
        private readonly messageService: MessageService,
        protected tokenService: TokenService,
    ) {
        this.tokenService = tokenService;
        this.messageService = messageService;
    }

    items: MenuItem[] | undefined;

    profilItems: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                styleClass: "menu-item",
                label: 'Nouveau Match',
                icon: 'pi pi-plus',
                command: () => {
                    this.tokenService.getAccessToken()
                        ?
                        this.navigation.navigateTo(AppRoutes.NEW_MATCH)
                        :
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Déconnecté',
                            detail: "Vous n'êtes pas connecté",
                            life: 3000
                        });
                }
            },
            {
                label: 'Historique',
                icon: 'pi pi-book',
                command: () => {
                    this.tokenService.getAccessToken()
                        ?
                        this.navigation.navigateTo(AppRoutes.HISTORIC)
                        :
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Déconnecté',
                            detail: "Vous n'êtes pas connecté",
                            life: 3000
                        });
                }
            },
        ];

        this.profilItems = [
            {
                label: 'Mon compte',
                icon: 'pi pi-user',
                command: () => {
                    this.tokenService.getAccessToken()
                        ?
                        this.navigation.navigateTo(AppRoutes.PROFILE)
                        :
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Déconnecté',
                            detail: "Vous n'êtes pas connecté",
                            life: 3000
                        });
                }
            },
            {
                label: 'Deconnexion',
                icon: 'pi pi-sign-out',
                command: () => {
                    this.tokenService.getAccessToken()
                        ?
                        this.navigation.navigateTo(AppRoutes.LOGIN)
                        :
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Déconnecté',
                            detail: "Vous n'êtes pas connecté",
                            life: 3000
                        });
                }
            },
        ];

        this.checkScreenSize();
    }

    @HostListener('window:resize')
    checkScreenSize() {
        this.isMobile = window.innerWidth < 768;
    }

    toggleSidebar() {
        this.displaySidebar = !this.displaySidebar;
    }

    protected readonly AppRoutes = AppRoutes;
}

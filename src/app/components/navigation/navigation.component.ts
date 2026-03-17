import {Component, Inject, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuItem, MessageService} from 'primeng/api';
import {NavigationService, NavigationServiceInterface} from '../../services/navigation.service';
import {TokenService} from '../../services/token.service';
import {Toast} from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {AppRoutes} from '../../AppRoutes';
import {PanelMenu} from 'primeng/panelmenu';
import {Fluid} from 'primeng/fluid';
import {Divider} from 'primeng/divider';
import {Drawer} from 'primeng/drawer';
import {ApiUserService} from '../../services/api-user/api-user.service';
import {ApiUserInterface} from '../../services/api-user/api-user.interface';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {ThemeService} from '../../services/theme/theme.service';


@Component({
    selector: 'app-navigation',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        Toast,
        ConfirmDialogModule,
        PanelMenu,
        Fluid,
        Divider,
        Drawer,
        ToggleSwitch
    ],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.css',
    providers: [
        {provide: 'NavigationServiceInterface', useClass: NavigationService},
        {provide: 'ApiUserInterface', useClass: ApiUserService},
        MessageService
    ]
})
export class NavigationComponent implements OnInit {
    protected displaySidebar = false;
    protected darkModeEnabled = false;
    protected readonly themeLabel = 'Thème';

    constructor(
        @Inject('NavigationServiceInterface') protected readonly navigation: NavigationServiceInterface,
        @Inject('ApiUserInterface') protected readonly apiUserService: ApiUserInterface,
        private readonly messageService: MessageService,
        protected tokenService: TokenService,
        private readonly themeService: ThemeService
    ) {
        this.tokenService = tokenService;
        this.messageService = messageService;
        this.darkModeEnabled = this.themeService.isDarkMode;
    }

    protected items: MenuItem[] | undefined;
    protected profilItems: MenuItem[] | undefined;
    protected adminItems: MenuItem[] | undefined;

    ngOnInit() {
        this.darkModeEnabled = this.themeService.isDarkMode;
        this.items = [
            {
                label: 'Nouveau Match',
                icon: 'pi pi-plus',
                command: () => {
                    if (this.tokenService.getAccessToken()) {
                        this.navigation.navigateTo(AppRoutes.NEW_MATCH);
                        this.toggleSidebar();
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Déconnecté',
                            detail: "Vous n'êtes pas connecté",
                            life: 3000
                        });
                    }
                }
            },
            {
                label: 'Historique',
                icon: 'pi pi-book',
                command: () => {
                    if (this.tokenService.getAccessToken()) {
                        this.navigation.navigateTo(AppRoutes.HISTORIC);
                        this.toggleSidebar();
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Déconnecté',
                            detail: "Vous n'êtes pas connecté",
                            life: 3000
                        });
                    }
                }
            },
            {
                label: 'Statistiques',
                icon: 'pi pi-chart-bar',
                command: () => {
                    if (this.tokenService.getAccessToken()) {
                        this.navigation.navigateTo(AppRoutes.STATISTICS);
                        this.toggleSidebar();
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Déconnecté',
                            detail: "Vous n'êtes pas connecté",
                            life: 3000
                        });
                    }
                }
            },
            {
                label: 'Joueurs',
                icon: 'pi pi-users',
                command: () => {
                    if (this.tokenService.getAccessToken()) {
                        this.navigation.navigateTo(AppRoutes.PLAYER);
                        this.toggleSidebar();
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Déconnecté',
                            detail: "Vous n'êtes pas connecté",
                            life: 3000
                        });
                    }
                }
            }
        ];

        this.profilItems = [
            {
                label: 'Mon compte',
                icon: 'pi pi-user',
                command: () => {
                    if (this.tokenService.getAccessToken()) {
                        this.navigation.navigateTo(AppRoutes.PROFILE);
                        this.toggleSidebar();
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Déconnecté',
                            detail: "Vous n'êtes pas connecté",
                            life: 3000
                        });
                    }
                }
            },
            {
                label: 'Déconnexion',
                icon: 'pi pi-sign-out',
                command: () => {
                    if (this.tokenService.getAccessToken()) {
                        this.apiUserService.logout().subscribe(() => this.toggleSidebar())
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Déconnecté',
                            detail: "Vous n'êtes pas connecté",
                            life: 3000
                        })
                    }
                }
            },
        ];

        this.adminItems = [
            {
                label: 'Admin',
                icon: 'pi pi-cog',
                command: () => {
                    if (this.tokenService.getIsAdmin()) {
                        this.navigation.navigateTo(AppRoutes.ADMIN);
                        this.toggleSidebar();
                    }
                }
            }
        ]
    };


    toggleSidebar() {
        this.displaySidebar = !this.displaySidebar;
    }

    onThemeChange(enabled: boolean): void {
        this.darkModeEnabled = enabled;
        this.themeService.toggleDarkMode(enabled);
    }
}

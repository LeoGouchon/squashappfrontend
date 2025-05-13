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
import {ApiUserService} from '../../services/api-user/api-user.service';
import {ApiUserInterface} from '../../services/api-user/api-user.interface';


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
        {provide: 'ApiUserInterface', useClass: ApiUserService},
        MessageService,
        ConfirmationService
    ]
})
export class NavigationComponent implements OnInit {
    protected displaySidebar = false;

    constructor(
        @Inject('NavigationServiceInterface') protected readonly navigation: NavigationServiceInterface,
        @Inject('ApiUserInterface') protected readonly apiUserService: ApiUserInterface,
        private readonly messageService: MessageService,
        protected tokenService: TokenService,
    ) {
        this.tokenService = tokenService;
        this.messageService = messageService;
    }

    protected items: MenuItem[] | undefined;
    protected profilItems: MenuItem[] | undefined;
    protected adminItems: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                styleClass: "menu-item",
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
        ];

        this.profilItems = [
            {
                label: 'Mon compte',
                icon: 'pi pi-user',
                command: () => this.tokenService.getAccessToken() ? this.navigation.navigateTo(AppRoutes.PROFILE) : this.messageService.add({
                    severity: 'error',
                    summary: 'Déconnecté',
                    detail: "Vous n'êtes pas connecté",
                    life: 3000
                })
            },
            {
                label: 'Deconnexion',
                icon: 'pi pi-sign-out',
                command: () => this.tokenService.getAccessToken() ? this.apiUserService.logout().subscribe(() => this.toggleSidebar()) : this.messageService.add({
                    severity: 'error',
                    summary: 'Déconnecté',
                    detail: "Vous n'êtes pas connecté",
                    life: 3000
                })
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
}

import {Component, Inject, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {Menubar} from 'primeng/menubar';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {NavigationService, NavigationServiceInterface} from '../../services/navigation.service';
import {TokenService} from '../../services/token.service';
import {Avatar} from 'primeng/avatar';
import {OverlayBadge} from 'primeng/overlaybadge';
import {Toast} from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {AppRoutes} from '../../AppRoutes';


@Component({
    selector: 'app-navigation',
    imports: [
        ReactiveFormsModule,
        Menubar,
        Avatar,
        OverlayBadge,
        Toast,
        ConfirmDialogModule
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

    constructor(
        @Inject('NavigationServiceInterface') protected readonly navigation: NavigationServiceInterface,
        private readonly messageService: MessageService,
        protected tokenService: TokenService,
    ) {
        this.tokenService = tokenService;
        this.messageService = messageService;
    }

    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
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
    }

    protected readonly AppRoutes = AppRoutes;
}

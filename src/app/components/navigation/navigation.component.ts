import {Component, Inject, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {Menubar} from 'primeng/menubar';
import {MenuItem, MessageService} from 'primeng/api';
import {NgIf} from '@angular/common';
import {NavigationService, NavigationServiceInterface} from '../../services/navigation.service';
import {TokenService} from '../../services/token.service';
import {Avatar} from 'primeng/avatar';
import {OverlayBadge} from 'primeng/overlaybadge';
import {Toast} from 'primeng/toast';

@Component({
    selector: 'app-navigation',
    imports: [
        ReactiveFormsModule,
        Menubar,
        Avatar,
        OverlayBadge,
        Toast
    ],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.css',
    providers: [
        {provide: 'NavigationServiceInterface', useClass: NavigationService},
        MessageService
    ]
})
export class NavigationComponent implements OnInit {

    constructor(
        @Inject('NavigationServiceInterface') private navigation: NavigationServiceInterface,
        private messageService: MessageService,
        protected tokenService: TokenService
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
                    this.tokenService.isTokenPresent()
                        ?
                        this.navigation.navigateTo('/add-match')
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
                    this.tokenService.isTokenPresent()
                        ?
                        this.navigation.navigateTo('/historic')
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


}

import {Component, Inject, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {Menubar} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {NgIf} from '@angular/common';
import {NavigationService, NavigationServiceInterface} from '../../services/navigation.service';

@Component({
    selector: 'app-navigation',
    imports: [
        ReactiveFormsModule,
        Menubar,
        NgIf
    ],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.css',
    providers: [
        { provide: 'NavigationServiceInterface', useClass: NavigationService },
    ]
})
export class NavigationComponent implements OnInit {
    constructor(
        @Inject('NavigationServiceInterface') private navigation: NavigationServiceInterface
    ) {}
    items: MenuItem[] | undefined;
    ngOnInit() {
        this.items = [
            {
                label: 'Nouveau Match',
                icon: 'pi pi-plus',
                command: () => {
                    this.navigation.navigateTo('/add-match');
                }
            },
            {
                label: 'Historique',
                icon: 'pi pi-book',
                command: () => {
                    this.navigation.navigateTo('/historic');
                }
            },
        ];
    }


}

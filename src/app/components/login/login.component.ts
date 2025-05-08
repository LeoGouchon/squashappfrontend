import {Component, Inject, OnInit} from '@angular/core';
import {Fluid} from 'primeng/fluid';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Password} from 'primeng/password';
import {Button} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {FloatLabel} from 'primeng/floatlabel';
import {ApiUserService} from '../../services/api-user/api-user.service';
import {TokenService} from '../../services/token.service';
import {NavigationService, NavigationServiceInterface} from '../../services/navigation.service';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from 'primeng/accordion';
import {Listbox} from 'primeng/listbox';
import {ApiPlayerService} from '../../services/api-player/api-player.service';
import {Player} from '../../types/player.type';

@Component({
    selector: 'app-login',
    imports: [
        Fluid,
        ReactiveFormsModule,
        Password,
        Button,
        InputTextModule,
        FloatLabel,
        FormsModule,
        Accordion,
        AccordionPanel,
        AccordionHeader,
        AccordionContent,
        Listbox,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    providers: [
        { provide: 'NavigationServiceInterface', useClass: NavigationService },
        { provide: 'ApiUserService', useClass: ApiUserService },
        { provide: 'ApiPlayerService', useClass: ApiPlayerService },
    ]
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    alreadySubmitOnce: boolean = false;
    formError: boolean = false;
    formErrorText: string = '';
    isLoginPage: boolean = true;
    unlinkedPlayers: Player[] = [];

    constructor(
        @Inject('NavigationServiceInterface') private navigation: NavigationServiceInterface,
        @Inject('ApiUserService') private apiUserService: ApiUserService,
        @Inject('ApiPlayerService') private apiPlayerService: ApiPlayerService,
        private tokenService: TokenService)
    {
        this.apiUserService = apiUserService;
        this.tokenService = tokenService;
        this.apiPlayerService = apiPlayerService;
    }

    ngOnInit() {
        this.apiPlayerService.getUnlinkedPlayers().subscribe((players: Player[]):Player[] => this.unlinkedPlayers = players);
        this.loginForm = new FormGroup({
            email: new FormControl<String>(''),
            password: new FormControl<String>(''),
            confirmedPassword: new FormControl<String>(''),
            selectedPlayer: new FormControl<Player | null>(null)
        });
    }

    onFocus() {
        this.formError = false;
        this.formErrorText = '';
    }

    onSubmit() {
        this.alreadySubmitOnce = true;
        if (this.isLoginPage) {
            if (this.loginForm.valid && this.isEmailvalid()) {
                const formValues = this.loginForm.value;
                this.apiUserService.login(formValues.email, formValues.password).subscribe({
                    next: () => {
                        if (this.tokenService.getAccessToken()) {
                            this.formError = false;
                            this.formErrorText = '';
                            this.navigation.navigateTo('/');
                        }
                    },
                    error: (error) => {
                        if (error.status === 401) {
                            this.formError = true;
                            this.formErrorText = 'Email ou mot de passe incorrect';
                        }
                    }
                });
            } else if (!this.isEmailvalid()) {
                this.formError = true;
                this.formErrorText = 'Veuillez rentrer un email';
            }
        }
        else {
            const formValues = this.loginForm.value;
            if (this.loginForm.valid && this.isEmailvalid() && formValues.password === formValues.confirmedPassword) {
                this.apiUserService.signup(formValues.email, formValues.password, formValues.selectedPlayer?.id).subscribe({
                    next: () => {
                        if (this.tokenService.getAccessToken()) {
                            this.formError = false;
                            this.formErrorText = '';
                            this.navigation.navigateTo('/');
                        }
                    },
                    error: (error) => {
                        if (error.status === 401) {
                            this.formError = true;
                            this.formErrorText = 'Email ou mot de passe incorrect';
                        }
                    }
                });
            } else if (!this.isEmailvalid()) {
                this.formError = true;
                this.formErrorText = 'Veuillez rentrer un email';
            }
            else if (formValues.password !== formValues.confirmedPassword) {
                this.formError = true;
                this.formErrorText = 'Les mots de passe ne correspondent pas';
            }
        }

    }

    isEmailvalid() {
        let regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return regex.test(this.loginForm.get('email')?.value)
    }

    switchLoginSignUp() {
        this.isLoginPage = !this.isLoginPage;
    }
}

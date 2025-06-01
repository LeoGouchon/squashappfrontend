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
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';

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
        Toast,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    providers: [
        {provide: 'NavigationServiceInterface', useClass: NavigationService},
        {provide: 'ApiUserService', useClass: ApiUserService},
        MessageService
    ]
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    alreadySubmitOnce: boolean = false;
    formError: boolean = false;
    formErrorText: string = '';
    isResponseLoading: boolean = false;

    constructor(
        private readonly messageService: MessageService,
        @Inject('NavigationServiceInterface') private readonly navigation: NavigationServiceInterface,
        @Inject('ApiUserService') private readonly apiUserService: ApiUserService,
        private readonly tokenService: TokenService) {
        this.apiUserService = apiUserService;
        this.tokenService = tokenService;
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl<string>(''),
            password: new FormControl<string>(''),
            confirmedPassword: new FormControl<string>(''),
        });
    }

    onFocus() {
        this.formError = false;
        this.formErrorText = '';
    }

    onSubmit() {
        this.alreadySubmitOnce = true;

        if (this.loginForm.valid && this.isEmailvalid()) {
            this.isResponseLoading = true;

            const formValues = this.loginForm.value;
            this.apiUserService.login(formValues.email, formValues.password).subscribe({
                next: () => {
                    this.isResponseLoading = false;
                    if (this.tokenService.getAccessToken()) {
                        this.formError = false;
                        this.formErrorText = '';
                        this.navigation.navigateTo('/');
                    }
                },
                error: (error) => {
                    this.isResponseLoading = false;
                    if (error.status === 401) {
                        this.formError = true;
                        this.formErrorText = 'Email ou mot de passe incorrect';
                        this.messageService.add({severity:'error', summary: 'Erreur de connexion', detail: this.formErrorText, life: 3000});
                    }
                }
            });
        } else if (!this.isEmailvalid()) {
            this.formError = true;
            this.formErrorText = 'Veuillez rentrer un email';
        }
    }

    isEmailvalid() {
        let regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return regex.test(this.loginForm.get('email')?.value)
    }
}

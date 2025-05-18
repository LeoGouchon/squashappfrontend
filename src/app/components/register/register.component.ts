import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { NavigationService, NavigationServiceInterface } from '../../services/navigation.service';
import { ApiUserService } from '../../services/api-user/api-user.service';
import { Button } from 'primeng/button';
import { Password } from 'primeng/password';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Fluid } from 'primeng/fluid';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        Fluid,
        Button,
        Password,
        FloatLabel,
        InputText,
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    providers: [
        { provide: 'NavigationServiceInterface', useClass: NavigationService },
        { provide: 'ApiUserService', useClass: ApiUserService },
    ],
})
export class RegisterComponent implements OnInit {
    protected loginForm!: FormGroup;
    protected alreadySubmitOnce: boolean = false;
    protected formErrorText: string = '';
    protected invitationToken: string = '';

    constructor(
        @Inject('NavigationServiceInterface') private readonly navigation: NavigationServiceInterface,
        @Inject('ApiUserService') private readonly apiUserService: ApiUserService,
        private readonly tokenService: TokenService,
        private readonly route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.invitationToken = this.route.snapshot.queryParamMap.get('invitation-token') ?? '';
        this.loginForm = new FormGroup({

            email: new FormControl('', [Validators.required, Validators.pattern(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)]),
            password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/)]),
            confirmedPassword: new FormControl('', [Validators.required]),
        });
    }

    isFieldInvalid(field: string): boolean {
        const control = this.loginForm.get(field);
        return !!control && control.invalid && (control.dirty || control.touched || this.alreadySubmitOnce);
    }

    get passwordMismatch(): boolean {
        const { password, confirmedPassword } = this.loginForm.value;
        return password && confirmedPassword && password !== confirmedPassword;
    }

    onFocus() {
        this.formErrorText = '';
    }

    onSubmit() {
        this.alreadySubmitOnce = true;

        if (this.loginForm.valid && !this.passwordMismatch) {
            const { email, password } = this.loginForm.value;
            this.apiUserService.signup(email, password, this.invitationToken).subscribe({
                next: () => {
                    if (this.tokenService.getAccessToken()) {
                        this.navigation.navigateTo('/');
                    }
                },
                error: (error) => {
                    if (error.status === 401) {
                        this.formErrorText = 'Email ou mot de passe incorrect';
                    }
                }
            });
        } else {
            this.loginForm.markAllAsTouched();
        }
    }
}

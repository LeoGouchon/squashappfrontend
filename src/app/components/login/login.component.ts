import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Fluid } from 'primeng/fluid';
import { Button } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ApiUserService } from '../../services/api-user/api-user.service';

@Component({
    selector: 'app-login',
    imports: [Fluid, FormsModule, Button, Toast],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    providers: [
        { provide: 'ApiUserService', useClass: ApiUserService },
        MessageService,
    ],
})
export class LoginComponent {
    formError = false;
    formErrorText = '';
    isResponseLoading = false;

    constructor(
        private readonly messageService: MessageService,
        @Inject('ApiUserService') private readonly apiUserService: ApiUserService,
    ) {}

    onSubmit(): void {
        this.isResponseLoading = true;
        this.formError = false;
        this.apiUserService.login().subscribe({
            error: () => {
                this.isResponseLoading = false;
                this.formError = true;
                this.formErrorText = 'La connexion a échoué';
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur de connexion',
                    detail: this.formErrorText,
                    life: 3000,
                });
            },
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Button } from 'primeng/button';
import { Fluid } from 'primeng/fluid';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [Fluid, Button],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
    protected invitationToken: string = '';

    constructor(private readonly route: ActivatedRoute) {}

    ngOnInit() {
        this.invitationToken = this.route.snapshot.queryParamMap.get('invitation-token') ?? '';
    }

    onSubmit() {
        const target = `${environment.identityAuthFrontendUrl}/signup?invitationToken=${encodeURIComponent(this.invitationToken)}`;
        globalThis.location.assign(target);
    }
}

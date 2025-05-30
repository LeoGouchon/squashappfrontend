import {Component, Input, OnInit} from '@angular/core';
import { ApiUserService } from '../../services/api-user/api-user.service';
import {Button} from 'primeng/button';
import {Fluid} from 'primeng/fluid';

@Component({
  selector: 'app-profile',
    imports: [
        Button,
        Fluid,
    ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  @Input() userProfile: any;

  constructor(private readonly apiUserService: ApiUserService) {
      this.apiUserService = apiUserService;
  }

  ngOnInit(): void {
    this.apiUserService.getCurrentUser().subscribe(profile => {
      this.userProfile = profile;
    });
  }

  disconnect(): void {
      this.apiUserService.logout().subscribe();
  }
}


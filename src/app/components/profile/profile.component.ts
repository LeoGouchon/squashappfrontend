import {Component, Input, OnInit} from '@angular/core';
import { ApiUserService } from '../../services/api-user/api-user.service';
import {Button} from 'primeng/button';
import {Fluid} from 'primeng/fluid';
import {LinkPlayerComponent} from './link-player/link-player.component';

@Component({
  selector: 'app-profile',
    imports: [
        Button,
        Fluid,
        LinkPlayerComponent,
    ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  @Input() userProfile: any;

  constructor(private apiUserService: ApiUserService) {
      this.apiUserService = apiUserService;
  }

  ngOnInit(): void {
    this.apiUserService.getCurrentUser().subscribe(profile => {
      this.userProfile = profile;
      console.log(profile)
    });
  }

  disconnect(): void {
      console.log("DISCONNECT");
      this.apiUserService.logout(this.userProfile.token).subscribe();
  }
}


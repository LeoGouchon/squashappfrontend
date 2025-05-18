import {Component, Inject} from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {Button} from 'primeng/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {ApiPlayerService} from '../../../../services/api-player/api-player.service';
import {ApiPlayerInterface} from '../../../../services/api-player/api-player.interface';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-add-player',
    imports: [
        FloatLabel,
        Button,
        InputText,
        ReactiveFormsModule,
        Toast
    ],
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.css',
    providers: [
        {provide: 'ApiPlayerInterface', useClass: ApiPlayerService},
    ]
})
export class AddPlayerComponent {
    constructor(
        @Inject('ApiPlayerInterface') private readonly apiPlayerService: ApiPlayerInterface,
        private readonly messageService: MessageService
    ) {
    }

    formGroup = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.formGroup.valid) {
      this.apiPlayerService.createPlayer(this.formGroup.value.firstname!, this.formGroup.value.lastname!)
          .subscribe({
            next: () => {
              this.formGroup.reset();
              this.messageService.add({severity: 'success', summary: 'Création réussie !', detail: 'Le joueur a été créé avec succès'});
            },
            error: () => {
              this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue lors de la création du joueur'});
            }
          });
    }
  }
}

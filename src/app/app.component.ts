import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PrimeNG} from 'primeng/config';
import {DockModule} from 'primeng/dock';
import {NavigationComponent} from './components/navigation/navigation.component';
import {Card} from 'primeng/card';
import {Panel} from 'primeng/panel';

@Component({
  selector: 'app-root',
    imports: [RouterOutlet, DockModule, NavigationComponent, Card, Panel],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Squash';

  constructor(private primeng: PrimeNG) {}

  ngOnInit() {
    this.primeng.ripple.set(true);
  }
}

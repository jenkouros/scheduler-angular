import { Component } from '@angular/core';
import { HubConnectionBuilder, LogLevel, HubConnection } from '@aspnet/signalr';
import { environment } from '../environments/environment';

interface Nav {
  link: string;
  name: string;
  exact: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  navigation: Nav[] = [
    {
      link: '/scheduler',
      name: 'Planiranje',
      exact: false
    },
    {
      link: '/worktime',
      name: 'Urnik strojev',
      exact: false
    }
  ];
}

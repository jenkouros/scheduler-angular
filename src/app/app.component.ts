import { Component } from '@angular/core';
import { appSettings } from '../environments/environment';

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
  env = appSettings;

  navigation: Nav[] = [
    {
      link: '/scheduler',
      name: 'Planiranje',
      exact: false
    },
    {
      link: '/timetables',
      name: 'Urnik strojev',
      exact: false
    }
  ];
}

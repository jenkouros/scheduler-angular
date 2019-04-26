import { Component, OnInit } from '@angular/core';
import { HubConnectionBuilder, LogLevel, HubConnection } from '@aspnet/signalr';
import { appSettings } from '../environments/environment';
import { AuthenticationService } from './auth/services';

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
export class AppComponent implements OnInit {
  title = 'app';
  env = appSettings;
  isLoggedIn = false;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.authService.isLoggedIn$.subscribe(val => this.isLoggedIn = val);
  }



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

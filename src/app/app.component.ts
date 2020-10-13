import { ApplicationFacadeService } from './store/application/application-facade.service';
import { Component, OnInit } from '@angular/core';
import { HubConnectionBuilder, LogLevel, HubConnection } from '@aspnet/signalr';
import { appSettings, environment } from '../environments/environment';
import { AuthenticationService } from './auth/services';
import { AppComponentBase } from '../app/shared/app-component-base';

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
export class AppComponent extends AppComponentBase implements OnInit {
  title = 'app';
  env = appSettings;
  isLoggedIn = false;
  mode = environment.mode;

  navigation: Nav[] = [
    {
      link: '/scheduler',
      name: this.translate('Planning'),
      exact: false
    },
    {
      link: '/timetables',
      name: this.translate('Machine_Schedule'),
      exact: false
    }
  ];

  loader$ = this.applicationFacade.loader$;

  constructor(private authService: AuthenticationService, private applicationFacade: ApplicationFacadeService) {
    super();
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.authService.isLoggedIn$.subscribe(val => {
      this.isLoggedIn = val;

    });

    this.loader$.subscribe(i => console.log(i));
  }



}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeSl from '@angular/common/locales/sl';

// import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SchedulerModule } from './scheduler/scheduler.module';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRouterModule } from './app-router.module';
import { EffectsModule } from '@ngrx/effects';
import { initialReducerMap, getInitialState } from './store/app.reducers';
import {FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { locale, loadMessages } from 'devextreme/localization';
// import { DevExtremeModule } from 'devextreme-angular';
import 'devextreme-intl';
import * as messagesSl from './shared/localization/sl.json';
import { SignalRService } from './scheduler/services/signalr.service';

loadMessages(messagesSl);
// Set locale according the browser language
locale('sl');
registerLocaleData(localeSl, 'sl');
export function init_signalR(signalRService: SignalRService): () => Promise<any> {
  return () => signalRService.init();
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    AppRouterModule,
    StoreModule.forRoot(initialReducerMap, { initialState: getInitialState }),
    EffectsModule.forRoot([]),
    // StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    FontAwesomeModule
  ],
  providers: [
    SignalRService,
    { provide: LOCALE_ID, useValue: 'sl-SI' },
    { provide: APP_INITIALIZER, useFactory: init_signalR, deps: [SignalRService], multi: true }
  ],
  bootstrap: [AppComponent]
  })
export class AppModule {
}

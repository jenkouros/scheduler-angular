import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeSl from '@angular/common/locales/sl';

// import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule, MetaReducer } from '@ngrx/store';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SchedulerModule } from './scheduler/scheduler.module';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRouterModule } from './app-router.module';
import { EffectsModule } from '@ngrx/effects';
import { initialReducerMap, CustomSerializer, AppState } from './store/app.reducers';
import { effects } from './store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { locale, loadMessages } from 'devextreme/localization';
import 'devextreme-intl';
import * as messagesSl from './shared/localization/sl.json';
import { SignalRService } from './scheduler/services/signalr.service';
import { HttpClientModule } from '../../node_modules/@angular/common/http';


loadMessages(messagesSl);
// Set locale according the browser language
locale('sl');
registerLocaleData(localeSl, 'sl');


export function init_signalR(signalRService: SignalRService): () => Promise<any> {
  return () => signalRService.init();
}
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    HttpClientModule,
    AppRouterModule,
    StoreModule.forRoot(initialReducerMap),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    /*!environment.production ? */ StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }) /*: []*/,
    FontAwesomeModule
  ],
  providers: [
    SignalRService,
    { provide: LOCALE_ID, useValue: 'sl-SI' },
    {
      provide: APP_INITIALIZER,
      useFactory: init_signalR,
      deps: [SignalRService],
      multi: true
    },
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

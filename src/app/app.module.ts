import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeSl from '@angular/common/locales/sl';
import localeSr from '@angular/common/locales/sr-Latn';
import localeEn from '@angular/common/locales/en';
import localeDe from '@angular/common/locales/de';



// import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
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
import devextremeMessages from './shared/localization/sl-sr.json';
import messagesCustom from './shared/localization/messages.json';
import { SignalRService } from './scheduler/services/signalr.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { storeFreeze } from 'ngrx-store-freeze';
import { PlanModule } from './plan/plan.module';
import { JwtInterceptor, ErrorInterceptor } from './auth/helpers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DxLoadPanelModule, DxLoadIndicatorModule } from 'devextreme-angular';

// Set locale according the browser language
loadMessages(messagesCustom);
loadMessages(devextremeMessages);



 locale(environment.locale);
 switch (environment.locale) {
    case 'sl': {
      registerLocaleData(localeSl);
      break;
    } case 'sr-Latn': {
      registerLocaleData(localeSr);
      break;
    } case 'en': {
      registerLocaleData(localeEn);
      break;
    } case 'de': {
      registerLocaleData(localeDe);
      break;
    }
 }


export function init_signalR(signalRService: SignalRService): () => Promise<any> {
  return () => signalRService.init();
}
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRouterModule,
    PlanModule,
    StoreModule.forRoot(initialReducerMap, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25 }) : [],
    FontAwesomeModule,
    CoreModule, // .forRoot()
    DxLoadPanelModule,
    DxLoadIndicatorModule
  ],
  providers: [
    SignalRService,
    { provide: LOCALE_ID, useValue: environment.locale },
    {
      provide: APP_INITIALIZER,
      useFactory: init_signalR,
      deps: [SignalRService],
      multi: true
    },
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

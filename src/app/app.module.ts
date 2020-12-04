import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import localeSl from '@angular/common/locales/sl';
import localeSr from '@angular/common/locales/sr-Latn';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DxLoadIndicatorModule, DxLoadPanelModule } from 'devextreme-angular';
import { loadMessages, locale } from 'devextreme/localization';
import { environment } from '../environments/environment';
import { AppRouterModule } from './app-router.module';
import { AppComponent } from './app.component';
import { ErrorInterceptor, JwtInterceptor } from './auth/helpers';
import { CoreModule } from './core/core.module';
import { PlanModule } from './plan/plan.module';
import { SignalRService } from './scheduler/services/signalr.service';
import messagesCustom from './shared/localization/messages.json';
import devextremeMessages from './shared/localization/sl-sr.json';
import { effects } from './store';
import { AppState, CustomSerializer, initialReducerMap } from './store/app.reducers';




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

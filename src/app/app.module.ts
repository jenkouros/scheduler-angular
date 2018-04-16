import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
//import { ServiceWorkerModule } from '@angular/service-worker';

import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SchedulerModule } from './scheduler/scheduler.module';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRouterModule } from './app-router.module';
import { EffectsModule } from '@ngrx/effects';
import { initialReducerMap, getInitialState } from './store/app.reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    //ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    AppRouterModule,
    SchedulerModule,
    StoreModule.forRoot(initialReducerMap, { initialState: getInitialState }),
    EffectsModule.forRoot([]),
    //StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'sl-SI' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

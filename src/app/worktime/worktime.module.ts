import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// Dx Component
import {
  DxToolbarModule,
  DxButtonModule,
  DxDateBoxModule,
  DxTabPanelModule,
  DxDataGridModule
} from 'devextreme-angular';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';

// services
import * as fromServices from './services';

import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import * as fromCalendars from './store/reducers/calendars.reducer';
import { reducers, effects } from './store';

const routes: Routes = [
  {
    path: '',
    component:
      fromContainers.TimeTablesComponent /*, children: [
       { path: 'schedule', component: ScheduleComponent},
     { path: 'calendar', component: CalendarComponent }
    ],*/
  },
  {
    path: 'schedule',
    component: fromContainers.ScheduleComponent
  }
];

@NgModule({
  declarations: [...fromContainers.containers, ...fromComponents.components],
  imports: [
    CommonModule,
    DxToolbarModule,
    DxButtonModule,
    DxDateBoxModule,
    DxTabPanelModule,
    DxDataGridModule,
    FontAwesomeModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('worktime', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [...fromServices.services]
})
export class WorktimeModule {}

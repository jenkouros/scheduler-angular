import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// Dx Component
import {
  DxToolbarModule,
  DxButtonModule,
  DxDateBoxModule,
  DxTabPanelModule,
  DxDataGridModule,
  DxTabsModule,
  DxTextBoxModule
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
import * as fromGuards from './guards';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    canActivate: [fromGuards.CalendarsGuard],
    component:
      fromContainers.CalendarsComponent /*, children: [
       { path: 'schedule', component: ScheduleComponent},
     { path: 'calendar', component: CalendarComponent }
    ],*/
  },
  {
    path: 'new',
    canActivate: [fromGuards.CalendarsGuard],
    component: fromContainers.CalendarItemComponent
  },
  {
    path: 'edit/:calendarId',
    canActivate: [fromGuards.CalendarExistsGuard],
    component: fromContainers.CalendarItemComponent
  },
  {
    path: ':calendarId',
    canActivate: [fromGuards.CalendarsGuard],
    component: fromContainers.CalendarDetailComponent,
    children: [
      { path: '', redirectTo: 'calendar' },
      {
        path: 'calendar',
        component: fromComponents.CalendarComponent
      },
      {
        path: 'schedule',
        canActivate: [fromGuards.TimeTablesGuard],
        component: fromContainers.ScheduleDetailComponent
      }
    ]
  }
];

@NgModule({
  declarations: [...fromContainers.containers, ...fromComponents.components],
  imports: [
    CoreModule,
    CommonModule,
    SharedModule,
    DxToolbarModule,
    DxButtonModule,
    DxDateBoxModule,
    DxTabPanelModule,
    DxDataGridModule,
    DxTabsModule,
    DxTextBoxModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('worktime', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [...fromServices.services, ...fromGuards.guards]
})
export class WorktimeModule {}

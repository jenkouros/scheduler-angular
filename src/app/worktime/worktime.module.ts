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
  DxTextBoxModule,
  DxScrollViewModule
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
import { SubCalendarComponent } from './containers/sub-calendar/sub-calendar.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [fromGuards.CalendarsGuard],
    component: fromComponents.WorktimeComponent,
    children: [
      {
        path: '',
        component: fromContainers.ScheduleDetailComponent
      },
      {
        path: 'schedule/:id',
        canActivate: [fromGuards.CalendarsGuard],
        component:
          fromContainers.ScheduleDetailComponent /*, children: [
             { path: 'schedule', component: ScheduleComponent},
           { path: 'calendar', component: CalendarComponent }
          ],*/
      }
    ]
  }
];

@NgModule({
  declarations: [...fromContainers.containers, ...fromComponents.components, SubCalendarComponent],
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
    DxScrollViewModule,
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Dx Component
import {
  DxToolbarModule,
  DxButtonModule,
  DxDateBoxModule,
  DxTabPanelModule,
  DxDataGridModule,
  DxTabsModule,
  DxTextBoxModule,
  DxScrollViewModule,
  DxSelectBoxModule,
  DxNumberBoxModule
} from 'devextreme-angular';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';

// services
import * as fromServices from './services';

import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { reducers, effects } from './store';
import * as fromGuards from './guards';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { RRulePipe } from './pipes/rrule.pipe';
import { JwtInterceptor } from '../auth/helpers';

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
        canActivate: [fromGuards.TimeTablesGuard],
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
  declarations: [...fromContainers.containers, ...fromComponents.components, RRulePipe],
  imports: [
    CoreModule,
    CommonModule,
    SharedModule,
    HttpClientModule,
    DxToolbarModule,
    DxButtonModule,
    DxDateBoxModule,
    DxTabPanelModule,
    DxDataGridModule,
    DxTabsModule,
    DxTextBoxModule,
    DxScrollViewModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('worktime', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [
    ...fromServices.services,
    ...fromGuards.guards,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
})
export class WorktimeModule {}

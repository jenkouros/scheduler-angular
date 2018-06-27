import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MachineSchedulesComponent} from './containers';
import {FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// Dx Component
import {
  DxToolbarModule,
  DxButtonModule,
  DxDateBoxModule,
  DxListModule
} from 'devextreme-angular';
import {} from 'faico';
// containers


// components
import {WorktimeComponent} from './components/worktime.component';
import { ScheduleItemComponent } from './components/schedule-item/schedule-item.component';

const routes: Routes = [
  {
    path: '', component: WorktimeComponent, children: [
    ]
  }
];

@NgModule({
  declarations: [
    WorktimeComponent, MachineSchedulesComponent, ScheduleItemComponent
  ],
  imports: [
    CommonModule,
    DxToolbarModule,
    DxButtonModule, DxDateBoxModule, DxListModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ],
  providers: [
  ]
})
export class WorktimeModule {}

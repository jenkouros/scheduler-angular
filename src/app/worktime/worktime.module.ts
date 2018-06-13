import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// containers


// components
import {WorktimeComponent} from './components/worktime.component';

const routes: Routes = [
  {
    path: '', component: WorktimeComponent, children: [
    ]
  }
];

@NgModule({
  declarations: [
    WorktimeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
  ]
})
export class WorktimeModule {}

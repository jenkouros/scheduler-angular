import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { PlansComponent } from './containers/plans/plans.component';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';

// services
import * as fromServices from './services';
import { CoreModule } from '../core/core.module';
import { PlanListComponent } from './components/plan-list/plan-list.component';
import { DxSelectBoxModule, DxTextBoxModule, DxButtonModule } from 'devextreme-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlanDeletePopupComponent } from './components/plan-delete-popup/plan-delete-popup.component';
import { SharedModule } from '../shared/shared.module';
import { PlanPopupComponent } from './components/plan-popup/plan-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PlansComponent, PlanListComponent, PlanDeletePopupComponent, PlanPopupComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    DxButtonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('plan', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [...fromServices.services],
  exports: [PlansComponent]
})
export class PlanModule {}

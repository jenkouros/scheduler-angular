import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { SchedulerRouterModule } from './scheduler-router.module';
import { reducers, effects } from './store';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import {FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as fromServices from './services';
import {
    DxButtonModule,
    DxTemplateModule,
    DxDataGridModule,
    DxSchedulerModule,
    DxLinearGaugeModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxFormModule,
    DxCheckBoxModule,
    DxScrollViewModule,
    DxNumberBoxModule,
    DxValidatorModule,
    DxValidationSummaryModule,
    DxProgressBarModule,
    DxTextAreaModule,
    DxRadioGroupModule,
    DxDropDownBoxModule,
    DxListModule,
    DxTreeViewModule,
    DxTagBoxModule,
    DxAutocompleteModule,
    DxPopupModule,
    DxDateBoxModule
} from 'devextreme-angular';

import { ContainersEffects } from './store/effects/containers.effect';
import { PreplanitemDraggableDirective } from './components/preplanitem/preplanitem-item/preplanitem-dxdraggable.directive';
import { PlanItemStatusPipe } from './components/planner/plan-viewer/planitemstatus.pipe';
import { JwtInterceptor } from '../auth/helpers';
import { GroupSelectComponent } from './containers';
import { PlanItemGridComponent } from './components/planner-grid/plan-item-grid/plan-item-grid.component';

@NgModule({
    imports: [
        CoreModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        SchedulerRouterModule,
        StoreModule.forFeature('scheduler', reducers),
        EffectsModule.forFeature([...effects, ContainersEffects]),
        SharedModule,
        DxSchedulerModule,
        DxButtonModule,
        DxTemplateModule,
        DxLinearGaugeModule,
        DxDataGridModule,
        FontAwesomeModule,
        DxSelectBoxModule,
        DxTextBoxModule,
        DxTextAreaModule,
        DxNumberBoxModule,
        DxFormModule,
        DxCheckBoxModule,
        DxScrollViewModule,
        DxValidatorModule,
        DxValidationSummaryModule,
        DxProgressBarModule,
        DxRadioGroupModule,
        DxCheckBoxModule,
        DxDropDownBoxModule,
        DxListModule,
        DxTreeViewModule,
        DxTagBoxModule,
        DxAutocompleteModule,
        DxPopupModule,
        DxDateBoxModule
    ],
    exports: [
      GroupSelectComponent
    ],
    declarations: [
        ...fromContainers.containers,
        ...fromComponents.components,
        PreplanitemDraggableDirective,
        PlanItemStatusPipe,
        PlanItemGridComponent
    ],
    providers: [
        ...fromServices.services,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ]
})
export class SchedulerModule {
}

import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  DxAccordionModule, DxAutocompleteModule, DxButtonModule,
  DxCheckBoxModule, DxDataGridModule,
  DxDateBoxModule, DxDropDownBoxModule, DxFormModule, DxLinearGaugeModule,
  DxListModule,
  DxLoadPanelModule, DxNumberBoxModule,
  DxPopupModule, DxProgressBarModule,
  DxRadioGroupModule, DxSchedulerModule,
  DxScrollViewModule, DxSelectBoxModule,
  DxSwitchModule, DxTagBoxModule, DxTemplateModule,
  DxTextAreaModule, DxTextBoxModule,
  DxToolbarModule, DxTreeViewModule,
  DxValidationGroupModule, DxValidationSummaryModule, DxValidatorModule
} from 'devextreme-angular';
import { JwtInterceptor } from '../auth/helpers';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import * as fromComponents from './components';
import { PlanItemStatusPipe } from './components/planner/plan-viewer/planitemstatus.pipe';
import { PreplanitemDraggableDirective } from './components/preplanitem/preplanitem-item/preplanitem-dxdraggable.directive';
import * as fromContainers from './containers';
import { GroupSelectComponent } from './containers';
import { SchedulerRouterModule } from './scheduler-router.module';
import * as fromServices from './services';
import { effects, facades, reducers } from './store';
import { ContainersEffects } from './store/effects/containers.effect';


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
        DxDateBoxModule,
        DxAccordionModule,
        DxLoadPanelModule,
        DxSwitchModule,
        DxToolbarModule,
        DxValidationGroupModule
    ],
    exports: [
      GroupSelectComponent
    ],
    declarations: [
        ...fromContainers.containers,
        ...fromComponents.components,
        PreplanitemDraggableDirective,
        PlanItemStatusPipe
    ],
    providers: [
        ...fromServices.services,
        ...facades,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ]
})
export class SchedulerModule {
}

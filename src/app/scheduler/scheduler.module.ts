import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { SchedulerRouterModule } from './scheduler-router.module';
// import * as fromServices from './services';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import {FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// Dx Component
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
    DxProgressBarModule
} from 'devextreme-angular';

import { CommonModule } from '@angular/common';
import { ItemsService } from './services/items.service';
import { FiltersService } from './services/filters.service';
import { ContainersService } from './services/containers.service';
import { EventsService } from './services/events.service';
import { PreplanitemsService } from './services/preplanitems.service';
import { ItemsEffects } from './store/effects/items.effect';
import { FiltersEffects } from './store/effects/filters.effect';
import { ContainersEffects } from './store/effects/containers.effect';
import { EventsEffects } from './store/effects/events.effect';
import { PreplanitemEffects } from './store/effects/preplanitem.effect';
import { PreplanitemDraggableDirective } from './components/preplanitem/preplanitem-item/preplanitem-dxdraggable.directive';
import { PlanItemStatusPipe } from './components/planner/plan-viewer/planitemstatus.pipe';
import { TimeHelper } from './helpers/time.helper';
import { PlanViewerFormHelper } from './components/planner/plan-viewer/plan-viewer.form.helper';
import { CoreModule } from '../core/core.module';
import { NotifyService } from '../shared/services/notify.service';
import { SearchEffects } from './store/effects/search.effect';
import { SearchService } from './services/search.service';


@NgModule({
    imports: [
        CoreModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        SchedulerRouterModule,
        StoreModule.forFeature('scheduler', reducers),
        EffectsModule.forFeature([
            ItemsEffects,
            FiltersEffects,
            ContainersEffects,
            EventsEffects,
            PreplanitemEffects,
            SearchEffects
        ]),
        SharedModule,
        DxSchedulerModule,
        DxButtonModule,
        DxTemplateModule,
        DxLinearGaugeModule,
        DxDataGridModule,
        FontAwesomeModule,
        DxSelectBoxModule,
        DxTextBoxModule,
        DxNumberBoxModule,
        DxFormModule,
        DxCheckBoxModule,
        DxScrollViewModule,
        DxValidatorModule,
        DxValidationSummaryModule,
        DxProgressBarModule
    ],
    declarations: [
        ...fromContainers.containers,
        ...fromComponents.components,
        PreplanitemDraggableDirective,
        PlanItemStatusPipe
    ],
    providers: [
        // ...fromServices.services
        ItemsService,
        FiltersService,
        ContainersService,
        EventsService,
        PreplanitemsService,
        NotifyService,
        SearchService
    ]
})
export class SchedulerModule {
}

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import * as fromComponents from './components';
import { SchedulerRouterModule } from './scheduler-router.module';
// import * as fromServices from './services';
import { HttpClientModule } from '@angular/common/http';
import { PlanitemListComponent } from './components';
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
    DxFormModule
} from 'devextreme-angular';
import { DxDraggableDirective } from './components/pre-planitem-list/dxdraggable.directive';

import { CommonModule } from '@angular/common';
import { PlanItemsService } from './services/planitems.service';
import { PlanItemHierarchyService } from './services/planitemhierarchy.service';
import { FiltersService } from './services/filters.service';
import { ContainersService } from './services/containers.service';
import { EventsService } from './services/events.service';
import { PreplanitemsService } from './services/preplanitems.service';
import { PlanItemEffects } from './store/effects/planitem.effect';
import { FiltersEffects } from './store/effects/filters.effect';
import { ContainersEffects } from './store/effects/containers.effect';
import { EventsEffects } from './store/effects/events.effect';
import { PlanItemHierarchyEffects } from './store/effects/planitemhierarchy.effect';
import { PreplanitemEffects } from './store/effects/preplanitem.effect';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        SchedulerRouterModule,
        StoreModule.forFeature('scheduler', reducers),
        EffectsModule.forFeature([
            PlanItemEffects,
            FiltersEffects,
            ContainersEffects,
            EventsEffects,
            PreplanitemEffects,
            PlanItemHierarchyEffects
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
        DxFormModule
    ],
    declarations: [...fromComponents.components, DxDraggableDirective],
    providers: [
        // ...fromServices.services
        PlanItemsService,
        PlanItemHierarchyService,
        FiltersService,
        ContainersService,
        EventsService,
        PreplanitemsService
    ]
})
export class SchedulerModule {
}

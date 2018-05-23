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
import { PreplanitemDraggableDirective } from './components/preplanitem-item/preplanitem-dxdraggable.directive';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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
    declarations: [
        ...fromContainers.containers,
        ...fromComponents.components,
        PreplanitemDraggableDirective],
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

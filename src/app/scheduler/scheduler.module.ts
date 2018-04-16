import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";
import { StoreModule } from "@ngrx/store";
import * as fromStore from "./store";
import * as fromComponents from './components';
import { SchedulerRouterModule } from "./scheduler-router.module";
import * as fromServices from "./services";
import { HttpClientModule } from "@angular/common/http";
import { PlanitemListComponent } from "./components";
import { EffectsModule } from "@ngrx/effects";

import { DxSchedulerModule, DxButtonModule, DxTemplateModule, DxLinearGaugeModule } from 'devextreme-angular';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        SchedulerRouterModule,
        HttpClientModule,
        StoreModule.forFeature('scheduler', fromStore.reducers),
        EffectsModule.forFeature(fromStore.effects),
        DxSchedulerModule,DxButtonModule,DxTemplateModule,DxLinearGaugeModule
    ],
    declarations: [...fromComponents.components],
    providers: [...fromServices.services]
})
export class SchedulerModule {

}

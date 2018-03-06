import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store";
import * as fromComponents from './components';
import { SchedulerRouterModule } from "./scheduler-router.module";
import * as fromServices from "./services";
import { HttpClientModule } from "@angular/common/http";
import { PlanitemListComponent } from "./components";

@NgModule({
    imports: [
        SharedModule,
        SchedulerRouterModule,
        HttpClientModule,
        StoreModule.forFeature('scheduler', reducers)
    ],
    declarations: [...fromComponents.components],
    providers: [...fromServices.services]
})
export class SchedulerModule {

}
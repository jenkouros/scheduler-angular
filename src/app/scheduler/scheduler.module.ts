import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store";
import * as fromComponents from './components';
import { SchedulerRouterModule } from "./scheduler-router.module";

@NgModule({
    imports: [
        SharedModule,
        SchedulerRouterModule,
        StoreModule.forFeature('scheduler', reducers)
    ],
    declarations: [...fromComponents.components]
})
export class SchedulerModule {

}
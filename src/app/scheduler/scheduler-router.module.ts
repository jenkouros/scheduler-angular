import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SchedulerComponent } from "./components";

const schedulerRoutes: Routes = [
    { path: '', component: SchedulerComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(schedulerRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class SchedulerRouterModule {

}
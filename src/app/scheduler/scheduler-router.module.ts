import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SchedulerComponent, FiltersComponent } from "./components";
import { EffectsModule } from "@ngrx/effects";
import { effects } from "./store/effects";

const schedulerRoutes: Routes = [
    { path: '', component: SchedulerComponent, children: [
        { path: 'filters', component: FiltersComponent }
    ]}
];

@NgModule({
    imports: [
        RouterModule.forChild(schedulerRoutes),
        EffectsModule.forFeature(effects)
    ],
    exports: [
        RouterModule
    ]
})
export class SchedulerRouterModule {

}
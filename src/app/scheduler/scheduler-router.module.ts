import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SchedulerComponent, FiltersComponent, GroupsComponent, PlanitemListComponent, PlannerComponent } from "./components";
import { EffectsModule } from "@ngrx/effects";
import { effects } from "./store/effects";

const schedulerRoutes: Routes = [
    { path: '', component: SchedulerComponent, children: [
        { path: 'filters', component: FiltersComponent },
        { path: 'groups', component: GroupsComponent },
        { path: 'planitems', component: PlanitemListComponent },
        { path: 'planner', component: PlannerComponent }
        
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
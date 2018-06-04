import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulerComponent, FiltersComponent, GroupsComponent, PlannerComponent } from './components';
import { ItemsComponent } from './containers';

const schedulerRoutes: Routes = [
    { path: '', component: SchedulerComponent, children: [
        { path: 'filters', component: FiltersComponent },
        { path: 'groups', component: GroupsComponent },
        { path: 'planitems', component: ItemsComponent },
        { path: 'planner', component: PlannerComponent }
    ]}
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

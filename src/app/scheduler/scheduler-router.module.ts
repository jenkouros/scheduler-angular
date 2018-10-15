import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulerComponent, FiltersComponent, PlannerComponent } from './components';
import { ItemsComponent, SearcherComponent, GroupIndexComponent } from './containers';

const schedulerRoutes: Routes = [
    { path: '', component: SchedulerComponent, children: [
        { path: 'filters', component: FiltersComponent },
        { path: 'groups', component: GroupIndexComponent },
        { path: 'planitems', component: ItemsComponent },
        { path: 'planner', component: PlannerComponent },
        { path: 'search', component: SearcherComponent },
        { path: '**', redirectTo: 'planitems' }
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

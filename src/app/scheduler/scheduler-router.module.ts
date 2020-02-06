import { PlanContainerGridComponent } from './components/planner-grid/plan-container-grid/plan-container-grid.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulerComponent, FiltersComponent, PlannerComponent } from './components';
import { ItemsComponent, SearcherComponent, GroupIndexComponent, GroupSelectComponent } from './containers';
import { PlanItemGridComponent } from './components/planner-grid/plan-item-grid/plan-item-grid.component';

const schedulerRoutes: Routes = [
    { path: '', component: SchedulerComponent, children: [
        { path: 'filters', component: FiltersComponent },
        { path: 'groups', component: GroupIndexComponent },
        { path: 'groupselector', component: GroupSelectComponent },
        { path: 'planitems', component: ItemsComponent },
        { path: 'planitemgrid', component: PlanItemGridComponent },
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

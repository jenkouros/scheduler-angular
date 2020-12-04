import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiltersComponent, PlannerComponent, SchedulerComponent } from './components';
import { CalendarDailyComponent } from './components/calendar-daily/calendar-daily.component';
import { PlanContainerGridComponent } from './components/planner-grid/plan-container-grid/plan-container-grid.component';
import { PlanItemGridComponent } from './components/planner-grid/plan-item-grid/plan-item-grid.component';
import { GroupIndexComponent, GroupSelectComponent, ItemsComponent, SearcherComponent } from './containers';

const schedulerRoutes: Routes = [
    { path: '', component: SchedulerComponent, children: [
        { path: 'filters', component: FiltersComponent },
        { path: 'groups', component: GroupIndexComponent },
        { path: 'groupselector', component: GroupSelectComponent },
        { path: 'planitems', component: ItemsComponent },
        // { path: 'planitemgrid', component: PlanGroupComponent },
        { path: 'planitemgrid', component: PlanItemGridComponent },
        { path: 'plancontainergrid', component: PlanContainerGridComponent },
        { path: 'planner', component: PlannerComponent },
        { path: 'search', component: SearcherComponent },
        { path: 'daily', component: CalendarDailyComponent },
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

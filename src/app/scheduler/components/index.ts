import { FiltersComponent } from "./filters/filters.component";
import { GroupsComponent } from "./groups/groups.component";
import { GroupDetailComponent } from "./groups/group-detail/group-detail.component";
import { GroupEditComponent } from "./groups/group-edit/group-edit.component";
import { GroupListComponent } from "./groups/group-list/group-list.component";
import { PlannerComponent } from "./planner/planner.component";
import { PlanViewerComponent } from "./planner/plan-viewer/plan-viewer.component";
import { WorkorderListComponent } from "./workorder-list/workorder-list.component";
import { WorkorderItemComponent } from "./workorder-list/workorder-item/workorder-item.component";
import { SchedulerComponent } from "./scheduler.component";

export const components: any[] = [
    FiltersComponent,
    GroupsComponent,
    GroupDetailComponent,
    GroupEditComponent,
    GroupListComponent,
    PlannerComponent,
    PlanViewerComponent,
    WorkorderListComponent,
    WorkorderItemComponent,
    SchedulerComponent
];

export * from "./filters/filters.component";
export * from "./groups/groups.component";
export * from "./groups/group-detail/group-detail.component";
export * from "./groups/group-edit/group-edit.component";
export * from "./groups/group-list/group-list.component";
export * from "./planner/planner.component";
export * from "./planner/plan-viewer/plan-viewer.component";
export * from "./workorder-list/workorder-list.component";
export * from "./workorder-list/workorder-item/workorder-item.component";
export * from "./scheduler.component";
import { FiltersComponent } from "./filters/filters.component";
import { GroupsComponent } from "./groups/groups.component";
import { GroupDetailComponent } from "./groups/group-detail/group-detail.component";
import { GroupEditComponent } from "./groups/group-edit/group-edit.component";
import { GroupListComponent } from "./groups/group-list/group-list.component";
import { PlannerComponent } from "./planner/planner.component";
import { PlanViewerComponent } from "./planner/plan-viewer/plan-viewer.component";
import { SchedulerComponent } from "./scheduler.component";
import { PlanitemListComponent } from "./planitem-list/planitem-list.component";
import { PlanitemItemComponent } from "./planitem-list/planitem-item/planitem-item.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

export const components: any[] = [
    FiltersComponent,
    GroupsComponent,
    GroupDetailComponent,
    GroupEditComponent,
    GroupListComponent,
    PlannerComponent,
    PlanViewerComponent,
    SchedulerComponent,
    PlanitemListComponent,
    PlanitemItemComponent,
    SidebarComponent
];

export * from "./filters/filters.component";
export * from "./groups/groups.component";
export * from "./groups/group-detail/group-detail.component";
export * from "./groups/group-edit/group-edit.component";
export * from "./groups/group-list/group-list.component";
export * from "./planner/planner.component";
export * from "./planner/plan-viewer/plan-viewer.component";
export * from "./planitem-list/planitem-list.component";
export * from "./planitem-list/planitem-item/planitem-item.component";
export * from "./scheduler.component";
export * from "./sidebar/sidebar.component";
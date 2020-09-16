import { PlanGroupComponent } from './planner-grid/plan-group-grid/plan-group/plan-group.component';
import { PlanItemGridDialogComponent } from './planner-grid/plan-item-grid/plan-item-grid-dialog/plan-item-grid-dialog.component';
import { CalendarEventTooltipComponent } from './calendar/event-tooltip/calendar-event-tooltip.component';
import { PlanContainerGridOperationsComponent } from './planner-grid/plan-container-grid/plan-container-grid-operations/plan-container-grid-operations.component';
import { PlanViewerLinkedItemsComponent } from './planner/plan-viewer/linked-items/plan-viewer-linked-items.component';
import { PreplanitemHidePopupComponent } from './preplanitem/preplanitem-hide-popup/preplanitem-hide-popup.component';
import { FiltersComponent } from './filters/filters.component';
import { GroupEditComponent } from './groups/group-edit/group-edit.component';
import { GroupListComponent } from './groups/group-list/group-list.component';
import { PlannerComponent } from './planner/planner.component';
import { PlanViewerComponent } from './planner/plan-viewer/plan-viewer.component';
import { SchedulerComponent } from './scheduler.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FilterCheckboxComponent } from './filters/filter-checkbox/filter-checkbox.component';
import { FilterAutocompleteComponent } from './filters/filter-autocomplete/filter-autocomplete.component';
import { ContainerItemComponent } from './containers/container-item/container-item.component';
import { ItemAlternativeComponent } from './item/item-alternative/item-alternative.component';
import { SubItemComponent } from './item/subitem/subitem.component';
import { PlanViewerItemComponent} from '../components/planner/plan-viewer/plan-viewer-item/plan-viewer-item.component';
import { PrePlanitemItemComponent } from './preplanitem/preplanitem-item/preplanitem-item.component';
import { ItemPopupComponent } from './item/item-popup/item-popup.component';
import { MassLockPopupComponent } from './planner/mass-lock-popup/mass-lock-popup.component';
import { PlanViewerItemEditComponent } from './planner/plan-viewer/plan-viewer-item-edit/plan-viewer-item-edit.component';
import { PreplanitemDeletePopupComponent } from './preplanitem/preplanitem-delete-popup/preplanitem-delete-popup.component';
import { SearchComponent } from './search/search.component';
import { ItemsSearchComponent } from './search/items/items-search.component';
import { PlanItemsSearchComponent } from './search/planitems/planitems-search.component';
import { ContainerGroupComponent } from './containers/container-group/container-group.component';
import { RealizationTimeUpdateComponent } from './planner/realization-timeupdate-popup/realization-timeupdate.component';
import { FilterContainerComponent } from './filters/filter-container/filter-container.component';
import { ItemQuickPlanComponent } from './item/item-quick-plan/item-quick-plan.component';
// import { PreplanitemSuggestionPopupComponent } from './preplanitem/preplanitem-suggestion-popup/preplanitem-suggestion-popup.component';
import { GroupSelectorComponent } from './groups/group-selector/groupselector.component';
import { PlanItemGridComponent } from './planner-grid/plan-item-grid/plan-item-grid.component';
import { PlanContainerGridComponent } from './planner-grid/plan-container-grid/plan-container-grid.component';
import { PlanItemGridOperationsComponent } from './planner-grid/plan-item-grid/plan-item-grid-operations/plan-item-grid-operations.component';
import { PlanItemGridItemsComponent } from './planner-grid/plan-item-grid/plan-item-grid-items/plan-item-grid-items.component';
import { SequenceOperationListComponent } from './calendar/event-tooltip/sequence-operation-list/event-tooltip-sequence-operations.component';
import { EventTooltipOperationComponent } from './calendar/event-tooltip/operation/event-tooltip-operation.component';
import { UpdateTimeDialogComponent } from './planner-grid/shared/update-time-dialog/update-time-dialog.component';



export const components: any[] = [
    FiltersComponent,
    GroupEditComponent,
    GroupSelectorComponent,
    GroupListComponent,
    PlannerComponent,
    PlanViewerComponent,
    SchedulerComponent,
    ItemListComponent,
    SidebarComponent,
    FilterCheckboxComponent,
    FilterAutocompleteComponent,
    ContainerItemComponent,
    ContainerGroupComponent,
    ItemAlternativeComponent,
    SubItemComponent,
    PlanViewerItemComponent,
    PrePlanitemItemComponent,
    PreplanitemDeletePopupComponent,
    // PreplanitemSuggestionPopupComponent,
    ItemPopupComponent,
    MassLockPopupComponent,
    PlanViewerItemEditComponent,
    SearchComponent,
    ItemsSearchComponent,
    PlanItemsSearchComponent,
    RealizationTimeUpdateComponent,
    FilterContainerComponent,
    ItemQuickPlanComponent,
    PlanItemGridComponent,
    PlanContainerGridComponent,
    PreplanitemHidePopupComponent,
    PlanViewerLinkedItemsComponent,
    PlanItemGridOperationsComponent,
    PlanItemGridItemsComponent,
    PlanContainerGridComponent,
    PlanContainerGridOperationsComponent,
    CalendarEventTooltipComponent,
    SequenceOperationListComponent,
    EventTooltipOperationComponent,
    UpdateTimeDialogComponent,
    PlanItemGridDialogComponent,
    PlanGroupComponent
];

export * from './calendar/event-tooltip/operation/event-tooltip-operation.component';
export * from './planner-grid/plan-group-grid/plan-group/plan-group.component';

export * from './calendar/event-tooltip/sequence-operation-list/event-tooltip-sequence-operations.component';
export * from './calendar/event-tooltip/calendar-event-tooltip.component';
export * from './filters/filters.component';
export * from './groups/group-edit/group-edit.component';
export * from './groups/group-list/group-list.component';
export * from './planner/planner.component';
export * from './planner/plan-viewer/plan-viewer.component';
export * from './item/item-list/item-list.component';
export * from './scheduler.component';
export * from './sidebar/sidebar.component';
export * from './filters/filter-checkbox/filter-checkbox.component';
export * from './filters/filter-autocomplete/filter-autocomplete.component';
export * from './item/item-alternative/item-alternative.component';
export * from './item/subitem/subitem.component';
export * from './planner/plan-viewer/plan-viewer-item/plan-viewer-item.component';
export * from './preplanitem/preplanitem-item/preplanitem-item.component';
export * from './item/item-popup/item-popup.component';
export * from './planner/mass-lock-popup/mass-lock-popup.component';
export * from './containers/container-item/container-item.component';
export * from './containers/container-group/container-group.component';
export * from './planner/plan-viewer/plan-viewer-item-edit/plan-viewer-item-edit.component';
export * from './preplanitem/preplanitem-delete-popup/preplanitem-delete-popup.component';
export * from './search/search.component';
export * from './search/items/items-search.component';
export * from './search/planitems/planitems-search.component';
export * from './planner/realization-timeupdate-popup/realization-timeupdate.component';
export * from './filters/filter-container/filter-container.component';
export * from './item/item-quick-plan/item-quick-plan.component';
export * from './groups/group-selector/groupselector.component';
export * from './planner-grid/plan-item-grid/plan-item-grid.component';
export * from './planner-grid/plan-container-grid/plan-container-grid.component';
export * from './planner/plan-viewer/linked-items/plan-viewer-linked-items.component';
export * from './planner-grid/plan-item-grid/plan-item-grid-operations/plan-item-grid-operations.component';
export * from './planner-grid/plan-item-grid/plan-item-grid-items/plan-item-grid-items.component';

export * from './planner-grid/plan-container-grid/plan-container-grid.component';
export * from './planner-grid/plan-container-grid/plan-container-grid-operations/plan-container-grid-operations.component';
export * from './planner-grid/shared/update-time-dialog/update-time-dialog.component';
export * from './planner-grid/plan-item-grid/plan-item-grid-dialog/plan-item-grid-dialog.component';

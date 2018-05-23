import { ItemsComponent } from './item/items.component';
import { ItemComponent } from './item/item.component';
import { PreplanItemsComponent } from './preplanitems/preplanitems.component';
import { ContainersComponent } from './planitem/containers.component';
import { PlanitemsComponent } from './planitem/planitems.component';

export const containers: any[] = [
    ItemsComponent,
    ItemComponent,
    PreplanItemsComponent,
    ContainersComponent,
    PlanitemsComponent
];

export * from './item/items.component';
export * from './item/item.component';
export * from './preplanitems/preplanitems.component';
export * from './planitem/containers.component';
export * from './planitem/planitems.component';

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import CustomStore from 'devextreme/data/custom_store';
import * as fromStore from '../../store';
import { Store, select } from '@ngrx/store';
import { Item } from '../../models/item.dto';
import { ItemsService } from '../../services/items.service';
import { ItemServer } from '../../models/server/item.servermodel';

@Component({
    selector: 'app-items',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <app-item-list
                    [store]="itemsStore"
                    (selectItem)="onSelectItem($event)"
                    (hideItem)="onHideItem($event)">
                </app-item-list>
            </div>
        </div>
    <div>
    <app-item></app-item>`
})
export class ItemsComponent implements OnInit {
    // itemsStore$: Observable<CustomStore | null>;
    itemsStore: CustomStore | null;
    constructor(
        private store: Store<fromStore.SchedulerState>,
        private itemsService: ItemsService
    ) {}

    ngOnInit(): void {
        this.itemsStore = this.itemsService.getItemsStore();
        this.itemsStore.on('loaded', (data: ItemServer[]) =>
            this.store.dispatch(new fromStore.LoadItemsSuccess( data.map(i => Item.fromServer(i)) ))
        );
        // this.store.dispatch(new fromStore.RegisterItemStore(this.itemsStore));
        // this.store.dispatch(new fromStore.LoadItems());
        // this.itemsStore$ = this.store.pipe(select(fromStore.getItemsStore));
    }

    onSelectItem(item: Item) {
        this.store.dispatch(new fromStore.LoadItemHierarchy({itemId: item.idItem}));
        this.store.dispatch(new fromStore.ShowItemPopup());
    }
    onHideItem(item: Item) {
        this.store.dispatch(new fromStore.HideItem(item.idItem));
    }
}

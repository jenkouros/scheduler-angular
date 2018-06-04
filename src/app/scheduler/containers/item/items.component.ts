import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import CustomStore from 'devextreme/data/custom_store';
import * as fromStore from '../../store';
import { Store, select } from '@ngrx/store';
import { Item } from '../../models/item.dto';

@Component({
    selector: 'app-items',
    template: `
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <app-item-list
                    [store]="itemsStore$ | async"
                    (selectItem)="onSelectItem($event)">
                </app-item-list>
            </div>
        </div>
    <div>
    <app-item></app-item>
    `
})
export class ItemsComponent implements OnInit {
    itemsStore$: Observable<CustomStore | null>;

    constructor(private store: Store<fromStore.SchedulerState>) {}

    ngOnInit(): void {
        this.store.dispatch(new fromStore.LoadItems());
        this.itemsStore$ = this.store.pipe(select(fromStore.getItemsStore));
    }

    onSelectItem(item: Item) {
        this.store.dispatch(new fromStore.LoadItemHierarchy({itemId: item.idItem}));
        this.store.dispatch(new fromStore.ShowItemPopup());
    }
}

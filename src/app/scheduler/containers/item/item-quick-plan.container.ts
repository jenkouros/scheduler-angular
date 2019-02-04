import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs';
import { GridStoreConfiguration } from '../../models/shared.dto';
import { Item } from '../../models/item.dto';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'container-item-quick-plan',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-item-quick-plan
            (selectItem)="onSelectItem($event)"
            [storeConfiguration]="itemsStoreConfiguration$ | async">
        </app-item-quick-plan>
    `
})
export class ItemQuickPlanContainerComponent implements OnInit {
    itemsStoreConfiguration$: Observable<GridStoreConfiguration | null>;
    constructor(private store: Store<fromStore.SchedulerState>) {}

    ngOnInit() {
        this.itemsStoreConfiguration$ = this.store.select(fromStore.getItemsStoreConfiguration);

        const subscription = this.itemsStoreConfiguration$.subscribe(i => {
          if (i === null) {
            this.store.dispatch(new fromStore.LoadItems());
          }
        });
    }

    onSelectItem(item: Item) {
        this.store.dispatch(new fromStore.LoadItemHierarchy({item: item, addToList: true}));
        this.store.dispatch(new fromStore.ShowItemPopup());
    }


}

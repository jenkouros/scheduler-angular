import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';
import { Store, select } from '@ngrx/store';
import { Item } from '../../models/item.dto';
import { ItemServer } from '../../models/server/item.servermodel';
import { GridStoreConfiguration } from '../../models/shared.dto';

import * as fromPlanStore from '../../../plan/store';

@Component({
  selector: 'app-items',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <app-item-list
            [storeConfiguration]="itemsStoreConfiguration$ | async"
            (loadedItems)="onLoadedItems($event)"
            (selectItem)="onSelectItem($event)"
            (hideItem)="onHideItem($event)"
          >
          </app-item-list>
        </div>
      </div>
      <div><app-item></app-item></div>
    </div>
  `
})
export class ItemsComponent implements OnInit {
  itemsStoreConfiguration$: Observable<GridStoreConfiguration | null>;

  constructor(
    private store: Store<fromStore.SchedulerState>,
    private planStore: Store<fromPlanStore.SchedulerPlansState>
  ) {}

  ngOnInit(): void {
    this.planStore.select(fromPlanStore.getSelectedPlanId).subscribe(id => {
      this.store.dispatch(new fromStore.LoadItems());
      console.log('sdfsdfsd', id);
    });

    this.itemsStoreConfiguration$ = this.store.select(fromStore.getItemsStoreConfiguration);
  }

  onLoadedItems(items: ItemServer[]) {
    this.store.dispatch(new fromStore.LoadItemsSuccess(items.map(i => Item.fromServer(i))));
  }

    onSelectItem(item: Item) {
        this.store.dispatch(new fromStore.LoadItemHierarchy({item: item, addToList: false}));
        this.store.dispatch(new fromStore.ShowItemPopup());
    }
    onHideItem(item: Item) {
        this.store.dispatch(new fromStore.HideItem(item.idItem));
    }
}

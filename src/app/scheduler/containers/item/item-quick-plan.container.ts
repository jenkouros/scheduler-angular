import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item } from '../../models/item.dto';
import { GridStoreConfiguration } from '../../models/shared.dto';
import * as fromStore from '../../store';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'container-item-quick-plan',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-item-quick-plan *ngIf="path === 'planner' || path === 'daily'"
            (selectItem)="onSelectItem($event)"
            [storeConfiguration]="itemsStoreConfiguration$ | async">
        </app-item-quick-plan>

        <app-item-quick-plan *ngIf="path === 'plancontainergrid'"
            (selectItem)="onSelectItem2($event)"
            [storeConfiguration]="itemsStoreConfiguration$ | async">
        </app-item-quick-plan>
    `
})
export class ItemQuickPlanContainerComponent implements OnInit {
    @Input() path: string;
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

    onSelectItem2(item: Item) {
      this.store.dispatch(new fromStore.LoadPlanItemGridWithId(item.idItem));
    }


}

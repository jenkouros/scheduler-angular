import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import CustomStore from 'devextreme/data/custom_store';
import * as fromStore from '../../store';
import { Store, select } from '@ngrx/store';
import { PlanItem } from '../../models/planitem.dto';

@Component({
    selector: 'app-items',
    template: `
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <app-planitem-list
                    [store]="itemsStore$ | async"
                    (selectItem)="onSelectItem($event)">
                </app-planitem-list>
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
        this.store.dispatch(new fromStore.LoadPlanItems());
        this.itemsStore$ = this.store.pipe(select(fromStore.getPlanItemsStore));
    }

    onSelectItem(item: PlanItem) {
        this.store.dispatch(new fromStore.LoadPlanItemHierarchy({planItemId: item.idItem}));
        this.store.dispatch(new fromStore.ShowPlanItemPopup());
    }
}

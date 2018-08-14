import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable, Subscription } from 'rxjs';
import { ItemHierarchyViewModel } from '../../models/item.viewmodel';
import { PreplanItemRequest } from '../../models/preplanitem.dto';

@Component({
    selector: 'app-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-item-popup
            [visible]="visible"
            [itemHierarchy]="hierarchy$ | async"
            (close)="onItemPopupClose()"
            (createPreplanItems)="onCreatePreplanItems($event)">
        </app-item-popup>`
})
export class ItemComponent implements OnInit, OnDestroy {
    visible = false;
    hierarchy$: Observable<ItemHierarchyViewModel | null>;
    uiStateSubscription: Subscription;

    constructor(private store: Store<fromStore.SchedulerState>) {}

    ngOnInit(): void {
        this.uiStateSubscription = this.store
            .select(fromStore.getItemUiState)
            .subscribe(state => {
                if (state) {
                    this.visible = state.popupOpened;
                }
            });
        this.hierarchy$ = this.store.select(fromStore.getSelectedItemHierarchy);
    }

    ngOnDestroy(): void {
        this.uiStateSubscription.unsubscribe();
    }

    onCreatePreplanItems(createPreplanItemRequest: PreplanItemRequest) {
        this.store.dispatch(new fromStore.CreatePreplanItems(createPreplanItemRequest));
    }

    onItemPopupClose() {
        this.store.dispatch(new fromStore.HideItemPopup());
    }
}

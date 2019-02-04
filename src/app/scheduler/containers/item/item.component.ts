import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable, Subscription } from 'rxjs';
import { ItemHierarchyViewModel } from '../../models/item.viewmodel';
import { PreplanItemRequest } from '../../models/preplanitem.dto';
import { ItemUIState } from '../../models/item.store';

@Component({
    selector: 'app-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-item-popup
            [uiState]="uiState$ | async"
            [itemHierarchy]="hierarchy$ | async"
            (close)="onItemPopupClose()"
            (createPreplanItems)="onCreatePreplanItems($event)">
        </app-item-popup>`
})
export class ItemComponent implements OnInit {
    visible = false;
    hierarchy$: Observable<ItemHierarchyViewModel | null>;
    uiState$: Observable<ItemUIState | null>;
    // uiStateSubscription: Subscription;

    constructor(private store: Store<fromStore.SchedulerState>) {}

    ngOnInit(): void {
        this.uiState$ = this.store
            .select(fromStore.getItemUiState);
        this.hierarchy$ = this.store.select(fromStore.getSelectedItemHierarchy);
    }

    // ngOnDestroy(): void {
    //     this.uiStateSubscription.unsubscribe();
    // }

    onCreatePreplanItems(createPreplanItemRequest: PreplanItemRequest) {
        this.store.dispatch(new fromStore.CreatePreplanItems(createPreplanItemRequest));
    }

    onItemPopupClose() {
        this.store.dispatch(new fromStore.HideItemPopup());
    }
}

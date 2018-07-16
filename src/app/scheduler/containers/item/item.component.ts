import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs';
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
export class ItemComponent implements OnInit {
    visible = false;
    hierarchy$: Observable<ItemHierarchyViewModel | null>;

    constructor(private store: Store<fromStore.SchedulerState>) {}

    ngOnInit(): void {
        this.store.select(fromStore.getItemUiState).subscribe(state => {
            if (state) {
                this.visible = state.popupOpened;
            }
        });
        this.hierarchy$ = this.store.select(fromStore.getSelectedItemHierarchy);
    }

    onCreatePreplanItems(createPreplanItemRequest: PreplanItemRequest) {
        this.store.dispatch(new fromStore.CreatePreplanItems(createPreplanItemRequest));
    }

    onItemPopupClose() {
        this.store.dispatch(new fromStore.HideItemPopup());
    }
}

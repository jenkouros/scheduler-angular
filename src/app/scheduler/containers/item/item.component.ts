import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs';
import { PlanItemHierarchyViewModel } from '../../models/planitem.viewmodel';
import { PreplanItemRequest } from '../../models/preplanitem.dto';

@Component({
    selector: 'app-item',
    template: `
        <app-planitem-popup
            [visible]="visible"
            [itemHierarchy]="hierarchy$ | async"
            (close)="onClose()"
            (createPreplanItems)="onCreatePreplanItems($event)">
        </app-planitem-popup>
    `
})
export class ItemComponent implements OnInit {
    // uiState$: Observable<fromStore.PlanItemUIState>;
    visible = false;
    hierarchy$: Observable<PlanItemHierarchyViewModel | null>;

    constructor(private store: Store<fromStore.SchedulerState>) {}

    ngOnInit(): void {
        this.store.select(fromStore.getPlanItemUiState).subscribe(state => {
            if (state) {
                this.visible = state.popupOpened;
            }
        });
        this.hierarchy$ = this.store.select(fromStore.getSelectedPlanItemHierarchy);
    }

    onCreatePreplanItems(createPreplanItemRequest: PreplanItemRequest) {
        this.store.dispatch(new fromStore.CreatePreplanItems(createPreplanItemRequest));
    }

    onClose() {
        this.store.dispatch(new fromStore.HidePlanItemPopup());
    }
}

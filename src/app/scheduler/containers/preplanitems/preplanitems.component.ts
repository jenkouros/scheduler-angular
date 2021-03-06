import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs';
import { PreplanItem } from '../../models/preplanitem.dto';
import { select } from '@ngrx/store';
import { PreplanitemUiState } from '../../models/preplanItem.store';

import * as fromPlanStore from '../../../plan/store';
@Component({
  selector: 'app-preplanitems',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-preplanitem-item
      *ngFor="let preplanitem of (preplanitems$ | async) as preplanItems; let i = index"
      [groupColorNumber]="
        i > 0 && preplanItems[i - 1].item.name !== preplanitem.item.name
          ? nextColorNumber
          : i === 0
          ? resetColorNumber()
          : colorNumber
      "
      [preplanitem]="preplanitem"
      (prePlanItemPlanSuggestion)="onPrePlanItemPlanSuggestion($event)"
      (reselectContainers)="onReselectContainers($event)"
      (showDeleteBatchPopup)="onShowDeleteBatchPopup($event)"
      (showHidePreplanItemPopup)="onShowHidePreplanItemPopup($event)"
    >
    </app-preplanitem-item>

    <app-preplanitem-delete-popup
      [preplanItemUiState]="preplanItemsUiState$ | async"
      (deleteBatch)="onDeleteBatch($event)"
      (hideDeleteBatchPopup)="onHideDeleteBatchPopup()"
    >
    </app-preplanitem-delete-popup>

    <app-preplanitem-hide-popup
    [preplanItemUiState]="preplanItemsUiState$ | async"
    (hidePreplanItem)="onHidePreplanItem($event)"
    (hidePreplanItemHidePopup)="onHidePreplanItemHidePopup()"
  >
  </app-preplanitem-hide-popup>

    <!-- <app-preplanitem-suggestion-popup>
        </app-preplanitem-suggestion-popup> -->
  `
})
export class PreplanItemsComponent implements OnInit {
  preplanitems$: Observable<PreplanItem[]>;
  preplansuggesteditems$: Observable<PreplanItem[]>;
  preplanItemsUiState$: Observable<PreplanitemUiState>;
  colorNumber = 0;
  constructor(
    private store: Store<fromStore.SchedulerState>,
    private planStore: Store<fromPlanStore.SchedulerPlansState>
  ) {}

  ngOnInit() {
    this.planStore.select(fromPlanStore.getSelectedPlanId).subscribe(id => {
      this.store.dispatch(new fromStore.LoadPreplanItems());
    });

    this.preplanitems$ = this.store.pipe(select(fromStore.getPreplanitems));
    this.preplanItemsUiState$ = this.store.pipe(select(fromStore.getPrePlanItemUiState));
  }

  resetColorNumber() {
    this.colorNumber = 0;
    return this.colorNumber;
  }

  get nextColorNumber() {
    this.colorNumber = (this.colorNumber + 1) % 2;
    return this.colorNumber;
  }

  onReselectContainers(containerIds: number[]) {
    this.store.dispatch(new fromStore.ReselectContainers(containerIds));
  }

  onDeleteBatch(batchId: number) {
    this.store.dispatch(new fromStore.DeleteItemBatch(batchId));
  }

  onHidePreplanItem(preplanItemId: number) {
    this.store.dispatch(new fromStore.HidePreplanItem(preplanItemId));
  }

  // TODO check if needed
  onShowDeleteBatchPopup(idItemBatch: number) {
    this.store.dispatch(new fromStore.ShowItemBatchDeletePopup({ idItemBatch: idItemBatch }));
  }

  onHideDeleteBatchPopup() {
    this.store.dispatch(new fromStore.HideItemBatchDeletePopup());
}

  onShowHidePreplanItemPopup(idPreplanItem: number) {
    this.store.dispatch(new fromStore.ShowPreplanitemHidePopup({ idPreplanItem: idPreplanItem }));
  }

  onHidePreplanItemHidePopup() {
      this.store.dispatch(new fromStore.HidePreplanitemHidePopup());
  }

  onPrePlanItemPlanSuggestion(prePlanItemId: number) {
      this.store.dispatch(new fromStore.LoadPreplanItemsSuggestions(prePlanItemId));
  }
}

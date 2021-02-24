import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ItemActions from '../actions/items.action';
import { AppState } from './../../../store/app.reducers';

@Injectable()
export class ItemFacade {
  constructor(private store: Store<AppState>) {}

  toggleSubItemPlannable(subItemId: number, value: boolean) {
    this.store.dispatch(new ItemActions.ToggleSubItemPlannable({
      id: subItemId,
      value: value}
    ));
  }

  resetSubItemPlannableState() {
    this.store.dispatch(new ItemActions.ResetSubItemPlannableState());
  }
}

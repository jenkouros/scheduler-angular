import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppComponentBase } from '../../../../shared/app-component-base';
import * as EventActions from '../../../store/actions/events.action';
import * as EventSelectors from '../../../store/selectors/events.selectors';
import { AppState } from './../../../../store/app.reducers';
import { PlannedEvent } from './../../../models/event.model';

@Component({
  selector: 'app-calendar-event-tooltip',
  templateUrl: './calendar-event-tooltip.component.html'
})
export class CalendarEventTooltipComponent extends AppComponentBase implements OnDestroy {
  visible$: Observable<boolean>;
  visible = false;
  // planItem: PlannedEvent | null = null;
  planItem$: Observable<PlannedEvent | null>;
  planItemSubscription: Subscription;

  constructor(private store: Store<AppState>) {
    super();
    this.visible$ = store.pipe(
      select(EventSelectors.getEventDetailFlag)
    );

    this.visible$.subscribe(v => {
      // console.log(v);
      this.visible = v;
    });

    this.planItem$ = store.pipe(
      select(EventSelectors.getSelectedEvent));
    this.planItemSubscription = this.planItem$.subscribe(model => {
      console.log(model);
      // this.planItem = model;
    });

    this.onSubmit = this.onSubmit.bind(this);
    this.hideItemInfo = this.hideItemInfo.bind(this);
  }

  ngOnDestroy() {
    if (this.planItemSubscription) {
      this.planItemSubscription.unsubscribe();
    }
  }

  hideItemInfo() {
    this.store.dispatch(new EventActions.HidePlanItemDetailPopup());
  }

  onSubmit() {
  }
}

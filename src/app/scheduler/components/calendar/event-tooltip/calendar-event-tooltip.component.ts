import { AppState } from './../../../../store/app.reducers';
import { PlannedEvent } from './../../../models/event.model';
import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as EventSelectors from '../../../store/selectors/events.selectors';
import * as EventActions from '../../../store/actions/events.action';

@Component({
  selector: 'app-calendar-event-tooltip',
  templateUrl: './calendar-event-tooltip.component.html'
})
export class CalendarEventTooltipComponent implements OnDestroy {
  visible$: Observable<boolean>;
  visible = false;
  planItem: PlannedEvent | null = null;
  planItemSubscription: Subscription;
  constructor(private store: Store<AppState>) {
    this.visible$ = store.pipe(
      select(EventSelectors.getEventDetailFlag)
    );

    this.visible$.subscribe(v => {
      console.log(v);
      this.visible = v;
    });

    this.planItemSubscription = store.pipe(
      select(EventSelectors.getSelectedEvent)
    ).subscribe(model => this.planItem = model);

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

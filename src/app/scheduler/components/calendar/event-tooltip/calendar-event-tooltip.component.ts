import { ContainerSelect } from './../../../models/container.viewmodel';
import { getContainerSelectList } from './../../../store/selectors/containers.selectors';
import { AppState } from './../../../../store/app.reducers';
import { PlannedEvent } from './../../../models/event.model';
import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as EventSelectors from '../../../store/selectors/events.selectors';
import * as EventActions from '../../../store/actions/events.action';
import { AppComponentBase } from '../../../../shared/app-component-base';

@Component({
  selector: 'app-calendar-event-tooltip',
  templateUrl: './calendar-event-tooltip.component.html'
})
export class CalendarEventTooltipComponent extends AppComponentBase implements OnDestroy {
  visible$: Observable<boolean>;
  visible = false;
  planItem: PlannedEvent | null = null;
  planItemSubscription: Subscription;

  constructor(private store: Store<AppState>) {
    super();
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

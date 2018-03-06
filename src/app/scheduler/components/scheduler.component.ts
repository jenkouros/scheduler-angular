import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html'
})
export class SchedulerComponent implements OnInit {
  constructor(private store: Store<fromStore.SchedulerState>) { }

  ngOnInit() {
    // testing
    this.store.select(fromStore.getSchedulerState).subscribe(
      state => console.log(state)
    );
    this.store.select(fromStore.getPlanItemsState).subscribe(
      state => console.log(state)
    );

    this.store.dispatch(new fromStore.LoadPlanItems());
  }

}

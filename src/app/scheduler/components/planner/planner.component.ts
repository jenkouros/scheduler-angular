import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Container } from '../../models/container.dto';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {
  // containers$: Observable<Container[]>;

  constructor(private store: Store<fromStore.SchedulerState>) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadContainers());
    // this.containers$ = this.store.select(fromStore.getContainers);
    // TEST
    this.store.dispatch(new fromStore.LoadEvents({
      containerIds: [1, 2],
      dateFrom: new Date(2018, 4, 17, 6, 0),
      dateTo: new Date(2018, 4, 17, 22, 0)
    }));
    this.store.select(fromStore.getEvents).subscribe(x => {
      console.log('All events: ');
      console.log(x);
    });
    this.store.select(fromStore.getEventsForContainers([1])).subscribe(x => {
      console.log('Preselected events: ');
      console.log(x);
    });
  }

  onSelectContainer(containerId) {
    this.store.dispatch(new fromStore.SelectContainers([containerId]));
  }

  onDeselectContainer(containerId) {
    this.store.dispatch(new fromStore.DeselectContainers([containerId]));
  }

}

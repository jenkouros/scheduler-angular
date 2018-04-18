import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Container, ContainerSelect } from '../../models/container.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {
  containers$: Observable<ContainerSelect[]>;

  constructor(private store: Store<fromStore.SchedulerState>) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadContainers());
    this.containers$ = this.store.select(fromStore.getContainers);
    // TEST
    this.store.select(fromStore.getContainers).subscribe(x => console.log(x));
    this.store.dispatch(new fromStore.LoadEvents({
      containerIds: [1, 2],
      dateFrom: new Date(2018, 4, 17, 6, 0),
      dateTo: new Date(2018, 4, 17, 22, 0)
    }));
    this.store.select(fromStore.getEvents).subscribe(x => console.log(x));
  }

  onSelectContainer(containerId) {
    this.store.dispatch(new fromStore.SelectContainers([containerId]));
  }

  onDeselectContainer(containerId) {
    this.store.dispatch(new fromStore.DeselectContainers([containerId]));
  }

}

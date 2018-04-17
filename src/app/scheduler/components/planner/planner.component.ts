import { Component, OnInit } from '@angular/core';
import { PlannerService } from './planner.service';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Container, ContainerSelect } from '../../models/container.model';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css'],
  providers: [PlannerService]
})
export class PlannerComponent implements OnInit {
  containers$: Observable<ContainerSelect[]>;

  constructor(private store: Store<fromStore.SchedulerState>) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadContainers());
    this.containers$ = this.store.select(fromStore.getContainers);
    // TEST
    //this.store.select(fromStore.getContainers).subscribe(x => console.log(x));
    //this.onSelectContainer(1);
  }

  onSelectContainer(containerId) {
    this.store.dispatch(new fromStore.SelectContainers([containerId]));
  }

  onDeselectContainer(containerId) {
    this.store.dispatch(new fromStore.DeselectContainers([containerId]));
  }

}

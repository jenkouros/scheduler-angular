import { Component, OnInit } from '@angular/core';
import { ContainerSelect } from '../../models/container.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.css']
})
export class ContainerListComponent implements OnInit {
  containers$: Observable<ContainerSelect[]>;

  constructor(private store: Store<fromStore.SchedulerState>) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadContainers());
    this.containers$ = this.store.select(fromStore.getContainers);
  }

  toggleContainer(container){
    if (container.selected)
    this.onSelectContainer(container.id)
  }

  onSelectContainer(containerId) {
    this.store.dispatch(new fromStore.SelectContainers([containerId]));
  }

  onDeselectContainer(containerId) {
    this.store.dispatch(new fromStore.DeselectContainers([containerId]));
  }


}

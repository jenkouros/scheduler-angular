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
  containers: ContainerSelect[];
  constructor(private store: Store<fromStore.SchedulerState>) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadContainers());
    // this.containers$ = 
    this.store.select(fromStore.getContainers).subscribe(
      (containers) => {
        this.containers = containers;
        console.log(this.containers);
      });
  }

  toggleContainer(container) {
    const selected = !this.containers.find(c => c.id === container.id).selected;
    if (selected) {
      this.onSelectContainer(container.id);
    } else {
      this.onDeselectContainer(container.id);
    }
  }

  onSelectContainer(containerId) {
    this.store.dispatch(new fromStore.SelectContainers([containerId]));
  }

  onDeselectContainer(containerId) {
    this.store.dispatch(new fromStore.DeselectContainers([containerId]));
  }

  ContainerSelected(id: number): boolean {
    return !this.containers.find(c => c.id === id).selected;
  }
}

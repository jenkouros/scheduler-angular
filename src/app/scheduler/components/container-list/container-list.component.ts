import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { ContainerSelect } from '../../models/container.viewModel';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.css']
})
export class ContainerListComponent implements OnInit {
  // containers$: Observable<ContainerSelect[]>;
  containers: ContainerSelect[];
  constructor(private store: Store<fromStore.SchedulerState>) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadContainers());
    // this.containers$ =
<<<<<<< HEAD
    this.store.select(fromStore.getContainerSelectList).subscribe(
=======
    this.store.select(fromStore.getContainers).subscribe(
>>>>>>> 8692126da6b4f577c2a6f3b9ac656a9e30a807d5
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
    console.log(containerId);
    this.store.dispatch(new fromStore.SelectContainers([containerId]));
  }

  onDeselectContainer(containerId) {
    this.store.dispatch(new fromStore.DeselectContainers([containerId]));
  }

  ContainerSelected(id: number): boolean {
    return !this.containers.find(c => c.id === id).selected;
  }
}
